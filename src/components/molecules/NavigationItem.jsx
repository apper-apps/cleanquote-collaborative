import { NavLink } from "react-router-dom"
import ApperIcon from "@/components/ApperIcon"

const NavigationItem = ({ to, icon, label, badge }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `flex items-center space-x-3 px-4 py-3 rounded-lg transition-all duration-200 group ${
          isActive
            ? "bg-gradient-to-r from-primary/20 to-blue-50 text-primary border-r-2 border-primary"
            : "text-gray-600 hover:text-primary hover:bg-primary/5"
        }`
      }
    >
      <ApperIcon 
        name={icon} 
        className="w-5 h-5 transition-transform duration-200 group-hover:scale-110" 
      />
      <span className="font-medium">{label}</span>
      {badge && (
        <span className="ml-auto bg-gradient-to-r from-accent to-green-600 text-white text-xs px-2 py-0.5 rounded-full">
          {badge}
        </span>
      )}
    </NavLink>
  )
}

export default NavigationItem