import { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { AccessibilityToggle } from '@/components/ui/AccessibilityToggle';
import { FadeIn } from '@/components/animations/FadeIn';
import { SlideIn } from '@/components/animations/SlideIn';
import { ScaleIn } from '@/components/animations/ScaleIn';
import { PageTransition } from '@/components/animations/PageTransition';
import { PerformanceMonitor } from '@/components/PerformanceMonitor/PerformanceMonitor';
import usePerformanceMonitoring from '@/components/PerformanceMonitor/usePerformanceMonitoring';
import { useReducedMotion } from '@/hooks/useReducedMotion';
import { withErrorHandling } from '@/utils/withErrorHandling';
import HungaryMap from '@/components/map/HungaryMap';
import '@/styles/globals.css';

const App = () => {
  const { t } = useTranslation();
  const [activeKeys, setActiveKeys] = useState<Record<string, number>>({});
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [clickCount, setClickCount] = useState(0);
  const [shouldThrowError, setShouldThrowError] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  const performanceMonitoring = usePerformanceMonitoring();
  const { recordTouchResponse } = performanceMonitoring;

  const replayAnimation = withErrorHandling((id: string, startTime: number) => {
    setActiveKeys(prev => ({ ...prev, [id]: (prev[id] || 0) + 1 }));

    // Track touch response time
    if (showEasterEgg) {
      setTimeout(() => {
        recordTouchResponse(startTime, `animation-${id}`);
      }, 0);
    }
  });

  const handleTestError = withErrorHandling(() => setShouldThrowError(true));

  if (shouldThrowError) throw new Error('Test error triggered from easter egg');

  // Reset error flag after it's thrown so retry works
  useEffect(() => {
    if (shouldThrowError) {
      const timer = setTimeout(() => setShouldThrowError(false), 0);
      return () => clearTimeout(timer);
    }
  }, [shouldThrowError]);

  const handleTitleClick = withErrorHandling(() => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount >= 5) {
      setShowEasterEgg(prev => !prev);
      setClickCount(0);
    }

    setTimeout(() => setClickCount(0), 2000);
  });

  return (
    <div className="app">
      <header className="app-header">
        <h1 onClick={handleTitleClick} style={{ cursor: 'pointer', userSelect: 'none' }}>
          {t('common.appTitle')}
        </h1>
        <p>{showEasterEgg ? 'Animation Showcase - Framer Motion Integration' : 'Fotóműtermek - Néprajzi Múzeum'}</p>
        <div style={{ display: 'flex', gap: '1rem', marginTop: '1rem' }}>
          <ThemeToggle />
          <LanguageToggle />
          <AccessibilityToggle />
        </div>
      </header>

      <main style={{ padding: '2rem', maxWidth: '1200px', margin: '0 auto' }}>
        {showEasterEgg && (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Performance Monitor */}
            <PerformanceMonitor visible={showEasterEgg} monitoring={performanceMonitoring} />

            {/* Debug Tools */}
            <section
              style={{
                padding: '2rem',
                background: 'var(--surface-color)',
                border: '2px solid var(--error)',
                borderRadius: '8px',
              }}
            >
              <h3>🔧 Debug Tools</h3>
              <button
                onClick={handleTestError}
                style={{
                  padding: '1rem 2rem',
                  background: 'var(--error)',
                  color: 'white',
                  border: 'none',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  fontSize: '1rem',
                  fontWeight: '600',
                  marginTop: '1rem',
                }}
                type="button"
              >
                Trigger Test Error
              </button>
            </section>

            {!shouldReduceMotion && (
              <>
                {/* FadeIn Examples */}
                <section>
                  <h2 style={{ marginBottom: '1rem' }}>FadeIn Animations (Click to Replay)</h2>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <div onClick={() => replayAnimation('fade-fast', performance.now())}>
                      <FadeIn key={activeKeys['fade-fast'] || 0} speed="fast">
                        <div
                          style={{
                            padding: '2rem',
                            background: 'var(--surface-color)',
                            border: '2px solid var(--brand-primary)',
                            borderRadius: '8px',
                            minWidth: '200px',
                            cursor: 'pointer',
                          }}
                        >
                          Fast (0.15s)
                        </div>
                      </FadeIn>
                    </div>
                    <div onClick={() => replayAnimation('fade-base', performance.now())}>
                      <FadeIn key={activeKeys['fade-base'] || 0} speed="base">
                        <div
                          style={{
                            padding: '2rem',
                            background: 'var(--surface-color)',
                            border: '2px solid var(--brand-primary)',
                            borderRadius: '8px',
                            minWidth: '200px',
                            cursor: 'pointer',
                          }}
                        >
                          Base (0.2s)
                        </div>
                      </FadeIn>
                    </div>
                    <div onClick={() => replayAnimation('fade-slow', performance.now())}>
                      <FadeIn key={activeKeys['fade-slow'] || 0} speed="slow">
                        <div
                          style={{
                            padding: '2rem',
                            background: 'var(--surface-color)',
                            border: '2px solid var(--brand-primary)',
                            borderRadius: '8px',
                            minWidth: '200px',
                            cursor: 'pointer',
                          }}
                        >
                          Slow (0.3s)
                        </div>
                      </FadeIn>
                    </div>
                  </div>
                </section>

                {/* SlideIn Examples */}
                <section>
                  <h2 style={{ marginBottom: '1rem' }}>SlideIn Animations (Click to Replay)</h2>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <div onClick={() => replayAnimation('slide-left', performance.now())}>
                      <SlideIn key={activeKeys['slide-left'] || 0} direction="left">
                        <div
                          style={{
                            padding: '2rem',
                            background: 'var(--surface-color)',
                            border: '2px solid var(--brand-accent)',
                            borderRadius: '8px',
                            minWidth: '200px',
                            cursor: 'pointer',
                          }}
                        >
                          From Left →
                        </div>
                      </SlideIn>
                    </div>
                    <div onClick={() => replayAnimation('slide-right', performance.now())}>
                      <SlideIn key={activeKeys['slide-right'] || 0} direction="right">
                        <div
                          style={{
                            padding: '2rem',
                            background: 'var(--surface-color)',
                            border: '2px solid var(--brand-accent)',
                            borderRadius: '8px',
                            minWidth: '200px',
                            cursor: 'pointer',
                          }}
                        >
                          ← From Right
                        </div>
                      </SlideIn>
                    </div>
                    <div onClick={() => replayAnimation('slide-up', performance.now())}>
                      <SlideIn key={activeKeys['slide-up'] || 0} direction="up">
                        <div
                          style={{
                            padding: '2rem',
                            background: 'var(--surface-color)',
                            border: '2px solid var(--brand-accent)',
                            borderRadius: '8px',
                            minWidth: '200px',
                            cursor: 'pointer',
                          }}
                        >
                          From Up ↓
                        </div>
                      </SlideIn>
                    </div>
                    <div onClick={() => replayAnimation('slide-down', performance.now())}>
                      <SlideIn key={activeKeys['slide-down'] || 0} direction="down">
                        <div
                          style={{
                            padding: '2rem',
                            background: 'var(--surface-color)',
                            border: '2px solid var(--brand-accent)',
                            borderRadius: '8px',
                            minWidth: '200px',
                            cursor: 'pointer',
                          }}
                        >
                          ↑ From Down
                        </div>
                      </SlideIn>
                    </div>
                  </div>
                </section>

                {/* ScaleIn Examples */}
                <section>
                  <h2 style={{ marginBottom: '1rem' }}>ScaleIn Animations (Click to Replay)</h2>
                  <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                    <div onClick={() => replayAnimation('scale-fast', performance.now())}>
                      <ScaleIn key={activeKeys['scale-fast'] || 0} speed="fast">
                        <div
                          style={{
                            padding: '2rem',
                            background: 'var(--surface-color)',
                            border: '2px solid var(--brand-secondary)',
                            borderRadius: '8px',
                            minWidth: '200px',
                            cursor: 'pointer',
                          }}
                        >
                          Fast Scale
                        </div>
                      </ScaleIn>
                    </div>
                    <div onClick={() => replayAnimation('scale-base', performance.now())}>
                      <ScaleIn key={activeKeys['scale-base'] || 0} speed="base">
                        <div
                          style={{
                            padding: '2rem',
                            background: 'var(--surface-color)',
                            border: '2px solid var(--brand-secondary)',
                            borderRadius: '8px',
                            minWidth: '200px',
                            cursor: 'pointer',
                          }}
                        >
                          Base Scale
                        </div>
                      </ScaleIn>
                    </div>
                    <div onClick={() => replayAnimation('scale-slow', performance.now())}>
                      <ScaleIn key={activeKeys['scale-slow'] || 0} speed="slow" initialScale={0.8}>
                        <div
                          style={{
                            padding: '2rem',
                            background: 'var(--surface-color)',
                            border: '2px solid var(--brand-secondary)',
                            borderRadius: '8px',
                            minWidth: '200px',
                            cursor: 'pointer',
                          }}
                        >
                          Slow + 0.8 Scale
                        </div>
                      </ScaleIn>
                    </div>
                  </div>
                </section>

                {/* PageTransition Example */}
                <section>
                  <h2 style={{ marginBottom: '1rem' }}>PageTransition Animation (Click to Replay)</h2>
                  <div onClick={() => replayAnimation('page-transition', performance.now())}>
                    <PageTransition key={activeKeys['page-transition'] || 0} direction="forward">
                      <div
                        style={{
                          padding: '3rem',
                          background: 'var(--surface-color)',
                          border: '2px solid var(--text-primary)',
                          borderRadius: '8px',
                          textAlign: 'center',
                          cursor: 'pointer',
                        }}
                      >
                        <h3>Page Transition (Forward)</h3>
                        <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
                          This animates full-page navigation transitions
                        </p>
                      </div>
                    </PageTransition>
                  </div>
                </section>

                {/* Hungary Map Component */}
                <section>
                  <h2 style={{ marginBottom: '1rem' }}>Hungary Map Component (Issue #66)</h2>
                  <div
                    style={{
                      padding: '2rem',
                      background: 'var(--surface-color)',
                      border: '2px solid var(--brand-primary)',
                      borderRadius: '8px',
                    }}
                  >
                    <HungaryMap studios={[]} screensaverMode={false} />
                    <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                      19 counties + Budapest • 19 county seats • Theme-aware styling • Responsive scaling
                    </p>
                  </div>
                </section>

                {/* Interactive Studio Markers Component */}
                <section>
                  <h2 style={{ marginBottom: '1rem' }}>Interactive Studio Markers (Issue #67)</h2>
                  <div
                    style={{
                      padding: '2rem',
                      background: 'var(--surface-color)',
                      border: '2px solid var(--heritage-gold)',
                      borderRadius: '8px',
                    }}
                  >
                    <HungaryMap
                      studios={[
                        {
                          id: 1,
                          photographer: {
                            name: { hu: 'Máté Lajos', en: 'Lajos Máté' },
                          },
                          studioAddress: {
                            city: { hu: 'Dombóvár', en: 'Dombóvár' },
                            location: {
                              placeName: { hu: 'Dombóvár', en: 'Dombóvár' },
                              coordinates: { latitude: 46.3761, longitude: 18.13 },
                              county: { hu: 'Tolna', en: 'Tolna' },
                            },
                          },
                        },
                      ]}
                      screensaverMode={false}
                    />
                    <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                      64px touch targets • Hover: scale 1.4 + rotate • Active: scale 1.5 + pulse • Gold gradient • Click
                      to test
                    </p>
                  </div>
                </section>

                {/* Screensaver Mode Demo */}
                <section>
                  <h2 style={{ marginBottom: '1rem' }}>Screensaver Animation Mode (Issue #67)</h2>
                  <div
                    style={{
                      padding: '2rem',
                      background: 'var(--surface-color)',
                      border: '2px solid var(--brand-accent)',
                      borderRadius: '8px',
                    }}
                  >
                    <HungaryMap
                      studios={[
                        {
                          id: 1,
                          photographer: { name: { hu: 'Máté Lajos', en: 'Lajos Máté' } },
                          studioAddress: {
                            city: { hu: 'Dombóvár', en: 'Dombóvár' },
                            location: {
                              placeName: { hu: 'Dombóvár', en: 'Dombóvár' },
                              coordinates: { latitude: 46.3761, longitude: 18.13 },
                              county: { hu: 'Tolna', en: 'Tolna' },
                            },
                          },
                        },
                        {
                          id: 2,
                          photographer: { name: { hu: 'Test Studio', en: 'Test Studio' } },
                          studioAddress: {
                            city: { hu: 'Budapest', en: 'Budapest' },
                            location: {
                              placeName: { hu: 'Budapest', en: 'Budapest' },
                              coordinates: { latitude: 47.4979, longitude: 19.0402 },
                              county: { hu: 'Budapest', en: 'Budapest' },
                            },
                          },
                        },
                      ]}
                      screensaverMode={true}
                    />
                    <p style={{ marginTop: '1rem', color: 'var(--text-secondary)', textAlign: 'center' }}>
                      Sequential appearance • 0.3s stagger • Scale 0→1.3→1 over 6s • Continuous pulse animation
                    </p>
                  </div>
                </section>

                {/* Performance Note */}
                <section
                  style={{
                    padding: '2rem',
                    background: 'var(--surface-color)',
                    border: '2px dashed var(--text-secondary)',
                    borderRadius: '8px',
                    marginTop: '2rem',
                  }}
                >
                  <h3>✨ Performance Features</h3>
                  <ul style={{ marginTop: '1rem', lineHeight: '1.8' }}>
                    <li>🎯 GPU-accelerated (transform/opacity only)</li>
                    <li>⚡ 60fps target with hardware acceleration</li>
                    <li>♿ Respects prefers-reduced-motion (try enabling it in your OS)</li>
                    <li>🎨 Theme-aware (works in light/dark modes)</li>
                    <li>🧹 Automatic cleanup (no memory leaks)</li>
                  </ul>
                </section>
              </>
            )}
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
