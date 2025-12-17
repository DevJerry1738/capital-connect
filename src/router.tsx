import { BrowserRouter, Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import ProviderPage from './pages/ProviderPage'
import ProvidersPage from './pages/ProvidersPage'
import MapPage from './pages/MapPage'

export default function AppRouter() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/provider/:id" element={<ProviderPage />} />
        <Route path="/providers" element={<ProvidersPage />} />
        <Route path="/map" element={<MapPage />} />
      </Routes>
    </BrowserRouter>
  )
}
