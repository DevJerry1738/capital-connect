import React, { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import type { Provider } from '../../types/provider'

export default function ProviderMap({ provider }: { provider: Provider }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<L.Map | null>(null)

  useEffect(() => {
    if (!ref.current) return
    if (!mapRef.current) {
      const map = L.map(ref.current, { scrollWheelZoom: false, zoomControl: false }).setView([provider.lat, provider.lng], 14)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)
      mapRef.current = map
    } else {
      mapRef.current.setView([provider.lat, provider.lng], 14)
    }

    const marker = L.marker([provider.lat, provider.lng]).addTo(mapRef.current!)
    marker.bindPopup(`<strong>${provider.name}</strong><br/>${provider.category}`)

    return () => {
      marker.remove()
    }
  }, [provider])

  return <div className="provider-small-map" ref={ref} style={{ height: 180, borderRadius: 8 }} />
}
