import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

export default function RatingStars({ value }: { value?: number }) {
  const v = value ?? 0
  const stars = [0, 1, 2, 3, 4].map((i) => {
    const n = i + 1
    if (v >= n) return <FaStar key={i} />
    if (v >= n - 0.5) return <FaStarHalfAlt key={i} />
    return <FaRegStar key={i} />
  })
  return (
    <div className="rating-stars" aria-hidden>
      {stars}
      <span className="rating-value">{v ? v.toFixed(1) : '—'}</span>
    </div>
  )
}
