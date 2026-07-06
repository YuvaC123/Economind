export interface Persona {
  id: string
  name: string
  age: number
  gender: 'male' | 'female' | 'other'
  education: 'high-school' | 'bachelors' | 'masters' | 'phd'
  income: number
  wealth: number
  savings: number
  debt: number
  monthlyExpenses: number
  riskAppetite: 'conservative' | 'moderate' | 'aggressive'
  spendingBehavior: 'frugal' | 'balanced' | 'lavish'
  savingPreference: 'emergency' | 'retirement' | 'investment'
  investmentPreference: 'stocks' | 'bonds' | 'real-estate' | 'diversified'
}

export interface MacroeconomicEnvironment {
  inflation: number
  interestRate: number
  gdpGrowth: number
  unemployment: number
  wageGrowth: number
  housingPrices: number
  energyPrices: number
  aiAdoption: number
  marketConfidence: number
}

export interface Scenario {
  id: string
  name: string
  description: string
  macro: MacroeconomicEnvironment
  type: 'predefined' | 'custom'
}

export interface SimulationResult {
  id: string
  personaId: string
  scenarioId: string
  decisions: {
    spending: number
    saving: number
    borrowing: number
    investing: number
  }
  confidence: {
    spending: number
    saving: number
    borrowing: number
    investing: number
  }
  behavioralTraits: {
    riskTolerance: number
    futureOrientation: number
    impulsivity: number
    socialConformity: number
  }
  theoryAlignment: {
    rationalChoice: number
    behavioralEconomics: number
    keynesianEconomics: number
    austrianEconomics: number
  }
  reasoning: string[]
  timestamp: Date
}

export const DEFAULT_PERSONA: Persona = {
  id: 'persona-1',
  name: 'Sarah Chen',
  age: 35,
  gender: 'female',
  education: 'masters',
  income: 85000,
  wealth: 250000,
  savings: 45000,
  debt: 15000,
  monthlyExpenses: 3500,
  riskAppetite: 'moderate',
  spendingBehavior: 'balanced',
  savingPreference: 'retirement',
  investmentPreference: 'diversified',
}

export const PREDEFINED_SCENARIOS: Scenario[] = [
  {
    id: 'scenario-1',
    name: 'Low Inflation Economy',
    description: 'Stable economic conditions with low inflation and moderate growth',
    type: 'predefined',
    macro: {
      inflation: 2.0,
      interestRate: 4.5,
      gdpGrowth: 2.8,
      unemployment: 4.2,
      wageGrowth: 2.5,
      housingPrices: 105,
      energyPrices: 85,
      aiAdoption: 35,
      marketConfidence: 72,
    },
  },
  {
    id: 'scenario-2',
    name: 'High Inflation Scenario',
    description: 'Economic stress with elevated inflation and rising interest rates',
    type: 'predefined',
    macro: {
      inflation: 7.5,
      interestRate: 8.2,
      gdpGrowth: 1.2,
      unemployment: 5.8,
      wageGrowth: 3.2,
      housingPrices: 92,
      energyPrices: 142,
      aiAdoption: 28,
      marketConfidence: 45,
    },
  },
  {
    id: 'scenario-3',
    name: 'AI Revolution Boom',
    description: 'High growth period driven by AI adoption and technological innovation',
    type: 'predefined',
    macro: {
      inflation: 3.2,
      interestRate: 5.5,
      gdpGrowth: 4.5,
      unemployment: 3.1,
      wageGrowth: 4.8,
      housingPrices: 118,
      energyPrices: 88,
      aiAdoption: 72,
      marketConfidence: 85,
    },
  },
  {
    id: 'scenario-4',
    name: 'Recession Conditions',
    description: 'Economic contraction with rising unemployment and declining growth',
    type: 'predefined',
    macro: {
      inflation: 2.1,
      interestRate: 2.8,
      gdpGrowth: -1.5,
      unemployment: 8.5,
      wageGrowth: -0.5,
      housingPrices: 78,
      energyPrices: 72,
      aiAdoption: 22,
      marketConfidence: 28,
    },
  },
]

export function generateMockSimulationResult(
  personaId: string,
  scenarioId: string,
): SimulationResult {
  return {
    id: `result-${Date.now()}`,
    personaId,
    scenarioId,
    decisions: {
      spending: 3200 + Math.random() * 500,
      saving: 1200 + Math.random() * 400,
      borrowing: Math.random() * 200,
      investing: 800 + Math.random() * 600,
    },
    confidence: {
      spending: 0.75 + Math.random() * 0.2,
      saving: 0.68 + Math.random() * 0.25,
      borrowing: 0.45 + Math.random() * 0.35,
      investing: 0.62 + Math.random() * 0.28,
    },
    behavioralTraits: {
      riskTolerance: 0.62 + Math.random() * 0.25,
      futureOrientation: 0.74 + Math.random() * 0.2,
      impulsivity: 0.38 + Math.random() * 0.3,
      socialConformity: 0.55 + Math.random() * 0.3,
    },
    theoryAlignment: {
      rationalChoice: 0.71 + Math.random() * 0.15,
      behavioralEconomics: 0.68 + Math.random() * 0.2,
      keynesianEconomics: 0.62 + Math.random() * 0.25,
      austrianEconomics: 0.52 + Math.random() * 0.3,
    },
    reasoning: [
      'Consumer prioritizes stable employment with current economic conditions',
      'Household savings buffer adequate for 6-month emergency fund',
      'Investment allocation reflects moderate risk tolerance',
      'Spending patterns show counter-cyclical behavior to market conditions',
      'Borrowing decisions influenced by current interest rate environment',
    ],
    timestamp: new Date(),
  }
}

export const ECONOMIC_INDICATORS = [
  { label: 'Inflation Rate (%)', key: 'inflation', min: 0, max: 12, step: 0.5 },
  { label: 'Interest Rate (%)', key: 'interestRate', min: 0, max: 10, step: 0.5 },
  { label: 'GDP Growth (%)', key: 'gdpGrowth', min: -3, max: 6, step: 0.5 },
  { label: 'Unemployment (%)', key: 'unemployment', min: 2, max: 12, step: 0.5 },
  { label: 'Wage Growth (%)', key: 'wageGrowth', min: -2, max: 8, step: 0.5 },
  { label: 'Housing Prices (index)', key: 'housingPrices', min: 50, max: 150, step: 5 },
  { label: 'Energy Prices (index)', key: 'energyPrices', min: 40, max: 200, step: 10 },
  { label: 'AI Adoption (%)', key: 'aiAdoption', min: 0, max: 100, step: 5 },
  { label: 'Market Confidence (index)', key: 'marketConfidence', min: 0, max: 100, step: 5 },
]
