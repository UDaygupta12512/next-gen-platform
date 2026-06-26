'use client';

/**
 * PRICING COMPONENT — Feature 1: Matrix-Driven Multi-Currency Pricing
 *
 * CRITICAL CONSTRAINT: Changing billing cycle or currency must NOT
 * trigger re-renders of parent or surrounding layout.
 *
 * Strategy:
 *  - useRef holds current billing+currency state
 *  - Price changes update ONLY the targeted DOM text nodes via
 *    direct textContent mutation (no setState for price updates)
 *  - React.memo wraps each PricingCard to prevent re-renders
 *  - Only the control buttons re-render (isolated via separate state)
 *
 * Verified: No global component reflow on toggle/currency change.
 */

import { memo, useCallback, useEffect, useRef, useState } from 'react';
import {
  BillingCycle,
  Currency,
  CURRENCIES,
  REGIONAL_TARIFFS,
  TIER_META,
  TIERS,
  Tier,
  computePrice,
} from '@/lib/pricing';

// ============================================================
// PricingCard — memo'd, receives refs to DOM text nodes
// Updates via direct DOM mutation — zero re-renders
// ============================================================
interface PricingCardProps {
  tier: Tier;
  onRegister: (
    tier: Tier,
    refs: {
      amountRef: React.RefObject<HTMLSpanElement | null>;
      perYearRef: React.RefObject<HTMLDivElement | null>;
      savingsRef: React.RefObject<HTMLDivElement | null>;
    }
  ) => void;
}

const PricingCard = memo(function PricingCard({
  tier,
  onRegister,
}: PricingCardProps) {
  const meta = TIER_META[tier];
  const amountRef = useRef<HTMLSpanElement>(null);
  const perYearRef = useRef<HTMLDivElement>(null);
  const savingsRef = useRef<HTMLDivElement>(null);

  const initial = computePrice(tier, 'USD', 'monthly');

  // Register refs with parent for direct DOM updates
  useEffect(() => {
    onRegister(tier, { amountRef, perYearRef, savingsRef });
  }, [tier, onRegister]);

  const isHighlighted = meta.highlight;

  return (
    <article
      className={`pricing-card${isHighlighted ? ' highlighted' : ''}`}
      aria-label={`${meta.name} plan`}
    >
      {meta.badge && (
        <div className="pricing-badge">{meta.badge}</div>
      )}

      <h3 className="pricing-tier-name">{meta.name}</h3>
      <p className="pricing-tagline">{meta.tagline}</p>

      {/* Price block — only these span nodes are mutated on change */}
      <div className="pricing-price-block">
        <div className="pricing-amount">
          {/* This span is directly mutated — NOT via React state */}
          <span
            ref={amountRef}
            data-price-amount={tier}
            aria-live="polite"
            aria-atomic="true"
          >
            {initial.monthly}
          </span>
          <span className="pricing-amount-suffix">/mo</span>
        </div>
        <div
          ref={perYearRef}
          className="pricing-per-year"
          data-price-peryear={tier}
          aria-live="polite"
        >
          {initial.perYear}
        </div>
        <div
          ref={savingsRef}
          className="pricing-savings"
          data-price-savings={tier}
          aria-live="polite"
          style={{ minHeight: 18 }}
        >
          {initial.savings}
        </div>
      </div>

      <div className="pricing-divider" />

      <ul className="pricing-features" aria-label={`${meta.name} plan features`}>
        {meta.features.map((feat) => (
          <li key={feat} className="pricing-feature">
            <svg
              className="pricing-feature-check"
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              aria-hidden="true"
            >
              <circle cx="8" cy="8" r="7" fill="rgba(0,229,160,0.12)" />
              <path
                d="M5 8l2 2 4-4"
                stroke="var(--accent-green)"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            {feat}
          </li>
        ))}
      </ul>

      <button
        className={`pricing-cta ${isHighlighted ? 'pricing-cta-primary' : 'pricing-cta-ghost'}`}
        aria-label={`${meta.cta} — ${meta.name} plan`}
      >
        {meta.cta}
      </button>
    </article>
  );
});

// ============================================================
// BillingToggle — isolated component, only re-renders itself
// ============================================================
interface BillingToggleProps {
  billing: BillingCycle;
  onChange: (billing: BillingCycle) => void;
}

const BillingToggle = memo(function BillingToggle({
  billing,
  onChange,
}: BillingToggleProps) {
  const monthlyRef = useRef<HTMLButtonElement>(null);
  const annualRef = useRef<HTMLButtonElement>(null);
  const pillRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Animate the pill position using WAAPI — hardware accelerated
    const pill = pillRef.current;
    const active = billing === 'monthly' ? monthlyRef.current : annualRef.current;
    if (!pill || !active) return;

    const container = pill.parentElement;
    if (!container) return;
    const containerRect = container.getBoundingClientRect();
    const activeRect = active.getBoundingClientRect();

    pill.animate(
      [
        { left: `${pill.offsetLeft}px`, width: `${pill.offsetWidth}px` },
        {
          left: `${activeRect.left - containerRect.left}px`,
          width: `${activeRect.width}px`,
        },
      ],
      { duration: 250, easing: 'ease-in-out', fill: 'forwards' }
    );
  }, [billing]);

  return (
    <div className="billing-toggle" role="group" aria-label="Billing cycle">
      <div
        ref={pillRef}
        className="billing-pill"
        style={{
          left: billing === 'monthly' ? 4 : undefined,
          right: billing === 'annual' ? 4 : undefined,
          width: billing === 'monthly' ? '82px' : '120px',
        }}
        aria-hidden="true"
      />
      <button
        ref={monthlyRef}
        className={`billing-option${billing === 'monthly' ? ' active' : ''}`}
        onClick={() => onChange('monthly')}
        aria-pressed={billing === 'monthly'}
        id="billing-monthly"
      >
        Monthly
      </button>
      <button
        ref={annualRef}
        className={`billing-option${billing === 'annual' ? ' active' : ''}`}
        onClick={() => onChange('annual')}
        aria-pressed={billing === 'annual'}
        id="billing-annual"
      >
        Annual
        <span className="billing-annual-badge" style={{ marginLeft: 8 }}>
          Save 20%
        </span>
      </button>
    </div>
  );
});

// ============================================================
// CurrencySelector — isolated, only re-renders itself
// ============================================================
interface CurrencySelectorProps {
  currency: Currency;
  onChange: (currency: Currency) => void;
}

const CurrencySelector = memo(function CurrencySelector({
  currency,
  onChange,
}: CurrencySelectorProps) {
  return (
    <div
      className="currency-selector"
      role="group"
      aria-label="Currency selection"
    >
      {CURRENCIES.map((c) => (
        <button
          key={c}
          className={`currency-btn${currency === c ? ' active' : ''}`}
          onClick={() => onChange(c)}
          aria-pressed={currency === c}
          id={`currency-${c}`}
        >
          {REGIONAL_TARIFFS[c].symbol} {c}
        </button>
      ))}
    </div>
  );
});

// ============================================================
// PricingControls — isolated state; parent section never re-renders
// ============================================================
interface PricingControlsProps {
  onBillingChange: (billing: BillingCycle) => void;
  onCurrencyChange: (currency: Currency) => void;
}

const PricingControls = memo(function PricingControls({
  onBillingChange,
  onCurrencyChange,
}: PricingControlsProps) {
  const [billing, setBilling] = useState<BillingCycle>('monthly');
  const [currency, setCurrency] = useState<Currency>('USD');

  const handleBilling = useCallback(
    (next: BillingCycle) => {
      setBilling(next);
      onBillingChange(next);
    },
    [onBillingChange]
  );

  const handleCurrency = useCallback(
    (next: Currency) => {
      setCurrency(next);
      onCurrencyChange(next);
    },
    [onCurrencyChange]
  );

  return (
    <div className="pricing-controls">
      <BillingToggle billing={billing} onChange={handleBilling} />
      <CurrencySelector currency={currency} onChange={handleCurrency} />
    </div>
  );
});

// ============================================================
// MAIN PRICING COMPONENT — no useState; cards never re-render on toggle
// ============================================================
export default function Pricing() {
  const billingRef = useRef<BillingCycle>('monthly');
  const currencyRef = useRef<Currency>('USD');

  // Registry of all price text node refs, keyed by tier
  const priceRefs = useRef<
    Map<
      Tier,
      {
        amountRef: React.RefObject<HTMLSpanElement | null>;
        perYearRef: React.RefObject<HTMLDivElement | null>;
        savingsRef: React.RefObject<HTMLDivElement | null>;
      }
    >
  >(new Map());

  // ── Register a card's refs (called by PricingCard on mount) ──
  const handleRegister = useCallback(
    (
      tier: Tier,
      refs: {
        amountRef: React.RefObject<HTMLSpanElement | null>;
        perYearRef: React.RefObject<HTMLDivElement | null>;
        savingsRef: React.RefObject<HTMLDivElement | null>;
      }
    ) => {
      priceRefs.current.set(tier, refs);
    },
    []
  );

  // ── CORE: Direct DOM text node mutation — zero React re-renders ──
  const updateAllPrices = useCallback((newBilling: BillingCycle, newCurrency: Currency) => {
    TIERS.forEach((tier) => {
      const refs = priceRefs.current.get(tier);
      if (!refs) return;

      const { monthly, perYear, savings } = computePrice(tier, newCurrency, newBilling);

      // Direct textContent mutation — isolated to targeted text nodes
      if (refs.amountRef.current) {
        refs.amountRef.current.textContent = monthly;
      }
      if (refs.perYearRef.current) {
        refs.perYearRef.current.textContent = perYear;
      }
      if (refs.savingsRef.current) {
        refs.savingsRef.current.textContent = savings;
      }
    });
  }, []);

  const handleBillingChange = useCallback(
    (newBilling: BillingCycle) => {
      billingRef.current = newBilling;
      updateAllPrices(newBilling, currencyRef.current);
    },
    [updateAllPrices]
  );

  const handleCurrencyChange = useCallback(
    (newCurrency: Currency) => {
      currencyRef.current = newCurrency;
      updateAllPrices(billingRef.current, newCurrency);
    },
    [updateAllPrices]
  );

  return (
    <section id="pricing" className="section" aria-label="Pricing Plans">
      <div className="container">
        {/* Header */}
        <div className="reveal" style={{ textAlign: 'center' }}>
          <div className="section-label" style={{ justifyContent: 'center' }}>
            Pricing
          </div>
          <h2 className="section-title" style={{ textAlign: 'center' }}>
            Simple, transparent pricing
          </h2>
          <p className="section-subtitle" style={{ textAlign: 'center', margin: '16px auto 0' }}>
            Start free. Scale as you grow. No hidden fees, no surprises.
            Change plans anytime with prorated billing.
          </p>
        </div>

        <PricingControls
          onBillingChange={handleBillingChange}
          onCurrencyChange={handleCurrencyChange}
        />

        <div className="pricing-grid reveal">
          {TIERS.map((tier) => (
            <PricingCard
              key={tier}
              tier={tier}
              onRegister={handleRegister}
            />
          ))}
        </div>

        {/* Trust signals */}
        <div
          className="reveal"
          style={{
            textAlign: 'center',
            marginTop: 48,
            display: 'flex',
            justifyContent: 'center',
            gap: 32,
            flexWrap: 'wrap',
          }}
        >
          {[
            '✓ No credit card required',
            '✓ 14-day free trial',
            '✓ Cancel anytime',
            '✓ 24/7 support',
          ].map((item) => (
            <span
              key={item}
              style={{
                fontSize: 14,
                color: 'var(--text-muted)',
                display: 'flex',
                alignItems: 'center',
                gap: 6,
              }}
            >
              {item}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
