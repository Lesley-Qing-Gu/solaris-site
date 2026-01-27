import { useState, useMemo } from "react";
import Layout from "@/components/layout/Layout";
import PageContainer from "@/components/layout/PageContainer";
import FilterSelect from "@/components/ui/FilterSelect";
import { solarisRatings } from "@/data/solarisRatings";

console.log(
  "SOLARIS KEYS AT RUNTIME:",
  Object.keys(solarisRatings)
);

interface Rating {
  film: string;
  director: string;
  year: number;
  rating: string;
  note: string;
  image: string;
}

interface MonthData {
  month: string;
  monthNum: number;
  year: number;
  ratings: Rating[];
}

const normalizeTitle = (s: string) =>
  s
    .toLowerCase()
    .replace(/[’‘]/g, "'")
    .replace(/[–—]/g, "-")
    .replace(/[^a-z0-9]+/g, " ")
    .trim();


const monthlyData: MonthData[] = [
  {
    month: "February",
    monthNum: 2,
    year: 2026,
    ratings: [
      {
        film: "Marty Supreme",
        director: "Josh Safdie",
        year: 2025,
        rating: "TBA",
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/1/1/9/7/4/9/9/1197499-marty-supreme-0-2000-0-3000-crop.jpg?v=b14a26bb43",
      },
    ],
  },
  {
    month: "January",
    monthNum: 1,
    year: 2026,
    ratings: [
      {
        film: "Ella McCay",
        director: "James L. Brooks",
        year: 2025,
        rating: "TBA",
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/1/0/9/0/7/2/8/1090728-ella-mccay-0-460-0-690-crop.jpg?v=7ef122460e",
      },
      {
        film: "Kokuho",
        director: "Sang-il Lee",
        year: 2025,
        rating: "TBA",
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/1/2/6/5/6/5/8/1265658-kokuho-0-460-0-690-crop.jpg?v=662ff79da5",
      },
      {
        film: "Cosmic Princess Kaguya!",
        director: "Shingo Yamashita",
        year: 2026,
        rating: "TBA",
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/1/4/4/7/3/3/5/1447335-cosmic-princess-kaguya-0-460-0-690-crop.jpg?v=b567cda7f7",
      },
      {
        film: "Sons of the Neon Night",
        director: "Juno Mak",
        year: 2025,
        rating: "TBA",
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/4/0/9/7/9/1/409791-sons-of-the-neon-night-0-460-0-690-crop.jpg?v=59b66f4059",
      },
      {
        film: "The Voice of Hind Rajab",
        director: "Kaouther Ben Hania",
        year: 2025,
        rating: "TBA",
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/1/3/5/7/4/0/2/1357402-the-voice-of-hind-rajab-0-460-0-690-crop.jpg?v=c5d8abe27e",
      },
      {
        film: "Sound of Falling",
        director: "Mascha Schilinski",
        year: 2025,
        rating: "TBA",
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/1/1/0/4/8/2/6/1104826-sound-of-falling-0-460-0-690-crop.jpg?v=a6e045cc0d",
      },
      {
        film: "Fire of Wind",
        director: "Marta Mateus",
        year: 2024,
        rating: "TBA",
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/1/1/9/6/0/4/9/1196049-fire-of-wind-0-460-0-690-crop.jpg?v=cf015e3e90",
      },
      {
        film: "The Secret Agent",
        director: "Kleber Mendonça Filho",
        year: 2025,
        rating: "TBA",
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/1/1/0/4/3/4/8/1104348-the-secret-agent-2025-0-460-0-690-crop.jpg?v=3bcd2a3e02",
      },
      {
        film: "Copper",
        director: "Nicolás Pereda",
        year: 2025,
        rating: "TBA",
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/1/3/6/9/7/5/4/1369754-copper-2025-0-460-0-690-crop.jpg?v=a172bc408b",
      },
      {
        film: "Heads or Tails?",
        director: "Matteo Zoppis",
        year: 2025,
        rating: "TBA",
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/9/7/2/6/0/9/972609-heads-or-tails-2025-0-460-0-690-crop.jpg?v=e22c78c5f2",
      },
      {
        film: "La Grazia",
        director: "Paolo Sorrentino",
        year: 2025,
        rating: "TBA",
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/1/2/8/1/4/7/4/1281474-la-grazia-0-2000-0-3000-crop.jpg?v=d28244df69",
      },
      {
        film: "Pillion",
        director: "Harry Lighton",
        year: 2025,
        rating: "TBA",
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/1/1/7/0/4/3/3/1170433-pillion-2025-0-2000-0-3000-crop.jpg?v=680a4585fe",
      },
      {
        film: "Joan of arc",
        director: "Hlynur Pálmason",
        year: 2025,
        rating: "TBA",
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/1/4/0/8/3/9/2/1408392-joan-of-arc-2025-0-2000-0-3000-crop.jpg?v=3483f88b2f",
      },
      {
        film: "The Last One for the Road",
        director: "Francesco Sossai",
        year: 2025,
        rating: "TBA",
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/1/3/3/9/0/6/3/1339063-the-last-one-for-the-road-0-2000-0-3000-crop.jpg?v=1b0b124da9",
      },
      {
        film: "Leibniz – Chronicle of a Lost Painting",
        director: "Edgar Reitz",
        year: 2025,
        rating: "TBA",
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/1/0/9/4/6/2/2/1094622-leibniz-chronicle-of-a-lost-painting-0-2000-0-3000-crop.jpg?v=4cabd3b311",
      },
      {
        film: "Wind, Talk to Me",
        director: "Stefan Đorđević",
        year: 2025,
        rating: "TBA",
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/1/1/3/1/9/3/6/1131936-wind-talk-to-me-0-2000-0-3000-crop.jpg?v=4d3c78f6d4",
      },
      {
        film: "Put Your Soul on Your Hand and Walk",
        director: "Sepideh Farsi",
        year: 2025,
        rating: "TBA",
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/1/3/4/2/5/6/8/1342568-put-your-soul-on-your-hand-and-walk-0-2000-0-3000-crop.jpg?v=b570ad48f3",
      },
      {
        film: "Peter Hujar’s Day",
        director: "Ira Sachs",
        year: 2025,
        rating: "TBA",
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/1/0/4/5/6/5/1/1045651-peter-hujars-day-0-1000-0-1500-crop.jpg?v=72400d36c2",
      },
      {
        film: "Duse",
        director: "Pietro Marcello",
        year: 2025,
        rating: "TBA",
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/1/1/7/4/2/4/0/1174240-duse-0-2000-0-3000-crop.jpg?v=8daf9236bd",
      },
      {
        film: "Romería",
        director: "Carla Simón",
        year: 2025,
        rating: "TBA",
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/1/0/6/9/0/3/7/1069037-romeria-0-1000-0-1500-crop.jpg?v=5268e5d224",
      },
      {
        film: "Dracula",
        director: "Radu Jude",
        year: 2025,
        rating: "TBA",
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/1/2/0/4/0/0/1/1204001-dracula-2025-1-0-1000-0-1500-crop.jpg?v=4fb1824d1a",
      },
      {
        film: "Castration Movie Anthology i. Traps",
        director: "Louise Weard",
        year: 2024,
        rating: "TBA",
        note: "Andy Warhol in the new century. —— Ada的B计划",
        image: "https://a.ltrbxd.com/resized/film-poster/1/1/2/6/5/0/5/1126505-castration-movie-anthology-i-traps-0-1000-0-1500-crop.jpg?v=6b336b747a",
      },
      {
        film: "100 METERS",
        director: "Kenji Iwaisawa",
        year: 2025,
        rating: "TBA",
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/1/1/7/7/4/8/9/1177489-100-meters-2025-0-1000-0-1500-crop.jpg?v=8624aa1018",
      },
      {
        film: "Stranger Things Season 5",
        director: "Matt Duffer, Ross Duffer, Frank Darabont & Shawn Levy",
        year: 2025,
        rating: "TBA",
        note: "",
        image: "/monthly/ST5.png",
      },
      {
        film: "The Butcher",
        director: "Claude Chabrol",
        year: 1970,
        rating: "TBA",
        note: "A Claude Chabrol film screening and discussion examining auteur cinema and genre film within the French New Wave.",
        image: "https://a.ltrbxd.com/resized/film-poster/5/0/0/1/3/50013-the-butcher-0-2000-0-3000-crop.jpg?v=50c410b3b1",
      },
      {
        film: "The Prefab People",
        director: "Béla Tarr",
        year: 1982,
        rating: "TBA",
        note: "In memory of Béla Tarr (21 July 1955 – 6 January 2026).",
        image: "https://a.ltrbxd.com/resized/film-poster/6/3/2/9/6329-the-prefab-people-0-1000-0-1500-crop.jpg?v=771ab48fd9",
      },
      {
        film: "Damnation",
        director: "Béla Tarr",
        year: 1988,
        rating: "TBA",
        note: "In memory of Béla Tarr (21 July 1955 – 6 January 2026).",
        image: "https://a.ltrbxd.com/resized/film-poster/3/9/2/2/2/39222-damnation-0-1000-0-1500-crop.jpg?v=40e026b5a5",
      },
      {
        film: "Satantango",
        director: "Béla Tarr",
        year: 1994,
        rating: "TBA",
        note: "In memory of Béla Tarr (21 July 1955 – 6 January 2026).",
        image: "https://a.ltrbxd.com/resized/sm/upload/oc/n6/z2/qz/8y1sxjPRHR5sTxBa3oa9eUXzmd7-0-1000-0-1500-crop.jpg?v=b56c52fdbb",
      },
      {
        film: "Werckmeister Harmonies",
        director: "Béla Tarr",
        year: 2000,
        rating: "TBA",
        note: "In memory of Béla Tarr (21 July 1955 – 6 January 2026).",
        image: "https://a.ltrbxd.com/resized/film-poster/3/7/5/0/7/37507-werckmeister-harmonies-0-1000-0-1500-crop.jpg?v=a3115c9fcb",
      },
      {
        film: "The Turin Horse",
        director: "Béla Tarr",
        year: 2011,
        rating: "TBA",
        note: "In memory of Béla Tarr (21 July 1955 – 6 January 2026).",
        image: "https://a.ltrbxd.com/resized/film-poster/6/7/8/3/0/67830-the-turin-horse-0-1000-0-1500-crop.jpg?v=443911e477",
      },
    ],
  },
  {
    month: "December",
    monthNum: 12,
    year: 2025,
    ratings: [
      {
        film: "All I Had Was Nothingness",
        director: "Guillaume Ribot",
        year: 2025,
        rating: "4.00",
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/1/2/9/8/8/4/5/1298845-all-i-had-was-nothingness-0-2000-0-3000-crop.jpg?v=bb8bc08739",
      },
    ],
  },
];

type SortMode = "none" | "title" | "rating" | "director" | "year";

const MonthlyRatings = () => {
  const years = useMemo(() => {
    const uniqueYears = [...new Set(monthlyData.map((m) => m.year))].sort(
      (a, b) => b - a
    );
    return [
      { value: "all", label: "All Years" },
      ...uniqueYears.map((y) => ({ value: String(y), label: String(y) })),
    ];
  }, []);

  const months = [
    { value: "all", label: "All Months" },
    { value: "1", label: "January" },
    { value: "2", label: "February" },
    { value: "3", label: "March" },
    { value: "4", label: "April" },
    { value: "5", label: "May" },
    { value: "6", label: "June" },
    { value: "7", label: "July" },
    { value: "8", label: "August" },
    { value: "9", label: "September" },
    { value: "10", label: "October" },
    { value: "11", label: "November" },
    { value: "12", label: "December" },
  ];

  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedMonth, setSelectedMonth] = useState("all");
  const [sortMode, setSortMode] = useState<SortMode>("none");

  const filteredData = useMemo(() => {
    return monthlyData.filter((m) => {
      const yearMatch =
        selectedYear === "all" || m.year === Number(selectedYear);
      const monthMatch =
        selectedMonth === "all" || m.monthNum === Number(selectedMonth);
      return yearMatch && monthMatch;
    });
  }, [selectedYear, selectedMonth]);

  const applySolarisRating = (r: Rating): Rating => {
    const solarisScore = solarisRatings[normalizeTitle(r.film)];

    // 没有 Solaris 分数 → 原样返回
    if (!solarisScore) return r;

    // 只替换 TBA（安全）
    if (r.rating === "TBA") {
      return { ...r, rating: solarisScore };
    }

    return r;
  };

  const sortRatings = (ratings: Rating[]) => {
    if (sortMode === "none") return ratings;

    const copied = [...ratings];

    switch (sortMode) {
      case "title":
        return copied.sort((a, b) =>
          a.film.localeCompare(b.film, "en", { sensitivity: "base" })
        );

      case "director":
        return copied.sort((a, b) =>
          a.director.localeCompare(b.director, "en", {
            sensitivity: "base",
          })
        );

      case "year":
        return copied.sort((a, b) => b.year - a.year);

      case "rating":
        return copied.sort((a, b) => {
          const ra = a.rating === "TBA" ? -1 : Number(a.rating);
          const rb = b.rating === "TBA" ? -1 : Number(b.rating);
          return rb - ra;
        });

      default:
        return copied;
    }
  };

  return (
    <Layout>
      <PageContainer>
        <h1 className="text-3xl md:text-4xl mb-8">
          Monthly Ratings
        </h1>

        <div className="flex flex-wrap gap-6 mb-12 pb-6 border-b border-border">
          <FilterSelect
            label="Year"
            value={selectedYear}
            options={years}
            onChange={setSelectedYear}
          />
          <FilterSelect
            label="Month"
            value={selectedMonth}
            options={months}
            onChange={setSelectedMonth}
          />
        </div>

        {filteredData.length === 0 ? (
          <p className="text-muted-foreground">
            No ratings found for this selection.
          </p>
        ) : (
          <div className="space-y-16">
            {filteredData.map((month, monthIndex) => (
              <section key={monthIndex}>
                <div className="flex items-center justify-between mb-6 pb-2 border-b border-border">
                  <h2 className="text-xl">
                    {month.month} {month.year}
                  </h2>

                  <div className="flex gap-3 text-sm text-muted-foreground">
                    <SortText
                      active={sortMode === "rating"}
                      onClick={() => setSortMode("rating")}
                    >
                      Rating
                    </SortText>

                    <SortText
                      active={sortMode === "title"}
                      onClick={() => setSortMode("title")}
                    >
                      Title
                    </SortText>

                    <SortText
                      active={sortMode === "director"}
                      onClick={() => setSortMode("director")}
                    >
                      Director
                    </SortText>

                    <SortText
                      active={sortMode === "year"}
                      onClick={() => setSortMode("year")}
                    >
                      Year
                    </SortText>
                  </div>
                </div>

                <div className="space-y-8">
                  {sortRatings(
                    month.ratings.map(applySolarisRating)
                  ).map((rating, ratingIndex) => (
                      <div
                        key={ratingIndex}
                        className="grid md:grid-cols-[80px_1fr_auto] gap-4 items-start"
                      >
                        <img
                          src={rating.image}
                          alt={rating.film}
                          className="w-20 h-28 object-cover grayscale"
                        />
                        <div>
                          <h3 className="text-lg">
                            {rating.film}{" "}
                            <span className="text-muted-foreground">
                              ({rating.director}, {rating.year})
                            </span>
                          </h3>
                          <p className="text-muted-foreground mt-1">
                            {rating.note}
                          </p>
                        </div>
                        <div className="text-lg md:text-right nav-text font-medium">
                          {rating.rating}
                        </div>
                      </div>
                    )
                  )}
                </div>
              </section>
            ))}
          </div>
        )}
      </PageContainer>
    </Layout>
  );
};

interface SortTextProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
}

const SortText = ({ children, active, onClick }: SortTextProps) => {
  return (
    <button
      onClick={onClick}
      className={`font-sans text-sm font-normal transition
        ${
          active
            ? "text-white"
            : "text-muted-foreground hover:text-white"
        }`}
    >
      {children}
    </button>
  );
};

export default MonthlyRatings;
