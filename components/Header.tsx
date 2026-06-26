'use client';

import { useEffect, useRef, useState } from 'react';

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const navLinks = [
    { href: '#features', label: 'Features' },
    { href: '#how-it-works', label: 'How It Works' },
    { href: '#pricing', label: 'Pricing' },
    { href: '#testimonials', label: 'Testimonials' },
  ];

  return (
    <header
      ref={headerRef}
      className={`header animate-fade-in${scrolled ? ' scrolled' : ''}`}
      role="banner"
    >
      <div className="header-inner">
        <a href="#main-content" className="logo" aria-label="NeuralFlow AI - Home">
          <svg className="logo-mark" viewBox="0 0 32 32" fill="none" aria-hidden="true">
            <rect width="32" height="32" rx="8" fill="url(#lg1)" />
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
              <linearGradient id="lg1" x1="0" y1="0" x2="32" y2="32" gradientUnits="userSpaceOnUse">
                <stop stopColor="#6C63FF" />
                <stop offset="1" stopColor="#00D4FF" />
              </linearGradient>
            </defs>
          </svg>
          NeuralFlow
        </a>

        <nav className="nav" aria-label="Main navigation">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="nav-actions">
          <a href="#pricing" className="btn btn-ghost" style={{ fontSize: 14, padding: '8px 18px' }}>
            Sign In
          </a>
          <a href="#pricing" className="btn btn-primary" style={{ fontSize: 14, padding: '8px 18px' }}>
            Get Started
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 7h12M8 3l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>

          <button
            className="mobile-menu-btn"
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            <span style={{ transform: mobileOpen ? 'rotate(45deg) translate(5px, 5px)' : undefined }} />
            <span style={{ opacity: mobileOpen ? 0 : 1 }} />
            <span style={{ transform: mobileOpen ? 'rotate(-45deg) translate(5px, -5px)' : undefined }} />
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          style={{
            background: 'rgba(5,8,17,0.98)',
            backdropFilter: 'blur(20px)',
            borderTop: '1px solid var(--border-subtle)',
            padding: '16px var(--container-padding)',
            display: 'flex',
            flexDirection: 'column',
            gap: 4,
            animation: 'fadeIn 180ms ease-out',
          }}
          aria-label="Mobile navigation"
        >
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="nav-link"
              style={{ padding: '12px 16px' }}
              onClick={() => setMobileOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <div style={{ marginTop: 8, display: 'flex', gap: 8 }}>
            <a href="#pricing" className="btn btn-ghost" style={{ flex: 1, justifyContent: 'center', fontSize: 14 }}>
              Sign In
            </a>
            <a href="#pricing" className="btn btn-primary" style={{ flex: 1, justifyContent: 'center', fontSize: 14 }}>
              Get Started
            </a>
          </div>
        </nav>
      )}
    </header>
  );
}
