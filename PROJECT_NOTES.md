# DecideTogether - Project Notes

## Project Overview
**Problem**: Couples waste 5+ days per year (156 arguments) deciding what to eat
**Solution**: Tinder-style swipe app where couples match on meal decisions with AI compromise engine
**Target**: Couples experiencing daily decision fatigue
**Revenue Goal**: $10K MRR within 6 months

## Session History
- **2025-07-26**: Initial brainstorming, market research, PRD creation
- **2025-07-26 (Session 2)**: 
  - Created full project structure
  - Built landing page with email capture
  - Set up Supabase with waitlist table
  - Landing page live at localhost:5173
  - Ready to collect beta signups
- **Status**: Landing page complete, waitlist active, ready for swipe UI

## Bootstrap Budget (Reality)
- **Monthly Operating**: ~$50
  - Supabase: FREE (500MB/50K requests)
  - Vercel: FREE (hobby tier)
  - Claude API: $20-50/month
  - Domain: $12/year
- **One-time**: ~$150 total
  - Logo: $50-100
  - Stock photos: FREE (Unsplash)
- **Profitable at**: 15 paying users

## Tech Stack Decisions
- **Frontend**: React PWA (Progressive Web App)
- **Backend**: Supabase (Auth + Database + Realtime)
- **AI**: Claude API for compromise suggestions
- **Hosting**: Netlify (frontend) + Supabase (backend)
- **Analytics**: Plausible or Simple Analytics

## Core MVP Features
1. **Dual Swipe Interface**
   - 5 meal options per session
   - 60-second timeout
   - Match celebration animation

2. **AI Compromise Engine**
   - When no match: suggest middle ground
   - Track fairness (who picked last)
   - Learn preferences over time

3. **Solo Mode**
   - When partner unavailable
   - Uses their preference history

## Development Timeline
### Week 1 (Current)
- [x] Project structure
- [x] PROJECT_NOTES.md
- [x] Landing page
- [x] Supabase setup
- [x] Database schema (waitlist table)

### Week 2
- [ ] Swipe UI implementation
- [ ] Matching logic
- [ ] Basic preferences

### Week 3
- [ ] AI integration
- [ ] Compromise algorithm
- [ ] User testing

### Week 4
- [ ] Polish and optimize
- [ ] Analytics setup
- [ ] Beta launch

## Marketing Strategy (Zero Budget)
1. **Pre-launch**: Landing page, collect 500 emails
2. **Content**: TikTok "couple arguments about dinner"
3. **Reddit**: r/relationships, r/mealprep
4. **Referral**: "Invite a couple, get a month free"

## Monetization
- **Free**: 10 decisions/week
- **Premium**: $9.99/month unlimited
- **Annual**: $89/year (save 26%)
- **Target**: 2-5% conversion rate

## Key Metrics to Track
- Time to decision (<60 seconds)
- Weekly active couples (target: 80%)
- Compromise satisfaction rating
- Churn rate

## Name Options
1. DecideTogether (current)
2. DinnerMatch
3. SwipeSupper
4. MealMate
5. FoodSync

## Deployment Instructions (Netlify)
1. Push code to GitHub/GitLab
2. Connect repo to Netlify
3. Deploy settings already configured in netlify.toml
4. Add environment variables in Netlify dashboard:
   - VITE_SUPABASE_URL
   - VITE_SUPABASE_ANON_KEY

## Next Actions
1. Deploy landing page to Netlify
2. Start collecting real beta signups
3. Build swipe UI prototype
4. Create marketing content
5. Reach out to first 10 beta testers

## Important Reminders
- NO health/diet advice
- NO financial data
- NO therapy/counseling features
- Keep it simple and focused on decisions
- Update this file every session

## Competitive Advantages
1. First couples-focused meal decision app
2. AI that actually compromises (not just overlaps)
3. Fairness tracking
4. Relationship memory
5. Dead simple UX

## Risk Mitigation
- Keep free tier generous (10/week)
- Add solo mode for single-player value
- Cache AI responses to reduce costs
- Plan for pivot to groups if needed

## Progress Summary
- **Completed in Session 1**: Full landing page with email capture
- **Tech Stack**: React + Vite + Supabase 
- **Database**: Waitlist table with RLS policies
- **Ready for**: Netlify deployment
- **Total Time**: ~2 hours
- **Total Cost**: $0 (all free tier)

---
*Last Updated: 2025-07-26 (Session 2)*
*Next Session: Build swipe UI prototype*