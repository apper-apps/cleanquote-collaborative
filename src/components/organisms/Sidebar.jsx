import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import NavigationItem from "@/components/molecules/NavigationItem"
import ApperIcon from "@/components/ApperIcon"

const Sidebar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const navigationItems = [
    { to: "/calculator", icon: "Calculator", label: "Calculator" },
    { to: "/dashboard", icon: "BarChart3", label: "Dashboard" }
  ]

  // Desktop Sidebar
  const DesktopSidebar = () => (
    <div className="hidden lg:flex lg:w-64 lg:flex-col lg:fixed lg:inset-y-0 bg-white border-r border-gray-200">
      <div className="flex-1 flex flex-col min-h-0 pt-6 pb-4">
        <div className="flex items-center flex-shrink-0 px-4 mb-8">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <ApperIcon name="Sparkles" className="w-5 h-5 text-white" />
          </div>
          <span className="ml-3 text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-display">
            CleanQuote Pro
          </span>
        </div>
        
        <nav className="mt-5 flex-1 px-4 space-y-2">
          {navigationItems.map((item) => (
            <NavigationItem
              key={item.to}
              to={item.to}
              icon={item.icon}
              label={item.label}
            />
          ))}
        </nav>
        
        <div className="flex-shrink-0 px-4 py-4 border-t border-gray-200">
          <div className="text-xs text-gray-500 space-y-1">
            <div className="flex items-center space-x-2">
              <ApperIcon name="Phone" className="w-3 h-3" />
              <span>(555) 123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <ApperIcon name="Mail" className="w-3 h-3" />
              <span>hello@cleanquotepro.com</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )

  // Mobile Sidebar Overlay
  const MobileSidebar = () => (
    <>
      <div className="lg:hidden flex items-center justify-between p-4 bg-white border-b border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
            <ApperIcon name="Sparkles" className="w-5 h-5 text-white" />
          </div>
          <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-display">
            CleanQuote Pro
          </span>
        </div>
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors duration-200"
        >
          <ApperIcon name={isMobileMenuOpen ? "X" : "Menu"} className="w-6 h-6" />
        </button>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
              onClick={() => setIsMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ type: "tween", duration: 0.3 }}
              className="lg:hidden fixed inset-y-0 left-0 z-50 w-64 bg-white shadow-xl"
            >
              <div className="flex flex-col h-full">
                <div className="flex items-center justify-between p-4 border-b border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                      <ApperIcon name="Sparkles" className="w-5 h-5 text-white" />
                    </div>
                    <span className="text-lg font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent font-display">
                      CleanQuote Pro
                    </span>
                  </div>
                  <button
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg text-gray-600 hover:bg-gray-100"
                  >
                    <ApperIcon name="X" className="w-5 h-5" />
                  </button>
                </div>
                
                <nav className="flex-1 px-4 py-6 space-y-2">
                  {navigationItems.map((item) => (
                    <div key={item.to} onClick={() => setIsMobileMenuOpen(false)}>
                      <NavigationItem
                        to={item.to}
                        icon={item.icon}
                        label={item.label}
                      />
                    </div>
                  ))}
                </nav>
                
                <div className="px-4 py-4 border-t border-gray-200">
                  <div className="text-xs text-gray-500 space-y-1">
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="Phone" className="w-3 h-3" />
                      <span>(555) 123-4567</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <ApperIcon name="Mail" className="w-3 h-3" />
                      <span>hello@cleanquotepro.com</span>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  )

  return (
    <>
      <DesktopSidebar />
      <MobileSidebar />
    </>
  )
}

export default Sidebar