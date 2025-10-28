import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import { LanguageToggle } from '@/components/ui/LanguageToggle';
import { AccessibilityToggle } from '@/components/ui/AccessibilityToggle';
import { FadeIn } from '@/components/animations/FadeIn';
import { SlideIn } from '@/components/animations/SlideIn';
import { ScaleIn } from '@/components/animations/ScaleIn';
import { PageTransition } from '@/components/animations/PageTransition';
import '@/styles/globals.css';

const App = () => {
  const { t } = useTranslation();
  const [activeKeys, setActiveKeys] = useState<Record<string, number>>({});
  const [showEasterEgg, setShowEasterEgg] = useState(false);
  const [clickCount, setClickCount] = useState(0);

  const replayAnimation = (id: string) => {
    setActiveKeys((prev) => ({ ...prev, [id]: (prev[id] || 0) + 1 }));
  };

  const handleTitleClick = () => {
    const newCount = clickCount + 1;
    setClickCount(newCount);

    if (newCount >= 5) {
      setShowEasterEgg((prev) => !prev);
      setClickCount(0);
    }

    setTimeout(() => setClickCount(0), 2000);
  };

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
            {/* FadeIn Examples */}
            <section>
              <h2 style={{ marginBottom: '1rem' }}>FadeIn Animations (Click to Replay)</h2>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div key={activeKeys['fade-fast'] || 0} onClick={() => replayAnimation('fade-fast')}>
                  <FadeIn speed="fast">
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
                <div key={activeKeys['fade-base'] || 0} onClick={() => replayAnimation('fade-base')}>
                  <FadeIn speed="base">
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
                <div key={activeKeys['fade-slow'] || 0} onClick={() => replayAnimation('fade-slow')}>
                  <FadeIn speed="slow">
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
                <div key={activeKeys['slide-left'] || 0} onClick={() => replayAnimation('slide-left')}>
                  <SlideIn direction="left">
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
                      ← From Left
                    </div>
                  </SlideIn>
                </div>
                <div key={activeKeys['slide-right'] || 0} onClick={() => replayAnimation('slide-right')}>
                  <SlideIn direction="right">
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
                      From Right →
                    </div>
                  </SlideIn>
                </div>
                <div key={activeKeys['slide-up'] || 0} onClick={() => replayAnimation('slide-up')}>
                  <SlideIn direction="up">
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
                      ↑ From Up
                    </div>
                  </SlideIn>
                </div>
                <div key={activeKeys['slide-down'] || 0} onClick={() => replayAnimation('slide-down')}>
                  <SlideIn direction="down">
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
                      From Down ↓
                    </div>
                  </SlideIn>
                </div>
              </div>
            </section>

            {/* ScaleIn Examples */}
            <section>
              <h2 style={{ marginBottom: '1rem' }}>ScaleIn Animations (Click to Replay)</h2>
              <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                <div key={activeKeys['scale-fast'] || 0} onClick={() => replayAnimation('scale-fast')}>
                  <ScaleIn speed="fast">
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
                <div key={activeKeys['scale-base'] || 0} onClick={() => replayAnimation('scale-base')}>
                  <ScaleIn speed="base">
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
                <div key={activeKeys['scale-slow'] || 0} onClick={() => replayAnimation('scale-slow')}>
                  <ScaleIn speed="slow" initialScale={0.8}>
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
              <div key={activeKeys['page-transition'] || 0} onClick={() => replayAnimation('page-transition')}>
                <PageTransition direction="forward">
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
          </div>
        )}
      </main>
    </div>
  );
};

export default App;
