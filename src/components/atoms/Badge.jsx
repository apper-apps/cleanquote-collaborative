import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Badge = forwardRef(({ 
  className, 
  variant = "default", 
  size = "sm",
  children, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium rounded-full transition-colors"
  
  const variants = {
    default: "bg-gray-100 text-gray-800",
    primary: "bg-gradient-to-r from-primary/20 to-blue-100 text-primary border border-primary/20",
    secondary: "bg-gradient-to-r from-secondary/20 to-purple-100 text-secondary border border-secondary/20",
    success: "bg-gradient-to-r from-accent/20 to-green-100 text-accent border border-accent/20",
    warning: "bg-gradient-to-r from-warning/20 to-yellow-100 text-warning border border-warning/20",
    error: "bg-gradient-to-r from-error/20 to-red-100 text-error border border-error/20"
  }

  const sizes = {
    sm: "px-2 py-1 text-xs",
    md: "px-3 py-1.5 text-sm",
    lg: "px-4 py-2 text-base"
  }

  return (
    <span
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      {...props}
    >
      {children}
    </span>
  )
})

Badge.displayName = "Badge"

export default Badge