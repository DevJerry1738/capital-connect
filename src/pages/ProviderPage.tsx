import { useParams } from 'react-router-dom'
import Navbar from '../components/layout/Navbar'
import Footer from '../components/layout/Footer'
import providers from '../data/providers'
import ProviderHeader from '../components/providers/ProviderHeader'
import ProviderDetails from '../components/providers/ProviderDetails'
import ProviderMap from '../components/providers/ProviderMap'
import ContactActions from '../components/providers/ContactActions'
import RatingStars from '../components/providers/RatingStars'
import useDirections from '../hooks/useDirections'
import { FiNavigation } from 'react-icons/fi'
import { useToast } from '../components/ui/Toast'

export default function ProviderPage() {
  const { id } = useParams()
  const provider = providers.find((p) => p.id === id)
  const { getDirectionsTo, loading } = useDirections()
  const { show } = useToast()
  if (!provider) return <div>Provider not found</div>
  return (
    <div>
      <Navbar />

      <ProviderHeader provider={provider} />

      <main className="container provider-page">
        <div className="provider-layout">
          <div className="provider-summary card">
            <div className="summary-top">
              <div className="avatar large">{provider.name.split(' ').map((s) => s[0]).slice(0, 2).join('')}</div>
              <div className="summary-meta">
                <h2 className="provider-name">{provider.name}</h2>
                <div className="rating-row">
                  <div className="rating-stars-wrap"><RatingStars value={provider.rating} /></div>
                  <div className="serving muted">Serving Abuja • {provider.district}</div>
                </div>
                <p className="desc">{provider.description}</p>
              </div>
            </div>

            <div className="summary-actions">
              <ContactActions provider={provider} />
              {/* Get Directions button */}
              <button
                className="btn btn-outline-2"
                onClick={async () => {
                  try {
                    await getDirectionsTo(provider.lat, provider.lng)
                  } catch (err: any) {
                    // user-friendly fallback using toast
                    // eslint-disable-next-line no-console
                    console.debug('directions error', err)
                    show(err?.message || 'Unable to get directions')
                  }
                }}
                disabled={loading}
                aria-label={`Get directions to ${provider.name}`}
                title={`Get directions to ${provider.name}`}
              >
                <FiNavigation aria-hidden />
                {loading ? 'Locating…' : 'Get directions'}
              </button>
            </div>
          </div>

          <aside className="provider-aside">
            <div className="card">
              <ProviderDetails provider={provider} />
            </div>

            <div className="card map-card">
              <h3>Service location</h3>
              <ProviderMap provider={provider} />
            </div>
          </aside>
        </div>

        {/* Sticky CTA for small screens */}
        <div className="sticky-cta">
          <ContactActions provider={provider} />
          <button
            className="btn btn-outline-2"
            onClick={async () => {
              try {
                await getDirectionsTo(provider.lat, provider.lng)
              } catch (err: any) {
                // eslint-disable-next-line no-console
                console.debug('directions error', err)
                show(err?.message || 'Unable to get directions')
              }
            }}
            disabled={loading}
            aria-label={`Get directions to ${provider.name}`}
            title={`Get directions to ${provider.name}`}
          >
            <FiNavigation aria-hidden />
            {loading ? 'Locating…' : 'Get directions'}
          </button>
        </div>
      </main>

      <Footer />
    </div>
  )
}
