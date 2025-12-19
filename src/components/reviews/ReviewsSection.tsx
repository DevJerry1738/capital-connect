import { useMemo, useState, useEffect } from 'react'
import ReviewList from './ReviewList'
import ReviewForm from './ReviewForm'
import type { Review as ReviewType } from './ReviewCard'
import './ReviewsSection.css'

function seedReviews(providerId: string, baseRating = 4.2): ReviewType[] {
  // Create a deterministic seed based on providerId
  const seed = providerId.split('').reduce((s, c) => s + c.charCodeAt(0), 0)
  const count = (seed % 3) // 0..2
  const samples = [
    'Great service — arrived on time and fixed my issue quickly.',
    "Very professional and clear pricing. I'd recommend.",
    'Good quality work, a little slow but helpful.'
  ]
  const now = Date.now()
  const reviews: ReviewType[] = []
  for (let i = 0; i < count; i++) {
    reviews.push({
      id: `${providerId}-r-${i}`,
      name: ['Aisha','Daniel','Ngozi','Michael'][ (seed + i) % 4 ],
      rating: Math.max(3, Math.round((baseRating + (i % 2) * 0.3) * 2) / 2),
      text: samples[i % samples.length],
      createdAt: new Date(now - (i + 1) * 3600 * 1000 * 24).toISOString(),
    })
  }
  // include a synthetic community review representing baseRating
  reviews.unshift({
    id: `${providerId}-seed`,
    name: 'Community',
    rating: baseRating,
    text: 'Average rating based on previous customers',
    createdAt: new Date(now - 7 * 24 * 3600 * 1000).toISOString(),
  })
  return reviews
}

export default function ReviewsSection({ provider, onReviewsChange }: { provider: { id: string; name: string; rating?: number }, onReviewsChange?: (avg: number, count: number) => void }) {
  const initial = useMemo(() => seedReviews(provider.id, provider.rating ?? 4.0), [provider.id, provider.rating])
  const [reviews, setReviews] = useState<ReviewType[]>(initial)
  const [saving, setSaving] = useState(false)

  // notify parent of current average/count
  useEffect(() => {
    const avg = reviews.length ? +(reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(2) : 0
    onReviewsChange?.(avg, reviews.length)
  }, [reviews, onReviewsChange])

  const submit = async (payload: { rating: number; text: string }) => {
    setSaving(true)
    try {
      // simulate save delay
      await new Promise((r) => setTimeout(r, 550))
      const r: ReviewType = {
        id: `${provider.id}-user-${Date.now()}`,
        name: 'You',
        rating: payload.rating,
        text: payload.text,
        createdAt: new Date().toISOString(),
      }
      setReviews((s) => [r, ...s])
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="reviews-wrap">
      <ReviewList reviews={reviews} />
      <div className="review-form-wrap card">
        <h4>Leave a review</h4>
        <ReviewForm onSubmit={submit} disabled={saving} />
      </div>
    </div>
  )
}
