import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import SwipeCard from '../components/SwipeCard'
import '../styles/SwipeView.css'

// Temporary food options - will come from database later
const FOOD_OPTIONS = [
  { 
    id: 1, 
    name: 'Pizza', 
    cuisine: 'Italian', 
    emoji: '🍕', 
    description: 'Classic comfort food',
    image: 'https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?w=400&h=500&fit=crop'
  },
  { 
    id: 2, 
    name: 'Sushi', 
    cuisine: 'Japanese', 
    emoji: '🍱', 
    description: 'Fresh and healthy',
    image: 'https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?w=400&h=500&fit=crop'
  },
  { 
    id: 3, 
    name: 'Tacos', 
    cuisine: 'Mexican', 
    emoji: '🌮', 
    description: 'Quick and tasty',
    image: 'https://images.unsplash.com/photo-1565299585323-38d6b0865b47?w=400&h=500&fit=crop'
  },
  { 
    id: 4, 
    name: 'Burgers', 
    cuisine: 'American', 
    emoji: '🍔', 
    description: 'Juicy and satisfying',
    image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?w=400&h=500&fit=crop'
  },
  { 
    id: 5, 
    name: 'Thai Food', 
    cuisine: 'Thai', 
    emoji: '🍜', 
    description: 'Spicy and flavorful',
    image: 'https://images.unsplash.com/photo-1562565652-a0d8f0c59eb4?w=400&h=500&fit=crop'
  },
  { 
    id: 6, 
    name: 'Salad', 
    cuisine: 'Healthy', 
    emoji: '🥗', 
    description: 'Light and nutritious',
    image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=500&fit=crop'
  },
  { 
    id: 7, 
    name: 'Chinese', 
    cuisine: 'Chinese', 
    emoji: '🥡', 
    description: 'Sweet and savory',
    image: 'https://images.unsplash.com/photo-1525755662778-989d0524087e?w=400&h=500&fit=crop'
  },
  { 
    id: 8, 
    name: 'Indian', 
    cuisine: 'Indian', 
    emoji: '🍛', 
    description: 'Rich and aromatic',
    image: 'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=400&h=500&fit=crop'
  },
]

function SwipeView() {
  const navigate = useNavigate()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [userSwipes, setUserSwipes] = useState([])
  const [isWaiting, setIsWaiting] = useState(false)
  
  const currentOption = FOOD_OPTIONS[currentIndex]

  const handleSwipe = (direction) => {
    // Record the swipe
    const newSwipe = {
      optionId: currentOption.id,
      direction: direction,
      timestamp: new Date()
    }
    
    setUserSwipes([...userSwipes, newSwipe])

    // Move to next card
    if (currentIndex < FOOD_OPTIONS.length - 1) {
      setCurrentIndex(currentIndex + 1)
    } else {
      // All cards swiped - show results
      setIsWaiting(true)
      checkForMatches()
    }
  }

  const checkForMatches = () => {
    // For demo - simulate partner's swipes
    setTimeout(() => {
      navigate('/results', { 
        state: { 
          userSwipes,
          partnerSwipes: generateDemoPartnerSwipes() 
        }
      })
    }, 2000)
  }

  const generateDemoPartnerSwipes = () => {
    // Simulate partner swipes with some matches
    return FOOD_OPTIONS.map(option => ({
      optionId: option.id,
      direction: Math.random() > 0.5 ? 'right' : 'left'
    }))
  }

  if (isWaiting) {
    return (
      <div className="swipe-container">
        <div className="waiting-screen">
          <h2>Waiting for your partner...</h2>
          <div className="loading-spinner"></div>
          <p>They have 30 seconds left to decide</p>
        </div>
      </div>
    )
  }

  if (!currentOption) {
    return <div>Loading...</div>
  }

  return (
    <div className="swipe-container">
      <div className="swipe-header">
        <h2>What sounds good?</h2>
        <p>{currentIndex + 1} of {FOOD_OPTIONS.length}</p>
      </div>

      <div className="swipe-area">
        <SwipeCard
          option={currentOption}
          onSwipe={handleSwipe}
        />
      </div>

      <div className="swipe-buttons">
        <button 
          className="swipe-button nope"
          onClick={() => handleSwipe('left')}
        >
          ❌ Nope
        </button>
        <button 
          className="swipe-button yum"
          onClick={() => handleSwipe('right')}
        >
          ✅ Yum!
        </button>
      </div>
    </div>
  )
}

export default SwipeView