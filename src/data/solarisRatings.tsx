const normalizeTitle = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[–—]/g, "-")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

export const solarisRatings: Record<string, string> = Object.fromEntries(
  [
    ["The Butcher", "3.88"],
    ["Werckmeister Harmonies", "4.00"],
    ["Damnation", "3.60"],
    ["Satantango", "4.27"],
    ["The Prefab People", "3.00"],
    ["The Turin Horse", "3.93"],
    ["Sons of the Neon Night", "2.85"],
    ["Heads or Tails?", "3.36"],
    ["Romería", "3.47"],
    ["Wind, Talk to Me", "4.00"],
    ["Sound of Falling", "1.92"],
    ["The Secret Agent", "4.20"],
    ["Dracula", "3.20"],
    ["Peter Hujar’s Day", "3.15"],
    ["Duse", "1.60"],
    ["Pillion", "2.89"],
    ["100 METERS", "3.24"],
    ["Fire of Wind", "3.50"],
    ["Leibniz – Chronicle of a Lost Painting", "3.67"],
    ["La Grazia", "3.14"],
    ["Copper", "3.33"],
    ["Castration Movie Anthology i. Traps", "4.60"],
    ["All I Had Was Nothingness", "4.00"],
    ["Put Your Soul on Your Hand and Walk", "2.50"],
    ["The Voice of Hind Rajab", "2.38"],
    ["Kokuho", "2.00"],
    ["Joan of arc", "TBA"],
    ["The Last One for the Road", "3.14"],
    ["Cosmic Princess Kaguya!", "4.00"],
    ["Stranger Things Season 5", "3.88"],
  ].map(([title, score]) => [normalizeTitle(title), score])
);
