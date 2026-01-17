import { ROnboardingWrapper, ROnboardingStep, useROnboarding } from "r-onboarding";
import "r-onboarding/dist/style.css";
import { StepEntity } from "r-onboarding/src/types/StepEntity";
import { useRef } from "react";

const themes = ["step-theme-default", "step-theme-accent", "step-theme-warm", "step-theme-cool", "step-theme-purple"];

function App() {
  const wrapperRef = useRef(null);
  const { start, finish } = useROnboarding(wrapperRef);

  const setTheme = (theme: string) => {
    themes.forEach((t) => document.body.classList.remove(t));
    document.body.classList.add(theme);
  };

  const clearTheme = () => {
    themes.forEach((t) => document.body.classList.remove(t));
  };

  const steps: StepEntity[] = [
    {
      attachTo: { element: "#hero-title" },
      content: {
        title: "Welcome to r-onboarding",
        description: "This demo showcases the library's features. Notice the light overlay on this dark theme.",
      },
      options: {
        popper: { placement: "bottom" },
      },
      on: {
        beforeStep: () => setTheme("step-theme-default"),
      },
    },
    {
      attachTo: { element: "#features-grid" },
      content: {
        title: "Powerful Features",
        description: "The tooltip stays visible even when highlighting large elements! Try resizing your browser.",
      },
      options: {
        popper: { placement: "bottom" },
        scrollToStep: {
          enabled: true,
          options: { behavior: "smooth", block: "start" },
        },
      },
      on: {
        beforeStep: () => setTheme("step-theme-accent"),
      },
    },
    {
      attachTo: { element: "#feature-popper" },
      content: {
        title: "Smart Positioning",
        description: "Powered by Popper.js for pixel-perfect tooltip placement.",
      },
      options: {
        popper: { placement: "bottom" },
      },
      on: {
        beforeStep: () => setTheme("step-theme-warm"),
      },
    },
    {
      attachTo: { element: "#feature-hooks" },
      content: {
        title: "Lifecycle Hooks",
        description: "Run async operations between steps. Perfect for loading data or tracking analytics.",
      },
      options: {
        popper: { placement: "bottom" },
      },
      on: {
        beforeStep: () => setTheme("step-theme-purple"),
      },
    },
    {
      attachTo: { element: "#code-block" },
      content: {
        title: "Simple Setup",
        description: "Just a few lines of code to get started. Define steps, wrap your content, and go!",
      },
      options: {
        scrollToStep: {
          enabled: true,
          options: { behavior: "smooth", block: "center" },
        },
      },
      on: {
        beforeStep: () => setTheme("step-theme-accent"),
      },
    },
    {
      attachTo: { element: "#custom-slot-example" },
      content: {
        title: "Custom Slot UI",
        description:
          "This step uses a completely custom design! Wrap your content with ROnboardingStep to keep positioning.",
      },
      options: {
        scrollToStep: {
          enabled: true,
          options: { behavior: "smooth", block: "center" },
        },
      },
      on: {
        beforeStep: () => setTheme("step-theme-cool"),
      },
    },
    {
      attachTo: { element: "#cta-heading" },
      content: {
        title: "Get Started Today",
        description: "Check out the documentation to learn more. Happy onboarding!",
      },
      options: {
        scrollToStep: {
          enabled: true,
          options: { behavior: "smooth", block: "center" },
        },
      },
      on: {
        beforeStep: () => setTheme("step-theme-default"),
      },
    },
  ];

  const handleFinish = () => {
    clearTheme();
  };

  const handleExit = () => {
    clearTheme();
    finish();
  };

  return (
    <div className="min-h-screen">
      <ROnboardingWrapper ref={wrapperRef} steps={steps} onFinish={handleFinish} onExit={handleExit}>
        {({ step, next, previous, exit, isFirst, isLast, index }) => {
          if (!step) return null;

          // Custom UI for step 6 (index 5)
          if (index === 5) {
            return (
              <ROnboardingStep>
                <div className="custom-step-card flex gap-0 max-w-[420px] overflow-hidden shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)]">
                  {/* Left accent bar with step number */}
                  <div className="w-16 bg-gradient-to-b from-purple-500 via-pink-500 to-orange-400 flex flex-col items-center py-6">
                    <span className="text-white/60 text-[10px] uppercase tracking-widest font-bold">Step</span>
                    <span className="text-white text-3xl font-display font-bold">6</span>
                    <span className="text-white/60 text-[10px] mt-1">of 7</span>
                    <div className="mt-auto flex flex-col gap-1.5">
                      <span className="w-2 h-2 rounded-full bg-white/30"></span>
                      <span className="w-2 h-2 rounded-full bg-white/30"></span>
                      <span className="w-2 h-2 rounded-full bg-white/30"></span>
                      <span className="w-2 h-2 rounded-full bg-white/30"></span>
                      <span className="w-2 h-2 rounded-full bg-white/30"></span>
                      <span className="w-2 h-2 rounded-full bg-white"></span>
                      <span className="w-2 h-2 rounded-full bg-white/30"></span>
                    </div>
                  </div>
                  {/* Content area */}
                  <div className="flex-1 bg-white p-6 relative">
                    <button
                      onClick={exit}
                      className="absolute top-3 right-3 w-6 h-6 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                      aria-label="Close"
                    >
                      <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="3">
                        <path d="M18 6L6 18M6 6l12 12" />
                      </svg>
                    </button>
                    <div className="inline-flex items-center gap-1.5 bg-purple-100 text-purple-700 text-[11px] font-semibold px-2 py-1 rounded-full mb-3">
                      <svg width="12" height="12" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                      Custom Slot
                    </div>
                    <h3 className="text-gray-900 text-xl font-semibold mb-2">{step.content?.title}</h3>
                    <p className="text-gray-500 text-sm leading-relaxed mb-4">{step.content?.description}</p>
                    <p className="text-purple-600 text-xs bg-purple-50 p-2 rounded-lg mb-5 border-l-2 border-purple-400">
                      This tooltip demonstrates a completely custom design using React render props!
                    </p>
                    {/* Horizontal button layout at bottom */}
                    <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                      <button
                        onClick={previous}
                        className="text-gray-400 hover:text-gray-600 text-sm font-medium flex items-center gap-1 transition-colors"
                      >
                        <svg
                          width="16"
                          height="16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M15 19l-7-7 7-7" />
                        </svg>
                        Back
                      </button>
                      <button
                        onClick={next}
                        className="bg-gradient-to-r from-purple-500 to-pink-500 text-white text-sm font-semibold px-5 py-2 rounded-full hover:shadow-lg hover:shadow-purple-500/25 transition-all flex items-center gap-1"
                      >
                        Continue
                        <svg
                          width="16"
                          height="16"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2"
                          viewBox="0 0 24 24"
                        >
                          <path d="M9 5l7 7-7 7" />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
              </ROnboardingStep>
            );
          }

          return <ROnboardingStep />; // Use default UI for other steps
        }}
      </ROnboardingWrapper>

      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-[var(--color-border)] bg-[var(--color-bg)]/90 backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <span className="font-display text-xl">r-onboarding</span>
          <nav className="flex items-center gap-6">
            <a
              href="https://r-onboarding-docs.fatihsolhan.com"
              className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors text-sm font-medium"
            >
              Documentation
            </a>
            <a
              href="https://github.com/fatihsolhan/r-onboarding"
              target="_blank"
              className="text-[var(--color-text-muted)] hover:text-[var(--color-text)] transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.17 6.839 9.49.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.604-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.464-1.11-1.464-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.831.092-.646.35-1.086.636-1.336-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.167 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
              </svg>
            </a>
          </nav>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-32 pb-24 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="animate-fade-up">
            <span className="pill mb-6 inline-block">React Component</span>
          </div>

          <h1
            id="hero-title"
            className="font-display text-5xl sm:text-6xl lg:text-7xl font-medium leading-[1.1] mb-6 animate-fade-up delay-1"
          >
            Guide your users
            <br />
            <span className="text-accent italic">through anything</span>
          </h1>

          <p className="text-[var(--color-text-muted)] text-lg sm:text-xl max-w-2xl mb-10 animate-fade-up delay-2">
            A lightweight, fully-typed onboarding component for React. Create product tours, feature highlights, and
            step-by-step guides with ease.
          </p>

          <div className="flex flex-wrap gap-4 animate-fade-up delay-3">
            <button className="btn-primary" onClick={() => start()}>
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z"
                />
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              Start Demo Tour
            </button>
            <a href="https://r-onboarding-docs.fatihsolhan.com/guide/getting-started.html" className="btn-secondary">
              Get Started
            </a>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider max-w-6xl mx-auto"></div>

      {/* Features Grid */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="mb-16">
            <span className="pill mb-4 inline-block animate-fade-up">Features</span>
            <h2 id="features-heading" className="font-display text-3xl sm:text-4xl font-medium animate-fade-up delay-1">
              Everything you need for
              <br />
              <span className="text-accent">seamless onboarding</span>
            </h2>
          </div>

          <div id="features-grid" className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div className="feature-card animate-fade-up delay-2">
              <div className="w-10 h-10 flex items-center justify-center border border-[var(--color-border)] mb-4">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"
                  />
                </svg>
              </div>
              <h3 className="font-display text-lg mb-2">SVG Overlay</h3>
              <p className="text-[var(--color-text-muted)] text-sm">
                Precise element highlighting with customizable padding, border radius, and overlay opacity.
              </p>
            </div>

            <div id="feature-popper" className="feature-card animate-fade-up delay-3">
              <div className="w-10 h-10 flex items-center justify-center border border-[var(--color-border)] mb-4">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                  />
                </svg>
              </div>
              <h3 className="font-display text-lg mb-2">Smart Positioning</h3>
              <p className="text-[var(--color-text-muted)] text-sm">
                Powered by Popper.js for automatic tooltip positioning that adapts to viewport boundaries.
              </p>
            </div>

            <div className="feature-card animate-fade-up delay-4">
              <div className="w-10 h-10 flex items-center justify-center border border-[var(--color-border)] mb-4">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"
                  />
                </svg>
              </div>
              <h3 className="font-display text-lg mb-2">Custom UI Slots</h3>
              <p className="text-[var(--color-text-muted)] text-sm">
                Full control over step appearance with render props. Build any design you want.
              </p>
            </div>

            <div id="feature-hooks" className="feature-card animate-fade-up delay-5">
              <div className="w-10 h-10 flex items-center justify-center border border-[var(--color-border)] mb-4">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-display text-lg mb-2">Lifecycle Hooks</h3>
              <p className="text-[var(--color-text-muted)] text-sm">
                beforeStep and afterStep hooks for async operations, analytics, and state management.
              </p>
            </div>

            <div className="feature-card animate-fade-up delay-6">
              <div className="w-10 h-10 flex items-center justify-center border border-[var(--color-border)] mb-4">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                  />
                </svg>
              </div>
              <h3 className="font-display text-lg mb-2">Focus Trap</h3>
              <p className="text-[var(--color-text-muted)] text-sm">
                Optional focus management to keep keyboard navigation within the tour interface.
              </p>
            </div>

            <div className="feature-card animate-fade-up delay-6">
              <div className="w-10 h-10 flex items-center justify-center border border-[var(--color-border)] mb-4">
                <svg className="w-5 h-5 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                  />
                </svg>
              </div>
              <h3 className="font-display text-lg mb-2">TypeScript Ready</h3>
              <p className="text-[var(--color-text-muted)] text-sm">
                Fully typed with comprehensive TypeScript definitions for excellent DX.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider max-w-6xl mx-auto"></div>

      {/* Code Example */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="pill mb-4 inline-block">Quick Start</span>
              <h2 id="code-heading" className="font-display text-3xl sm:text-4xl font-medium mb-6">
                Up and running in
                <br />
                <span className="text-accent">under a minute</span>
              </h2>
              <p className="text-[var(--color-text-muted)] mb-8">
                Define your steps, wrap your content, and you're done. No complex configuration required.
              </p>

              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 flex items-center justify-center border border-[var(--color-accent)] text-accent font-mono text-sm flex-shrink-0">
                    1
                  </span>
                  <div>
                    <p className="font-medium mb-1">Install the package</p>
                    <code className="text-[var(--color-text-muted)] text-sm font-mono">yarn add r-onboarding</code>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 flex items-center justify-center border border-[var(--color-accent)] text-accent font-mono text-sm flex-shrink-0">
                    2
                  </span>
                  <div>
                    <p className="font-medium mb-1">Import and configure</p>
                    <code className="text-[var(--color-text-muted)] text-sm font-mono">
                      Define steps with selectors
                    </code>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <span className="w-8 h-8 flex items-center justify-center border border-[var(--color-accent)] text-accent font-mono text-sm flex-shrink-0">
                    3
                  </span>
                  <div>
                    <p className="font-medium mb-1">Start the tour</p>
                    <code className="text-[var(--color-text-muted)] text-sm font-mono">start()</code>
                  </div>
                </div>
              </div>
            </div>

            <div id="code-block" className="code-block p-6">
              <pre
                dangerouslySetInnerHTML={{
                  __html: `<span class="comment">// Define your tour steps</span>
<span class="keyword">const</span> steps = [
  {
    <span class="property">attachTo</span>: { <span class="property">element</span>: <span class="string">'#welcome'</span> },
    <span class="property">content</span>: {
      <span class="property">title</span>: <span class="string">'Welcome!'</span>,
      <span class="property">description</span>: <span class="string">'Let us show you around.'</span>
    }
  },
  {
    <span class="property">attachTo</span>: { <span class="property">element</span>: <span class="string">'#features'</span> },
    <span class="property">content</span>: {
      <span class="property">title</span>: <span class="string">'Features'</span>,
      <span class="property">description</span>: <span class="string">'Here are the key features.'</span>
    },
    <span class="property">on</span>: {
      <span class="function">beforeStep</span>: <span class="keyword">async</span> () =&gt; {
        <span class="comment">// Run async operations</span>
        <span class="keyword">await</span> <span class="function">loadData</span>()
      }
    }
  }
]`,
                }}
              />
            </div>
          </div>

          {/* Custom Slot Example */}
          <div id="custom-slot-example" className="mt-16 grid lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="pill mb-4 inline-block">Advanced</span>
              <h3 className="font-display text-2xl sm:text-3xl font-medium mb-4">
                Custom UI with
                <br />
                <span className="text-accent">Render Props</span>
              </h3>
              <p className="text-[var(--color-text-muted)]">
                Use render props for complete control over step appearance. Wrap with ROnboardingStep to keep
                positioning and overlay.
              </p>
            </div>

            <div className="code-block p-6">
              <pre
                dangerouslySetInnerHTML={{
                  __html: `<span class="comment">{/* Custom step UI via render props */}</span>
&lt;<span class="keyword">ROnboardingWrapper</span> <span class="property">steps</span>=<span class="string">{steps}</span>&gt;
  {({ step, next, index }) =&gt; (
    &lt;<span class="keyword">ROnboardingStep</span>&gt;
      <span class="comment">{/* Your custom design */}</span>
      &lt;<span class="keyword">MyCustomTooltip</span>
        <span class="property">title</span>=<span class="string">{step.content.title}</span>
        <span class="property">onNext</span>=<span class="string">{next}</span>
      /&gt;
    &lt;/<span class="keyword">ROnboardingStep</span>&gt;
  )}
&lt;/<span class="keyword">ROnboardingWrapper</span>&gt;`,
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="section-divider max-w-6xl mx-auto"></div>

      {/* CTA */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 id="cta-heading" className="font-display text-3xl sm:text-4xl font-medium mb-6">
            Ready to improve your
            <br />
            <span className="text-accent italic">user experience?</span>
          </h2>
          <p className="text-[var(--color-text-muted)] mb-10 max-w-xl mx-auto">
            Join hundreds of developers using r-onboarding to create delightful product tours and onboarding
            experiences.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <a href="https://r-onboarding-docs.fatihsolhan.com/guide/getting-started.html" className="btn-primary">
              Read the Docs
            </a>
            <a href="https://github.com/fatihsolhan/r-onboarding" target="_blank" className="btn-secondary">
              View on GitHub
            </a>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-[var(--color-border)] py-8 px-6">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[var(--color-text-muted)] text-sm">
            Built by{" "}
            <a
              href="https://github.com/fatihsolhan"
              target="_blank"
              className="text-[var(--color-text)] hover:text-accent transition-colors"
            >
              Fatih Solhan
            </a>
          </p>
          <p className="text-[var(--color-text-muted)] text-sm font-mono">MIT License</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
