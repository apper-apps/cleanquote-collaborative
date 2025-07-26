import { forwardRef } from "react"
import { cn } from "@/utils/cn"

const Card = forwardRef(({ className, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "bg-white rounded-xl shadow-lg border border-gray-100 backdrop-blur-sm transition-all duration-200 hover:shadow-xl",
        className
      )}
      {...props}
    >
      {children}
    </div>
  )
})

Card.displayName = "Card"

export default Card