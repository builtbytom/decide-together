import { useLocation, useNavigate } from 'react-router-dom'
import '../styles/ResultsView.css'

// Import food options (same as SwipeView for now)
const FOOD_OPTIONS = [
  { id: 1, name: 'Pizza', cuisine: 'Italian', emoji: '🍕', description: 'Classic comfort food' },
  { id: 2, name: 'Sushi', cuisine: 'Japanese', emoji: '🍱', description: 'Fresh and healthy' },
  { id: 3, name: 'Tacos', cuisine: 'Mexican', emoji: '🌮', description: 'Quick and tasty' },
  { id: 4, name: 'Burgers', cuisine: 'American', emoji: '🍔', description: 'Juicy and satisfying' },
  { id: 5, name: 'Thai Food', cuisine: 'Thai', emoji: '🍜', description: 'Spicy and flavorful' },
  { id: 6, name: 'Salad', cuisine: 'Healthy', emoji: '🥗', description: 'Light and nutritious' },
  { id: 7, name: 'Chinese', cuisine: 'Chinese', emoji: '🥡', description: 'Sweet and savory' },
  { id: 8, name: 'Indian', cuisine: 'Indian', emoji: '🍛', description: 'Rich and aromatic' },
]

function ResultsView() {
  const location = useLocation()
  const navigate = useNavigate()
  const { userSwipes = [], partnerSwipes = [] } = location.state || {}

  // Find matches (both swiped right)
  const matches = userSwipes.filter(userSwipe => {
    const partnerSwipe = partnerSwipes.find(ps => ps.optionId === userSwipe.optionId)
    return userSwipe.direction === 'right' && partnerSwipe?.direction === 'right'
  }).map(swipe => FOOD_OPTIONS.find(opt => opt.id === swipe.optionId))

  // Find compromises (one liked, one didn't)
  const userLikes = userSwipes
    .filter(s => s.direction === 'right')
    .map(s => s.optionId)
  
  const partnerLikes = partnerSwipes
    .filter(s => s.direction === 'right')
    .map(s => s.optionId)

  const handleTryAgain = () => {
    navigate('/app')
  }

  if (matches.length > 0) {
    // We have matches!
    return (
      <div className="results-container">
        <div className="results-content">
          <h1>It's a Match! 🎉</h1>
          <p>You both want:</p>
          
          <div className="matches-list">
            {matches.map(match => (
              <div key={match.id} className="match-card">
                <span className="match-emoji">{match.emoji}</span>
                <span className="match-name">{match.name}</span>
              </div>
            ))}
          </div>

          <button className="primary-button" onClick={handleTryAgain}>
            Try Another Round
          </button>
        </div>
      </div>
    )
  }

  // No matches - suggest compromise
  const aiSuggestion = getAICompromise(userLikes, partnerLikes)
  
  return (
    <div className="results-container">
      <div className="results-content">
        <h1>No Direct Match 😅</h1>
        <p>But our AI has a suggestion:</p>
        
        <div className="compromise-card">
          <h2>{aiSuggestion.emoji} {aiSuggestion.name}</h2>
          <p>{aiSuggestion.reason}</p>
        </div>

        <div className="preferences-summary">
          <div className="preference-column">
            <h3>You liked:</h3>
            {userLikes.map(id => {
              const option = FOOD_OPTIONS.find(o => o.id === id)
              return <div key={id}>{option.emoji} {option.name}</div>
            })}
          </div>
          <div className="preference-column">
            <h3>Partner liked:</h3>
            {partnerLikes.map(id => {
              const option = FOOD_OPTIONS.find(o => o.id === id)
              return <div key={id}>{option.emoji} {option.name}</div>
            })}
          </div>
        </div>

        <button className="primary-button" onClick={handleTryAgain}>
          Try Another Round
        </button>
      </div>
    </div>
  )
}

// Simple AI compromise logic (will be replaced with Claude API)
function getAICompromise(userLikes, partnerLikes) {
  // For demo - pick something in the middle
  if (userLikes.includes(1) && partnerLikes.includes(3)) {
    return {
      emoji: '🌯',
      name: 'Burritos',
      reason: "You like Italian comfort food, they want Mexican. Burritos are the perfect fusion - hearty like pizza, but with Mexican flavors!"
    }
  }
  
  // Default suggestion
  return {
    emoji: '🍝',
    name: 'Pasta',
    reason: "Based on your preferences, a nice pasta dish could satisfy both of you. It's customizable and universally loved!"
  }
}

export default ResultsView