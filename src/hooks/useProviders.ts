import { useMemo, useState } from 'react'
import providersData from '../data/providers'
import { filterProviders } from '../utils/filterProviders'

export function useProviders() {
  const [query, setQuery] = useState('')
  const [category, setCategory] = useState('')
  const [district, setDistrict] = useState('')
  const [availability, setAvailability] = useState<boolean | undefined>(undefined)

  const filtered = useMemo(
    () => filterProviders(providersData, { query, category, district, availability }),
    [query, category, district, availability]
  )

  return {
    providers: providersData,
    query,
    setQuery,
    category,
    setCategory,
    district,
    setDistrict,
    availability,
    setAvailability,
    filtered,
  }
}
