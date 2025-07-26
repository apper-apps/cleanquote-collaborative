import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Error = ({ message = "Something went wrong", onRetry }) => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center space-y-6 max-w-md mx-auto px-6">
        <div className="w-16 h-16 bg-gradient-to-br from-error/20 to-red-100 rounded-full flex items-center justify-center mx-auto">
          <ApperIcon name="AlertCircle" className="w-8 h-8 text-error" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800 font-display">
            Oops! Something went wrong
          </h3>
          <p className="text-gray-600 text-sm">
            {message}
          </p>
        </div>
        
        {onRetry && (
          <Button 
            onClick={onRetry}
            variant="primary"
            className="inline-flex items-center space-x-2"
          >
            <ApperIcon name="RefreshCw" className="w-4 h-4" />
            <span>Try Again</span>
          </Button>
        )}
      </div>
    </div>
  )
}

export default Error