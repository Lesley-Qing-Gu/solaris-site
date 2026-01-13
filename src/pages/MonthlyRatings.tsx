import { useState, useMemo } from "react";
import Layout from "@/components/layout/Layout";
import PageContainer from "@/components/layout/PageContainer";
import FilterSelect from "@/components/ui/FilterSelect";

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

const monthlyData: MonthData[] = [
  {
    month: "February",
    monthNum: 2,
    year: 2026,
    ratings: [
      {
        film: "Pillion",
        director: "Harry Lighton",
        year: 2025,
        rating: "TBA",
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/1/1/7/0/4/3/3/1170433-pillion-2025-0-2000-0-3000-crop.jpg?v=680a4585fe",
      },
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
        rating: "TBA",
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/1/2/9/8/8/4/5/1298845-all-i-had-was-nothingness-0-2000-0-3000-crop.jpg?v=bb8bc08739",
      },
      {
        film: "Castration Movie Anthology i. Traps",
        director: "Louise Weard",
        year: 2024,
        rating: "10.0",
        note: "Andy Warhol in the new century. —— Ada的B计划",
        image: "https://a.ltrbxd.com/resized/film-poster/1/1/2/6/5/0/5/1126505-castration-movie-anthology-i-traps-0-1000-0-1500-crop.jpg?v=6b336b747a",
      },
    ],
  },
];

const MonthlyRatings = () => {
  const years = useMemo(() => {
    const uniqueYears = [...new Set(monthlyData.map((m) => m.year))].sort((a, b) => b - a);
    return [{ value: "all", label: "All Years" }, ...uniqueYears.map((y) => ({ value: String(y), label: String(y) }))];
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

  const filteredData = useMemo(() => {
    return monthlyData.filter((m) => {
      const yearMatch = selectedYear === "all" || m.year === Number(selectedYear);
      const monthMatch = selectedMonth === "all" || m.monthNum === Number(selectedMonth);
      return yearMatch && monthMatch;
    });
  }, [selectedYear, selectedMonth]);

  return (
    <Layout>
      <PageContainer>
        <h1 className="text-3xl md:text-4xl mb-8">Monthly Ratings</h1>

        <div className="flex flex-wrap gap-6 mb-12 pb-6 border-b border-border">
          <FilterSelect label="Year" value={selectedYear} options={years} onChange={setSelectedYear} />
          <FilterSelect label="Month" value={selectedMonth} options={months} onChange={setSelectedMonth} />
        </div>

        {filteredData.length === 0 ? (
          <p className="text-muted-foreground">No ratings found for this selection.</p>
        ) : (
          <div className="space-y-16">
            {filteredData.map((month, monthIndex) => (
              <section key={monthIndex}>
                <h2 className="text-xl mb-6 pb-2 border-b border-border">
                  {month.month} {month.year}
                </h2>

                <div className="space-y-8">
                  {month.ratings.map((rating, ratingIndex) => (
                    <div key={ratingIndex} className="grid md:grid-cols-[80px_1fr_auto] gap-4 items-start">
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
                        <p className="text-muted-foreground mt-1">{rating.note}</p>
                      </div>
                      <div className="text-lg md:text-right nav-text font-medium">{rating.rating}</div>
                    </div>
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </PageContainer>
    </Layout>
  );
};

export default MonthlyRatings;
