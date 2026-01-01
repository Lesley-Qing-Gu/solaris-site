import { useState, useMemo } from "react";
import Layout from "@/components/layout/Layout";
import PageContainer from "@/components/layout/PageContainer";
import FilterSelect from "@/components/ui/FilterSelect";

interface FestivalFilm {
  film: string;
  director: string;
  year: number;
  rating: string;
  note: string;
  image: string;
}

interface FestivalData {
  name: string;
  year: number;
  films: FestivalFilm[];
}

const festivalData: FestivalData[] = [
  {
    name: "Venice Film Festival",
    year: 2024,
    films: [
      {
        film: "The Brutalist",
        director: "Brady Corbet",
        year: 2024,
        rating: "8.5",
        note: "Silver Lion for Best Direction. Deserved more.",
        image: "https://images.unsplash.com/photo-1518005020951-eccb494ad742?w=400&h=600&fit=crop",
      },
      {
        film: "The Room Next Door",
        director: "Pedro Almodóvar",
        year: 2024,
        rating: "7.6",
        note: "Almodóvar's English-language debut. Tender, if minor.",
        image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=400&h=600&fit=crop",
      },
      {
        film: "Queer",
        director: "Luca Guadagnino",
        year: 2024,
        rating: "7.2",
        note: "Hallucinatory Burroughs. Craig unrecognizable.",
        image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=600&fit=crop",
      },
    ],
  },
  {
    name: "Cannes Film Festival",
    year: 2024,
    films: [
      {
        film: "Anora",
        director: "Sean Baker",
        year: 2024,
        rating: "7.8",
        note: "Palme d'Or winner. Chaotic energy that never settles.",
        image: "https://images.unsplash.com/photo-478720568477-152d9b164e26?w=400&h=600&fit=crop",
      },
      {
        film: "Emilia Pérez",
        director: "Jacques Audiard",
        year: 2024,
        rating: "6.9",
        note: "Bold but exhausting. Genre-defying or genre-confused?",
        image: "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=400&h=600&fit=crop",
      },
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
    name: "Berlin Film Festival",
    year: 2024,
    films: [
      {
        film: "Dahomey",
        director: "Mati Diop",
        year: 2024,
        rating: "7.8",
        note: "Golden Bear winner. Haunting meditation on repatriation.",
        image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=400&h=600&fit=crop",
      },
    ],
  },
  {
    name: "Venice Film Festival",
    year: 2023,
    films: [
      {
        film: "Poor Things",
        director: "Yorgos Lanthimos",
        year: 2023,
        rating: "8.4",
        note: "Golden Lion. Lanthimos at his most exuberant.",
        image: "https://images.unsplash.com/photo-1518676590629-3dcbd9c5a5c9?w=400&h=600&fit=crop",
      },
    ],
  },
  {
    name: "Cannes Film Festival",
    year: 2023,
    films: [
      {
        film: "Anatomy of a Fall",
        director: "Justine Triet",
        year: 2023,
        rating: "8.2",
        note: "Palme d'Or. Marriage as crime scene.",
        image: "https://images.unsplash.com/photo-1524712245354-2c4e5e7121c0?w=400&h=600&fit=crop",
      },
    ],
  },
];

const FestivalRatings = () => {
  const festivals = useMemo(() => {
    const uniqueFestivals = [...new Set(festivalData.map((f) => f.name))];
    return [{ value: "all", label: "All Festivals" }, ...uniqueFestivals.map((f) => ({ value: f, label: f }))];
  }, []);

  const years = useMemo(() => {
    const uniqueYears = [...new Set(festivalData.map((f) => f.year))].sort((a, b) => b - a);
    return [{ value: "all", label: "All Years" }, ...uniqueYears.map((y) => ({ value: String(y), label: String(y) }))];
  }, []);

  const [selectedFestival, setSelectedFestival] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");

  const filteredData = useMemo(() => {
    return festivalData.filter((f) => {
      const festivalMatch = selectedFestival === "all" || f.name === selectedFestival;
      const yearMatch = selectedYear === "all" || f.year === Number(selectedYear);
      return festivalMatch && yearMatch;
    });
  }, [selectedFestival, selectedYear]);

  return (
    <Layout>
      <PageContainer>
        <h1 className="text-3xl md:text-4xl mb-8">Festival Ratings</h1>

        <div className="flex flex-wrap gap-6 mb-12 pb-6 border-b border-border">
          <FilterSelect label="Festival" value={selectedFestival} options={festivals} onChange={setSelectedFestival} />
          <FilterSelect label="Year" value={selectedYear} options={years} onChange={setSelectedYear} />
        </div>

        {filteredData.length === 0 ? (
          <p className="text-muted-foreground">No ratings found for this selection.</p>
        ) : (
          <div className="space-y-20">
            {filteredData.map((festival, festivalIndex) => (
              <section key={festivalIndex}>
                <h2 className="text-xl mb-6 pb-2 border-b border-border">
                  {festival.name} {festival.year}
                </h2>

                <div className="space-y-8">
                  {festival.films.map((film, filmIndex) => (
                    <div key={filmIndex} className="grid md:grid-cols-[80px_1fr_auto] gap-4 items-start">
                      <img
                        src={film.image}
                        alt={film.film}
                        className="w-20 h-28 object-cover grayscale"
                      />
                      <div>
                        <h3 className="text-lg">
                          {film.film}{" "}
                          <span className="text-muted-foreground">
                            ({film.director}, {film.year})
                          </span>
                        </h3>
                        <p className="text-muted-foreground mt-1">{film.note}</p>
                      </div>
                      <div className="text-lg md:text-right nav-text font-medium">{film.rating}</div>
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

export default FestivalRatings;
