'use client';

import useRevealOnIntersect from '@/lib/useRevealOnIntersect';

export default function Hero() {
  const sectionRef = useRevealOnIntersect<HTMLElement>(0.1);

  const chips = [
    { text: 'AI-powered', style: { top: '20%', left: '5%', '--duration': '7s', '--delay': '0s' } as React.CSSProperties },
    { text: 'Real-time sync', style: { top: '30%', right: '4%', '--duration': '6s', '--delay': '-2s' } as React.CSSProperties },
    { text: 'SOC 2 Type II', style: { bottom: '28%', left: '3%', '--duration': '8s', '--delay': '-4s' } as React.CSSProperties },
    { text: '99.99% uptime', style: { bottom: '32%', right: '5%', '--duration': '7s', '--delay': '-1s' } as React.CSSProperties },
  ];

  return (
    <section
      ref={sectionRef}
      className="hero section"
      aria-label="Hero - NeuralFlow AI Platform"
    >
      <div className="mesh-bg" aria-hidden="true">
        <div className="mesh-orb mesh-orb-1" />
        <div className="mesh-orb mesh-orb-2" />
        <div className="mesh-orb mesh-orb-3" />
      </div>

      <div className="hero-chips" aria-hidden="true">
        {chips.map((chip, i) => (
          <div key={i} className="chip" style={chip.style}>
            {chip.text}
          </div>
        ))}
      </div>

      <div style={{ position: 'relative', zIndex: 1, width: '100%' }}>
        <div className="animate-fade-up" style={{ display: 'flex', justifyContent: 'center', marginBottom: 28 }}>
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Introducing NeuralFlow 2.0 - Now with Autonomous AI Agents
          </div>
        </div>

        <h1 className="hero-title animate-fade-up delay-100">
          Automate Every Data <span className="gradient-text">Pipeline</span> with
          <br />
          Intelligent AI Orchestration
        </h1>

        <p className="hero-subtitle animate-fade-up delay-200">
          NeuralFlow transforms complex data workflows into fully automated,
          self-healing pipelines. Deploy in minutes, scale to petabytes, and
          let AI handle the rest.
        </p>

        <div className="hero-actions animate-fade-up delay-250">
          <a href="#pricing" className="btn btn-primary" style={{ padding: '14px 28px', fontSize: 16 }}>
            Start Free Trial
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
              <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
          <a href="#how-it-works" className="btn btn-ghost" style={{ padding: '14px 28px', fontSize: 16 }}>
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
              <circle cx="9" cy="9" r="8" stroke="currentColor" strokeWidth="1.5" />
              <path d="M7 6l5 3-5 3V6z" fill="currentColor" />
            </svg>
            Watch Demo
          </a>
        </div>

        <div className="hero-stats animate-fade-up delay-300">
          {[
            { value: '10M+', label: 'Data events/day' },
            { value: '99.99%', label: 'Uptime SLA' },
            { value: '3,200+', label: 'Teams worldwide' },
            { value: '<50ms', label: 'Avg. latency' },
          ].map((stat, i) => (
            <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 40 }}>
              {i > 0 && <div className="hero-stat-divider" />}
              <div className="hero-stat">
                <div className="hero-stat-value">{stat.value}</div>
                <div className="hero-stat-label">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div
        className="animate-scale-in delay-350"
        style={{
          position: 'relative',
          zIndex: 1,
          marginTop: 80,
          width: '100%',
          maxWidth: 900,
        }}
        aria-hidden="true"
      >
        <div
          style={{
            background: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-xl)',
            overflow: 'hidden',
            boxShadow: '0 40px 120px rgba(0,0,0,0.6), 0 0 60px rgba(108,99,255,0.15)',
          }}
        >
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              padding: '14px 20px',
              borderBottom: '1px solid var(--border-subtle)',
              background: 'var(--bg-surface)',
            }}
          >
            {['#ff6b6b', '#ffc107', '#00e5a0'].map((c, i) => (
              <div key={i} style={{ width: 10, height: 10, borderRadius: '50%', background: c }} />
            ))}
            <div
              style={{
                flex: 1,
                height: 24,
                background: 'var(--bg-card)',
                borderRadius: 4,
                margin: '0 12px',
                display: 'flex',
                alignItems: 'center',
                paddingLeft: 10,
              }}
            >
              <span style={{ fontSize: 11, color: 'var(--text-dim)' }}>app.neuralflow.ai/dashboard</span>
            </div>
          </div>

          <div className="dashboard-metrics-grid">
            {[
              { label: 'Pipelines Active', value: '247', change: '+12%', color: 'var(--accent-green)' },
              { label: 'Data Processed', value: '9.8TB', change: '+34%', color: 'var(--accent-primary)' },
              { label: 'AI Operations', value: '1.2M', change: '+28%', color: 'var(--accent-secondary)' },
            ].map((metric, i) => (
              <div
                key={i}
                style={{
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  padding: 16,
                }}
              >
                <div style={{ fontSize: 11, color: 'var(--text-muted)', marginBottom: 8 }}>{metric.label}</div>
                <div style={{ fontFamily: 'var(--font-display)', fontSize: 22, fontWeight: 700, color: 'var(--text-primary)' }}>
                  {metric.value}
                </div>
                <div style={{ fontSize: 11, color: metric.color, marginTop: 4 }}>{metric.change} this week</div>
              </div>
            ))}
          </div>

          <div style={{ padding: '0 24px 24px', display: 'flex', alignItems: 'flex-end', gap: 6, height: 100 }}>
            {[45, 65, 40, 80, 55, 90, 70, 85, 60, 95, 75, 88].map((h, i) => (
              <div
                key={i}
                style={{
                  flex: 1,
                  height: `${h}%`,
                  background: i === 10 ? 'var(--accent-primary)' : 'var(--accent-primary-dim)',
                  border: `1px solid ${i === 10 ? 'var(--accent-primary)' : 'var(--border-accent)'}`,
                  borderRadius: '4px 4px 0 0',
                  transition: 'height 0.4s ease',
                }}
              />
            ))}
          </div>
        </div>

        <div
          style={{
            position: 'absolute',
            bottom: -40,
            left: '10%',
            right: '10%',
            height: 60,
            background: 'radial-gradient(ellipse, rgba(108,99,255,0.25) 0%, transparent 70%)',
            filter: 'blur(20px)',
            pointerEvents: 'none',
          }}
        />
      </div>
    </section>
  );
}
