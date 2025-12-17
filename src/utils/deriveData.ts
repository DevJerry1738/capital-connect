import type { Provider } from '../types/provider'
import CATEGORIES from '../data/categories'

// Return central categories but only those present in the dataset (keeps ordering stable)
export function getCategories(providers: Provider[]) {
  const present = new Set(providers.map((p) => p.category))
  return CATEGORIES.filter((c) => present.has(c))
}

export function getDistricts(providers: Provider[]) {
  return Array.from(new Set(providers.map((p) => p.district))).sort()
}
