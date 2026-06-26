'use client';

import useRevealOnIntersect from '@/lib/useRevealOnIntersect';

const TESTIMONIALS = [
  {
    initials: 'SR',
    name: 'Shreya Rajan',
    role: 'Head of Data, FinTech Startup',
    quote:
      'NeuralFlow cut our pipeline build time from weeks to hours. The self-healing feature alone has saved our team 40+ hours a month in incident response.',
    stars: 5,
  },
  {
    initials: 'MK',
    name: 'Marcus Klein',
    role: 'VP Engineering, SaaS Platform',
    quote:
      'The pricing transparency is refreshing. We scaled from 10GB to 2TB/month and the platform handled it seamlessly. No re-architecting needed.',
    stars: 5,
  },
  {
    initials: 'AP',
    name: 'Anika Patel',
    role: 'Data Engineering Lead, E-Commerce',
    quote:
      'The 200+ connectors meant we could integrate all 14 of our data sources in one afternoon. The AI recommendations are genuinely impressive.',
    stars: 5,
  },
  {
    initials: 'JT',
    name: 'James Torres',
    role: 'CTO, Healthcare Analytics',
    quote:
      'HIPAA compliance was a dealbreaker requirement. NeuralFlow had it built-in, not bolted-on. We were production-ready in 2 weeks.',
    stars: 5,
  },
  {
    initials: 'LC',
    name: 'Liu Chen',
    role: 'Principal Engineer, EdTech',
    quote:
      'The predictive analytics engine caught three critical data quality issues before they reached production. ROI was clear in the first month.',
    stars: 5,
  },
  {
    initials: 'FN',
    name: 'Fatima Nasser',
    role: 'Data Architect, Logistics Corp',
    quote:
      'We process 50M+ events daily with sub-50ms latency. The auto-scaling is truly set-and-forget. Exactly what we needed.',
    stars: 5,
  },
];

const LOGO_COMPANIES = [
  'Stripe', 'Notion', 'Linear', 'Vercel', 'Figma', 'Anthropic',
  'Stripe', 'Notion', 'Linear', 'Vercel', 'Figma', 'Anthropic',
];

export default function SocialProof() {
  const sectionRef = useRevealOnIntersect<HTMLElement>(0.1);

  return (
    <>
      <div className="logos-strip">
        <p className="logos-label">Trusted by 3,200+ engineering teams worldwide</p>
        <div style={{ overflow: 'hidden' }}>
          <div className="logos-track" aria-hidden="true">
            {LOGO_COMPANIES.map((name, i) => (
              <div key={i} className="logo-item">
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" aria-hidden="true">
                  <rect width="18" height="18" rx="4" fill="var(--border-card)" />
                  <text x="9" y="13" textAnchor="middle" fontSize="9" fontWeight="700" fill="var(--text-dim)" fontFamily="Segoe UI, Arial, sans-serif">
                    {name[0]}
                  </text>
                </svg>
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>

      <section
        id="testimonials"
        ref={sectionRef}
        className="section"
        aria-label="Customer Testimonials"
      >
        <div className="container">
          <div className="reveal" style={{ textAlign: 'center' }}>
            <div className="section-label" style={{ justifyContent: 'center' }}>Testimonials</div>
            <h2 className="section-title" style={{ textAlign: 'center' }}>
              Trusted by data teams
              <br />
              <span className="text-gradient">at every scale</span>
            </h2>
          </div>

          <div className="testimonials-grid reveal">
            {TESTIMONIALS.map((t, i) => (
              <blockquote key={i} className="testimonial-card">
                <div className="testimonial-stars" aria-label={`${t.stars} out of 5 stars`}>
                  {Array.from({ length: t.stars }).map((_, j) => (
                    <svg key={j} width="14" height="14" viewBox="0 0 14 14" fill="currentColor" aria-hidden="true">
                      <path d="M7 1l1.8 3.6L13 5.3l-3 2.9.7 4.1L7 10.3l-3.7 2 .7-4.1L1 5.3l4.2-.7L7 1z" />
                    </svg>
                  ))}
                </div>
                <p className="testimonial-quote">&ldquo;{t.quote}&rdquo;</p>
                <footer className="testimonial-author">
                  <div className="testimonial-avatar" aria-hidden="true">{t.initials}</div>
                  <div>
                    <div className="testimonial-name">{t.name}</div>
                    <div className="testimonial-role">{t.role}</div>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>

          <div className="metrics-grid reveal">
            {[
              { value: '97%', label: 'Customer satisfaction' },
              { value: '4.9/5', label: 'Average rating' },
              { value: '40hrs', label: 'Saved per team/month' },
              { value: '<1hr', label: 'Average time to deploy' },
            ].map((metric, i) => (
              <div key={i} className="metrics-card">
                <div style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: 32,
                  fontWeight: 700,
                  color: 'var(--text-primary)',
                  marginBottom: 6,
                }}>
                  {metric.value}
                </div>
                <div style={{ fontSize: 13, color: 'var(--text-muted)' }}>{metric.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
