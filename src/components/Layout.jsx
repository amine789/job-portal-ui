import { Outlet } from 'react-router-dom'
import Navbar from './Navbar'
import Footer from './Footer'
import MatrixRain from './MatrixRain'
import CareerTrainingAnnouncement from './CareerTrainingAnnouncement'

const Layout = () => {
  return (
    <div className="relative min-h-screen bg-white dark:bg-gray-900 transition-colors">
      <MatrixRain />
      <div className="pointer-events-none fixed inset-0 z-0 crt-scanlines"></div>
      <div className="relative z-10">
        <Navbar />
        <main>
          <Outlet />
        </main>
        <Footer />
      </div>
      <CareerTrainingAnnouncement />
    </div>
  )
}

export default Layout