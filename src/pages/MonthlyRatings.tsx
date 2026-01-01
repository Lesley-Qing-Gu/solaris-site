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
    month: "December",
    monthNum: 12,
    year: 2024,
    ratings: [
      {
        film: "The Brutalist",
        director: "Brady Corbet",
        year: 2024,
        rating: "8.5",
        note: "A monumental work on ambition and displacement.",
        image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=600&fit=crop",
      },
      {
        film: "Anora",
        director: "Sean Baker",
        year: 2024,
        rating: "7.8",
        note: "Sharp and kinetic, with a bitter aftertaste.",
        image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
      },
      {
        film: "Flow",
        director: "Gints Zilbalodis",
        year: 2024,
        rating: "8.2",
        note: "Wordless and elemental. Pure cinema.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
      },
    ],
  },
  {
    month: "November",
    monthNum: 11,
    year: 2024,
    ratings: [
      {
        film: "Conclave",
        director: "Edward Berger",
        year: 2024,
        rating: "7.4",
        note: "Taut ecclesiastical thriller with formal precision.",
        image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
      },
      {
        film: "Emilia Pérez",
        director: "Jacques Audiard",
        year: 2024,
        rating: "6.9",
        note: "Audacious genre collision, uneven execution.",
        image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
      },
    ],
  },
  {
    month: "October",
    monthNum: 10,
    year: 2024,
    ratings: [
      {
        film: "The Substance",
        director: "Coralie Fargeat",
        year: 2024,
        rating: "7.4",
        note: "Body horror as industry critique. Unsubtle but effective.",
        image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
      },
    ],
  },
  {
    month: "March",
    monthNum: 3,
    year: 2023,
    ratings: [
      {
        film: "Past Lives",
        director: "Celine Song",
        year: 2023,
        rating: "8.8",
        note: "Time, distance, and the weight of unlived possibilities.",
        image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
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
