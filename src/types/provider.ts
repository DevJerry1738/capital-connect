export type Provider = {
  id: string
  name: string
  category: string
  district: string
  location?: string
  lat: number
  lng: number
  rating?: number
  availability?: boolean
  verified?: boolean
  description?: string
  phone?: number | string
  whatsapp?: number | string
}
