import { motion } from "framer-motion";
import { TrendingTagGrid } from "../components/TrendingTagGrid";
import { FeaturedStoriesCarousel } from "../components/FeaturedStoriesCarousel";
import { GradientButton } from "../components/GradientButton";

export function HomePage() {
  return (
    <div className="flex flex-col gap-10">
      <section className="card-surface p-10 relative overflow-hidden">
        <div className="absolute inset-0 bg-ct-gradient opacity-10 blur-3xl" />
        <div className="relative flex flex-col gap-6">
          <h1 className="text-4xl md:text-5xl font-display text-ct-text-dark">
            One line. Infinite stories.
          </h1>
          <p className="text-lg text-ct-text-dark/80 max-w-2xl">
            Join genre-loving writers across the globe to weave tales one sentence at a time. Pick your
            favorite Tag, continue the thread, and unlock achievements as your imagination takes flight.
          </p>
          <div className="flex flex-wrap gap-3">
            <GradientButton to="/explore" label="Start a New Chain" />
            <GradientButton to="/leaderboard" variant="outline" label="View Leaderboard" />
          </div>
        </div>
      </section>

      <section className="flex flex-col gap-6">
        <header className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl">Weekly Featured Tales</h2>
            <p className="text-ct-text-dark/70 text-sm">The most creative chains chosen by the community.</p>
          </div>
        </header>
        <FeaturedStoriesCarousel />
      </section>

      <section className="flex flex-col gap-6">
        <header className="flex items-center justify-between">
          <div>
            <h2 className="font-display text-2xl">Trending Tags</h2>
            <p className="text-ct-text-dark/70 text-sm">Discover communities buzzing with new lines today.</p>
          </div>
          <GradientButton to="/explore" variant="ghost" label="Explore All Tags" />
        </header>
        <TrendingTagGrid />
      </section>

      <motion.section
        className="card-surface p-8 flex flex-col md:flex-row items-center justify-between gap-6"
        initial={{ opacity: 0, scale: 0.95 }}
        whileInView={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4 }}
      >
        <div>
          <h3 className="font-display text-2xl mb-2">Keep your streak alive</h3>
          <p className="text-ct-text-dark/70">
            Add at least one line a day and earn the 🔥 Streak Writer badge. Watch your badge shelf glow as
            you collaborate.
          </p>
        </div>
        <GradientButton to="/profile/me" label="View Profile" />
      </motion.section>
    </div>
  );
}

