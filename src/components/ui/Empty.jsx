import Button from "@/components/atoms/Button"
import ApperIcon from "@/components/ApperIcon"

const Empty = ({ 
  title = "No data available", 
  description = "Get started by creating your first item",
  actionLabel = "Get Started",
  onAction,
  icon = "Inbox"
}) => {
  return (
    <div className="flex items-center justify-center min-h-[400px]">
      <div className="text-center space-y-6 max-w-md mx-auto px-6">
        <div className="w-16 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-full flex items-center justify-center mx-auto">
          <ApperIcon name={icon} className="w-8 h-8 text-gray-500" />
        </div>
        
        <div className="space-y-2">
          <h3 className="text-lg font-semibold text-gray-800 font-display">
            {title}
          </h3>
          <p className="text-gray-600 text-sm">
            {description}
          </p>
        </div>
        
        {onAction && (
          <Button 
            onClick={onAction}
            variant="primary"
          >
            {actionLabel}
          </Button>
        )}
      </div>
    </div>
  )
}

export default Empty