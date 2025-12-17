import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { DefaultIcon } from './leafletIcons'
import type { Provider } from '../../types/provider'
import useDirections from '../../hooks/useDirections'
import { useToast } from '../ui/Toast'
type Props = { providers: Provider[] }

export default function MapEmbed({ providers }: Props) {
  const { getDirectionsTo } = useDirections()
  const { show } = useToast()
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
        const marker = L.marker([p.lat, p.lng], { icon: DefaultIcon })
        // debug: confirm marker icon url
        // eslint-disable-next-line no-console
        console.debug('adding marker', p.id, (DefaultIcon.options && (DefaultIcon.options as any).iconUrl) || (L.Icon.Default.prototype.options && (L.Icon.Default.prototype.options as any).iconUrl))
        const popup = `<strong>${p.name}</strong><br/>${p.category} • ${p.district}<br/><a href="/provider/${p.id}">View details</a><br/><a href="#" class="get-directions" data-lat="${p.lat}" data-lng="${p.lng}" role="button" tabindex="0">Get directions</a>`
        marker.bindPopup(popup)
        markersRef.current!.addLayer(marker)
      })

      // attach popup handlers to wire the "Get directions" link
      const onPopupOpen = (ev: L.PopupEvent) => {
        try {
          const el = ev.popup.getElement()
          if (!el) return
          const link = el.querySelector('.get-directions') as HTMLAnchorElement | null
          if (!link) return

          const clickHandler = async (evt: MouseEvent) => {
            evt.preventDefault()
            const lat = Number(link.dataset.lat)
            const lng = Number(link.dataset.lng)
            const prevText = link.textContent
            link.textContent = 'Locating…'
            link.setAttribute('aria-disabled', 'true')
            link.style.pointerEvents = 'none'
            try {
              await getDirectionsTo(lat, lng)
            } catch (err: any) {
              // eslint-disable-next-line no-console
              console.debug('directions error', err)
              show(err?.message || 'Unable to get directions')
            } finally {
              link.textContent = prevText || 'Get directions'
              link.removeAttribute('aria-disabled')
              link.style.pointerEvents = ''
            }
          }

          // store handler so we can remove later
          ;(link as any).__dirsHandler = clickHandler
          link.addEventListener('click', clickHandler)
        } catch (e) {
          // ignore
        }
      }

      const onPopupClose = (ev: L.PopupEvent) => {
        try {
          const el = ev.popup.getElement()
          if (!el) return
          const link = el.querySelector('.get-directions') as HTMLAnchorElement | null
          if (!link) return
          const h = (link as any).__dirsHandler
          if (h) link.removeEventListener('click', h)
        } catch (e) {
          // ignore
        }
      }

      map.on('popupopen', onPopupOpen)
      map.on('popupclose', onPopupClose)

      // cleanup handlers on re-run
      return () => {
        map.off('popupopen', onPopupOpen)
        map.off('popupclose', onPopupClose)
      }

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
