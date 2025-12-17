import type { Provider } from '../../types/provider'
import ProviderCard from './ProviderCard'

export default function ProviderList({ providers }: { providers: Provider[] }) {
  if (!providers.length) return <p>No providers found.</p>
  return (
    <div className="provider-list">
      {providers.map((p) => (
        <ProviderCard provider={p} key={p.id} />
      ))}
    </div>
  )
}
