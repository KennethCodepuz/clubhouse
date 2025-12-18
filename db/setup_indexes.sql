-- Indexes for posts table
CREATE INDEX IF NOT EXISTS idx_posts_user_id ON posts(user_id);
CREATE INDEX IF NOT EXISTS idx_posts_group_name ON posts(group_name);
CREATE INDEX IF NOT EXISTS idx_posts_created_at ON posts(created_at DESC);