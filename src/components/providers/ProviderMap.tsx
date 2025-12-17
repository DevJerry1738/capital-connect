import { useEffect, useRef } from 'react'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import { DefaultIcon } from '../map/leafletIcons'
import useDirections from '../../hooks/useDirections'
import { useToast } from '../ui/Toast'
import type { Provider } from '../../types/provider'

export default function ProviderMap({ provider }: { provider: Provider }) {
  const ref = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<L.Map | null>(null)
  const { getDirectionsTo } = useDirections()
  const { show } = useToast()

  useEffect(() => {
    if (!ref.current) return
    if (!mapRef.current) {
      const map = L.map(ref.current, { scrollWheelZoom: false, zoomControl: false }).setView([provider.lat, provider.lng], 14)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png').addTo(map)
      mapRef.current = map
    } else {
      mapRef.current.setView([provider.lat, provider.lng], 14)
    }

    const marker = L.marker([provider.lat, provider.lng], { icon: DefaultIcon }).addTo(mapRef.current!)
    // debug: ensure the configured icon url is used
    // eslint-disable-next-line no-console
    console.debug('provider marker icon', (DefaultIcon.options as any).iconUrl)
    marker.bindPopup(`<strong>${provider.name}</strong><br/>${provider.category}<br/><a href="#" class="get-directions" data-lat="${provider.lat}" data-lng="${provider.lng}" role="button" tabindex="0">Get directions</a>`)

    // attach popup handler for this provider map
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

    mapRef.current!.on('popupopen', onPopupOpen)
    mapRef.current!.on('popupclose', onPopupClose)

    return () => {
      marker.remove()
      mapRef.current!.off('popupopen', onPopupOpen)
      mapRef.current!.off('popupclose', onPopupClose)
    }
  }, [provider, getDirectionsTo])

  return <div className="provider-small-map" ref={ref} style={{ height: 180, borderRadius: 8 }} />
}
