import StarRating from './StarRating'
import './ReviewCard.css'

export type Review = {
  id: string
  name: string
  rating: number
  text: string
  createdAt: string
}

function timeAgo(iso: string) {
  const now = Date.now()
  const then = new Date(iso).getTime()
  const diff = Math.max(0, Math.floor((now - then) / 1000))
  if (diff < 60) return `${diff}s ago`
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`
  if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`
  return `${Math.floor(diff / 86400)}d ago`
}

export default function ReviewCard({ review, isNew }: { review: Review; isNew?: boolean }) {
  return (
    <div className={`review-card${isNew ? ' new' : ''}`} role="article" aria-label={`Review by ${review.name}`}>
      <div className="review-top">
        <div className="review-author">{review.name}</div>
        <div className="review-meta">
          <StarRating value={review.rating} readOnly size={16} />
          <div className="review-time muted">{timeAgo(review.createdAt)}</div>
        </div>
      </div>
      <p className="review-text">{review.text}</p>
    </div>
  )
}
