// src/components/faq/FAQItem.tsx
import  { useState, useRef, useEffect } from 'react'
import type { FAQ } from '../../types/faq'
import './FAQ.css'

export default function FAQItem({ faq }: { faq: FAQ }) {
  const [open, setOpen] = useState(false)
  const contentRef = useRef<HTMLDivElement | null>(null)
  const [height, setHeight] = useState<number | 'auto'>(0)

  useEffect(() => {
    if (contentRef.current) setHeight(contentRef.current.scrollHeight)
  }, [open])

  return (
    <article className={`faq-card ${open ? 'open' : ''}`}>
      <button
        className="faq-question"
        aria-expanded={open}
        onClick={() => setOpen((s) => !s)}
      >
        <span className="faq-question-text">{faq.question}</span>
        <span className="faq-toggle">{open ? '−' : '+'}</span>
      </button>

      <div
        className="faq-answer"
        ref={contentRef}
        style={{ maxHeight: open ? height : 0, opacity: open ? 1 : 0 }}
        aria-hidden={!open}
      >
        <p>{faq.answer}</p>
      </div>
    </article>
  )
}
