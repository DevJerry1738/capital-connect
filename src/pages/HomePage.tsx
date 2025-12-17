// src/pages/HomePage.tsx
import React from 'react'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import SearchBar from '../components/search/SearchBar'
import Filters from '../components/search/Filters'
import ProviderList from '../components/providers/ProviderList'
import FAQSection from '../components/faq/FAQSection'
import MapEmbed from '../components/map/MapEmbed'
import { useProviders } from '../hooks/useProviders'
import faqs from '../data/faqs'
import { getCategories, getDistricts } from '../utils/deriveData'
import { Link } from 'react-router-dom'

export default function HomePage() {
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

  const preview = React.useMemo(() => {
    const sampleCount = Math.min(3, filtered.length)
    const items = [...filtered]
    for (let i = items.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[items[i], items[j]] = [items[j], items[i]]
    }
    return items.slice(0, sampleCount)
  }, [filtered])
  // categories are centrally defined to keep labels consistent across the app
  const categories = getCategories(providers)
  const districts = getDistricts(providers)

  return (
    <div>
      <Navbar />

      <header className="hero">
        <div className="hero-bg" aria-hidden />
        <div className="container hero-content">
          <h1>Find trusted local services in Abuja</h1>
          <p className="lead">Quickly discover verified providers across Abuja and contact them directly.</p>

          <div className="hero-controls">
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
        </div>
      </header>

      <main className="container">
        <section className="providers-preview" id="providers-preview">
          <div className="section-header">
            <h2>Providers</h2>
            <Link className="view-all" to="/providers">{`View all providers >`}</Link>
          </div>

          <div className="provider-grid">
            {preview.map((p) => (
              <div key={p.id} className="provider-grid-item">
                <ProviderList providers={[p]} />
              </div>
            ))}
          </div>
        </section>

        <section className="map-section">
          <h2>Map</h2>
          {/* Show all providers on the homepage map (not just the preview samples) */}
          <MapEmbed providers={providers} />
        </section>

        {/* Removed exhaustive providers list from Home: discovery-focused layout only */}

        <FAQSection items={faqs} />
      </main>

      <Footer />
    </div>
  )
}
