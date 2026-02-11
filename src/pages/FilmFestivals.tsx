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
    name: "Berlin Film Festival",
    year: 2026,
    films: [
      {
        film: "Queen at Sea",
        director: "Lance Hammer",
        year: 2026,
        rating: "TBA",
        note: "Competition",
        image: "https://a.ltrbxd.com/resized/film-poster/9/2/1/0/8/0/921080-queen-at-sea-0-460-0-690-crop.jpg?v=3035de07c1",
      },
      {
        film: "A New Dawn",
        director: "Yoshitoshi Shinomiya",
        year: 2026,
        rating: "TBA",
        note: "Competition",
        image: "https://a.ltrbxd.com/resized/film-poster/1/1/6/3/6/9/6/1163696-a-new-dawn-2026-0-460-0-690-crop.jpg?v=bfe9debeb7",
      },
      {
        film: "Josephine",
        director: "Beth de Araújo",
        year: 2026,
        rating: "TBA",
        note: "Competition",
        image: "https://a.ltrbxd.com/resized/film-poster/1/1/8/1/5/8/1/1181581-josephine-2026-0-460-0-690-crop.jpg?v=bdde1cd1d5",
      },
      {
        film: "We Are All Strangers",
        director: "Anthony Chen",
        year: 2026,
        rating: "TBA",
        note: "Competition",
        image: "https://a.ltrbxd.com/resized/film-poster/7/9/5/9/4/8/795948-we-are-all-strangers-0-460-0-690-crop.jpg?v=e66eb3c0f8",
      },
      {
        film: "Dao",
        director: "Alain Gomis",
        year: 2026,
        rating: "TBA",
        note: "Competition",
        image: "https://a.ltrbxd.com/resized/film-poster/1/0/2/3/4/3/9/1023439-dao-2026-0-460-0-690-crop.jpg?v=eba80d26b0",
      },
      {
        film: "My Wife Cries",
        director: "Angela Schanelec",
        year: 2026,
        rating: "TBA",
        note: "Competition",
        image: "https://a.ltrbxd.com/resized/film-poster/1/0/3/8/8/1/5/1038815-my-wife-cries-0-460-0-690-crop.jpg?v=5180eb05e1",
      },
      {
        film: "Rose",
        director: "Markus Schleinzer",
        year: 2026,
        rating: "TBA",
        note: "Competition",
        image: "https://a.ltrbxd.com/resized/film-poster/1/0/6/3/5/0/7/1063507-rose-2026-0-460-0-690-crop.jpg?v=29a4435ca9",
      },
      {
        film: "The Blood Countess",
        director: "Ulrike Ottinger",
        year: 2026,
        rating: "TBA",
        note: "Berlinale Special Gala",
        image: "https://a.ltrbxd.com/resized/film-poster/1/1/3/5/5/4/6/1135546-the-blood-countess-0-460-0-690-crop.jpg?v=547a926f54",
      },
      {
        film: "Eight Bridges",
        director: "James Benning",
        year: 2026,
        rating: "TBA",
        note: "Forum",
        image: "https://a.ltrbxd.com/resized/film-poster/1/3/9/6/8/0/1/1396801-eight-bridges-0-460-0-690-crop.jpg?v=8bca8a234f",
      },
      {
        film: "Everything Else Is Noise",
        director: "Nicolás Pereda",
        year: 2026,
        rating: "TBA",
        note: "Forum",
        image: "",
      },
      {
        film: "Foreign Travel",
        director: "Ted Fendt",
        year: 2026,
        rating: "TBA",
        note: "Forum",
        image: "",
      },
      {
        film: "The Day She Returns",
        director: "Hong Sang-soo",
        year: 2026,
        rating: "TBA",
        note: "Panorama",
        image: "https://a.ltrbxd.com/resized/film-poster/1/3/7/5/4/3/5/1375435-the-day-she-returns-0-460-0-690-crop.jpg?v=89623cd7ab",
      },
    ],
  },
  {
    name: "Venice Film Festival",
    year: 2025,
    films: [
      {
        film: "Father Mother Sister Brother",
        director: "Jim Jarmusch",
        year: 2025,
        rating: "7.2",
        note: "父和母段的梳理，佯装，拘谨，熟悉与陌生在极小的空间内构建了“迈克·李”的家庭餐桌生态。姐弟段镜头摇移才恍然人去楼空，前两幕瞥见的照片才成为追忆之物。于是三段的叙事不需要通过任何时空相接的巧合形成联系。怀揣不同的情绪驱车拜访，水、茶、咖啡进行沟通的试探，在家庭的谱系中我们都能找到自己的位置，用互联的情感编织紧密的网络。几乎是最好的贾木许，用温柔的笔触与孤独的情绪重现Anthology film的真正价值。——— Cardinal",
        image: "https://a.ltrbxd.com/resized/film-poster/1/0/4/5/3/3/8/1045338-father-mother-sister-brother-0-1000-0-1500-crop.jpg?v=37e9e87d41",
      },
    ],
  },
  {
    name: "Locarno Film Festival",
    year: 2025,
    films: [
      {
        film: "Mektoub, My Love: Canto Due",
        director: "Abdellatif Kechiche",
        year: 2025,
        rating: "8.0",
        note: "角色们仍然延续着以往的状态，更少的面孔聚集的场景中，人物的性格和本质更愈显现了。开场新角色“好莱坞”制片人和演员夫妇在家庭餐厅用餐，那片再熟悉不过的沙滩上多了一张巴黎游客的新面孔。Amin尚未现身，却仿佛有一股磁力，不同场景下关系的走向总向他聚拢，他是世界的中心，永远开放地承接其他角色的困境与挣扎；而Tony，作为Amin的反面，沉沦于欲望，正是所有麻烦的来源。 更多对Tony的刻画使得两角色更接近于并置的状态和一体两面的关系，我们从前作Amin内敛的内心世界走出，在不同以往，持续加码的Drama之中承受着撕裂。欧洲艺术电影与“好莱坞”商业化的创作理念上的矛盾逐渐演化为实在的外部危机，集中于Amin身上，影片在他陷于多重困境，奔跑的姿态中戛然而止。——— Parity",
        image: "https://a.ltrbxd.com/resized/film-poster/5/8/6/5/5/7/586557-mektoub-my-love-canto-due-0-1000-0-1500-crop.jpg?v=4a287f6661",
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
        <h1 className="text-3xl md:text-4xl mb-8">Film Festivals</h1>

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
