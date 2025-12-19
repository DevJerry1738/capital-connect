import React, { useState, useEffect, useRef } from 'react'
import './StarRating.css'

export default function StarRating({
  value = 0,
  size = 20,
  onChange,
  readOnly = false,
  id,
}: {
  value?: number
  size?: number
  onChange?: (v: number) => void
  readOnly?: boolean
  id?: string
}) {
  const [hover, setHover] = useState<number | null>(null)
  const [focusIndex, setFocusIndex] = useState<number | null>(null)
  const rootRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    if (!readOnly && rootRef.current) {
      const handleKey = (e: KeyboardEvent) => {
        if (focusIndex === null) return
        if (e.key === 'ArrowRight' || e.key === 'ArrowUp') {
          e.preventDefault()
          const next = Math.min(5, focusIndex + 1)
          setFocusIndex(next)
          onChange?.(next)
        }
        if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') {
          e.preventDefault()
          const prev = Math.max(1, focusIndex - 1)
          setFocusIndex(prev)
          onChange?.(prev)
        }
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          onChange?.(focusIndex)
        }
      }
      rootRef.current.addEventListener('keydown', handleKey)
      return () => rootRef.current?.removeEventListener('keydown', handleKey)
    }
  }, [focusIndex, onChange, readOnly])

  const current = hover ?? value

  return (
    <div
      className={`star-rating ${readOnly ? 'read-only' : 'interactive'}`}
      role={readOnly ? 'img' : 'radiogroup'}
      aria-label={readOnly ? `Rating: ${value} out of 5` : 'Star rating'}
      tabIndex={readOnly ? -1 : 0}
      ref={rootRef}
      id={id}
    >
      {Array.from({ length: 5 }).map((_, i) => {
        const starVal = i + 1
        const filled = current >= starVal
        return (
          <button
            type="button"
            key={starVal}
            className={`star ${filled ? 'filled' : 'empty'}`}
            aria-checked={value === starVal}
            role={readOnly ? undefined : 'radio'}
            aria-label={`${starVal} star${starVal > 1 ? 's' : ''}`}
            onMouseEnter={() => !readOnly && setHover(starVal)}
            onMouseLeave={() => !readOnly && setHover(null)}
            onFocus={() => !readOnly && setFocusIndex(starVal)}
            onBlur={() => !readOnly && setFocusIndex(null)}
            onClick={() => !readOnly && onChange?.(starVal)}
            style={{ width: size + 6, height: size + 6 }}
          >
            <svg viewBox="0 0 24 24" width={size} height={size} aria-hidden>
              <path d="M12 .587l3.668 7.431L24 9.748l-6 5.847 1.417 8.265L12 19.771 4.583 23.86 6 15.595 0 9.748l8.332-1.73z" />
            </svg>
          </button>
        )
      })}
    </div>
  )
}
