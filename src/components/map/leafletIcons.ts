import L from 'leaflet'
import markerIcon2x from 'leaflet/dist/images/marker-icon-2x.png'
import markerIcon from 'leaflet/dist/images/marker-icon.png'
import markerShadow from 'leaflet/dist/images/marker-shadow.png'

// Ensure Leaflet's default marker images resolve correctly when bundled (Vercel / static hosts)
L.Icon.Default.mergeOptions({
  iconRetinaUrl: markerIcon2x as unknown as string,
  iconUrl: markerIcon as unknown as string,
  shadowUrl: markerShadow as unknown as string,
  // explicit sizes/anchors matching Leaflet defaults to avoid rendering issues
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
})

// Helpful debug when troubleshooting asset resolution in dev/prod
try {
  // eslint-disable-next-line no-console
  console.debug('Leaflet icons configured', { markerIcon, markerIcon2x, markerShadow, options: L.Icon.Default.prototype.options })
} catch (e) {
  // ignore
}

// Export a ready-made icon instance that uses the merged default options
export const DefaultIcon = new L.Icon(L.Icon.Default.prototype.options as L.IconOptions)
