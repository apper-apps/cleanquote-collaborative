import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Button = forwardRef(({ 
  className, 
  variant = "primary", 
  size = "md",
  children, 
  ...props 
}, ref) => {
  const baseStyles = "inline-flex items-center justify-center font-medium transition-all duration-200 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-offset-2"
  
  const variants = {
    primary: "bg-gradient-to-r from-primary to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 focus:ring-primary shadow-lg hover:shadow-xl transform hover:scale-105",
    secondary: "bg-gradient-to-r from-secondary to-purple-600 text-white hover:from-purple-600 hover:to-purple-700 focus:ring-secondary shadow-lg hover:shadow-xl transform hover:scale-105",
    outline: "border-2 border-primary text-primary hover:bg-primary hover:text-white focus:ring-primary",
    ghost: "text-gray-600 hover:text-primary hover:bg-primary/10 focus:ring-primary",
    success: "bg-gradient-to-r from-accent to-green-600 text-white hover:from-green-600 hover:to-green-700 focus:ring-accent shadow-lg hover:shadow-xl transform hover:scale-105"
  }

  const sizes = {
    sm: "h-9 px-3 text-sm",
    md: "h-11 px-4 text-base",
    lg: "h-12 px-6 text-lg",
    xl: "h-14 px-8 text-xl"
  }

  return (
    <button
      className={cn(baseStyles, variants[variant], sizes[size], className)}
      ref={ref}
      {...props}
    >
      {children}
    </button>
  )
})

Button.displayName = "Button"

export default Button