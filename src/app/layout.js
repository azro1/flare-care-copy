import './globals.css'
import Navigation from '@/components/Navigation'

export const metadata = {
  title: 'FlareCare - Crohn\'s & Colitis Management',
  description: 'Track symptoms, medications, and generate reports for Crohn\'s & Colitis patients',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><defs><linearGradient id="grad" x1="0%" y1="0%" x2="100%" y2="100%"><stop offset="0%" style="stop-color:%236366f1;stop-opacity:1" /><stop offset="100%" style="stop-color:%234f46e5;stop-opacity:1" /></linearGradient></defs><rect width="24" height="24" fill="url(%23grad)" rx="6"/><path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" fill="white" stroke="white" stroke-width="0.5"/></svg>',
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="min-h-screen">
        <div className="min-h-screen flex flex-col">
          <Navigation />
          <main className="flex-1 container mx-auto px-4 py-12 animate-fade-in-up">
            {children}
          </main>
          <footer className="relative bg-gradient-to-r from-white/80 to-neutral-50/80 backdrop-blur-sm border-t border-white/30 py-8 mt-auto">
            <div className="absolute inset-0 bg-gradient-to-r from-primary-500/5 to-secondary-500/5"></div>
            <div className="relative container mx-auto px-4 text-center">
              <div className="flex items-center justify-center mb-2">
                <div className="w-6 h-6 bg-gradient-to-br from-primary-500 to-primary-600 rounded-lg flex items-center justify-center mr-2">
                  <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                  </svg>
                </div>
                <span className="font-semibold gradient-text">FlareCare</span>
              </div>
              <p className="text-neutral-600 text-sm">
                &copy; 2025 FlareCare. Built with care for Crohn's & Colitis patients.
              </p>
              <div className="mt-2 flex items-center justify-center space-x-1 text-xs text-neutral-500">
                <span>Made with</span>
                <svg className="w-3 h-3 text-red-500 animate-pulse" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                </svg>
                <span>for the community</span>
              </div>
            </div>
          </footer>
        </div>
      </body>
    </html>
  )
}
