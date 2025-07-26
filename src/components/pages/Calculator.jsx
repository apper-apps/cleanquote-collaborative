import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { toast } from "react-toastify"
import HomeSizeCard from "@/components/molecules/HomeSizeCard"
import FrequencyButton from "@/components/molecules/FrequencyButton"
import PriceCard from "@/components/molecules/PriceCard"
import Button from "@/components/atoms/Button"
import Loading from "@/components/ui/Loading"
import Error from "@/components/ui/Error"
import pricingService from "@/services/api/pricingService"

const Calculator = () => {
  const [pricingOptions, setPricingOptions] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  
  const [selectedHomeSize, setSelectedHomeSize] = useState("")
  const [selectedFrequency, setSelectedFrequency] = useState("One-time")
  const [currentQuote, setCurrentQuote] = useState({
    basePrice: 0,
    discount: 0,
    totalPrice: 0
  })

  const frequencyOptions = [
    { name: "One-time", discount: 0 },
    { name: "Weekly", discount: 15 },
    { name: "Bi-weekly", discount: 10 },
    { name: "Monthly", discount: 5 }
  ]

  // Load pricing data
  const loadPricingData = async () => {
    try {
      setLoading(true)
      setError("")
      const data = await pricingService.getAll()
      setPricingOptions(data)
      
      // Set default selection
      if (data.length > 0) {
        setSelectedHomeSize(data[0].homeSize)
        await calculateQuote(data[0].homeSize, selectedFrequency)
      }
    } catch (err) {
      setError(err.message || "Failed to load pricing data")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    loadPricingData()
  }, [])

  // Calculate quote when selections change
  const calculateQuote = async (homeSize, frequency) => {
    try {
      const quote = await pricingService.calculateQuote(homeSize, frequency)
      setCurrentQuote(quote)
    } catch (err) {
      toast.error("Failed to calculate quote")
    }
  }

  useEffect(() => {
    if (selectedHomeSize && selectedFrequency) {
      calculateQuote(selectedHomeSize, selectedFrequency)
    }
  }, [selectedHomeSize, selectedFrequency])

  const handleHomeSizeChange = (homeSize) => {
    setSelectedHomeSize(homeSize)
  }

  const handleFrequencyChange = (frequency) => {
    setSelectedFrequency(frequency)
  }

  const handleSaveQuote = async () => {
    try {
      await pricingService.saveQuote(currentQuote)
      toast.success("Quote saved successfully!")
    } catch (err) {
      toast.error("Failed to save quote")
    }
  }

  if (loading) return <Loading />
  if (error) return <Error message={error} onRetry={loadPricingData} />

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="space-y-8"
      >
        {/* Header */}
        <div className="text-center space-y-4">
          <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-display">
            Get Your Instant Quote
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Professional cleaning services tailored to your home. 
            Select your home size and frequency for an instant quote.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calculator Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Home Size Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.1 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 font-display mb-2">
                  Select Your Home Size
                </h2>
                <p className="text-gray-600">
                  Choose the option that best describes your living space
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {pricingOptions.map((option) => (
                  <HomeSizeCard
                    key={option.Id}
                    size={option.homeSize}
                    icon={option.icon}
                    basePrice={option.basePrice}
                    isSelected={selectedHomeSize === option.homeSize}
                    onClick={() => handleHomeSizeChange(option.homeSize)}
                  />
                ))}
              </div>
            </motion.div>

            {/* Frequency Selection */}
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-6"
            >
              <div>
                <h2 className="text-2xl font-semibold text-gray-800 font-display mb-2">
                  Choose Cleaning Frequency
                </h2>
                <p className="text-gray-600">
                  Regular cleanings save you money with our discount pricing
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {frequencyOptions.map((option) => (
                  <FrequencyButton
                    key={option.name}
                    frequency={option.name}
                    discount={option.discount}
                    isSelected={selectedFrequency === option.name}
                    onClick={() => handleFrequencyChange(option.name)}
                  />
                ))}
              </div>
            </motion.div>

            {/* Action Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-4"
            >
              <Button 
                variant="primary" 
                size="lg"
                onClick={handleSaveQuote}
                className="flex-1"
              >
                Save This Quote
              </Button>
              <Button 
                variant="outline" 
                size="lg"
                onClick={() => window.open("tel:+15551234567")}
                className="flex-1"
              >
                Call to Book Now
              </Button>
            </motion.div>
          </div>

          {/* Price Display */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-1"
          >
            <PriceCard
              basePrice={currentQuote.basePrice}
              discount={currentQuote.discount}
              totalPrice={currentQuote.totalPrice}
              frequency={selectedFrequency}
            />
          </motion.div>
        </div>

        {/* Features */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-gradient-to-br from-surface to-white rounded-xl p-6 border border-gray-200"
        >
          <h3 className="text-lg font-semibold text-gray-800 font-display mb-4">
            What's Included in Every Cleaning
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">✓</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Deep Cleaning</h4>
                <p className="text-sm text-gray-600">Thorough cleaning of all surfaces and areas</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">✓</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Eco-Friendly Products</h4>
                <p className="text-sm text-gray-600">Safe, non-toxic cleaning supplies</p>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-8 h-8 bg-gradient-to-br from-accent to-green-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm font-bold">✓</span>
              </div>
              <div>
                <h4 className="font-medium text-gray-800">Satisfaction Guaranteed</h4>
                <p className="text-sm text-gray-600">100% satisfaction or we'll make it right</p>
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}

export default Calculator