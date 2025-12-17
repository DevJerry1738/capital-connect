import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
// Ensure Leaflet's default marker images resolve correctly when bundled (Vercel / static hosts)
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// Merge default icon options so the images are referenced via the bundler imports
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x,
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
})

import type { Provider } from '../../types/provider'

type Props = { providers: Provider[] }

export default function MapEmbed({ providers }: Props) {
  const mapRef = useRef<HTMLDivElement | null>(null)
  const leafletMapRef = useRef<L.Map | null>(null)
  const markersRef = useRef<L.LayerGroup | null>(null)

  useEffect(() => {
    if (!mapRef.current) return
    // initialize map once
    if (!leafletMapRef.current) {
      const map = L.map(mapRef.current, { scrollWheelZoom: false }).setView([9.0765, 7.3986], 12)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; OpenStreetMap contributors',
      }).addTo(map)
      leafletMapRef.current = map
    }

      const map = leafletMapRef.current!

      // manage marker layer group
      if (!markersRef.current) {
        markersRef.current = L.layerGroup().addTo(map)
      }

      // clear previous markers
      markersRef.current.clearLayers()

      providers.forEach((p) => {
        const marker = L.marker([p.lat, p.lng])
        const popup = `<strong>${p.name}</strong><br/>${p.category} • ${p.district}<br/><a href="/provider/${p.id}">View details</a>`
        marker.bindPopup(popup)
        markersRef.current!.addLayer(marker)
      })

      // fit map bounds to markers when we have multiple providers
      if (providers.length > 0) {
        try {
          const latlngs = providers.map((p) => L.latLng(p.lat, p.lng))
          const bounds = L.latLngBounds(latlngs)
          if (!bounds.isValid()) return
          if (providers.length === 1) {
            map.setView(latlngs[0], 14)
          } else {
            map.fitBounds(bounds.pad(0.15))
          }
        } catch (err) {
          // ignore invalid coordinates
        }
      }

    return () => {
      // do not destroy map to preserve performance; markers will be removed above
    }
  }, [providers])

  return (
    <div className="map-embed">
      <div ref={mapRef} className="leaflet-map" style={{ height: 360, borderRadius: 8 }} />
    </div>
  )
}
