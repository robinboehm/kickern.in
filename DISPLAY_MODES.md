# Display Modi für kickern.in

## Übersicht

Die Anwendung unterstützt zwei speziell optimierte Display-Modi:

## 🖥️ Viewer-Modus (Standard)
**Für große Fernseher/Displays**

### Zugriff
- Standard-URL: `https://kickern.in/[standort]/[tisch]`
- Beispiel: `https://kickern.in/Berlin/Tisch-1`

### Optimierungen
- **Große Schriftarten**: Texte sind aus der Ferne lesbar (bis zu 6xl)
- **Hoher Kontrast**: Deutliche Farbunterschiede für bessere Sichtbarkeit
- **Minimale Interaktion**: Fokus auf Anzeige, weniger Bedienelemente
- **Responsive Design**: Skaliert automatisch für verschiedene TV-Größen
- **Klare Hierarchie**: Aktuelle Spieler sind prominent hervorgehoben

### Features
- Vollbild-Header mit Standort/Tisch
- Große Warteschlangen-Anzeige mit Emojis
- Dramatische "VS" Anzeige für aktuelle Spiele
- Kompakte Team-Eingabe am unteren Rand
- Live-Status-Anzeige

## 📱 Manager-Modus
**Für iPad/Tablet an der Wand**

### Zugriff
- URL mit Parameter: `https://kickern.in/[standort]/[tisch]?manage`
- Beispiel: `https://kickern.in/Berlin/Tisch-1?manage`

### Optimierungen
- **Touch-optimiert**: Große Buttons (min. 60px Höhe) für Finger-Bedienung
- **Tablet-Layout**: Responsive Grid-System für verschiedene Tablet-Größen
- **Erweiterte Steuerung**: Vollständige Warteschlangen-Verwaltung
- **Klare Sektionen**: Getrennte Bereiche für verschiedene Aktionen
- **Feedback**: Visuelle Bestätigung für alle Aktionen

### Features
- Manager-Header mit Icon
- Große Team-Eingabe mit Schnellauswahl
- Interaktive Warteschlangen-Liste mit Entfernen-Buttons
- Vollständige Spielsteuerung mit Gewinner-Buttons
- Alle entfernen-Funktion

## 🎨 Design-Unterschiede

### Viewer (TV)
```
- Text: 2xl bis 6xl
- Padding: 8-16px
- Buttons: Minimalistisch
- Fokus: Lesbarkeit aus der Ferne
- Interaktion: Begrenzt
```

### Manager (Tablet)
```
- Text: xl bis 3xl
- Padding: 6-8px
- Buttons: 60-70px Höhe, große Touch-Targets
- Fokus: Bedienbarkeit
- Interaktion: Vollständig
```

## 📱 Responsive Breakpoints

### Mobile (< 768px)
- Einspaltig Layout
- Gestapelte Buttons
- Kompakte Abstände

### Tablet (768px - 1024px)
- Zweispaltig Layout
- Größere Touch-Targets
- Optimierte Abstände

### Desktop/TV (> 1024px)
- Mehrspaltig Layout
- Maximale Schriftgrößen
- Großzügige Abstände

## 🔧 Technische Details

### Automatische Erkennung
```javascript
const isManageMode = new URLSearchParams(window.location.search).has('manage');
```

### Styling-Ansatz
- **Tailwind CSS**: Utility-First für schnelle Anpassungen
- **Responsive Prefixes**: `md:` für Tablet, `lg:` für Desktop
- **Gradient Backgrounds**: Moderne, ansprechende Optik
- **Shadow System**: Tiefe und Hierarchie

### Performance
- **Gleiche JavaScript-Logik**: Nur UI-Unterschiede
- **Shared Components**: Minimaler Code-Overhead
- **Optimierte Rendering**: Effiziente DOM-Updates

## 🚀 Deployment-Hinweise

### Für Fernseher
1. Browser im Vollbild-Modus öffnen
2. Zoom auf 100% stellen
3. Standard-URL verwenden
4. Auto-Refresh einrichten (optional)

### Für Tablet
1. Browser-Lesezeichen erstellen
2. `?manage` Parameter hinzufügen
3. Home-Screen-Icon erstellen
4. Landscape-Modus empfohlen

## 📊 Verwendungsszenarien

### Viewer-Modus
- Öffentliche Displays in Büros
- TV-Bildschirme in Pausenräumen
- Große Monitore für Turniere
- Digital Signage

### Manager-Modus
- iPad an der Wand montiert
- Tablet am Kickertisch
- Mobile Verwaltung durch Organisatoren
- Schnelle Team-Eingabe vor Ort
