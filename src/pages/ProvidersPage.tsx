import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import SearchBar from '../components/search/SearchBar'
import Filters from '../components/search/Filters'
import ProviderList from '../components/providers/ProviderList'
import MapEmbed from '../components/map/MapEmbed'
import { useProviders } from '../hooks/useProviders'
import { getCategories, getDistricts } from '../utils/deriveData'

export default function ProvidersPage() {
  const {
    providers,
    query,
    setQuery,
    category,
    setCategory,
    district,
    setDistrict,
    availability,
    setAvailability,
    filtered,
  } = useProviders()

  const categories = getCategories(providers)
  const districts = getDistricts(providers)

  return (
    <div>
      <Navbar />

      <main className="container">
        <header style={{ marginBottom: 'var(--space-md)' }}>
          <h1>All providers</h1>
          <p className="muted">Browse providers across Abuja. Use filters to narrow results.</p>
        </header>

        <div className="providers-grid">
          <section>
            <div className="providers-controls">
              <SearchBar value={query} onChange={setQuery} />
              <Filters
                category={category}
                setCategory={setCategory}
                district={district}
                setDistrict={setDistrict}
                availability={availability}
                setAvailability={setAvailability}
                categories={categories}
                districts={districts}
              />
            </div>

            <ProviderList providers={filtered} />
          </section>

          <aside>
            <div className="card">
              <h3>Map</h3>
              <MapEmbed providers={filtered.length ? filtered : providers} />
            </div>
          </aside>
        </div>
      </main>

      <Footer />
    </div>
  )
}

