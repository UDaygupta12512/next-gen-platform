export type Tier = 'starter' | 'pro' | 'enterprise';
export type Currency = 'INR' | 'USD' | 'EUR';
export type BillingCycle = 'monthly' | 'annual';

const BASE_RATES_USD: Record<Tier, number> = {
  starter: 29,
  pro: 79,
  enterprise: 199,
};

const ANNUAL_MULTIPLIER = 0.8;

export const REGIONAL_TARIFFS: Record<
  Currency,
  { rate: number; symbol: string; locale: string; code: string }
> = {
  USD: { rate: 1.0, symbol: '$', locale: 'en-US', code: 'USD' },
  INR: { rate: 83.5, symbol: 'Rs.', locale: 'en-IN', code: 'INR' },
  EUR: { rate: 0.92, symbol: 'EUR', locale: 'de-DE', code: 'EUR' },
};

export const TIER_META: Record<
  Tier,
  {
    name: string;
    tagline: string;
    highlight: boolean;
    badge: string | null;
    features: string[];
    cta: string;
  }
> = {
  starter: {
    name: 'Starter',
    tagline: 'Perfect for small teams getting started',
    highlight: false,
    badge: null,
    cta: 'Start Free Trial',
    features: [
      'Up to 5 data pipelines',
      '10GB data processing/mo',
      'AI-assisted automation',
      'Standard analytics dashboard',
      'Email support',
      '99.5% uptime SLA',
    ],
  },
  pro: {
    name: 'Pro',
    tagline: 'For growing teams that need more power',
    highlight: true,
    badge: 'Most Popular',
    cta: 'Get Started',
    features: [
      'Unlimited data pipelines',
      '500GB data processing/mo',
      'Advanced AI orchestration',
      'Real-time analytics & alerts',
      'Priority support (< 4hr)',
      '99.9% uptime SLA',
      'Custom integrations',
      'Team collaboration tools',
    ],
  },
  enterprise: {
    name: 'Enterprise',
    tagline: 'Full power for large-scale operations',
    highlight: false,
    badge: 'Custom',
    cta: 'Contact Sales',
    features: [
      'Unlimited everything',
      'Custom data processing',
      'Dedicated AI model tuning',
      'Advanced security & compliance',
      'Dedicated account manager',
      '99.99% uptime SLA',
      'On-premise deployment',
      'Custom SLAs & contracts',
    ],
  },
};

export function computePrice(
  tier: Tier,
  currency: Currency,
  billing: BillingCycle
): { monthly: string; perYear: string; savings: string } {
  const baseUSD = BASE_RATES_USD[tier];
  const tariff = REGIONAL_TARIFFS[currency];

  const monthlyUSD = baseUSD;
  const annualMonthlyUSD = baseUSD * ANNUAL_MULTIPLIER;

  const monthlyLocal = monthlyUSD * tariff.rate;
  const annualMonthlyLocal = annualMonthlyUSD * tariff.rate;
  const annualTotalLocal = annualMonthlyLocal * 12;
  const savingsLocal = monthlyLocal * 12 - annualTotalLocal;

  const fmt = (val: number) =>
    new Intl.NumberFormat(tariff.locale, {
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(Math.round(val));

  const symbolPrefix = tariff.symbol.endsWith('.') || tariff.symbol === '$' ? `${tariff.symbol}` : `${tariff.symbol} `;

  const displayMonthly =
    billing === 'monthly'
      ? `${symbolPrefix}${fmt(monthlyLocal)}`
      : `${symbolPrefix}${fmt(annualMonthlyLocal)}`;

  const perYear =
    billing === 'annual'
      ? `${symbolPrefix}${fmt(annualTotalLocal)}/year`
      : `${symbolPrefix}${fmt(monthlyLocal * 12)}/year`;

  const savings =
    billing === 'annual'
      ? `Save ${symbolPrefix}${fmt(savingsLocal)}/year`
      : '';

  return { monthly: displayMonthly, perYear, savings };
}

export const TIERS: Tier[] = ['starter', 'pro', 'enterprise'];
export const CURRENCIES: Currency[] = ['INR', 'USD', 'EUR'];
