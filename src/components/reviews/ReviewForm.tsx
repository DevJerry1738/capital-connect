import React, { useState } from 'react'
import StarRating from './StarRating'
import './ReviewForm.css'

export type Review = {
  id: string
  name: string
  rating: number
  text: string
  createdAt: string
}

export default function ReviewForm({
  onSubmit,
  disabled,
}: {
  onSubmit: (r: Omit<Review, 'id' | 'createdAt' | 'name'>) => Promise<void> | void
  disabled?: boolean
}) {
  const [rating, setRating] = useState<number>(0)
  const [text, setText] = useState<string>('')
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const maxLen = 500

  async function handleSubmit(e?: React.FormEvent) {
    e?.preventDefault()
    setError(null)
    if (!rating) return setError('Please select a rating')
    if (text.trim().length < 5) return setError('Please write a short review (min 5 chars)')
    if (text.length > maxLen) return setError(`Review must be ${maxLen} characters or fewer`)

    setSaving(true)
    try {
      await onSubmit({ rating, text })
      // reset form on success
      setRating(0)
      setText('')
    } finally {
      setSaving(false)
    }
  }

  return (
    <form className="review-form" onSubmit={handleSubmit} aria-live="polite">
      <label className="form-row">
        <div className="label">Your rating</div>
        <div className="control">
          <StarRating value={rating} onChange={setRating} />
        </div>
      </label>

      <label className="form-row">
        <div className="label">Your review</div>
        <div className="control">
          <textarea
            aria-label="Write your review"
            placeholder="Share your experience (short, helpful reviews work best)"
            value={text}
            onChange={(e) => setText(e.target.value)}
            maxLength={maxLen}
            rows={4}
            disabled={saving || disabled}
          />
          <div className="form-meta">
            <div className="muted">{text.length}/{maxLen}</div>
            <button className="btn btn-primary" type="submit" disabled={saving || disabled}>
              {saving ? 'Saving…' : 'Submit review'}
            </button>
          </div>
        </div>
      </label>

      {error && <div className="form-error" role="alert">{error}</div>}
    </form>
  )
}
