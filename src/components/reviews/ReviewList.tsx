import { useMemo } from 'react'
import ReviewCard  from './ReviewCard'
import type { Review } from './ReviewCard'
import './ReviewList.css'

export default function ReviewList({ reviews }: { reviews: Review[] }) {
  const average = useMemo(() => {
    if (!reviews.length) return 0
    return +(reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(2)
  }, [reviews])

  return (
    <section className="reviews-section">
      <div className="reviews-header">
        <div className="reviews-stats">
          <div className="reviews-average">{average || '—'}</div>
          <div className="reviews-count muted">{reviews.length} review{reviews.length !== 1 ? 's' : ''}</div>
        </div>
        {/* <h3>Reviews</h3> */}
      </div>

      <div className="reviews-list">
        {reviews.length === 0 ? (
          <div className="muted">No reviews yet — be the first to review.</div>
        ) : (
          reviews.map((r) => {
            const isNew = (Date.now() - new Date(r.createdAt).getTime()) < (1000 * 60 * 10) // 10 minutes
            return <ReviewCard key={r.id} review={r} isNew={isNew} />
          })
        )}
      </div>
    </section>
  )
}
