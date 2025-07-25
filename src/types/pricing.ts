/**
 * Pricing related type definitions
 * Centralized types for pricing plans, comparisons, and related data structures
 */

export interface PricingPlan {
  name: string
  price: string
  originalPrice?: string
  period: string
  description: string
  features: string[]
  limitations: string[]
  popular: boolean
  buttonText: string
  buttonVariant: string
}

export interface ComparisonFeature {
  name: string
  starter: string | boolean
  professional: string | boolean
  enterprise: string | boolean
}

export interface ComparisonFeatureItem {
  name: string
  starter: boolean | string
  professional: boolean | string
  enterprise: boolean | string
}

export interface ComparisonFeatureCategory {
  category: string
  items: ComparisonFeatureItem[]
}

export interface ComparisonData {
  title: string
  description: string
  tableHeaders?: {
    features: string
    starter: string
    professional: string
    enterprise: string
  }
  planPricing?: {
    starter: string
    professional: string
    enterprise: string
  }
  features: ComparisonFeatureCategory[]
}

export interface PricingConfig {
  plans: PricingPlan[]
  comparison: Array<{
    category: string
    features: ComparisonFeature[]
  }>
  faqs: Array<{
    question: string
    answer: string
  }>
} 