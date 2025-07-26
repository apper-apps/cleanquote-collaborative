import Sidebar from "@/components/organisms/Sidebar"
import Header from "@/components/organisms/Header"

const Layout = ({ children }) => {
  return (
    <div className="h-screen flex overflow-hidden bg-gray-50">
      <Sidebar />
      
      <div className="flex flex-col w-0 flex-1 overflow-hidden lg:ml-64">
        <div className="lg:hidden">
          {/* Mobile header is handled by Sidebar component */}
        </div>
        
        <div className="hidden lg:block">
          <Header />
        </div>
        
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            {children}
          </div>
        </main>
      </div>
    </div>
  )
}

export default Layout