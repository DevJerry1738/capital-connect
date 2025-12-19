import type { Provider } from '../../types/provider'
import VerifiedBadge from './VerifiedBadge'
import { Link } from 'react-router-dom'
import { FaStar } from 'react-icons/fa'
import './ProviderCard.css'

export default function ProviderCard({ provider }: { provider: Provider }) {
  return (
    <article className="provider-card">
      <div className="provider-header">
        <h3 className="provider-name">
          <Link to={`/provider/${provider.id}`}>{provider.name}</Link>
          {provider.verified && <VerifiedBadge />}
        </h3>
        <div className="rating">
          <FaStar style={{ color: '#f59e0b', marginRight: 6 }} /> {provider.rating?.toFixed(1) ?? '—'}
        </div>
      </div>

      <p className="muted">{provider.category} • {provider.district}</p>
      <p className="desc">{provider.description}</p>
      <div className="provider-meta">
        <span className={`availability ${provider.availability ? 'open' : 'closed'}`}>
          {provider.availability ? 'Available' : 'Unavailable'}
        </span>
      </div>
    </article>
  )
}
