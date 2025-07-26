import Card from "@/components/atoms/Card"
import { motion } from "framer-motion"

const PriceCard = ({ basePrice, discount, totalPrice, frequency }) => {
  const savings = basePrice * (discount / 100)
  
  return (
    <Card className="p-6 bg-gradient-to-br from-surface to-white sticky top-6">
      <div className="text-center space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 font-display">
          Quote Summary
        </h3>
        
        <div className="space-y-3">
          <div className="flex justify-between items-center text-sm">
            <span className="text-gray-600">Base Price</span>
            <span className="font-medium">${basePrice.toFixed(2)}</span>
          </div>
          
          {discount > 0 && (
            <motion.div 
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex justify-between items-center text-sm"
            >
              <span className="text-accent">{frequency} Discount ({discount}%)</span>
              <span className="text-accent font-medium">-${savings.toFixed(2)}</span>
            </motion.div>
          )}
          
          <div className="border-t border-gray-200 pt-3">
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold text-gray-800">Total</span>
              <motion.span 
                key={totalPrice}
                initial={{ scale: 1.1, color: "#10B981" }}
                animate={{ scale: 1, color: "#1f2937" }}
                transition={{ duration: 0.3 }}
                className="text-2xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent"
              >
                ${totalPrice.toFixed(2)}
              </motion.span>
            </div>
          </div>
        </div>
        
        {frequency !== "One-time" && (
          <p className="text-xs text-gray-500 mt-2">
            Price per {frequency.toLowerCase()} cleaning
          </p>
        )}
      </div>
    </Card>
  )
}

export default PriceCard