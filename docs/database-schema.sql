-- Waitlist table for collecting early signups
CREATE TABLE waitlist (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT UNIQUE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE waitlist ENABLE ROW LEVEL SECURITY;

-- Allow anonymous users to insert their email
CREATE POLICY "Anyone can join waitlist" ON waitlist
  FOR INSERT WITH CHECK (true);

-- Only authenticated users can view waitlist (for admin purposes)
CREATE POLICY "Only authenticated can view waitlist" ON waitlist
  FOR SELECT USING (auth.role() = 'authenticated');