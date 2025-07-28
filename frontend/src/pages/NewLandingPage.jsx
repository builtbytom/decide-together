import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '../lib/supabase'

function NewLandingPage() {
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState({ type: '', text: '' })
  const [currentSlide, setCurrentSlide] = useState(0)
  const navigate = useNavigate()

  const problemSlides = [
    { emoji: '🍳', text: 'Making 3 different dinners every night' },
    { emoji: '💸', text: 'Spending $500/month on takeout' },
    { emoji: '😫', text: 'Daily "what\'s for dinner" arguments' },
    { emoji: '🙄', text: 'Kids who won\'t eat touching foods' }
  ]

  // Auto-rotate slides
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % problemSlides.length)
    }, 3000)
    return () => clearInterval(timer)
  }, [])

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)
    setMessage({ type: '', text: '' })

    try {
      const { error } = await supabase
        .from('waitlist')
        .insert([{ 
          email,
          metadata: { source: 'family-focused-redesign' }
        }])

      if (error && error.code !== '23505') {
        setMessage({ 
          type: 'error', 
          text: 'Something went wrong. Please try again.' 
        })
      } else {
        setMessage({ 
          type: 'success', 
          text: 'Welcome to the family! We\'ll notify you when DinnerPeace launches.' 
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
    <div className="new-landing">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            From <span className="strike">4 meals</span> to <span className="highlight">1</span>
          </h1>
          <p className="hero-subtitle">
            End the dinner chaos. Save money. Keep everyone happy.
          </p>
          
          {/* Problem Slider */}
          <div className="problem-slider">
            <div className="slide-container">
              {problemSlides.map((slide, index) => (
                <div 
                  key={index}
                  className={`slide ${index === currentSlide ? 'active' : ''}`}
                >
                  <span className="slide-emoji">{slide.emoji}</span>
                  <span className="slide-text">{slide.text}</span>
                </div>
              ))}
            </div>
            <div className="slide-dots">
              {problemSlides.map((_, index) => (
                <button
                  key={index}
                  className={`dot ${index === currentSlide ? 'active' : ''}`}
                  onClick={() => setCurrentSlide(index)}
                />
              ))}
            </div>
          </div>

          <div className="cta-container">
            <button 
              className="primary-cta"
              onClick={() => navigate('/demo')}
            >
              See How It Works
            </button>
            <p className="cta-subtext">
              Join 2,847 families who've found dinner peace
            </p>
          </div>
        </div>

        <div className="hero-visual">
          <div className="phone-mockup">
            <div className="success-meal">
              <div className="meal-header">
                <span className="success-badge">🎉 JACKPOT MEAL</span>
                <h3>Taco Bar Night</h3>
              </div>
              <div className="family-reactions">
                <div className="reaction">
                  <span className="avatar">👦</span>
                  <span className="name">Tim</span>
                  <span className="status">✅</span>
                </div>
                <div className="reaction">
                  <span className="avatar">👧</span>
                  <span className="name">Sarah</span>
                  <span className="status">✅</span>
                </div>
                <div className="reaction">
                  <span className="avatar">👨</span>
                  <span className="name">Dad</span>
                  <span className="status">✅</span>
                </div>
                <div className="reaction">
                  <span className="avatar">👩</span>
                  <span className="name">Mom</span>
                  <span className="status">✅</span>
                </div>
              </div>
              <div className="meal-stats">
                <div className="stat">
                  <span className="label">Prep time</span>
                  <span className="value">20 min</span>
                </div>
                <div className="stat">
                  <span className="label">Saves</span>
                  <span className="value">$35</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="how-it-works">
        <h2>Finally, an app that gets it</h2>
        
        <div className="features-grid">
          <div className="feature-card">
            <div className="feature-icon">👨‍👩‍👧‍👦</div>
            <h3>Real Family Profiles</h3>
            <p>"Only eats dinosaur nuggets" ✓</p>
            <p>"No foods touching" ✓</p>
            <p>"Kraft, not Velveeta" ✓</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">🎯</div>
            <h3>Smart Meal Matching</h3>
            <p>One meal everyone likes? JACKPOT!</p>
            <p>Need mods? We'll show you how</p>
            <p>Multi-meal night? Efficient timing</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">💰</div>
            <h3>Track Real Savings</h3>
            <p>"$427 saved this month"</p>
            <p>"3 more home meals = Nintendo game"</p>
            <p>See takeout costs in real-time</p>
          </div>

          <div className="feature-card">
            <div className="feature-icon">😌</div>
            <h3>Parent Sanity Mode</h3>
            <p>Tracks your energy levels</p>
            <p>Suggests easy nights after hard ones</p>
            <p>Celebrates every small win</p>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="social-proof">
        <h2>What parents are saying</h2>
        <div className="testimonials">
          <div className="testimonial">
            <p>"My kids actually ate the same meal last night. I almost cried."</p>
            <cite>- Sarah M., mom of 3</cite>
          </div>
          <div className="testimonial">
            <p>"Saved $400 our first month. This app pays for itself."</p>
            <cite>- Mike D., dad of 2</cite>
          </div>
          <div className="testimonial">
            <p>"No more short-order cook life. This is a game changer."</p>
            <cite>- Jennifer K., mom of 4</cite>
          </div>
        </div>
      </section>

      {/* Email Capture */}
      <section className="email-capture">
        <div className="capture-content">
          <h2>Join the beta and save $50/month instantly</h2>
          <p>Be first to experience dinner without the drama</p>
          
          <form onSubmit={handleSubmit} className="beta-form">
            <input
              type="email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <button type="submit" disabled={loading}>
              {loading ? 'Joining...' : 'Get Early Access'}
            </button>
          </form>

          {message.text && (
            <div className={`message ${message.type}`}>
              {message.text}
            </div>
          )}

          <p className="privacy-note">
            No spam. Just dinner peace. Unsubscribe anytime.
          </p>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="pricing-preview">
        <h2>Pricing that makes sense</h2>
        <div className="pricing-card">
          <h3>Family Plan</h3>
          <div className="price">$9.99<span>/month</span></div>
          <ul>
            <li>✓ Unlimited dinner decisions</li>
            <li>✓ Smart meal compatibility</li>
            <li>✓ Grocery list generator</li>
            <li>✓ Money saving tracker</li>
            <li>✓ "Pays for itself in 2 skipped takeouts"</li>
          </ul>
        </div>
      </section>
    </div>
  )
}

export default NewLandingPage