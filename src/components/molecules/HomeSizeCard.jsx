import { motion } from "framer-motion"
import Card from "@/components/atoms/Card"
import ApperIcon from "@/components/ApperIcon"

const HomeSizeCard = ({ size, icon, basePrice, isSelected, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
    >
      <Card
        className={`p-6 cursor-pointer transition-all duration-200 ${
          isSelected
            ? "ring-2 ring-primary bg-gradient-to-br from-primary/5 to-blue-50 shadow-xl"
            : "hover:shadow-xl hover:bg-gradient-to-br hover:from-gray-50 hover:to-white"
        }`}
        onClick={onClick}
      >
        <div className="text-center space-y-4">
          <div className={`w-16 h-16 mx-auto rounded-full flex items-center justify-center ${
            isSelected 
              ? "bg-gradient-to-br from-primary to-blue-600 text-white" 
              : "bg-gradient-to-br from-gray-100 to-gray-200 text-gray-600"
          } transition-all duration-200`}>
            <ApperIcon name={icon} className="w-8 h-8" />
          </div>
          
          <div>
            <h3 className={`text-lg font-semibold font-display ${
              isSelected ? "text-primary" : "text-gray-800"
            }`}>
              {size}
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              Starting at ${basePrice.toFixed(2)}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default HomeSizeCard