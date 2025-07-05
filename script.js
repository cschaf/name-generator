// script.js

let currentGender = 'male';
let currentCategory = 'gen-z'; // Standard-Kategorie
let currentName = null;
let favorites = [];
let nameData = {}; // Wird dynamisch geladen

// Objekt zum Speichern der verwendeten Namen pro Kategorie und Geschlecht
let usedNames = {}; 

/**
 * Zeigt eine temporäre Nachricht an.
 * @param {string} message - Die anzuzeigende Nachricht.
 * @param {string} type - Der Typ der Nachricht (z.B. 'success', 'error').
 */
function showMessage(message, type = 'info') {
    const messageBox = document.getElementById('messageBox');
    messageBox.textContent = message;
    messageBox.className = 'message-box show'; // Klasse für Sichtbarkeit
    messageBox.style.backgroundColor = type === 'error' ? 'rgba(255, 0, 0, 0.7)' : 'rgba(0, 0, 0, 0.7)';

    setTimeout(() => {
        messageBox.classList.remove('show');
    }, 3000); // Nachricht verschwindet nach 3 Sekunden
}

/**
 * Lädt die Namensdaten aus der data.json-Datei.
 */
async function loadNameData() {
    try {
        const response = await fetch('data.json');
        if (!response.ok) {
            throw new Error(`HTTP-Fehler! Status: ${response.status}`);
        }
        nameData = await response.json();
        // usedNames-Objekt initialisieren, nachdem nameData geladen wurde
        for (const category in nameData) {
            usedNames[category] = { male: [], female: [], unisex: [] };
        }
        console.log('Namensdaten erfolgreich geladen:', nameData);

        // Favoriten aus localStorage laden
        const storedFavorites = localStorage.getItem('favorites');
        if (storedFavorites) {
            favorites = JSON.parse(storedFavorites);
        }

        generateName(); // Ersten Namen generieren, nachdem Daten geladen sind
        updateFavoritesList(); // Favoritenliste aktualisieren
    } catch (error) {
        console.error('Fehler beim Laden der Namensdaten:', error);
        showMessage('Fehler beim Laden der Namensdaten. Bitte versuchen Sie es später erneut.', 'error');
    }
}

/**
 * Generiert einen zufälligen Namen basierend auf der aktuellen Kategorie und dem Geschlecht.
 */
function generateName() {
    if (!nameData || Object.keys(nameData).length === 0) {
        showMessage('Namensdaten sind noch nicht geladen.', 'error');
        return;
    }

    const names = nameData[currentCategory][currentGender];
    const currentUsedNames = usedNames[currentCategory][currentGender];
    
    // Wenn alle Namen in der aktuellen Kategorie/Geschlecht verwendet wurden, Liste zurücksetzen
    if (currentUsedNames.length >= names.length) {
        usedNames[currentCategory][currentGender] = [];
        showMessage("Alle Namen in dieser Kategorie wurden durchgespielt! Die Liste wurde zurückgesetzt. 🎉", "info");
    }
    
    // Verfügbare Namen filtern (noch nicht verwendete)
    const availableNames = names.filter(name => 
        !currentUsedNames.some(usedName => usedName.name === name.name)
    );
    
    if (availableNames.length === 0) {
        showMessage("Keine Namen in dieser Kategorie verfügbar.", "error");
        document.getElementById('nameDisplay').style.display = 'none';
        currentName = null;
        return;
    }

    // Zufälligen Namen aus verfügbaren Namen wählen
    const randomIndex = Math.floor(Math.random() * availableNames.length);
    currentName = availableNames[randomIndex];
    
    // Namen zu verwendeten Namen hinzufügen
    usedNames[currentCategory][currentGender].push(currentName);
    
    const nameElement = document.getElementById('generatedName');
    const infoElement = document.getElementById('nameInfo');
    const displayElement = document.getElementById('nameDisplay');
    
    nameElement.textContent = currentName.name;
    infoElement.textContent = currentName.info;
    displayElement.style.display = 'block';
    
    // Fortschrittsanzeige hinzufügen
    const totalNames = names.length;
    const remainingNames = totalNames - usedNames[currentCategory][currentGender].length;
    
    if (remainingNames === 0) {
        infoElement.textContent = currentName.info + " 🎉 (Alle Namen durchgespielt!)";
    } else if (remainingNames <= 5) {
        infoElement.textContent = currentName.info + ` ⚡ (Noch ${remainingNames} neue Namen!)`;
    } else {
        infoElement.textContent = currentName.info;
    }
    
    // Animation hinzufügen
    nameElement.style.animation = 'none';
    setTimeout(() => {
        nameElement.style.animation = 'fadeIn 0.5s ease';
    }, 10);
}

/**
 * Fügt den aktuell angezeigten Namen zu den Favoriten hinzu.
 */
function addToFavorites() {
    if (!currentName) {
        showMessage('Bitte generiere zuerst einen Namen!', 'error');
        return;
    }
    
    // Prüfen, ob Name bereits in Favoriten existiert (Name, Geschlecht UND Kategorie)
    const exists = favorites.some(fav => 
        fav.name === currentName.name && 
        fav.gender === currentGender &&
        fav.category === currentCategory
    );

    if (exists) {
        showMessage('Dieser Name ist bereits in deinen Favoriten! 😊', 'info');
        return;
    }
    
    favorites.push({
        ...currentName,
        gender: currentGender,
        category: currentCategory // Kategorie speichern
    });
    updateFavoritesList();
    localStorage.setItem('favorites', JSON.stringify(favorites)); // Favoriten im localStorage speichern
    showMessage('Name zu Favoriten hinzugefügt! ❤️', 'success');
    
    // Visuelles Feedback am Button
    const btn = document.querySelector('.add-favorite-btn');
    const originalText = btn.textContent;
    btn.textContent = '✅ Hinzugefügt!';
    btn.style.background = 'rgba(0, 255, 0, 0.8)';
    setTimeout(() => {
        btn.textContent = originalText;
        btn.style.background = 'rgba(0, 255, 0, 0.6)';
    }, 2000);
}

/**
 * Entfernt einen Namen aus den Favoriten.
 * @param {number} index - Der Index des zu entfernenden Namens in der Favoritenliste.
 */
function removeFromFavorites(index) {
    if (index >= 0 && index < favorites.length) {
        const removedName = favorites.splice(index, 1)[0];
        updateFavoritesList();
        localStorage.setItem('favorites', JSON.stringify(favorites)); // Favoriten im localStorage speichern
        showMessage(`"${removedName.name}" aus Favoriten entfernt. 🗑️`, 'info');
    }
}

/**
 * Aktualisiert die Anzeige der Favoritenliste.
 */
function updateFavoritesList() {
    const list = document.getElementById('favoritesList');
    list.innerHTML = '';
    
    if (favorites.length === 0) {
        list.innerHTML = '<p style="color: rgba(255,255,255,0.6); text-align: center; font-style: italic;">Noch keine Favoriten gespeichert</p>';
        return;
    }
    
    favorites.forEach((fav, index) => {
        const item = document.createElement('div');
        item.className = 'favorite-item';
        // Emoji für Geschlecht und Kategorie anzeigen
        let genderEmoji = '';
        if (fav.gender === 'male') {
            genderEmoji = '♂';
        } else if (fav.gender === 'female') {
            genderEmoji = '♀';
        } else {
            genderEmoji = '⚧️'; // Transgender symbol for unisex
        }
        let categoryEmoji = '';
        switch(fav.category) {
            case 'gen-z': categoryEmoji = '🚀'; break;
            case 'classic': categoryEmoji = '📚'; break;
            case 'nature': categoryEmoji = '🌳'; break;
            case 'unique': categoryEmoji = '✨'; break;
            case 'mythological': categoryEmoji = '🏛️'; break;
            case 'futuristic': categoryEmoji = '🤖'; break;
        }

        item.innerHTML = `
            <span>
                ${genderEmoji} ${categoryEmoji}
                <strong>${fav.name}</strong> - ${fav.info}
            </span>
            <button class="remove-btn" onclick="removeFromFavorites(${index})"><i class="fas fa-trash-alt"></i></button>
        `;
        list.appendChild(item);
    });
}

// Funktionen global verfügbar machen für HTML-Events
window.generateName = generateName;
window.addToFavorites = addToFavorites;
window.removeFromFavorites = removeFromFavorites;

// Initialisierung, wenn das DOM geladen ist
document.addEventListener('DOMContentLoaded', function() {
    // Geschlechts-Auswahl
    document.querySelectorAll('#genderButtons .selection-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#genderButtons .selection-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentGender = btn.dataset.gender;
            generateName(); // Neuen Namen generieren wenn Geschlecht gewechselt wird
        });
    });

    // Kategorie-Auswahl
    document.querySelectorAll('#categoryButtons .selection-btn').forEach(btn => {
        btn.addEventListener('click', () => {
            document.querySelectorAll('#categoryButtons .selection-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentCategory = btn.dataset.category;
            generateName(); // Neuen Namen generieren wenn Kategorie gewechselt wird
        });
    });

    // Namensdaten laden und dann den ersten Namen generieren
    loadNameData();

    // "Show More/Less" Button Funktionalität
    const categoryScrollContainer = document.getElementById('categoryScrollContainer');
    const showMoreLessBtn = document.getElementById('showMoreLessBtn');
    const collapsedHeight = 120; // Define collapsed height in px matching CSS

    function updateButtonState(isExpanded) {
        if (!categoryScrollContainer || !showMoreLessBtn) return;

        if (isExpanded) {
            categoryScrollContainer.style.maxHeight = '500px'; // Or a sufficiently large value
            showMoreLessBtn.textContent = 'Weniger anzeigen';
            showMoreLessBtn.style.display = 'block';
        } else {
            // To check if overflow would occur in collapsed state,
            // temporarily allow full height, measure, then decide.
            const currentMaxHeight = categoryScrollContainer.style.maxHeight;
            const currentOverflowY = categoryScrollContainer.style.overflowY;

            // Temporarily remove height restriction to measure full content height
            categoryScrollContainer.style.maxHeight = 'none';
            categoryScrollContainer.style.overflowY = 'visible'; // Ensure scrollHeight is accurate
            const scrollHeight = categoryScrollContainer.scrollHeight;

            // Restore visual state before making final decision for button
            categoryScrollContainer.style.maxHeight = currentMaxHeight; // Could be null or specific if set
            categoryScrollContainer.style.overflowY = currentOverflowY;

            // Now apply collapsed height for visual effect
            categoryScrollContainer.style.maxHeight = `${collapsedHeight}px`;

            if (scrollHeight > collapsedHeight) {
                showMoreLessBtn.textContent = 'Mehr anzeigen';
                showMoreLessBtn.style.display = 'block';
            } else {
                showMoreLessBtn.style.display = 'none';
            }
        }
    }

    function checkInitialButtonState() {
        if (!categoryScrollContainer || !showMoreLessBtn) return;
        // Ensure initial state matches CSS (collapsed)
        categoryScrollContainer.classList.remove('expanded');
        categoryScrollContainer.style.maxHeight = `${collapsedHeight}px`;

        // Measure full content height to decide if button should be visible initially
        const originalMaxHeight = categoryScrollContainer.style.maxHeight;
        const originalOverflowY = categoryScrollContainer.style.overflowY;

        categoryScrollContainer.style.maxHeight = 'none'; // Allow full height for measurement
        categoryScrollContainer.style.overflowY = 'visible';
        const scrollHeight = categoryScrollContainer.scrollHeight;

        categoryScrollContainer.style.maxHeight = originalMaxHeight; // Restore
        categoryScrollContainer.style.overflowY = originalOverflowY; // Restore

        if (scrollHeight > collapsedHeight) {
            showMoreLessBtn.textContent = 'Mehr anzeigen';
            showMoreLessBtn.style.display = 'block';
        } else {
            showMoreLessBtn.style.display = 'none';
        }
        // Ensure the container is visually collapsed as per initial CSS intent
        categoryScrollContainer.style.maxHeight = `${collapsedHeight}px`;
    }

    if (categoryScrollContainer && showMoreLessBtn) {
        // Set initial state correctly
        checkInitialButtonState();

        showMoreLessBtn.addEventListener('click', () => {
            const isCurrentlyExpanded = categoryScrollContainer.classList.contains('expanded');
            categoryScrollContainer.classList.toggle('expanded');
            updateButtonState(!isCurrentlyExpanded); // Update based on the new state
        });

        window.addEventListener('resize', () => {
            // When resizing, maintain current expanded/collapsed state and re-evaluate button
            const isExpanded = categoryScrollContainer.classList.contains('expanded');
            updateButtonState(isExpanded);
        });
    }
});

          
