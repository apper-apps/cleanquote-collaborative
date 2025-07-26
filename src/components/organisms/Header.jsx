import ApperIcon from "@/components/ApperIcon"

const Header = () => {
  return (
    <header className="bg-white border-b border-gray-200 px-6 py-4 sticky top-0 z-40 backdrop-blur-sm bg-white/95">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <ApperIcon name="Sparkles" className="w-6 h-6 text-white" />
          </div>
          <div>
            <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-display">
              CleanQuote Pro
            </h1>
            <p className="text-xs text-gray-500">Instant Cleaning Quotes</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-4">
          <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
            <ApperIcon name="Clock" className="w-4 h-4" />
            <span>Instant Quotes</span>
          </div>
          <div className="hidden sm:flex items-center space-x-2 text-sm text-gray-600">
            <ApperIcon name="Shield" className="w-4 h-4" />
            <span>Trusted Service</span>
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header