import { Routes, Route } from "react-router-dom";

import { HomePage } from "../pages/HomePage";
import { ExplorePage } from "../pages/ExplorePage";
import { LeaderboardPage } from "../pages/LeaderboardPage";
import { ArchivePage } from "../pages/ArchivePage";
import { ProfilePage } from "../pages/ProfilePage";
import { TagPage } from "../pages/TagPage";
import { NotFoundPage } from "../pages/NotFoundPage";

export function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/explore" element={<ExplorePage />} />
      <Route path="/leaderboard" element={<LeaderboardPage />} />
      <Route path="/archive" element={<ArchivePage />} />
      <Route path="/profile/:username" element={<ProfilePage />} />
      <Route path="/tag/:tagSlug" element={<TagPage />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

