'use client';

import { useRef } from 'react';

const NAV_COLS = [
  {
    title: 'Product',
    links: ['Features', 'Pricing', 'Changelog', 'Roadmap', 'Status'],
  },
  {
    title: 'Resources',
    links: ['Documentation', 'API Reference', 'Tutorials', 'Blog', 'Community'],
  },
  {
    title: 'Company',
    links: ['About', 'Careers', 'Press', 'Security', 'Privacy Policy'],
  },
];

export default function Footer() {
  const emailRef = useRef<HTMLInputElement>(null);

  return (
    <>
      <section className="section" aria-label="Call to action - Get started with NeuralFlow">
        <div className="container">
          <div className="cta-banner">
            <div
              aria-hidden="true"
              style={{
                position: 'absolute',
                top: -60,
                left: '30%',
                width: 300,
                height: 300,
                background: 'radial-gradient(ellipse, rgba(108,99,255,0.3) 0%, transparent 70%)',
                filter: 'blur(40px)',
                pointerEvents: 'none',
              }}
            />
            <div style={{ position: 'relative', zIndex: 1 }}>
              <h2 className="cta-banner-title">
                Ready to transform your
                <br />
                data operations?
              </h2>
              <p className="cta-banner-subtitle">
                Join 3,200+ data teams already running on NeuralFlow.
                Start free - no credit card required.
              </p>
              <form
                className="cta-email-form"
                onSubmit={(e) => {
                  e.preventDefault();
                  if (emailRef.current) emailRef.current.value = '';
                }}
                aria-label="Start free trial email signup"
              >
                <input
                  ref={emailRef}
                  type="email"
                  className="cta-email-input"
                  placeholder="Enter your work email"
                  required
                  aria-label="Work email address"
                  id="cta-email-input"
                />
                <button type="submit" className="btn btn-primary">
                  Get Started Free
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                    <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              </form>
              <p style={{ fontSize: 12, color: 'var(--text-dim)', marginTop: 16 }}>
                14-day free trial. No credit card required. Cancel anytime.
              </p>
            </div>
          </div>
        </div>
      </section>

      <footer className="footer" role="contentinfo">
        <div className="container">
          <div className="footer-grid">
            <div>
              <div className="logo" style={{ marginBottom: 0 }}>
                <svg width="28" height="28" viewBox="0 0 32 32" fill="none" aria-hidden="true">
                  <rect width="32" height="32" rx="8" fill="url(#flg1)" />
                  <circle cx="16" cy="16" r="5" fill="none" stroke="#fff" strokeWidth="1.5" />
                  <circle cx="16" cy="7" r="2" fill="#fff" />
                  <circle cx="16" cy="25" r="2" fill="#fff" />
                  <circle cx="7" cy="16" r="2" fill="#fff" />
                  <circle cx="25" cy="16" r="2" fill="#fff" />
                  <line x1="16" y1="9" x2="16" y2="11" stroke="#fff" strokeWidth="1.5" />
                  <line x1="16" y1="21" x2="16" y2="23" stroke="#fff" strokeWidth="1.5" />
                  <line x1="9" y1="16" x2="11" y2="16" stroke="#fff" strokeWidth="1.5" />
                  <line x1="21" y1="16" x2="23" y2="16" stroke="#fff" strokeWidth="1.5" />
                  <defs>
                    <linearGradient id="flg1" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                      <stop stopColor="#6C63FF" />
                      <stop offset="1" stopColor="#00D4FF" />
                    </linearGradient>
                  </defs>
                </svg>
                NeuralFlow
              </div>
              <p className="footer-brand-desc">
                The AI-native data automation platform built for modern data teams.
                Automate pipelines, predict outcomes, and scale with confidence.
              </p>
              <div style={{ marginTop: 20, display: 'flex', gap: 8, alignItems: 'center' }}>
                <span style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 6,
                  padding: '4px 10px',
                  background: 'rgba(0,229,160,0.1)',
                  border: '1px solid rgba(0,229,160,0.2)',
                  borderRadius: 100,
                  fontSize: 11,
                  fontWeight: 600,
                  color: 'var(--accent-green)',
                }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: 'var(--accent-green)', display: 'inline-block' }} />
                  All systems operational
                </span>
              </div>
            </div>

            {NAV_COLS.map((col) => (
              <nav key={col.title} aria-label={`Footer - ${col.title}`}>
                <h3 className="footer-col-title">{col.title}</h3>
                <ul className="footer-links">
                  {col.links.map((link) => (
                    <li key={link}>
                      <a href="#" className="footer-link">{link}</a>
                    </li>
                  ))}
                </ul>
              </nav>
            ))}
          </div>

          <div className="footer-bottom">
            <p className="footer-copy">
              Copyright {new Date().getFullYear()} NeuralFlow, Inc. All rights reserved.
            </p>
            <div className="footer-social" aria-label="Social media links">
              <a href="#" className="footer-social-link" aria-label="NeuralFlow on X (Twitter)">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path d="M12.6 1h2.4L9.8 6.8 16 15h-4.1l-3.8-5-4.3 5H1.4L7 8.9 1 1h4.2l3.4 4.6L12.6 1zM11.8 13.5h1.3L4.3 2.3H3L11.8 13.5z" />
                </svg>
              </a>
              <a href="#" className="footer-social-link" aria-label="NeuralFlow on GitHub">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27.68 0 1.36.09 2 .27 1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.013 8.013 0 0016 8c0-4.42-3.58-8-8-8z" />
                </svg>
              </a>
              <a href="#" className="footer-social-link" aria-label="NeuralFlow on LinkedIn">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
                  <path d="M0 1.146C0 .513.526 0 1.175 0h13.65C15.474 0 16 .513 16 1.146v13.708c0 .633-.526 1.146-1.175 1.146H1.175C.526 16 0 15.487 0 14.854V1.146zm4.943 12.248V6.169H2.542v7.225h2.401zm-1.2-8.212c.837 0 1.358-.554 1.358-1.248-.015-.709-.52-1.248-1.342-1.248-.822 0-1.359.54-1.359 1.248 0 .694.521 1.248 1.327 1.248h.016zm4.908 8.212V9.359c0-.216.016-.432.08-.586.173-.431.568-.878 1.232-.878.869 0 1.216.662 1.216 1.634v3.865h2.401V9.25c0-2.22-1.184-3.252-2.764-3.252-1.274 0-1.845.7-2.165 1.193v.025h-.016a5.54 5.54 0 01.016-.025V6.169h-2.4c.03.678 0 7.225 0 7.225h2.4z" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
