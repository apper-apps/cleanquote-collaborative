import { motion } from "framer-motion"

const Loading = () => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center space-y-4">
        <motion.div 
          className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full mx-auto"
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
        />
        <div className="space-y-2">
          <div className="h-4 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-32 mx-auto"></div>
          <div className="h-3 bg-gradient-to-r from-gray-200 to-gray-300 rounded animate-pulse w-24 mx-auto"></div>
        </div>
        <p className="text-gray-600 text-sm">Loading pricing data...</p>
      </div>
    </div>
  )
}

export default Loading