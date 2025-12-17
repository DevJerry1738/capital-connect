import type { Provider } from '../../types/provider'
import { FaWhatsapp } from 'react-icons/fa'
import { BiPhone } from 'react-icons/bi'

export default function ContactActions({ provider }: { provider: Provider }) {
  const phone = provider.phone
  const whatsapp = provider.whatsapp

  const waLink = whatsapp ? `https://wa.me/${String(whatsapp).replace(/[^0-9]/g, '')}` : undefined
  const telLink = phone ? `tel:${String(phone).replace(/\s/g, '')}` : undefined

  return (
    <div className="contact-actions">
      <a
        className={`btn btn-primary ${waLink ? '' : 'disabled'}`}
        href={waLink ?? '#'}
        target="_blank"
        rel="noopener noreferrer"
        aria-disabled={!waLink}
        aria-label={waLink ? `Chat with ${provider.name} on WhatsApp` : `WhatsApp not available for ${provider.name}`}
      >
        <FaWhatsapp style={{ marginRight: 8 }} /> Chat on WhatsApp
      </a>

      <a
        className={`btn btn-outline ${telLink ? '' : 'disabled'}`}
        href={telLink ?? '#'}
        aria-disabled={!telLink}
        aria-label={telLink ? `Call ${provider.name}` : `Phone number not available for ${provider.name}`}
      >
        <BiPhone style={{ marginRight: 8 }} /> Call Provider
      </a>
    </div>
  )
}
