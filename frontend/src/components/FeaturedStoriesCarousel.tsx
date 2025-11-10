import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

type FeaturedStory = {
  id: string;
  title: string;
  tag: string;
  highlightReason: string;
  excerpt: string;
};

const featuredStories: FeaturedStory[] = [
  {
    id: "1",
    title: "Celestial Tea at Dawn",
    tag: "#Fantasy",
    highlightReason: "Most original imagery",
    excerpt: "As the comet steeped in porcelain, the dragons waited for the first pour of dawn."
  },
  {
    id: "2",
    title: "Midnight Decryption",
    tag: "#Mystery",
    highlightReason: "Top upvoted chain",
    excerpt: "The code spelled her name backwards, but the mirror on the wall refused to show her face."
  },
  {
    id: "3",
    title: "Signal from Tomorrow",
    tag: "#SciFi",
    highlightReason: "Community favorite",
    excerpt: "Every hour the radio clicked once, counting down to the moment Earth replied to itself."
  }
];

export function FeaturedStoriesCarousel() {
  const [index, setIndex] = useState(0);
  const story = featuredStories[index];

  const next = () => setIndex((prev) => (prev + 1) % featuredStories.length);
  const prev = () => setIndex((prev) => (prev - 1 + featuredStories.length) % featuredStories.length);

  return (
    <div className="relative overflow-hidden card-surface p-6">
      <AnimatePresence initial={false}>
        <motion.div
          key={story.id}
          initial={{ opacity: 0, x: 40 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -40 }}
          transition={{ duration: 0.35 }}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center gap-2 rounded-full bg-ct-purple/10 px-4 py-1 text-sm font-medium text-ct-purple">
              {story.tag}
            </span>
            <span className="text-xs uppercase tracking-wide text-ct-text-dark/60">
              {story.highlightReason}
            </span>
          </div>
          <h3 className="font-display text-2xl">{story.title}</h3>
          <p className="text-ct-text-dark/75 text-base leading-relaxed">{story.excerpt}</p>
        </motion.div>
      </AnimatePresence>
      <div className="absolute inset-y-0 left-0 flex items-center">
        <button
          type="button"
          onClick={prev}
          className="h-10 w-10 rounded-full bg-white/80 text-ct-purple shadow hover:shadow-lg transition"
          aria-label="Previous featured story"
        >
          {"<"}
        </button>
      </div>
      <div className="absolute inset-y-0 right-0 flex items-center">
        <button
          type="button"
          onClick={next}
          className="h-10 w-10 rounded-full bg-white/80 text-ct-purple shadow hover:shadow-lg transition"
          aria-label="Next featured story"
        >
          {">"}
        </button>
      </div>
      <div className="mt-4 flex justify-center gap-2">
        {featuredStories.map((item, idx) => (
          <button
            key={item.id}
            type="button"
            onClick={() => setIndex(idx)}
            className={`h-2.5 rounded-full transition-all ${
              idx === index ? "w-8 bg-ct-purple" : "w-2.5 bg-ct-purple/30"
            }`}
            aria-label={`View ${item.title}`}
          />
        ))}
      </div>
    </div>
  );
}

