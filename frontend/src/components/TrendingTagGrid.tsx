import { TagCard } from "./TagCard";

const trendingTags = [
  {
    name: "#Fantasy",
    contributors: 1240,
    streak: 18,
    description: "Dragons, prophecy, and enchanted tea kettles."
  },
  {
    name: "#Mystery",
    contributors: 980,
    streak: 12,
    description: "Whispers in the dark and clues in plain sight."
  },
  {
    name: "#SciFi",
    contributors: 1112,
    streak: 22,
    description: "Quantum heists and cosmic alliances."
  },
  {
    name: "#Cozy",
    contributors: 764,
    streak: 9,
    description: "Warm drinks, soft blankets, and gentle twists."
  }
];

export function TrendingTagGrid() {
  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {trendingTags.map((tag) => (
        <TagCard key={tag.name} tag={tag} />
      ))}
    </div>
  );
}

