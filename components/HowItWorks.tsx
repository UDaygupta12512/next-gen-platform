'use client';

import useRevealOnIntersect from '@/lib/useRevealOnIntersect';

const STEPS = [
  {
    number: '01',
    title: 'Connect Your Data Sources',
    desc: 'Link databases, APIs, SaaS tools, and data warehouses in minutes using our 200+ native connectors. No code required.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M8 12h8M12 8v8" stroke="var(--accent-primary)" strokeWidth="1.5" strokeLinecap="round" />
        <rect x="2" y="6" width="6" height="12" rx="2" stroke="var(--accent-primary)" strokeWidth="1.5" />
        <rect x="16" y="6" width="6" height="12" rx="2" stroke="var(--accent-secondary)" strokeWidth="1.5" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Define AI Automation Rules',
    desc: 'Configure intelligent workflows using natural language or our visual pipeline builder. AI suggests optimizations as you build.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <circle cx="12" cy="12" r="3" stroke="var(--accent-primary)" strokeWidth="1.5" />
        <path d="M12 2v3M12 19v3M2 12h3M19 12h3" stroke="var(--accent-secondary)" strokeWidth="1.5" strokeLinecap="round" />
        <path d="M5.64 5.64l2.12 2.12M16.24 16.24l2.12 2.12M5.64 18.36l2.12-2.12M16.24 7.76l2.12-2.12" stroke="var(--accent-secondary)" strokeWidth="1" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Deploy & Watch It Scale',
    desc: 'One-click deployment to our globally distributed infrastructure. Auto-scales to handle any data volume - petabytes included.',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path d="M12 2L2 19h20L12 2z" stroke="var(--accent-green)" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M12 9v5M12 16.5v.5" stroke="var(--accent-green)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
  },
];

export default function HowItWorks() {
  const sectionRef = useRevealOnIntersect<HTMLElement>(0.15);

  return (
    <section id="how-it-works" ref={sectionRef} className="section" aria-label="How NeuralFlow Works">
      <div className="container">
        <div className="reveal">
          <div className="section-label">How It Works</div>
          <h2 className="section-title">
            From raw data to
            <br />
            <span className="text-gradient">intelligent automation</span>
          </h2>
          <p className="section-subtitle">
            Three steps to a fully automated data operation. Most teams go live in under an hour.
          </p>
        </div>

        <div className="steps-grid reveal">
          {STEPS.map((step, i) => (
            <div key={i} className="step-item">
              <div className="step-number">{step.number}</div>
              <div
                style={{
                  width: 48,
                  height: 48,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--accent-primary-dim)',
                  border: '1px solid var(--border-accent)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  margin: '0 auto 20px',
                }}
              >
                {step.icon}
              </div>
              <h3 className="step-title">{step.title}</h3>
              <p className="step-desc">{step.desc}</p>
            </div>
          ))}
        </div>

        <div
          className="reveal"
          style={{
            marginTop: 64,
            padding: '32px',
            background: 'var(--bg-card)',
            border: '1px solid var(--border-card)',
            borderRadius: 'var(--radius-xl)',
            textAlign: 'center',
          }}
        >
          <p style={{ fontSize: 13, color: 'var(--text-muted)', marginBottom: 24, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
            Integrates with your existing stack
          </p>
          <div style={{ display: 'flex', justifyContent: 'center', flexWrap: 'wrap', gap: 12 }}>
            {[
              { name: 'PostgreSQL', color: '#336791' },
              { name: 'Snowflake', color: '#29B5E8' },
              { name: 'BigQuery', color: '#4285F4' },
              { name: 'Salesforce', color: '#00A1E0' },
              { name: 'Stripe', color: '#6772E5' },
              { name: 'Kafka', color: '#231F20' },
              { name: 'dbt', color: '#FF694A' },
              { name: 'Redshift', color: '#8C4FFF' },
            ].map((tech) => (
              <div
                key={tech.name}
                style={{
                  padding: '8px 16px',
                  background: 'var(--bg-surface)',
                  border: '1px solid var(--border-subtle)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: 13,
                  fontWeight: 600,
                  color: 'var(--text-muted)',
                  fontFamily: 'var(--font-display)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: 8,
                }}
              >
                <div
                  style={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    background: tech.color,
                  }}
                />
                {tech.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
