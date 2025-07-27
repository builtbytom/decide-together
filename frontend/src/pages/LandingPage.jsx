import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function LandingPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const navigate = useNavigate()

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ email }])

      if (error) {
        if (error.code === '23505') {
          setMessage({ 
            type: 'error', 
            text: 'You\'re already on the waitlist!' 
          })
        } else {
          setMessage({ 
            type: 'error', 
            text: 'Something went wrong. Please try again.' 
          })
        }
      } else {
        setMessage({ 
          type: 'success', 
          text: 'Welcome aboard! We\'ll notify you when we launch.' 
        })
        setEmail('')
      }
    } catch (err) {
      setMessage({ 
        type: 'error', 
        text: 'Something went wrong. Please try again.' 
      })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="landing-container">
      <div className="hero">
        <h1>DecideTogether</h1>
        <p className="subtitle">End the "what's for dinner?" debate forever</p>
        
        <div className="stats">
          <div className="stat-card">
            <div className="number">5.5</div>
            <div className="label">Days per year wasted deciding</div>
          </div>
          <div className="stat-card">
            <div className="number">156</div>
            <div className="label">Annual dinner arguments</div>
          </div>
          <div className="stat-card">
            <div className="number">$300</div>
            <div className="label">Monthly takeout from indecision</div>
          </div>
        </div>

        <div className="cta-section">
          <h2>Be the first to know when we launch</h2>
          <p>Join 500+ couples tired of the daily dinner debate</p>
          
          <form onSubmit={handleSubmit} className="email-form">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Joining...' : 'Get Early Access'}
            </button>
          </form>

          {message.text && (
            <div className={message.type === 'success' ? 'success-message' : 'error-message'}>
              {message.text}
            </div>
          )}

          {/* Demo Button - for testing */}
          <div style={{ marginTop: '2rem' }}>
            <button 
              onClick={() => navigate('/app')}
              style={{
                background: 'rgba(255, 255, 255, 0.2)',
                border: '1px solid rgba(255, 255, 255, 0.3)',
                padding: '0.5rem 1rem',
                borderRadius: '20px',
                cursor: 'pointer',
                fontSize: '0.9rem'
              }}
            >
              🚀 Try Demo (Beta)
            </button>
          </div>
        </div>

        <div className="features">
          <div className="feature">
            <div className="feature-icon">💑</div>
            <h3>Swipe Together</h3>
            <p>Both partners swipe on meal options. Match instantly or let AI find the perfect compromise.</p>
          </div>
          <div className="feature">
            <div className="feature-icon">🤖</div>
            <h3>Smart Compromises</h3>
            <p>Our AI learns your preferences and suggests options you'll both love.</p>
          </div>
          <div className="feature">
            <div className="feature-icon">⚡</div>
            <h3>60 Second Decisions</h3>
            <p>From debate to dinner plan in under a minute. Every single time.</p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default LandingPage