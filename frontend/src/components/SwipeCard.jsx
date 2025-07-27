import { useState } from 'react'
import '../styles/SwipeCard.css'

function SwipeCard({ option, onSwipe }) {
  const [touchStart, setTouchStart] = useState(null)
  const [touchEnd, setTouchEnd] = useState(null)
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)

  // Minimum swipe distance
  const minSwipeDistance = 50

  const onTouchStart = (e) => {
    setTouchEnd(null)
    setTouchStart(e.targetTouches[0].clientX)
    setIsDragging(true)
  }

  const onTouchMove = (e) => {
    if (!touchStart) return
    const currentTouch = e.targetTouches[0].clientX
    setTouchEnd(currentTouch)
    setDragOffset(currentTouch - touchStart)
  }

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return
    
    const distance = touchStart - touchEnd
    const isLeftSwipe = distance > minSwipeDistance
    const isRightSwipe = distance < -minSwipeDistance

    if (isLeftSwipe) {
      onSwipe('left')
    } else if (isRightSwipe) {
      onSwipe('right')
    }

    // Reset
    setIsDragging(false)
    setDragOffset(0)
  }

  const cardStyle = {
    transform: isDragging ? `translateX(${dragOffset}px) rotate(${dragOffset * 0.1}deg)` : '',
    transition: isDragging ? 'none' : 'transform 0.3s ease-out'
  }

  return (
    <div 
      className={`swipe-card ${isDragging ? 'dragging' : ''}`}
      style={cardStyle}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {option.image && (
        <div className="card-image" style={{ backgroundImage: `url(${option.image})` }} />
      )}
      <div className="card-content">
        <div className="card-emoji">{option.emoji}</div>
        <h3>{option.name}</h3>
        <p className="cuisine-tag">{option.cuisine}</p>
        <p className="description">{option.description}</p>
      </div>
      
      {dragOffset > 50 && (
        <div className="swipe-indicator like">YUM!</div>
      )}
      {dragOffset < -50 && (
        <div className="swipe-indicator nope">NOPE</div>
      )}
    </div>
  )
}

export default SwipeCard