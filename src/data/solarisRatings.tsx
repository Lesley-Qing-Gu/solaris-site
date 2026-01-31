const normalizeTitle = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[–—]/g, "-")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();

export const solarisRatings: Record<string, string> = Object.fromEntries(
[
  ["Castration Movie Anthology i. Traps", "4.60 (5)"],
  ["Satantango", "4.27 (11)"],
  ["The Secret Agent", "4.19 (21)"],
  ["Cosmic Princess Kaguya!", "4.00 (1)"],
  ["Wind, Talk to Me", "4.00 (4)"],
  ["Werckmeister Harmonies", "4.00 (13)"],
  ["The Turin Horse", "3.93 (15)"],
  ["Stranger Things Season 5", "3.80 (5)"],
  ["The Butcher", "3.89 (9)"],
  ["Leibniz – Chronicle of a Lost Painting", "3.67 (6)"],
  ["Damnation", "3.45 (11)"],
  ["Fire of Wind", "3.50 (8)"],
  ["Romería", "3.47 (15)"],
  ["Heads or Tails?", "3.36 (14)"],
  ["Copper", "3.33 (3)"],
  ["100 METERS", "3.24 (17)"],
  ["Dracula", "3.21 (28)"],
  ["Peter Hujar’s Day", "3.20 (15)"],
  ["La Grazia", "3.00 (1)"],
  ["The Last One for the Road", "3.14 (7)"],
  ["The Prefab People", "3.00 (4)"],
  ["Sons of the Neon Night", "2.86 (21)"],
  ["Put Your Soul on Your Hand and Walk", "2.50 (2)"],
  ["The Voice of Hind Rajab", "2.10 (10)"],
  ["Kokuho", "2.00 (6)"],
  ["Sound of Falling", "2.14 (14)"],
  ["Duse", "1.60 (5)"]
  ].map(([title, score]) => [normalizeTitle(title), score])
);
