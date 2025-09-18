# FlareCare

A personal companion app for managing Crohn's & Colitis symptoms, built with Next.js and designed for easy expansion to native mobile apps.

## Features

### 🏠 Home Dashboard
- Clean, intuitive interface with quick access to all features
- Personal welcome message and feature overview
- Responsive design that works on all devices

### 📊 Symptom Tracking
- Log daily symptoms with severity levels (1-10)
- Track symptom start/end dates and ongoing status
- Add notes and potential food triggers
- Edit and delete previous entries
- Visual severity indicators

### 💊 Medication Management
- Add medications with dosage and timing
- Set frequency (Morning, Afternoon, Evening, Night, As Needed)
- Add notes for each medication
- Edit and delete medication entries
- Visual time-of-day indicators

### 📈 Reports & Analytics
- Generate 7-day symptom summaries
- Export data as PDF or CSV
- Share reports with healthcare providers
- Visual charts and trend analysis

### ☁️ Cloud Sync (Optional)
- Local-first data storage by default
- Optional Supabase cloud synchronization
- Access your data across multiple devices
- Secure, encrypted data storage
- Works offline with automatic sync when online

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React, JavaScript
- **Styling**: Tailwind CSS
- **Data Storage**: Local Storage + Supabase (optional)
- **PDF Export**: jsPDF
- **Icons**: Heroicons (SVG)

## Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd flare-care
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables** (optional - for cloud sync)
   ```bash
   cp .env.example .env.local
   ```
   Add your Supabase credentials to `.env.local`:
   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## Usage

### Basic Usage
1. **Start by logging symptoms** - Click "Symptoms" and add your first entry
2. **Add medications** - Go to "Medications" to set up your medication schedule
3. **Generate reports** - Use the "Reports" page to create summaries for your healthcare team

### Cloud Sync (Optional)
1. **Enable sync** - Toggle the sync switch on Symptoms or Medications pages
2. **Automatic sync** - Your data will automatically sync when you make changes
3. **Manual sync** - Use "Sync to Cloud" and "Fetch from Cloud" buttons for manual control

## Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── about/             # About page
│   ├── medications/       # Medications management
│   ├── reports/           # Reports and analytics
│   ├── symptoms/          # Symptom tracking
│   ├── globals.css        # Global styles
│   ├── layout.js          # Root layout
│   └── page.js            # Home page
├── components/            # Reusable components
│   ├── ConfirmationModal.js
│   ├── Navigation.js
│   └── SyncSettings.js
└── lib/                   # Utilities and hooks
    ├── supabase.js        # Supabase client and helpers
    ├── useDataSync.js     # Data sync hook
    └── useLocalStorage.js # Local storage hook
```

## Data Privacy

- **Local-first**: All data is stored locally on your device by default
- **Optional sync**: Cloud sync is completely optional and user-controlled
- **Encrypted**: Data is encrypted in transit and at rest
- **Private**: Only you can access your data - no sharing with third parties

## Contributing

This is a personal project, but suggestions and feedback are welcome! The app is designed to be easily extensible for future features like:
- Medication reminders and notifications
- Advanced analytics and insights
- Healthcare provider integration
- Mobile app development

## License

This project is for personal use. Please respect the privacy and personal nature of this health management application.

## About

Built by someone who understands the daily challenges of living with Crohn's disease. This app was created to fill a gap in the market for simple, effective, and privacy-focused health management tools.

---

**FlareCare** - Built with care for Crohn's & Colitis patients. ❤️
