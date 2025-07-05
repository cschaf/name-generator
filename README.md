# Namen Generator 🌟

Ein einfacher, aber funktionsreicher Namensgenerator, der coole und interessante Namen aus einer Vielzahl von Kategorien für verschiedene Geschlechter (männlich, weiblich, unisex) generiert. Perfekt für Inspiration bei der Namenssuche für Charaktere, Projekte oder einfach zum Spaß!

## ✨ Features

*   **Vielfältige Kategorien:** Wähle aus einer breiten Palette von Kategorien, darunter:
    *   🚀 Gen-Z
    *   📚 Klassisch
    *   🌳 Natur
    *   ✨ Einzigartig
    *   🏛️ Mythologisch
    *   🤖 Futuristisch
    *   ⚡️ Pokémon-Charaktere
    *   🎮 Videospiel-Helden
    *   ⚔️ Fantasy-Legenden
*   **Geschlechtsauswahl:** Generiere Namen spezifisch für:
    *   ♂️ Männlich
    *   ♀️ Weiblich
    *   ⚧️ Unisex
*   **Namen mit Infos:** Jeder generierte Name kommt mit einer kurzen, passenden Information oder Beschreibung.
*   **Favoriten-System:**
    *   ❤️ Füge deine Lieblingsnamen ganz einfach per Klick zu einer persönlichen Favoritenliste hinzu.
    *   🗑️ Entferne Namen aus den Favoriten.
    *   💾 **Persistente Speicherung:** Deine Favoriten werden im LocalStorage deines Browsers gespeichert, sodass sie auch nach dem Schließen der Seite erhalten bleiben.
*   **Dynamische Kategorienanzeige:**
    *   Eine "Mehr anzeigen" / "Weniger anzeigen" Funktion erlaubt es, bei vielen Kategorien die Übersichtlichkeit zu wahren und bei Bedarf alle Optionen einzublenden.
*   **Benachrichtigungssystem:** Erhalte direktes Feedback über Aktionen (z.B. Name zu Favoriten hinzugefügt, Fehler beim Laden).
*   **Responsive Design:** Angepasst für eine gute Benutzererfahrung auf verschiedenen Bildschirmgrößen.
*   **Kein Duplikat-Tracking:** Der Generator merkt sich bereits angezeigte Namen pro Kategorie und Geschlecht, um Wiederholungen zu minimieren, bis alle Namen einmal durchgespielt wurden.

## 🚀 Benutzung / Anleitung

1.  **Öffne die `index.html` Datei in deinem Webbrowser.**
2.  **Kategorie auswählen:** Klicke auf einen der Buttons im oberen Bereich, um eine Namenskategorie auszuwählen (z.B. "Natur", "Gen-Z"). Die erste Kategorie ist standardmäßig ausgewählt.
    *   Falls viele Kategorien vorhanden sind, nutze den "Mehr anzeigen"-Button, um alle Kategorien sichtbar zu machen.
3.  **Geschlecht auswählen:** Klicke auf einen der Buttons (♂️ männlich, ♀️ weiblich, ⚧️ unisex), um das gewünschte Geschlecht festzulegen. "Männlich" ist standardmäßig ausgewählt.
4.  **Namen generieren:** Klicke auf den Button "✨ Namen generieren ✨". Ein Name aus der gewählten Kategorie und für das gewählte Geschlecht wird zusammen mit einer kurzen Info angezeigt.
5.  **Zu Favoriten hinzufügen:** Gefällt dir ein Name? Klicke auf den Button "❤️ Zu Favoriten hinzufügen", um ihn in deiner "Meine Favoriten"-Liste zu speichern.
6.  **Favoriten verwalten:**
    *   Deine gespeicherten Favoriten werden unterhalb des Generators angezeigt.
    *   Jeder Favoriteneintrag zeigt das Geschlecht-Emoji, das Kategorie-Icon, den Namen und die Info.
    *   Klicke auf den Mülleimer-Button (<i class="fas fa-trash-alt"></i>) neben einem Namen in der Favoritenliste, um ihn zu entfernen.
7.  **Wiederholen:** Generiere so viele Namen, wie du möchtest!

## 🛠️ Technologien

*   HTML5
*   CSS3 (mit Flexbox und Grid für Layouts)
*   JavaScript (ES6 Module)

## 📄 Datenquelle

Die Namen und ihre Informationen werden aus einer lokalen `data.json`-Datei geladen. Diese Datei ist strukturiert nach Kategorien und Geschlechtern und kann bei Bedarf einfach erweitert werden.

Viel Spaß beim Entdecken neuer Namen!
