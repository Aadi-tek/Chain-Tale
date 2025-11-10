export type Tag = {
  id: string;
  name: string;
  description?: string;
  created_at: string;
};

export type StoryLine = {
  id: string;
  user_id: string;
  content: string;
  timestamp: string;
  upvotes: number;
  comments: Array<{
    user_id: string;
    text: string;
    timestamp: string;
  }>;
};

export type Story = {
  id: string;
  tag_id: string;
  title: string;
  lines: StoryLine[];
  word_count: number;
  created_at: string;
  is_archived: boolean;
};

export type Badge = {
  id: string;
  name: string;
  description: string;
  icon_url?: string;
};

export type LeaderboardEntry = {
  user_id: string;
  username: string;
  points: number;
  rank: number;
};

export type LeaderboardResponse = {
  week_start: string;
  week_end: string;
  entries: LeaderboardEntry[];
};

