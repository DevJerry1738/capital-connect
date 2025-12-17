// src/pages/MapPage.tsx
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import MapEmbed from '../components/map/MapEmbed'
import providers from '../data/providers'

export default function MapPage() {
  return (
    <div>
      <Navbar />
      <main className="container">
        <h1>Map</h1>
        <h2>Service Providers Across Abuja</h2>
        <MapEmbed providers={providers} />
      </main>
      <Footer />
    </div>
  )
}
