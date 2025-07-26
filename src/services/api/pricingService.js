import pricingData from "@/services/mockData/pricing.json"
import quoteHistoryData from "@/services/mockData/quoteHistory.json"

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

// Default rate configuration
let rateConfig = {
  hourlyRate: 25,
  timeEstimates: {
    "Studio": 2,
    "1 Bedroom": 2.5,
    "2 Bedroom": 3.5,
    "3+ Bedroom": 5
  },
  extraCharges: {
    pets: { enabled: true, amount: 15, description: "Pet hair and cleanup" },
    deepCleaning: { enabled: true, amount: 50, description: "Deep cleaning service" },
    windows: { enabled: true, amount: 25, description: "Interior window cleaning" },
    oven: { enabled: true, amount: 20, description: "Oven deep cleaning" },
    refrigerator: { enabled: true, amount: 15, description: "Refrigerator cleaning" }
  },
  frequencyDiscounts: {
    "One-time": 0,
    "Weekly": 15,
    "Bi-weekly": 10,
    "Monthly": 5
  },
  minimumCharge: 50,
  travelFee: { enabled: false, amount: 10, maxDistance: 15 },
  recurringDiscount: { enabled: true, amount: 5, description: "Loyal customer discount" }
}

class PricingService {
  // Get all pricing configurations
  async getAll() {
    await delay(300)
    return [...pricingData]
  }

  // Get pricing by home size
  async getByHomeSize(homeSize) {
    await delay(200)
    const pricing = pricingData.find(p => p.homeSize === homeSize)
    if (!pricing) {
      throw new Error(`Pricing for ${homeSize} not found`)
    }
    return { ...pricing }
  }

  // Calculate quote based on parameters
  async calculateQuote(homeSize, frequency, extras = {}) {
    await delay(250)
    
    const timeEstimate = rateConfig.timeEstimates[homeSize] || 3
    let basePrice = rateConfig.hourlyRate * timeEstimate
    
    // Apply extra charges
    let extraTotal = 0
    Object.entries(extras).forEach(([key, selected]) => {
      if (selected && rateConfig.extraCharges[key]?.enabled) {
        extraTotal += rateConfig.extraCharges[key].amount
      }
    })
    
    const subtotal = basePrice + extraTotal
    const discount = rateConfig.frequencyDiscounts[frequency] || 0
    let totalPrice = subtotal * ((100 - discount) / 100)
    
    // Apply minimum charge
    if (totalPrice < rateConfig.minimumCharge) {
      totalPrice = rateConfig.minimumCharge
    }
    
    // Apply travel fee if enabled
    if (rateConfig.travelFee.enabled) {
      totalPrice += rateConfig.travelFee.amount
    }

    return {
      homeSize,
      frequency,
      basePrice,
      extraCharges: extraTotal,
      subtotal,
      discount,
      minimumApplied: totalPrice === rateConfig.minimumCharge && subtotal < rateConfig.minimumCharge,
      travelFee: rateConfig.travelFee.enabled ? rateConfig.travelFee.amount : 0,
      totalPrice: Math.round(totalPrice * 100) / 100
    }
  }

  // Save quote to history
  async saveQuote(quoteData) {
    await delay(200)
    
    const maxId = Math.max(...quoteHistoryData.map(q => q.Id), 0)
    const newQuote = {
      Id: maxId + 1,
      date: new Date().toISOString(),
      homeSize: quoteData.homeSize,
      frequency: quoteData.frequency,
      total: quoteData.totalPrice
    }
    
    quoteHistoryData.push(newQuote)
    return { ...newQuote }
  }

  // Get current rate configuration
  async getRateConfig() {
    await delay(200)
    return { ...rateConfig }
  }

  // Update rate configuration
  async updateRateConfig(newConfig) {
    await delay(300)
    rateConfig = { ...rateConfig, ...newConfig }
    return { ...rateConfig }
  }

  // Reset to default configuration
  async resetToDefaults() {
    await delay(200)
    rateConfig = {
      hourlyRate: 25,
      timeEstimates: {
        "Studio": 2,
        "1 Bedroom": 2.5,
        "2 Bedroom": 3.5,
        "3+ Bedroom": 5
      },
      extraCharges: {
        pets: { enabled: true, amount: 15, description: "Pet hair and cleanup" },
        deepCleaning: { enabled: true, amount: 50, description: "Deep cleaning service" },
        windows: { enabled: true, amount: 25, description: "Interior window cleaning" },
        oven: { enabled: true, amount: 20, description: "Oven deep cleaning" },
        refrigerator: { enabled: true, amount: 15, description: "Refrigerator cleaning" }
      },
      frequencyDiscounts: {
        "One-time": 0,
        "Weekly": 15,
        "Bi-weekly": 10,
        "Monthly": 5
      },
      minimumCharge: 50,
      travelFee: { enabled: false, amount: 10, maxDistance: 15 },
      recurringDiscount: { enabled: true, amount: 5, description: "Loyal customer discount" }
    }
    return { ...rateConfig }
  }
}

export default new PricingService()