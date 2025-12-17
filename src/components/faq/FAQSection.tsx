import type { FAQ } from '../../types/faq'
import FAQItem from './FAQItem'

export default function FAQSection({ items }: { items: FAQ[] }) {
  return (
    <section className="faq">
      <h2>FAQs</h2>
      <div className="faq-grid">
        {items.map((f) => (
          <FAQItem key={f.id} faq={f} />
        ))}
      </div>
    </section>
  )
}
