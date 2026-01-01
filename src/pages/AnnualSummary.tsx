import { useState, useMemo } from "react";
import Layout from "@/components/layout/Layout";
import PageContainer from "@/components/layout/PageContainer";
import FilterSelect from "@/components/ui/FilterSelect";

interface FilmEntry {
  rank: number;
  film: string;
  director: string;
  year: number;
  note: string;
  image: string;
}

interface YearData {
  year: number;
  films: FilmEntry[];
}

const annualData: YearData[] = [
  {
    year: 2024,
    films: [
      {
        rank: 1,
        film: "The Brutalist",
        director: "Brady Corbet",
        year: 2024,
        note: "Architecture as autobiography. A three-hour meditation on the cost of creation.",
        image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=600&fit=crop",
      },
      {
        rank: 2,
        film: "Flow",
        director: "Gints Zilbalodis",
        year: 2024,
        note: "Animation as pure visual poetry. No words needed.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
      },
      {
        rank: 3,
        film: "Anora",
        director: "Sean Baker",
        year: 2024,
        note: "American dream machinery exposed in neon and chaos.",
        image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
      },
      {
        rank: 4,
        film: "Conclave",
        director: "Edward Berger",
        year: 2024,
        note: "The Vatican as pressure cooker. Fiennes at his most restrained.",
        image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=400&h=600&fit=crop",
      },
      {
        rank: 5,
        film: "A Real Pain",
        director: "Jesse Eisenberg",
        year: 2024,
        note: "Grief and humor intertwined through Polish landscapes.",
        image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
      },
    ],
  },
  {
    year: 2023,
    films: [
      {
        rank: 1,
        film: "Past Lives",
        director: "Celine Song",
        year: 2023,
        note: "Time, distance, and the weight of unlived possibilities.",
        image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
      },
      {
        rank: 2,
        film: "The Zone of Interest",
        director: "Jonathan Glazer",
        year: 2023,
        note: "Horror through absence. The unseen as unbearable.",
        image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=400&h=600&fit=crop",
      },
      {
        rank: 3,
        film: "Poor Things",
        director: "Yorgos Lanthimos",
        year: 2023,
        note: "Liberation as grotesque carnival. Stone transcendent.",
        image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop",
      },
    ],
  },
  {
    year: 2022,
    films: [
      {
        rank: 1,
        film: "Aftersun",
        director: "Charlotte Wells",
        year: 2022,
        note: "Memory as reconstruction. The gaps say everything.",
        image: "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?w=400&h=600&fit=crop",
      },
      {
        rank: 2,
        film: "Decision to Leave",
        director: "Park Chan-wook",
        year: 2022,
        note: "Vertigo reimagined. Love as investigation.",
        image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=600&fit=crop",
      },
    ],
  },
];

const AnnualSummary = () => {
  const years = useMemo(() => {
    return annualData.map((y) => ({ value: String(y.year), label: String(y.year) }));
  }, []);

  const [selectedYear, setSelectedYear] = useState(String(annualData[0].year));

  const selectedData = useMemo(() => {
    return annualData.find((y) => y.year === Number(selectedYear));
  }, [selectedYear]);

  return (
    <Layout>
      <PageContainer>
        <h1 className="text-3xl md:text-4xl mb-8">Annual Summary</h1>

        <div className="flex flex-wrap gap-6 mb-12 pb-6 border-b border-border">
          <FilterSelect label="Year" value={selectedYear} options={years} onChange={setSelectedYear} />
        </div>

        {selectedData && (
          <section>
            <h2 className="text-2xl mb-8 pb-2 border-b border-border">{selectedData.year}</h2>

            <ol className="space-y-8">
              {selectedData.films.map((entry) => (
                <li key={entry.rank} className="grid md:grid-cols-[auto_80px_1fr] gap-4 items-start">
                  <span className="text-2xl text-muted-foreground nav-text w-8">{entry.rank}</span>
                  <img
                    src={entry.image}
                    alt={entry.film}
                    className="w-20 h-28 object-cover grayscale"
                  />
                  <div>
                    <h3 className="text-lg">
                      {entry.film}{" "}
                      <span className="text-muted-foreground">
                        ({entry.director}, {entry.year})
                      </span>
                    </h3>
                    <p className="text-muted-foreground mt-1">{entry.note}</p>
                  </div>
                </li>
              ))}
            </ol>
          </section>
        )}
      </PageContainer>
    </Layout>
  );
};

export default AnnualSummary;
