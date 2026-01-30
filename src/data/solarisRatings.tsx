const normalizeTitle = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[–—]/g, "-")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

export const solarisRatings: Record<string, string> = Object.fromEntries(
  [
    ["Castration Movie Anthology i. Traps", "4.60"],
    ["Satantango", "4.27"],
    ["The Secret Agent", "4.19"],
    ["Cosmic Princess Kaguya!", "4.00"],
    ["Wind, Talk to Me", "4.00"],
    ["Werckmeister Harmonies", "4.00"],
    ["The Turin Horse", "3.93"],
    ["Stranger Things Season 5", "3.80"],
    ["The Butcher", "3.89"],
    ["Leibniz – Chronicle of a Lost Painting", "3.67"],
    ["Damnation", "3.45"],
    ["Fire of Wind", "3.57"],
    ["Romería", "3.47"],
    ["Heads or Tails?", "3.36"],
    ["Copper", "3.33"],
    ["100 METERS", "3.24"],
    ["Dracula", "3.21"],
    ["Peter Hujar’s Day", "3.20"],
    ["La Grazia", "3.00"],
    ["The Last One for the Road", "3.14"],
    ["The Prefab People", "3.00"],
    ["Sons of the Neon Night", "2.86"],
    ["Put Your Soul on Your Hand and Walk", "2.50"],
    ["The Voice of Hind Rajab", "2.10"],
    ["Kokuho", "2.00"],
    ["Sound of Falling", "2.14"],
    ["Duse", "1.60"],
    ["Ella McCay", "3.50"]
  ].map(([title, score]) => [normalizeTitle(title), score])
);
