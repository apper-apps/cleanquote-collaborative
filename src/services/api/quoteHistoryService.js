import quoteHistoryData from "@/services/mockData/quoteHistory.json"

// Simulate API delay
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

class QuoteHistoryService {
  // Get all quote history
  async getAll() {
    await delay(300)
    return [...quoteHistoryData].sort((a, b) => new Date(b.date) - new Date(a.date))
  }

  // Get quote by ID
  async getById(id) {
    await delay(200)
    const quote = quoteHistoryData.find(q => q.Id === parseInt(id))
    if (!quote) {
      throw new Error(`Quote with ID ${id} not found`)
    }
    return { ...quote }
  }

  // Get recent quotes (last 5)
  async getRecent() {
    await delay(250)
    const sorted = [...quoteHistoryData].sort((a, b) => new Date(b.date) - new Date(a.date))
    return sorted.slice(0, 5)
  }

  // Get quote statistics
  async getStats() {
    await delay(200)
    
    if (quoteHistoryData.length === 0) {
      return {
        totalQuotes: 0,
        averageQuote: 0,
        totalRevenue: 0,
        mostPopularSize: "N/A"
      }
    }

    const totalQuotes = quoteHistoryData.length
    const totalRevenue = quoteHistoryData.reduce((sum, quote) => sum + quote.total, 0)
    const averageQuote = totalRevenue / totalQuotes

    // Find most popular home size
    const sizeCount = {}
    quoteHistoryData.forEach(quote => {
      sizeCount[quote.homeSize] = (sizeCount[quote.homeSize] || 0) + 1
    })
    const mostPopularSize = Object.keys(sizeCount).reduce((a, b) => 
      sizeCount[a] > sizeCount[b] ? a : b, "N/A"
    )

    return {
      totalQuotes,
      averageQuote: Math.round(averageQuote * 100) / 100,
      totalRevenue: Math.round(totalRevenue * 100) / 100,
      mostPopularSize
    }
  }

  // Delete quote
  async delete(id) {
    await delay(200)
    const index = quoteHistoryData.findIndex(q => q.Id === parseInt(id))
    if (index === -1) {
      throw new Error(`Quote with ID ${id} not found`)
    }
    return quoteHistoryData.splice(index, 1)[0]
  }
}

export default new QuoteHistoryService()