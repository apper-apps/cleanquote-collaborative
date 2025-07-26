import { motion } from "framer-motion"
import Button from "@/components/atoms/Button"
import Badge from "@/components/atoms/Badge"

const FrequencyButton = ({ frequency, discount, isSelected, onClick }) => {
  return (
    <motion.div
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="relative"
    >
      <Button
        variant={isSelected ? "primary" : "outline"}
        size="lg"
        onClick={onClick}
        className={`w-full justify-between ${
          isSelected 
            ? "shadow-xl transform scale-105" 
            : "hover:shadow-lg"
        }`}
      >
        <span className="font-semibold">{frequency}</span>
        {discount > 0 && (
          <Badge 
            variant={isSelected ? "success" : "warning"} 
            size="sm"
            className="ml-2"
          >
            {discount}% OFF
          </Badge>
        )}
      </Button>
    </motion.div>
  )
}

export default FrequencyButton