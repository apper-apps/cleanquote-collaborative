import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { format } from "date-fns"
import Card from "@/components/atoms/Card"
import Badge from "@/components/atoms/Badge"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import Empty from "@/components/ui/Empty"
import ApperIcon from "@/components/ApperIcon"
import quoteHistoryService from "@/services/api/quoteHistoryService"

const Dashboard = () => {
  const [stats, setStats] = useState({})
  const [recentQuotes, setRecentQuotes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  // Load dashboard data
  const loadDashboardData = async () => {
    try {
      setLoading(true)
      setError("")
      
      const [statsData, quotesData] = await Promise.all([
        quoteHistoryService.getStats(),
        quoteHistoryService.getRecent()
      ])
      
      setStats(statsData)
      setRecentQuotes(quotesData)
    } catch (err) {
      setError(err.message || "Failed to load dashboard data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadDashboardData()
  }, [])

  const getFrequencyColor = (frequency) => {
    switch (frequency) {
      case "Weekly": return "success"
      case "Bi-weekly": return "primary"
      case "Monthly": return "secondary"
      default: return "default"
    }
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadDashboardData} />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-display">
            Dashboard
          </h1>
          <p className="text-lg text-gray-600">
            Overview of your cleaning service pricing and quote history
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
          >
            <Card className="p-6 bg-gradient-to-br from-primary/5 to-blue-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Total Quotes</p>
                  <p className="text-3xl font-bold text-primary mt-1">
                    {stats.totalQuotes || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center">
                  <ApperIcon name="FileText" className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            <Card className="p-6 bg-gradient-to-br from-accent/5 to-green-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Average Quote</p>
                  <p className="text-3xl font-bold text-accent mt-1">
                    ${stats.averageQuote || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-accent to-green-600 rounded-lg flex items-center justify-center">
                  <ApperIcon name="DollarSign" className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Card className="p-6 bg-gradient-to-br from-secondary/5 to-purple-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Total Revenue</p>
                  <p className="text-3xl font-bold text-secondary mt-1">
                    ${stats.totalRevenue || 0}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-secondary to-purple-600 rounded-lg flex items-center justify-center">
                  <ApperIcon name="TrendingUp" className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
          >
            <Card className="p-6 bg-gradient-to-br from-warning/5 to-yellow-50">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600 font-medium">Popular Size</p>
                  <p className="text-2xl font-bold text-warning mt-1">
                    {stats.mostPopularSize || "N/A"}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-to-br from-warning to-yellow-600 rounded-lg flex items-center justify-center">
                  <ApperIcon name="Home" className="w-6 h-6 text-white" />
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Recent Quotes */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Card className="p-6">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-gray-800 font-display">
                Recent Quotes
              </h2>
              <Badge variant="primary" size="sm">
                Last 5 quotes
              </Badge>
            </div>

            {recentQuotes.length === 0 ? (
              <Empty
                title="No quotes yet"
                description="Start creating quotes to see them here"
                icon="Calculator"
                actionLabel="Create Quote"
                onAction={() => window.location.href = "/calculator"}
              />
            ) : (
              <div className="space-y-4">
                {recentQuotes.map((quote, index) => (
                  <motion.div
                    key={quote.Id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 * index }}
                    className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-100 hover:shadow-md transition-all duration-200"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="w-10 h-10 bg-gradient-to-br from-primary/20 to-blue-100 rounded-lg flex items-center justify-center">
                        <ApperIcon name="Home" className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800">{quote.homeSize}</p>
                        <p className="text-sm text-gray-600">
                          {format(new Date(quote.date), "MMM dd, yyyy 'at' h:mm a")}
                        </p>
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-3">
                      <Badge 
                        variant={getFrequencyColor(quote.frequency)} 
                        size="sm"
                      >
                        {quote.frequency}
                      </Badge>
                      <div className="text-right">
                        <p className="text-lg font-bold text-gray-800">
                          ${quote.total.toFixed(2)}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            )}
          </Card>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
        >
          <Card className="p-6 bg-gradient-to-br from-surface to-white">
            <h3 className="text-lg font-semibold text-gray-800 font-display mb-4">
              Quick Actions
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <button
                onClick={() => window.location.href = "/calculator"}
                className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md hover:border-primary/20 transition-all duration-200 group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-primary to-blue-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <ApperIcon name="Calculator" className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-800">New Quote</p>
                  <p className="text-xs text-gray-600">Calculate pricing</p>
                </div>
              </button>

<button
                onClick={() => window.location.href = "/rates"}
                className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md hover:border-accent/20 transition-all duration-200 group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-accent to-green-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <ApperIcon name="DollarSign" className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-800">Configure Rates</p>
                  <p className="text-xs text-gray-600">Set your pricing</p>
                </div>
              </button>

              <button
                onClick={() => window.open("tel:+15551234567")}
                className="flex items-center space-x-3 p-4 bg-white rounded-lg border border-gray-200 hover:shadow-md hover:border-secondary/20 transition-all duration-200 group"
              >
                <div className="w-10 h-10 bg-gradient-to-br from-secondary to-purple-600 rounded-lg flex items-center justify-center group-hover:scale-110 transition-transform duration-200">
                  <ApperIcon name="Phone" className="w-5 h-5 text-white" />
                </div>
                <div className="text-left">
                  <p className="font-medium text-gray-800">Call Support</p>
                  <p className="text-xs text-gray-600">Get help</p>
                </div>
              </button>
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Dashboard