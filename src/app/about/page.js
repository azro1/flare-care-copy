'use client'

export default function About() {
  return (
    <div className="max-w-6xl mx-auto animate-fade-in-up">
      <div className="text-center mb-16">
        <h1 className="text-5xl md:text-6xl font-bold gradient-text mb-6 text-shadow">
          About FlareCare
        </h1>
        <p className="text-xl md:text-2xl text-neutral-600 animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
          A personal journey turned into a tool for the community
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-10 mb-16">
        <div className="card animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-primary-500 to-primary-600 rounded-xl flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold gradient-text">My Story</h2>
          </div>
          <div className="space-y-4 text-neutral-700 leading-relaxed">
            <p>
              Hi, I'm Simon, and I was diagnosed with Crohn's disease in 2005. Like many others, 
              I quickly learned that managing this condition requires constant attention 
              to symptoms, medications, and lifestyle factors.
            </p>
            <p>
              As an outpatient at the Royal London Hospital in Whitechapel, I've experienced 
              firsthand the challenges of tracking symptoms, remembering medication schedules, 
              and communicating effectively with my healthcare team.
            </p>
            <p>
              Over the years, I've tried various methods to keep track of my health data - 
              from simple notebooks to complex apps that didn't quite fit my needs. 
              That's when I realized there was a gap in the market for a tool designed 
              specifically for Crohn's and Colitis patients.
            </p>
          </div>
        </div>

        <div className="card animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-xl flex items-center justify-center mr-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h2 className="text-2xl font-bold gradient-text">Why FlareCare?</h2>
          </div>
          <div className="space-y-4 text-neutral-700 leading-relaxed">
            <p>
              FlareCare was born from my personal need for a simple, effective way to 
              track my health journey. I wanted something that would:
            </p>
            <ul className="space-y-3 ml-4">
              <li className="flex items-start">
                <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <li>Make symptom logging quick and intuitive</li>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <li>Help identify patterns and triggers</li>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <li>Generate clear reports for medical appointments</li>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <li>Work seamlessly across devices</li>
              </li>
              <li className="flex items-start">
                <div className="w-2 h-2 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full mt-2 mr-3 flex-shrink-0"></div>
              <li>Respect privacy with local-first data storage</li>
              </li>
            </ul>
            <p>
              The app is designed to grow with you - whether you're newly diagnosed 
              or have been managing your condition for years.
            </p>
          </div>
        </div>
      </div>

      <div className="card mb-12 animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
        <div className="flex items-center mb-6">
          <div className="w-12 h-12 bg-gradient-to-br from-accent-500 to-accent-600 rounded-xl flex items-center justify-center mr-4">
            <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold gradient-text">The Vision</h2>
        </div>
        <div className="space-y-4 text-neutral-700 leading-relaxed">
          <p>
            Living with Crohn's or Colitis can feel isolating, but you're not alone. 
            FlareCare is built by someone who understands the daily challenges of 
            managing these conditions.
          </p>
          <p>
            My hope is that this tool will help you take control of your health data, 
            make more informed decisions, and have more productive conversations with 
            your healthcare team. Every feature is designed with real-world use in mind, 
            based on nearly two decades of personal experience.
          </p>
          <p>
            Whether you're tracking your first flare or managing a complex medication 
            regimen, FlareCare is here to support you on your journey to better health.
          </p>
        </div>
      </div>

      <div className="relative overflow-hidden bg-gradient-to-br from-primary-50/80 to-secondary-50/80 backdrop-blur-sm border border-white/30 rounded-3xl p-8 animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
        <div className="absolute inset-0 bg-gradient-to-br from-primary-500/10 to-secondary-500/10"></div>
        <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-400/20 to-secondary-400/20 rounded-full blur-3xl"></div>
        <div className="relative z-10">
          <div className="flex items-center mb-4">
            <span className="text-2xl mr-3">💬</span>
            <h2 className="text-2xl font-bold gradient-text">Get in Touch</h2>
          </div>
          <p className="text-neutral-700 mb-6 leading-relaxed">
          Have questions, suggestions, or want to share your own story? 
          I'd love to hear from you and learn how FlareCare can better serve 
          the Crohn's and Colitis community.
        </p>
          <p className="text-sm text-neutral-600 flex items-center">
            <svg className="w-4 h-4 text-red-500 mr-2" fill="currentColor" viewBox="0 0 24 24">
              <path d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          Built with care by someone who truly understands the journey.
        </p>
        </div>
      </div>
      
      {/* Floating background elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none -z-10">
        <div className="absolute top-1/3 left-1/5 w-48 h-48 bg-gradient-to-br from-primary-400/10 to-secondary-400/10 rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-1/3 right-1/5 w-64 h-64 bg-gradient-to-br from-accent-400/10 to-primary-400/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '3s' }}></div>
      </div>
    </div>
  )
}
