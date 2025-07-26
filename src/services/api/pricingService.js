import pricingData from "@/services/mockData/pricing.json"
import quoteHistoryData from "@/services/mockData/quoteHistory.json"

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

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
  async calculateQuote(homeSize, frequency) {
    await delay(250)
    
    const basePricing = pricingData.find(p => p.homeSize === homeSize)
    if (!basePricing) {
      throw new Error(`Pricing for ${homeSize} not found`)
    }

    const frequencyDiscounts = {
      "One-time": 0,
      "Weekly": 15,
      "Bi-weekly": 10,
      "Monthly": 5
    }

    const discount = frequencyDiscounts[frequency] || 0
    const basePrice = basePricing.basePrice
    const totalPrice = basePrice * ((100 - discount) / 100)

    return {
      homeSize,
      frequency,
      basePrice,
      discount,
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
}

export default new PricingService()