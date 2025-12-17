import { useCallback, useState } from 'react'

type LatLng = { lat: number; lng: number }

function formatGoogleMapsUrl(origin: LatLng, dest: LatLng) {
  // Uses Google Maps Directions API URL parameters (web link that opens Maps)
  const originStr = `${origin.lat},${origin.lng}`
  const destStr = `${dest.lat},${dest.lng}`
  return `https://www.google.com/maps/dir/?api=1&origin=${encodeURIComponent(originStr)}&destination=${encodeURIComponent(
    destStr,
  )}&travelmode=driving`
}

function getCurrentPosition(options?: PositionOptions): Promise<GeolocationPosition> {
  return new Promise((resolve, reject) => {
    if (!('geolocation' in navigator)) {
      reject(new Error('Geolocation is not supported by your browser.'))
      return
    }
    navigator.geolocation.getCurrentPosition(resolve, reject, options)
  })
}

export default function useDirections() {
  const [loading, setLoading] = useState(false)

  const getDirectionsTo = useCallback(async (destLat: number, destLng: number) => {
    setLoading(true)
    try {
      const position = await getCurrentPosition({ enableHighAccuracy: false, timeout: 10000, maximumAge: 0 })
      const origin = { lat: position.coords.latitude, lng: position.coords.longitude }
      const dest = { lat: destLat, lng: destLng }
      const url = formatGoogleMapsUrl(origin, dest)
      // open in new tab so mobile devices can use native maps app if available
      window.open(url, '_blank', 'noopener,noreferrer')
    } catch (err: any) {
      // Surface a sensible error message - do not persist location
      if (err && err.code === 1) {
        // PERMISSION_DENIED
        throw new Error('Location permission denied. Please enable location to get directions.')
      }
      if (err && err.message) throw err
      throw new Error('Could not determine your location. Please try again.')
    } finally {
      setLoading(false)
    }
  }, [])

  return { getDirectionsTo, loading }
}

export type { LatLng }
