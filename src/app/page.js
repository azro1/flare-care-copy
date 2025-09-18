import Link from 'next/link'

export default function Home() {
  return (
    <div className="max-w-6xl mx-auto pt-8">
      <div className="text-center mb-16 animate-fade-in-up">
        <div className="mb-6">
          <div className="relative w-24 h-24 bg-gradient-to-br from-primary-500 to-primary-600 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl animate-float">
            <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent rounded-3xl"></div>
            <div className="absolute -inset-1 bg-gradient-to-br from-primary-400 to-secondary-500 rounded-3xl blur opacity-30 animate-pulse-slow"></div>
            <svg className="w-12 h-12 text-white relative z-10" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
        </div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-shadow-lg">
          <span className="gradient-text">
          Welcome to FlareCare
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-neutral-600 mb-8 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          Your personal companion for managing Crohn's & Colitis symptoms
        </p>
        <p className="text-lg text-neutral-500 max-w-3xl mx-auto mb-12 leading-relaxed animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          Track your symptoms, manage medications, and generate detailed reports to help you and your healthcare team make informed decisions.
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8 mb-16 stagger-animation">
        <Link href="/symptoms" className="group">
          <div className="feature-card h-80 p-8 animate-fade-in-up" style={{ '--stagger': 0 }}>
            <div className="text-center h-full flex flex-col justify-center">
              <div className="feature-icon bg-gradient-to-br from-primary-100 to-primary-200 mx-auto mb-6">
                <svg className="w-8 h-8 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4 group-hover:gradient-text transition-all duration-300">Symptoms</h3>
              <p className="text-neutral-600 leading-relaxed">Track your daily symptoms, severity, and triggers to identify patterns and improve your health journey.</p>
            </div>
          </div>
        </Link>

        <Link href="/medications" className="group">
          <div className="feature-card h-80 p-8 animate-fade-in-up" style={{ '--stagger': 1 }}>
            <div className="text-center h-full flex flex-col justify-center">
              <div className="feature-icon bg-gradient-to-br from-secondary-100 to-secondary-200 mx-auto mb-6">
                <svg className="w-8 h-8 text-secondary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                    </svg>
                  </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4 group-hover:gradient-text transition-all duration-300">Medications</h3>
              <p className="text-neutral-600 leading-relaxed">Manage your medication schedule, set reminders, and track adherence with ease.</p>
            </div>
          </div>
        </Link>

        <Link href="/reports" className="group">
          <div className="feature-card h-80 p-8 animate-fade-in-up" style={{ '--stagger': 2 }}>
            <div className="text-center h-full flex flex-col justify-center">
              <div className="feature-icon bg-gradient-to-br from-accent-100 to-accent-200 mx-auto mb-6">
                <svg className="w-8 h-8 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-bold text-neutral-900 mb-4 group-hover:gradient-text transition-all duration-300">Reports</h3>
              <p className="text-neutral-600 leading-relaxed">Generate detailed reports and export data to share with your healthcare team.</p>
            </div>
          </div>
        </Link>
      </div>

      <div className="relative overflow-hidden bg-gradient-to-br from-primary-50/80 to-secondary-50/80 backdrop-blur-sm border border-white/30 rounded-3xl p-8 md:p-12 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/10"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-br from-accent-400/20 to-primary-400/20 rounded-full blur-2xl"></div>
        <div className="relative z-10 text-center">
          <div className="flex items-center justify-center mb-4">
            <span className="text-3xl animate-bounce-gentle mr-2">🚀</span>
            <h2 className="text-2xl md:text-3xl font-bold gradient-text">Ready to take control?</h2>
          </div>
          <p className="text-lg text-neutral-700 mb-10 max-w-2xl mx-auto leading-relaxed">
              Every journey begins with a single step. Start by logging your first symptom entry - 
              it only takes a minute, but the insights you'll gain are priceless. 
              Your future self will thank you for the data you collect today.
            </p>
          <Link href="/symptoms" className="btn-primary text-lg px-8 py-4 inline-flex items-center space-x-2 group">
            <span>Start Your Journey</span>
            <svg className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7l5 5m0 0l-5 5m5-5H6" />
            </svg>
          </Link>
        </div>
      </div>
      
      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-gradient-to-br from-primary-400/10 to-secondary-400/10 rounded-full blur-3xl animate-float"></div>
        <div className="absolute top-3/4 right-1/4 w-48 h-48 bg-gradient-to-br from-accent-400/10 to-primary-400/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }}></div>
        <div className="absolute top-1/2 right-1/3 w-32 h-32 bg-gradient-to-br from-secondary-400/10 to-accent-400/10 rounded-full blur-xl animate-float" style={{ animationDelay: '4s' }}></div>
      </div>
    </div>
  )
}
