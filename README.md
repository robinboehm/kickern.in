# kickern.in 🏓

Eine moderne Webanwendung für das Management von Warteschlangen an Kickertischen in Gaststätten und Bars.

## 🎯 Überblick

kickern.in ermöglicht es Gästen, sich digital in Warteschlangen für Kickertische einzutragen und die aktuelle Reihenfolge einzusehen. Die App ist speziell für den Einsatz auf Tablets am Tisch und mobile Geräte optimiert.

## ✨ Features

- **Warteschlangen-Management**: Teams können sich einfach über ein Eingabefeld einreihen
- **Quick-Add**: Die letzten 8 Teams werden gespeichert für schnelle Wiederauswahl
- **Zwei Ansichten**:
  - **Management-Ansicht**: Vollzugriff für Tablets am Tisch (mit Authentication)
  - **Gast-Ansicht**: Schreibgeschützter Zugriff für externe Anzeigen und Handys
- **Multi-Location Support**: Unterstützung für mehrere Standorte und Tische
- **Real-time Updates**: Live-Synchronisation zwischen allen Geräten
- **Mobile-optimiert**: Touch-freundliche Bedienung für Tablets und Smartphones

## 🏗️ Tech Stack

- **Frontend**: [Astro](https://astro.build/) mit [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [Firebase](https://firebase.google.com/) (Firestore + Authentication)
- **Deployment**: Vorbereitet für Vercel/Netlify

## 📱 URL-Struktur

```
kickern.in/                          # Startseite mit Standort-Übersicht
kickern.in/[standort]/[tisch]        # Tisch-spezifische Ansicht
```

**Beispiele:**
- `kickern.in/platzwart/1` - Platzwart, Tisch 1
- `kickern.in/platzwart/leo` - Platzwart, Tisch "Leo"
- `kickern.in/sportsbar/soccer` - Sportsbar, Tisch "Soccer"

## 🚀 Installation

### Voraussetzungen
- Node.js (v18 oder höher)
- Firebase Account

### Setup

1. **Repository klonen**
   ```bash
   git clone https://github.com/yourusername/kickern.in.git
   cd kickern.in
   ```

2. **Dependencies installieren**
   ```bash
   npm install
   ```

3. **Firebase konfigurieren**
   ```bash
   # Firebase CLI installieren (falls noch nicht vorhanden)
   npm install -g firebase-tools
   
   # Firebase Login
   firebase login
   
   # Firebase Projekt initialisieren
   firebase init
   ```

4. **Environment Variables setzen**
   ```bash
   cp .env.example .env.local
   # Firebase Konfiguration in .env.local eintragen
   ```

5. **Development Server starten**
   ```bash
   npm run dev
   ```

## 🏗️ Datenmodell

### Firestore Collections

```javascript
// /queues/{standort}_{tisch}
{
  currentQueue: ["Team Alpha", "Team Beta", "Team Gamma"],
  lastActivity: Timestamp,
  recentTeams: ["Team Alpha", "Team Beta", "Team Charlie", ...], // Letzte 8 Teams
  standort: "platzwart",
  tisch: "1"
}

// /locations/{standort}
{
  name: "Platzwart",
  lastActivity: Timestamp,
  activeTables: ["1", "leo", "soccer"]
}
```

## 🎮 Verwendung

### Für Gäste (Tablet am Tisch)
1. Firebase Authentication durchführen
2. Team-Name eingeben oder aus den letzten 8 Teams auswählen
3. Nach dem Spiel: Verlierer-Team entfernen, nächstes Team aktivieren

### Für Zuschauer (Handy/externe Displays)
1. Startseite besuchen für Standort-Übersicht
2. Gewünschten Tisch auswählen
3. Aktuelle Warteschlange einsehen (nur Lesezugriff)

## 📦 Deployment

### Vercel
```bash
npm run build
vercel --prod
```

### Netlify
```bash
npm run build
# Netlify CLI oder Web-Interface verwenden
```

## 🔧 Entwicklung

### Verfügbare Scripts
```bash
npm run dev          # Development server
npm run build        # Production build
npm run preview      # Preview production build
npm run astro        # Astro CLI
```

### Projektstruktur
```
src/
├── components/      # Wiederverwendbare Komponenten
├── layouts/         # Layout-Templates
├── pages/           # Astro-Seiten (Auto-Routing)
├── styles/          # Globale Styles
├── lib/            # Utility-Funktionen
└── firebase/       # Firebase-Konfiguration
```

## 🤝 Contributing

1. Fork das Repository
2. Feature Branch erstellen (`git checkout -b feature/amazing-feature`)
3. Changes committen (`git commit -m 'Add amazing feature'`)
4. Branch pushen (`git push origin feature/amazing-feature`)
5. Pull Request erstellen

## 📄 Lizenz

Dieses Projekt steht unter der MIT Lizenz - siehe [LICENSE](LICENSE) Datei für Details.

## 📞 Support

Bei Fragen oder Problemen, bitte ein Issue erstellen oder kontaktiere [deine-email@domain.com](mailto:deine-email@domain.com).

---

Entwickelt mit ❤️ für die Kickergemeinschaft