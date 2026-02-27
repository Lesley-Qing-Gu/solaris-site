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
  ["Duse", "1.60 (5)"],
  ["Ella McCay", "3.50 (12)"],
  ["Joan of Arc", "3.25 (4)"],
  ["Voice of Rain That Comes at Night", "4.00 (4)"],
  ["The Chronology of Water", "2.50 (10)"],
  ["Arco", "3.13 (8)"],
  ["Resurrection", "2.54 (24)"],
  ["Hamnet", "2.64 (22)"],
  ["Amrum", "2.00 (1)"],
  ["The Disappearance of Josef Mengele", "2.00 (2)"],
  ["Mother’s Baby", "2.83 (6)"],
  ["Yes", "4.15 (27)"],
  ["Orphan", "2.00 (5)"],
  ["Is This Thing On?", "2.50 (2)"],
  ["Blades of the Guardians: Wind Rises in the Desert", "2.78 (9)"],
  ["Strange River", "3.33 (6)"],
  ["Marty Supreme", "4.22 (18)"],
  ["The Great Arch", "3.00 (3)"],
  ["Henry Fonda for President", "3.00 (1)"],
  ["You are the Best", "3.38 (21)"],
  ["Dead Man’s Wire", "3.25 (4)"],
  ["Per Aspera Ad Astra", "1.00 (1)"],
  ["Pillion", "3.00 (11)"],
  ["Girl", "2.17 (12)"],
  ["La Grazia", "1.33 (6)"],
  ["Scare Out", "1.50 (4)"],
  ["Pegasus 3", "1.80 (5)"]
  ].map(([title, score]) => [normalizeTitle(title), score])
);
