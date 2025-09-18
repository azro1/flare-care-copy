'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'
import SyncSettings from './SyncSettings'
import { useDataSync } from '@/lib/useDataSync'

export default function Navigation() {
  const pathname = usePathname()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)
  
  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])
  
  // Get sync data for the sync settings - use the current page's data
  const getCurrentDataKey = () => {
    if (pathname === '/medications') return 'flarecare-medications'
    if (pathname === '/symptoms') return 'flarecare-symptoms'
    return 'flarecare-symptoms' // default fallback
  }
  
  const { 
    syncEnabled, 
    setSyncEnabled, 
    isOnline, 
    isSyncing, 
    syncToCloud, 
    fetchFromCloud 
  } = useDataSync(getCurrentDataKey(), [])

  const navItems = [
    { href: '/', label: 'Home' },
        { href: '/symptoms', label: 'Symptoms' },
    { href: '/medications', label: 'Medications' },
    { href: '/reports', label: 'Reports' },
    { href: '/about', label: 'About' },
  ]

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      isScrolled 
        ? 'bg-white/90 backdrop-blur-md shadow-lg border-b border-white/20' 
        : 'bg-white/80 backdrop-blur-sm shadow-sm border-b border-white/10'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <div className="relative w-10 h-10 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
              <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-transparent rounded-xl"></div>
              <svg className="w-6 h-6 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
                <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <span className="text-2xl font-bold gradient-text group-hover:scale-105 transition-transform duration-300">
              FlareCare
            </span>
          </Link>

              {/* Desktop Navigation */}
              <div className="hidden lg:flex items-center space-x-2">
                {navItems.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`nav-link ${
                      pathname === item.href
                        ? 'active'
                        : 'text-neutral-600 hover:text-neutral-900'
                    }`}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>

          {/* Mobile menu button */}
          <button
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="lg:hidden p-2 rounded-xl text-neutral-600 hover:text-neutral-900 hover:bg-white/50 transition-all duration-300"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="lg:hidden py-6 border-t border-white/20 bg-white/95 backdrop-blur-sm animate-fade-in-down">
            <div className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    pathname === item.href
                      ? 'bg-gradient-to-r from-primary-500 to-primary-600 text-white shadow-lg'
                      : 'text-neutral-600 hover:text-neutral-900 hover:bg-white/50'
                  }`}
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
