import React from 'react'
import type { Provider } from '../../types/provider'
import { FaCheckCircle } from 'react-icons/fa'

export default function ProviderHeader({ provider }: { provider: Provider }) {
  const available = provider.availability
  return (
    <header className="provider-hero">
      <div className="provider-hero-inner container">
        <div>
          <h1 className="provider-title">{provider.name}</h1>
          <div className="provider-sub">
            <span className="muted">{provider.category}</span>
            <span className="sep">•</span>
            <span className="muted">{provider.district}</span>
            <span className={`badge availability ${available ? 'open' : 'closed'}`}>{available ? 'Available' : 'Busy'}</span>
            {provider.verified && (
              <span className="badge verified" title="Verified provider – identity documents submitted">
                <FaCheckCircle style={{ marginRight: 6 }} /> Verified
              </span>
            )}
          </div>
        </div>
      </div>
    </header>
  )
}
