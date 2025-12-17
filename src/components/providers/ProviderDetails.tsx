import type { Provider } from '../../types/provider'
import { FaTag, FaMapMarkerAlt, FaCheckCircle, FaClock } from 'react-icons/fa'

export default function ProviderDetails({ provider }: { provider: Provider }) {
  return (
    <div className="provider-details card">
      <ul>
        <li>
          <FaTag className="icon" />
          <strong>Service</strong>
          <span>{provider.category}</span>
        </li>
        <li>
          <FaMapMarkerAlt className="icon" />
          <strong>District</strong>
          <span>{provider.district}</span>
        </li>
        <li>
          <FaClock className="icon" />
          <strong>Availability</strong>
          <span>{provider.availability ? 'Available' : 'Busy'}</span>
        </li>
        <li>
          <FaCheckCircle className="icon" />
          <strong>Verification</strong>
          <span>{provider.verified ? 'Verified' : 'Unverified'}</span>
        </li>
      </ul>
    </div>
  )
}
