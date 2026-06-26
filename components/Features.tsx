'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import useRevealOnIntersect from '@/lib/useRevealOnIntersect';

const FEATURES = [
  {
    id: 0,
    tag: 'Automation',
    title: 'Self-Healing Data Pipelines',
    desc: 'AI-driven error detection and auto-remediation keeps your pipelines running 24/7 with zero manual intervention.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M11 2v4M11 16v4M4.22 4.22l2.83 2.83M14.95 14.95l2.83 2.83M2 11h4M16 11h4M4.22 17.78l2.83-2.83M14.95 7.05l2.83-2.83" stroke="var(--accent-primary)" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    ),
    visual: (
      <div className="pipeline-dots" style={{ gap: 0, marginTop: 24 }}>
        {[0, 1, 2, 3, 4].map((i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', flex: i < 4 ? 1 : 0 }}>
            <div
              className="pipeline-dot"
              style={{
                background: i < 3 ? 'var(--accent-primary)' : i === 3 ? 'var(--accent-green)' : 'var(--bg-surface)',
                border: i === 4 ? '1px solid var(--border-card)' : 'none',
                width: 12,
                height: 12,
              }}
            />
            {i < 4 && (
              <div
                className="pipeline-line"
                style={{
                  background: i < 2 ? 'linear-gradient(90deg,var(--accent-primary),var(--accent-primary))' : 'linear-gradient(90deg,var(--accent-primary),var(--accent-secondary))',
                  height: 2,
                  flex: 1,
                  opacity: i < 3 ? 1 : 0.3,
                }}
              />
            )}
          </div>
        ))}
      </div>
    ),
    wide: true,
  },
  {
    id: 1,
    tag: 'Intelligence',
    title: 'Predictive Analytics Engine',
    desc: 'Forecast trends and anomalies before they impact your business. Powered by transformer-based ML models.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <polyline points="2,16 7,9 11,13 15,6 20,10" stroke="var(--accent-secondary)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        <circle cx="20" cy="10" r="2" fill="var(--accent-secondary)" />
      </svg>
    ),
    visual: (
      <div className="mini-chart" style={{ marginTop: 20 }}>
        {[30, 55, 40, 70, 45, 85, 60, 90, 75].map((h, i) => (
          <div
            key={i}
            className="mini-chart-bar"
            style={{ height: `${h}%` }}
          />
        ))}
      </div>
    ),
    wide: false,
  },
  {
    id: 2,
    tag: 'Accuracy',
    title: '99.7% Model Precision',
    desc: 'Industry-leading accuracy across classification, regression, and generation tasks with continuous drift monitoring.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <circle cx="11" cy="11" r="9" stroke="var(--accent-green)" strokeWidth="1.5" />
        <path d="M7 11l3 3 5-5" stroke="var(--accent-green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    visual: (
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginTop: 20 }}>
        <div className="accuracy-ring-wrapper">
          <svg width="80" height="80" viewBox="0 0 80 80">
            <circle cx="40" cy="40" r="32" fill="none" stroke="var(--border-card)" strokeWidth="6" />
            <circle
              cx="40"
              cy="40"
              r="32"
              fill="none"
              stroke="var(--accent-green)"
              strokeWidth="6"
              strokeDasharray={`${0.997 * 201} 201`}
              strokeLinecap="round"
            />
          </svg>
          <div className="accuracy-label">99.7%</div>
        </div>
        <div>
          <div style={{ fontSize: 12, color: 'var(--text-muted)', lineHeight: 1.6 }}>
            <div>F1 Score: 0.994</div>
            <div>Precision: 0.998</div>
            <div>Recall: 0.991</div>
          </div>
        </div>
      </div>
    ),
    wide: false,
    tall: true,
  },
  {
    id: 3,
    tag: 'Integration',
    title: '200+ Native Connectors',
    desc: 'Plug into your entire tech stack instantly - databases, SaaS tools, APIs, and data warehouses.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="2" y="8" width="5" height="5" rx="1" stroke="var(--accent-primary)" strokeWidth="1.5" />
        <rect x="15" y="3" width="5" height="5" rx="1" stroke="var(--accent-secondary)" strokeWidth="1.5" />
        <rect x="15" y="14" width="5" height="5" rx="1" stroke="var(--accent-tertiary)" strokeWidth="1.5" />
        <path d="M7 10.5h5M12 5.5h3M12 16.5h3" stroke="var(--text-muted)" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="12" cy="10.5" r="1.5" fill="var(--accent-primary)" />
      </svg>
    ),
    visual: null,
    wide: false,
  },
  {
    id: 4,
    tag: 'Security',
    title: 'Enterprise-Grade Security',
    desc: 'End-to-end encryption, SOC 2 Type II certification, GDPR compliance, and role-based access control built in.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <path d="M11 2L3 6v5c0 5 4 8.5 8 10 4-1.5 8-5 8-10V6L11 2z" stroke="var(--accent-green)" strokeWidth="1.5" strokeLinejoin="round" />
        <path d="M8 11l2 2 4-4" stroke="var(--accent-green)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    ),
    visual: (
      <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap', marginTop: 16 }}>
        {['SOC 2', 'GDPR', 'HIPAA', 'ISO 27001'].map((badge) => (
          <span key={badge} style={{
            padding: '4px 10px',
            background: 'rgba(0,229,160,0.08)',
            border: '1px solid rgba(0,229,160,0.2)',
            borderRadius: 100,
            fontSize: 11,
            fontWeight: 600,
            color: 'var(--accent-green)',
          }}>
            {badge}
          </span>
        ))}
      </div>
    ),
    wide: true,
  },
  {
    id: 5,
    tag: 'Scale',
    title: 'Petabyte-Scale Processing',
    desc: 'Auto-scaling compute clusters handle any workload spike. Pay only for what you use.',
    icon: (
      <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
        <rect x="2" y="14" width="4" height="6" rx="1" fill="var(--accent-primary)" opacity="0.6" />
        <rect x="9" y="10" width="4" height="10" rx="1" fill="var(--accent-primary)" opacity="0.8" />
        <rect x="16" y="5" width="4" height="15" rx="1" fill="var(--accent-primary)" />
      </svg>
    ),
    visual: null,
    wide: false,
  },
];

interface BentoNodeProps {
  feature: (typeof FEATURES)[number];
  isActive: boolean;
  onActivate: (id: number) => void;
}

function BentoNode({ feature, isActive, onActivate }: BentoNodeProps) {
  return (
    <article
      className={`bento-node${feature.wide ? ' bento-node-wide' : ''}${feature.tall ? ' bento-node-tall' : ''}${isActive ? ' active' : ''}`}
      onMouseEnter={() => onActivate(feature.id)}
      onMouseLeave={() => onActivate(-1)}
      tabIndex={0}
      aria-label={feature.title}
      onFocus={() => onActivate(feature.id)}
      onBlur={() => onActivate(-1)}
    >
      <div className="bento-node-tag">{feature.tag}</div>
      <div className="bento-node-icon">{feature.icon}</div>
      <h3 className="bento-node-title">{feature.title}</h3>
      <p className="bento-node-desc">{feature.desc}</p>
      {feature.visual && <div className="bento-node-visual">{feature.visual}</div>}
    </article>
  );
}

interface AccordionItemProps {
  feature: (typeof FEATURES)[number];
  isOpen: boolean;
  onToggle: (id: number) => void;
}

function AccordionItemComponent({ feature, isOpen, onToggle }: AccordionItemProps) {
  return (
    <div className="accordion-item" role="listitem">
      <button
        className={`accordion-trigger${isOpen ? ' open' : ''}`}
        onClick={() => onToggle(feature.id)}
        aria-expanded={isOpen}
        aria-controls={`accordion-body-${feature.id}`}
        id={`accordion-trigger-${feature.id}`}
      >
        <div className="accordion-trigger-icon">{feature.icon}</div>
        <span>{feature.title}</span>
        <svg
          className="accordion-chevron"
          width="16"
          height="16"
          viewBox="0 0 16 16"
          fill="none"
          aria-hidden="true"
        >
          <path d="M4 6l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        id={`accordion-body-${feature.id}`}
        className={`accordion-body${isOpen ? ' open' : ''}`}
        role="region"
        aria-labelledby={`accordion-trigger-${feature.id}`}
      >
        <div className="accordion-content">
          <p style={{ marginBottom: feature.visual ? 16 : 0 }}>{feature.desc}</p>
          {feature.visual && <div>{feature.visual}</div>}
        </div>
      </div>
    </div>
  );
}

export default function Features() {
  const sectionRef = useRevealOnIntersect<HTMLElement>(0.12);
  const [activeIndex, setActiveIndex] = useState<number>(-1);
  const [openAccordionIndex, setOpenAccordionIndex] = useState<number>(-1);
  const activeIndexRef = useRef<number>(-1);
  const MOBILE_BREAKPOINT = 768;

  useEffect(() => {
    activeIndexRef.current = activeIndex;
  }, [activeIndex]);

  useEffect(() => {
    let lastWidth = window.innerWidth;

    const observer = new ResizeObserver((entries) => {
      const newWidth = entries[0].contentRect.width;
      const crossedToMobile = lastWidth >= MOBILE_BREAKPOINT && newWidth < MOBILE_BREAKPOINT;

      if (crossedToMobile && activeIndexRef.current >= 0) {
        const indexToTransfer = activeIndexRef.current;
        requestAnimationFrame(() => {
          setOpenAccordionIndex(indexToTransfer);
          const el = document.getElementById(`accordion-trigger-${indexToTransfer}`);
          if (el) {
            el.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }
        });
      }

      lastWidth = newWidth;
    });

    observer.observe(document.body);
    return () => observer.disconnect();
  }, []);

  const handleBentoActivate = useCallback((id: number) => {
    setActiveIndex(id);
  }, []);

  const handleAccordionToggle = useCallback((id: number) => {
    setOpenAccordionIndex((prev) => (prev === id ? -1 : id));
  }, []);

  return (
    <section ref={sectionRef} id="features" className="section" aria-label="Platform Features">
      <div className="container">
        <div className="reveal">
          <div className="section-label">Features</div>
          <h2 className="section-title">
            Everything your data stack
            <br />
            <span className="text-gradient">needs to thrive</span>
          </h2>
          <p className="section-subtitle">
            Six powerful capabilities working in concert - from pipeline automation
            to enterprise security - so your team can focus on insight, not infrastructure.
          </p>
        </div>

        <div className="features-grid reveal" aria-label="Feature cards grid">
          {FEATURES.map((feature) => (
            <BentoNode
              key={feature.id}
              feature={feature}
              isActive={activeIndex === feature.id}
              onActivate={handleBentoActivate}
            />
          ))}
        </div>

        <div
          className="features-accordion"
          role="list"
          aria-label="Feature accordion"
        >
          {FEATURES.map((feature) => (
            <AccordionItemComponent
              key={feature.id}
              feature={feature}
              isOpen={openAccordionIndex === feature.id}
              onToggle={handleAccordionToggle}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
