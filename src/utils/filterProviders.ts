import type { Provider } from '../types/provider'

export function filterProviders(
  data: Provider[],
  opts: { query?: string; category?: string; district?: string; availability?: boolean }
) {
  const q = opts.query?.toLowerCase().trim() || ''
  return data.filter((p) => {
    if (opts.category && opts.category !== '' && p.category !== opts.category) return false
    if (opts.district && opts.district !== '' && p.district !== opts.district) return false
    if (typeof opts.availability === 'boolean' && p.availability !== opts.availability) return false
    if (!q) return true
    return (
      p.name.toLowerCase().includes(q) ||
      (p.description || '').toLowerCase().includes(q) ||
      (p.location || '').toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.district.toLowerCase().includes(q)
    )
  })
}
