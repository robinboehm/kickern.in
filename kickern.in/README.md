# kickern.in - Kickertisch-Warteschlangen-Management

Eine moderne Web-Anwendung zur Verwaltung von Warteschlangen an Kickertischen in Gaststätten, Bars und anderen Locations.

## 🎯 Features

- **Dynamische Warteschlangen**: Teams können sich selbst in die Warteschlange eintragen
- **Manager-Modus**: Vollständige Kontrolle über die Warteschlange mit Authentication
- **Gast-Ansicht**: Read-only Ansicht für externe Displays und Gäste
- **Real-time Updates**: Automatische Synchronisation über alle Geräte via Firebase
- **Quick-Add**: Die letzten 8 Teams werden gespeichert für schnelle Wiedereingabe
- **Mobile-optimiert**: Responsive Design für Tablets und Smartphones
- **Standort-basiert**: Dynamische URLs für verschiedene Standorte und Tische

## 🚀 Tech Stack

- **Frontend**: [Astro](https://astro.build/) mit TypeScript
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Backend**: [Firebase](https://firebase.google.com/) (Firestore, Authentication)
- **Deployment**: Optimiert für Vercel/Netlify

## 📋 Voraussetzungen

- Node.js 18+ und npm
- Ein Firebase-Projekt (kostenloser Plan reicht aus)
- Optional: Vercel oder Netlify Account für Deployment

## 🛠️ Installation

### 1. Repository klonen

```bash
git clone https://github.com/yourusername/kickern.in.git
cd kickern.in
```

### 2. Abhängigkeiten installieren

```bash
npm install
```

### 3. Firebase-Projekt einrichten

1. Gehe zu [Firebase Console](https://console.firebase.google.com/)
2. Erstelle ein neues Projekt oder wähle ein bestehendes
3. Aktiviere **Firestore Database**:
   - Navigiere zu "Firestore Database" im Menü
   - Klicke auf "Datenbank erstellen"
   - Wähle "Production Mode" oder "Test Mode" für Entwicklung
   - Wähle eine Region (z.B. europe-west3 für Frankfurt)

4. Aktiviere **Authentication** (optional, für Manager-Modus):
   - Navigiere zu "Authentication" im Menü
   - Klicke auf "Erste Schritte"
   - Aktiviere "E-Mail/Passwort" als Anmeldeverfahren

5. Firebase-Konfiguration abrufen:
   - Gehe zu Projekteinstellungen (Zahnrad-Icon)
   - Scrolle zu "Deine Apps" und klicke auf "Web-App hinzufügen"
   - Registriere die App mit einem Namen
   - Kopiere die Konfigurationswerte

### 4. Umgebungsvariablen konfigurieren

1. Kopiere `.env.example` zu `.env`:

```bash
cp .env.example .env
```

2. Füge deine Firebase-Konfiguration in `.env` ein:

```env
PUBLIC_FIREBASE_API_KEY=dein-api-key
PUBLIC_FIREBASE_AUTH_DOMAIN=dein-projekt.firebaseapp.com
PUBLIC_FIREBASE_PROJECT_ID=dein-projekt-id
PUBLIC_FIREBASE_STORAGE_BUCKET=dein-projekt.appspot.com
PUBLIC_FIREBASE_MESSAGING_SENDER_ID=deine-sender-id
PUBLIC_FIREBASE_APP_ID=deine-app-id
```

### 5. Firestore Security Rules

Füge diese Rules in der Firebase Console unter Firestore > Rules ein:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Queues: Lesen für alle, Schreiben nur mit Auth oder für neue Teams
    match /queues/{queueId} {
      allow read: if true;
      allow create: if true;
      allow update: if true; // Für Demo - später mit Auth einschränken
      allow delete: if request.auth != null;
    }
    
    // Locations: Lesen für alle, automatisch durch Queue-Updates verwaltet
    match /locations/{locationId} {
      allow read: if true;
      allow write: if true; // Automatisch durch App verwaltet
    }
  }
}
```

## 🎮 Entwicklung

### Lokaler Entwicklungsserver

```bash
npm run dev
```

Die App läuft dann unter `http://localhost:4321`

### Build für Production

```bash
npm run build
```

### Vorschau des Production-Builds

```bash
npm run preview
```

## 📱 Verwendung

### Basis-URLs

- **Startseite**: `kickern.in/` - Übersicht aller aktiven Standorte
- **Warteschlange**: `kickern.in/[standort]/[tisch]` - Gast-Ansicht
- **Manager-Modus**: `kickern.in/[standort]/[tisch]?manage=true` - Mit Verwaltungsfunktionen

### Beispiele

- `kickern.in/biergarten-muenchen/tisch-1` - Gast-Ansicht für Tisch 1 im Biergarten München
- `kickern.in/sports-bar-berlin/haupttisch?manage=true` - Manager-Ansicht

### Features im Detail

#### Für Spieler
- Team-Name eingeben und zur Warteschlange hinzufügen
- Position in der Warteschlange sehen
- Geschätzte Wartezeit anzeigen
- Quick-Add Buttons für wiederkehrende Teams

#### Für Manager
- Vollständige Kontrolle über die Warteschlange
- Teams hinzufügen/entfernen
- Spielergebnisse markieren (Verlierer wird automatisch entfernt)
- Warteschlange komplett leeren
- Optional: Authentication für Zugriffskontrolle

## 🚀 Deployment

### Vercel

1. Installiere Vercel CLI:
```bash
npm i -g vercel
```

2. Deploy:
```bash
vercel
```

3. Umgebungsvariablen in Vercel Dashboard hinzufügen

### Netlify

1. Build-Befehl: `npm run build`
2. Publish-Verzeichnis: `dist`
3. Umgebungsvariablen im Netlify Dashboard hinzufügen

### Manuelles Deployment

```bash
npm run build
# Upload den 'dist' Ordner zu deinem Hosting-Provider
```

## 🔧 Konfiguration

### Authentication aktivieren

Standardmäßig ist die Authentication im Manager-Modus deaktiviert. Um sie zu aktivieren:

1. In `src/components/QueueManager.astro`, ändere:
```javascript
const checkAuth = () => {
  // return true; // Demo-Modus
  return isAuthenticated(); // Auth aktivieren
};
```

2. Erstelle Manager-Accounts in Firebase Console unter Authentication

### Anpassungen

- **Farben/Design**: Bearbeite Tailwind-Klassen in den Komponenten
- **Wartezeit-Schätzung**: Passe den Multiplikator in `QueueViewer.astro` an
- **Team-Limit**: Ändere die max. Anzahl in `queueService.ts`

## 📝 Projektstruktur

```
kickern.in/
├── src/
│   ├── components/        # Astro-Komponenten
│   │   ├── QueueManager.astro
│   │   └── QueueViewer.astro
│   ├── layouts/           # Layout-Templates
│   │   └── Layout.astro
│   ├── lib/              # Business Logic
│   │   ├── firebase.ts   # Firebase-Konfiguration
│   │   ├── queueService.ts # Warteschlangen-Verwaltung
│   │   └── authService.ts  # Authentication
│   ├── pages/            # Routen
│   │   ├── index.astro   # Startseite
│   │   └── [standort]/
│   │       └── [tisch].astro # Dynamische Routen
│   ├── styles/           # Globale Styles
│   │   └── global.css
│   └── types/            # TypeScript Definitionen
│       └── index.ts
├── public/               # Statische Assets
├── .env.example         # Beispiel-Umgebungsvariablen
├── astro.config.mjs     # Astro-Konfiguration
├── package.json
├── tsconfig.json
└── README.md
```

## 🐛 Troubleshooting

### Firebase-Verbindungsfehler
- Prüfe, ob alle Umgebungsvariablen korrekt gesetzt sind
- Stelle sicher, dass Firestore in deinem Firebase-Projekt aktiviert ist
- Überprüfe die Security Rules

### Build-Fehler
- Lösche `node_modules` und `package-lock.json`, dann `npm install`
- Stelle sicher, dass Node.js 18+ installiert ist

### Real-time Updates funktionieren nicht
- Prüfe die Browser-Konsole auf Fehler
- Stelle sicher, dass WebSockets nicht blockiert werden
- Überprüfe Firestore-Berechtigungen

## 📄 Lizenz

MIT

## 🤝 Contributing

Pull Requests sind willkommen! Für größere Änderungen, bitte erst ein Issue erstellen.

## 📧 Support

Bei Fragen oder Problemen, erstelle ein Issue auf GitHub oder kontaktiere uns.

---

**Happy Kicking! ⚽**
