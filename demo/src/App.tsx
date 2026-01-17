import { ROnboardingWrapper, ROnboardingStep, useROnboarding } from 'r-onboarding';
import 'r-onboarding/dist/style.css';
import { StepEntity } from 'r-onboarding/src/types/StepEntity';
import { useRef, useState } from 'react';

const themes = [
  'step-theme-default',
  'step-theme-accent',
  'step-theme-warm',
  'step-theme-cool',
  'step-theme-purple'
];

function App() {
  const wrapperRef = useRef(null)
  const { start, finish } = useROnboarding(wrapperRef)

  const setTheme = (theme: string) => {
    themes.forEach(t => document.body.classList.remove(t))
    document.body.classList.add(theme)
  }

  const clearTheme = () => {
    themes.forEach(t => document.body.classList.remove(t))
  }

  const steps: StepEntity[] = [
    {
      attachTo: { element: '#hero-title' },
      content: {
        title: 'Welcome to r-onboarding!',
        description: 'This tour will show you the key features of r-onboarding. Let\'s get started!'
      },
      options: {
        popper: { placement: 'bottom' }
      },
      on: {
        beforeStep: () => setTheme('step-theme-default')
      }
    },
    {
      attachTo: { element: '#features-grid' },
      content: {
        title: 'Feature Overview',
        description: 'r-onboarding comes packed with powerful features. Explore them below!'
      },
      options: {
        popper: { placement: 'top' },
        scrollToStep: { enabled: true, options: { behavior: 'smooth', block: 'center' } }
      },
      on: {
        beforeStep: () => setTheme('step-theme-accent')
      }
    },
    {
      attachTo: { element: '#feature-popper' },
      content: {
        title: 'Smart Positioning',
        description: 'Powered by Popper.js, tooltips automatically adjust to stay within the viewport.'
      },
      options: {
        popper: { placement: 'bottom' }
      },
      on: {
        beforeStep: () => setTheme('step-theme-warm')
      }
    },
    {
      attachTo: { element: '#feature-hooks' },
      content: {
        title: 'Lifecycle Hooks',
        description: 'Run async operations before or after each step with beforeStep and afterStep hooks.'
      },
      options: {
        popper: { placement: 'bottom' }
      },
      on: {
        beforeStep: () => setTheme('step-theme-cool')
      }
    },
    {
      attachTo: { element: '#code-block' },
      content: {
        title: 'Easy to Use',
        description: 'Get started with just a few lines of code. Full TypeScript support included!'
      },
      options: {
        popper: { placement: 'top' },
        scrollToStep: { enabled: true, options: { behavior: 'smooth', block: 'center' } }
      },
      on: {
        beforeStep: () => setTheme('step-theme-purple')
      }
    },
    {
      attachTo: { element: '#custom-slot-example' },
      content: {
        title: 'Custom UI Support',
        description: 'Build any design you want with render props. Complete control over step appearance.'
      },
      options: {
        popper: { placement: 'top' }
      },
      on: {
        beforeStep: () => setTheme('step-theme-accent')
      }
    },
    {
      attachTo: { element: '#cta-heading' },
      content: {
        title: 'Ready to Start?',
        description: 'Check out the documentation to learn more and start building amazing onboarding experiences!'
      },
      options: {
        popper: { placement: 'top' },
        scrollToStep: { enabled: true, options: { behavior: 'smooth', block: 'center' } }
      },
      on: {
        beforeStep: () => setTheme('step-theme-default')
      }
    }
  ]

  const handleFinish = () => {
    clearTheme()
  }

  const handleExit = () => {
    clearTheme()
    finish()
  }

  const [showCustomStep, setShowCustomStep] = useState(false)

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      <ROnboardingWrapper
        ref={wrapperRef}
        steps={steps}
        onFinish={handleFinish}
        onExit={handleExit}
      >
        {({ step, next, previous, exit, isFirst, isLast, index }) => {
          if (!step) return null

          // Custom UI for step 6 (index 5)
          if (index === 5) {
            return (
              <ROnboardingStep>
                <div className="bg-white rounded-xl shadow-2xl overflow-hidden max-w-md">
                  <div className="flex">
                    <div className="w-16 bg-gradient-to-b from-indigo-500 to-purple-600 flex flex-col items-center py-4">
                      <span className="text-white text-xs font-bold">{index + 1} of {steps.length}</span>
                      <div className="mt-4 space-y-1">
                        {steps.map((_, i) => (
                          <div
                            key={i}
                            className={`w-2 h-2 rounded-full ${i <= index ? 'bg-white' : 'bg-white/30'}`}
                          />
                        ))}
                      </div>
                    </div>
                    <div className="flex-1 p-6">
                      <div className="flex justify-between items-start mb-4">
                        <span className="inline-block px-2 py-1 text-xs font-semibold bg-purple-100 text-purple-700 rounded-full">
                          Custom Slot
                        </span>
                        <button onClick={exit} className="text-gray-400 hover:text-gray-600">
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </button>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">{step.content?.title}</h3>
                      <p className="text-gray-600 text-sm mb-6">{step.content?.description}</p>
                      <div className="flex space-x-3">
                        <button
                          onClick={previous}
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                        >
                          Back
                        </button>
                        <button
                          onClick={next}
                          className="flex-1 px-4 py-2 bg-gradient-to-r from-indigo-500 to-purple-600 text-white rounded-lg hover:opacity-90"
                        >
                          {isLast ? 'Finish' : 'Continue'}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </ROnboardingStep>
            )
          }

          return null // Use default UI for other steps
        }}
      </ROnboardingWrapper>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-[#0a0a0a]/80 backdrop-blur-sm border-b border-white/10">
        <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
          <span className="text-xl font-bold">r-onboarding</span>
          <div className="flex items-center space-x-6">
            <a href="https://r-onboarding-docs.fatihsolhan.com" className="text-gray-400 hover:text-white transition">
              Documentation
            </a>
            <a href="https://github.com/fatihsolhan/r-onboarding" className="text-gray-400 hover:text-white transition">
              GitHub
            </a>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 id="hero-title" className="text-5xl sm:text-6xl lg:text-7xl font-extrabold mb-6 bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600 text-transparent bg-clip-text">
            Guide your users through anything
          </h1>
          <p className="text-xl text-gray-400 mb-10 max-w-2xl mx-auto">
            A lightweight, fully-typed onboarding component for React with SVG overlays, smart positioning, and complete customization.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => start()}
              className="px-8 py-3 bg-gradient-to-r from-cyan-500 to-blue-600 text-white font-semibold rounded-lg hover:opacity-90 transition"
            >
              Start Demo Tour
            </button>
            <a
              href="https://r-onboarding-docs.fatihsolhan.com/guide/getting-started"
              className="px-8 py-3 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/5 transition"
            >
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4">
        <div id="features-grid" className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon="🎯"
            title="SVG Overlay"
            description="Precise element highlighting with customizable padding, border radius, and overlay opacity."
          />
          <FeatureCard
            id="feature-popper"
            icon="💬"
            title="Smart Positioning"
            description="Powered by Popper.js for automatic tooltip positioning that adapts to viewport boundaries."
          />
          <FeatureCard
            icon="🎨"
            title="Fully Customizable"
            description="Complete control over step appearance with render props. Build any design you want."
          />
          <FeatureCard
            id="feature-hooks"
            icon="⚡"
            title="Lifecycle Hooks"
            description="beforeStep and afterStep hooks for async operations, analytics, and state management."
          />
          <FeatureCard
            icon="🔒"
            title="Focus Management"
            description="Optional disableInteraction to keep users focused on the tour interface."
          />
          <FeatureCard
            icon="📦"
            title="TypeScript Ready"
            description="Fully typed with comprehensive TypeScript definitions for excellent developer experience."
          />
        </div>
      </section>

      {/* Code Example */}
      <section className="py-20 px-4 bg-white/5">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">Quick Start</h2>
          <div id="code-block" className="bg-[#1a1a1a] rounded-xl p-6 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
{`import { ROnboardingWrapper, useROnboarding } from 'r-onboarding'
import 'r-onboarding/dist/style.css'

const steps = [
  {
    attachTo: { element: '#welcome' },
    content: {
      title: 'Welcome!',
      description: 'Let us show you around.'
    }
  }
]

function App() {
  const wrapperRef = useRef(null)
  const { start } = useROnboarding(wrapperRef)

  return (
    <>
      <ROnboardingWrapper ref={wrapperRef} steps={steps} />
      <button onClick={start}>Start Tour</button>
    </>
  )
}`}
            </pre>
          </div>
        </div>
      </section>

      {/* Custom Slot Example */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-4">Custom Step UI</h2>
          <p className="text-gray-400 text-center mb-12">
            Use render props for complete control over step appearance
          </p>
          <div id="custom-slot-example" className="bg-[#1a1a1a] rounded-xl p-6 font-mono text-sm overflow-x-auto">
            <pre className="text-gray-300">
{`<ROnboardingWrapper ref={wrapperRef} steps={steps}>
  {({ step, next, previous, exit, isFirst, isLast, index }) => {
    if (!step) return null

    return (
      <ROnboardingStep>
        <div className="custom-tooltip">
          <h3>{step.content?.title}</h3>
          <p>{step.content?.description}</p>
          <div className="actions">
            {!isFirst && <button onClick={previous}>Back</button>}
            <button onClick={next}>
              {isLast ? 'Finish' : 'Next'}
            </button>
          </div>
        </div>
      </ROnboardingStep>
    )
  }}
</ROnboardingWrapper>`}
            </pre>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-cyan-500/10 via-blue-500/10 to-purple-600/10">
        <div className="max-w-4xl mx-auto text-center">
          <h2 id="cta-heading" className="text-4xl font-bold mb-6">Ready to get started?</h2>
          <p className="text-gray-400 mb-10 max-w-2xl mx-auto">
            Install r-onboarding and start creating amazing onboarding experiences for your users.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="https://r-onboarding-docs.fatihsolhan.com/guide/getting-started"
              className="px-8 py-3 bg-white text-black font-semibold rounded-lg hover:bg-gray-100 transition"
            >
              Read the Docs
            </a>
            <a
              href="https://github.com/fatihsolhan/r-onboarding"
              className="px-8 py-3 border border-white/20 text-white font-semibold rounded-lg hover:bg-white/5 transition"
            >
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 px-4 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center text-gray-500 text-sm">
          <p>Released under the MIT License.</p>
          <p className="mt-1">Copyright © 2022-present Fatih Solhan</p>
        </div>
      </footer>
    </div>
  )
}

function FeatureCard({ id, icon, title, description }: { id?: string; icon: string; title: string; description: string }) {
  return (
    <div id={id} className="bg-white/5 rounded-xl p-6 border border-white/10 hover:border-white/20 transition">
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400">{description}</p>
    </div>
  )
}

export default App
