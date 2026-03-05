import { useState, useMemo } from "react";
import { Link } from "react-router-dom";
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

interface FestivalArticle {
  title: string;
  url?: string;
  id?: string;
  author?: string;
  date?: string;
}

interface FestivalData {
  name: string;
  year: number;
  films: FestivalFilm[];
  articles?: FestivalArticle[];
}

const festivalData: FestivalData[] = [
  {
    name: "Berlin Film Festival",
    year: 2026,
    articles: [
      {
        title: "From Benning's Bridges to Schanelec's Tears - Berlin final",
        id: "berlinale-2026-final",
        author: "Cardinal, zyt, lesleygujiji",
        date: "February 2026"
      }
    ],
    films: [
      {
        film: "Queen at Sea",
        director: "Lance Hammer",
        year: 2026,
        rating: "3.50 (4)",
        note: "【Competition】At the very least, it explores the potential of navigating intimacy and family dynamics across three generations of women. The director carves out distinct spatial boundaries for each woman, yet uses various compositions to bring them together: the elderly on the stairs, the middle-aged in the car, and the youth on the subway. However, the daughter’s storyline feels a bit unrefined. ——— LesleyGujiji",
        image: "https://a.ltrbxd.com/resized/film-poster/9/2/1/0/8/0/921080-queen-at-sea-0-460-0-690-crop.jpg?v=3035de07c1",
      },
      {
        film: "A New Dawn",
        director: "Yoshitoshi Shinomiya",
        year: 2026,
        rating: "2.75 (4)",
        note: "【Competition】With the plot so thin and underdeveloped, and unable to truly expand its themes (a nostalgic, topographical, almost idealized anti-industrial stance?), what remains is merely a long wait for the moment before Shuhari fully blossoms. In the end, all we receive is a limited, restrained release of energy, along with fractured, improvisational flashes of visual imagination. That said, the ambient indietronica-infused score is undeniably appealing. ——— Cardinal",
        image: "https://a.ltrbxd.com/resized/film-poster/1/1/6/3/6/9/6/1163696-a-new-dawn-2026-0-460-0-690-crop.jpg?v=bfe9debeb7",
      },
      {
        film: "Josephine",
        director: "Beth de Araújo",
        year: 2026,
        rating: "2.50 (2)",
        note: "【Competition】Dangerously, the film frames the trauma of violence through a child’s point of view, and from the very beginning the audience is locked into the same frozen gaze, witnessing the rape in full. What follows unfolds in cramped close-ups and predictable post-traumatic reactions. Instead of pursuing a genre-driven continuation or a Dardenne-style social narrative to ground the subject, the director turns toward a now-familiar strand of Austrian-style psychological externalization, forcing the perpetrator’s face to reappear again and again as the girl’s imposed nightmare. The courtroom dilemma is thrown directly at us as well, with every layer of conflict—from childhood onward—reduced to the rhetoric of education as both exposure and solution. In the end, it becomes hard to truly believe in the calm and courage promised by the claim of no longer afraid. ——— Cardinal",
        image: "https://a.ltrbxd.com/resized/film-poster/1/1/8/1/5/8/1/1181581-josephine-2026-0-460-0-690-crop.jpg?v=bdde1cd1d5",
      },
      {
        film: "We Are All Strangers",
        director: "Anthony Chen",
        year: 2026,
        rating: "2.80 (5)",
        note: "【Competition】Opening at a familiar fried noodle stall, the film treats melodrama with a stylized, slightly romantic Gen-Z awkwardness—fleeting BTS-like fragments, a hint of Anora-style energy. As the settings widen, the narrative moves fluidly, revealing glimpses of modern Singapore. After an abrupt wedding, the pace sharpens into heavier drama, still edged with earthy humor. By its circular close, this compact coming-of-age story unexpectedly expands to embrace the city’s social microcosms—like a short video you can’t stop replaying. ——— Cardinal",
        image: "https://a.ltrbxd.com/resized/film-poster/7/9/5/9/4/8/795948-we-are-all-strangers-0-460-0-690-crop.jpg?v=e66eb3c0f8",
      },
      {
        film: "Dao",
        director: "Alain Gomis",
        year: 2026,
        rating: "3.50 (4)",
        note: "【Competition】Amid flowing music and fluid bodily movements, a series of rituals and expressions of human sentiment unfolded seamlessly and without interruption. By the end of the three-hour wedding, it reached a state of exhilarating exhaustion. ——— zyt",
        image: "https://a.ltrbxd.com/resized/film-poster/1/0/2/3/4/3/9/1023439-dao-2026-0-460-0-690-crop.jpg?v=eba80d26b0",
      },
      {
        film: "My Wife Cries",
        director: "Angela Schanelec",
        year: 2026,
        rating: "4.67 (3)",
        note: "【Competition】Schanelec makes Carla cover her face and weep like Setsuko Hara. ——— zyt",
        image: "https://a.ltrbxd.com/resized/film-poster/1/0/3/8/8/1/5/1038815-my-wife-cries-0-460-0-690-crop.jpg?v=5180eb05e1",
      },
      {
        film: "Rose",
        director: "Markus Schleinzer",
        year: 2026,
        rating: "2.00 (3)",
        note: "【Competition】A rough, surface-level feminist (lesbian-family-style) adaptation of a classical text — everything felt overly rushed and awkward. But still grateful to Sandra Hüller for taking on this role.  ——— LesleyGujiji",
        image: "https://a.ltrbxd.com/resized/film-poster/1/0/6/3/5/0/7/1063507-rose-2026-0-460-0-690-crop.jpg?v=29a4435ca9",
      },
      {
        film: "The Blood Countess",
        director: "Ulrike Ottinger",
        year: 2026,
        rating: "3.00 (2)",
        note: "【Berlinale Special Gala】A humorous and playful movie that takes you on a romp through various settings. While some of the German humor didn't quite land for me and it felt a bit stereotypical at times, it has its charms. Huppert only feeding on women and the appearance of Drag vampires certainly give it that queer cult energy. ——— LesleyGujiji",
        image: "https://a.ltrbxd.com/resized/film-poster/1/1/3/5/5/4/6/1135546-the-blood-countess-0-460-0-690-crop.jpg?v=547a926f54",
      },
      {
        film: "Eight Bridges",
        director: "James Benning",
        year: 2026,
        rating: "3.00 (2)",
        note: "【Forum】Benning is living the dream—just some travel footage edited together and boom, he’s in the Berlinale! Of course, it’s not just random filming. When we look at these bridges, what are we actually looking at? We’re seeing the current pulse of different regions: the heavy traffic, the occasional Amazon delivery van, a passing helicopter, boats, swimming ducks, overexposed skies, greenery, and the sound of rushing water. It’s capitalism, architectural aesthetics, and the intersection of nature and the man-made. ——— LesleyGujiji",
        image: "https://a.ltrbxd.com/resized/film-poster/1/3/9/6/8/0/1/1396801-eight-bridges-0-460-0-690-crop.jpg?v=8bca8a234f",
      },
      {
        film: "Everything Else Is Noise",
        director: "Nicolás Pereda",
        year: 2026,
        rating: "3.00 (1)",
        note: "【Forum】Like Peter Hujar's Day, the indoor scenes reveal subtle environmental shifts—changes in sound and light that quietly signal the passage of time. But because the space is never fully closed, noise can’t be ignored. At times it sits alongside imagined music; at times it becomes the music itself (as in the violin performance); at other moments it functions as a suspended, conceptual “interruption”: a neighbor’s prejudiced warning, the documentary-style interviews in the middle section, or the muted female presence in the earlier male conversations. Admittedly, the film’s sound design never fully enters a more intimate auditory realm, much like its thematic inquiry remains somewhat limited. Even so, Pereda arrives at the ending with relative lightness, building a shared complicity through laughter. ——— Cardinal",
        image: "https://a.ltrbxd.com/resized/film-poster/1/4/8/6/0/2/2/1486022-everything-else-is-noise-0-460-0-690-crop.jpg?v=2b35743309",
      },
      {
        film: "Foreign Travel",
        director: "Ted Fendt",
        year: 2026,
        rating: "3.67 (3)",
        note: "【Forum】The tone and bearing of the seminar participants brought us back to the cinema of Jean-Marie Straub and Danièle Huillet. Especially when seen in a theater, the distinctive sound mixing created a continuous, unbroken recitation. Dialogue (recitation), the streets (Berlin’s natural sounds in different months), and title cards (pauses) formed a layered sonic structure. Through this interplay between text and reality, we entered a discussion of the unreal and the untrue.  ——— LesleyGujiji",
        image: "https://a.ltrbxd.com/resized/film-poster/1/4/8/6/0/3/1/1486031-foreign-travel-0-460-0-690-crop.jpg?v=da48d600aa",
      },
      {
        film: "The Day She Returns",
        director: "Hong Sang-soo",
        year: 2026,
        rating: "5.00 (4)",
        note: "【Panorama】“German beer” becomes shorthand for the rehearsed self we repeat in interviews, dates, daily small talk—adjusted each time for the audience. “Divorce story,” by contrast, names the private self that spills out at the wrong moment and is instantly regretted. In acting class, interviews turn into rehearsal material, blurring social life and performance; yet within this production called life, “love yourself” and that fleeting second of facing who we really are remain the hardest lines to deliver, as we circle back to ourselves through every role we play. ——— Cardinal",
        image: "https://a.ltrbxd.com/resized/film-poster/1/3/7/5/4/3/5/1375435-the-day-she-returns-0-460-0-690-crop.jpg?v=89623cd7ab",
      },
      {
        film: "If I Were Alive",
        director: "André Novais Oliveira",
        year: 2026,
        rating: "3.00 (3)",
        note: "【Panorama】The 1970s scenes have an extremely marvelous, intimate, and musically lovely quality, but unfortunately, they only serve as a prologue to the film. The part set 50 years later is a mixture of different textures—like mysterious exobiology, deadpan humor, and city-landscape cinema. It’s a bit hard to wrap one's head around. ——— Cardinal",
        image: "https://a.ltrbxd.com/resized/film-poster/1/4/8/5/7/9/5/1485795-if-i-were-alive-0-460-0-690-crop.jpg?v=7d6658ab12",
      },
    ],
  },
  {
    name: "Pingyao Film Festival",
    year: 2025,
    articles: [
      {
        title: "Shanxi Cannes - Day 1",
        id: "pyiff-2025-day1",
        author: "欧",
        date: "September 2025"
      },
      {
        title: "Meeting Xin Zhilei - Day 2",
        id: "pyiff-2025-day2",
        author: "欧",
        date: "September 2025"
      },
      {
        title: "Can't Understand Cannes Competition - Day 3",
        id: "pyiff-2025-day3",
        author: "欧",
        date: "September 2025"
      },
      {
        title: "I am a Female SWAT - Day 4",
        id: "pyiff-2025-day4",
        author: "欧",
        date: "September 2025"
      },
      {
        title: "Hangzhou New Wave in Pingyao - Day 5",
        id: "pyiff-2025-day5",
        author: "欧",
        date: "September 2025"
      }
    ],
    films: [],
  },
  {
    name: "Venice Film Festival",
    year: 2025,
    films: [
      {
        film: "Father Mother Sister Brother",
        director: "Jim Jarmusch",
        year: 2025,
        rating: "3.60",
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
        rating: "4.00",
        note: "角色们仍然延续着以往的状态，更少的面孔聚集的场景中，人物的性格和本质更愈显现了。开场新角色“好莱坞”制片人和演员夫妇在家庭餐厅用餐，那片再熟悉不过的沙滩上多了一张巴黎游客的新面孔。Amin尚未现身，却仿佛有一股磁力，不同场景下关系的走向总向他聚拢，他是世界的中心，永远开放地承接其他角色的困境与挣扎；而Tony，作为Amin的反面，沉沦于欲望，正是所有麻烦的来源。 更多对Tony的刻画使得两角色更接近于并置的状态和一体两面的关系，我们从前作Amin内敛的内心世界走出，在不同以往，持续加码的Drama之中承受着撕裂。欧洲艺术电影与“好莱坞”商业化的创作理念上的矛盾逐渐演化为实在的外部危机，集中于Amin身上，影片在他陷于多重困境，奔跑的姿态中戛然而止。——— Parity",
        image: "https://a.ltrbxd.com/resized/film-poster/5/8/6/5/5/7/586557-mektoub-my-love-canto-due-0-1000-0-1500-crop.jpg?v=4a287f6661",
      },
    ],
  },
  {
    name: "Cannes Film Festival",
    year: 2025,
    articles: [
      {
        title: "Please Return My 'Mastermind' for Free - Cannes final",
        id: "cannes-2025-final",
        author: "zyt & LesleyGujiji",
        date: "May 2025"
      }
    ],
    films: [],
  },
  {
    name: "Berlin Film Festival",
    year: 2025,
    articles: [
      {
        title: "What did Berlin 2025 say to you? - Day 0",
        id: "berlin-2025-day0",
        author: "zyt & LesleyGujiji",
        date: "February 2025"
      },
      {
        title: "The End of the Spree - Berlin final",
        id: "berlin-2025-final",
        author: "zyt & LesleyGujiji",
        date: "February 2025"
      }
    ],
    films: [],
  },
  {
    name: "Pingyao Film Festival",
    year: 2024,
    articles: [
      {
        title: "Between the Kinos - 8th Pingyao Film Festival",
        id: "pyiff-2024-between-the-kinos",
        author: "欧 & zyt",
        date: "September 2024"
      }
    ],
    films: [],
  },
  {
    name: "Cannes Film Festival",
    year: 2024,
    articles: [
      {
        title: "The Battle of Ticketing - Day 0",
        id: "cannes-2024-day0",
        author: "zyt",
        date: "May 2024"
      },
      {
        title: "OMG! She's Got No Name - Day 1",
        id: "cannes-2024-day1",
        author: "zyt",
        date: "May 2024"
      },
      {
        title: "Life is a Movie - Day 2 & 3",
        id: "cannes-2024-day2-day3",
        author: "zyt & LesleyGujiji",
        date: "May 2024"
      },
      {
        title: "Argentine Cinema & First Surprises - Day 3",
        id: "cannes-2024-day3",
        author: "KID Y",
        date: "May 2024"
      },
      {
        title: "Emilia Pérez & Lou Ye's Unfinished Film - Day 4",
        id: "cannes-2024-day4",
        author: "KID Y",
        date: "May 2024"
      },
      {
        title: "Pissball & Carax's Self-Portrait - Day 6",
        id: "cannes-2024-day6",
        author: "KID Y",
        date: "May 2024"
      },
      {
        title: "Cronenberg's The Shrouds - Day 8",
        id: "cannes-2024-day8",
        author: "KID Y",
        date: "May 2024"
      }
    ],
    films: [],
  },
  {
    name: "Cannes Film Festival",
    year: 2023,
    articles: [
      {
        title: "Ticket Grabbing Battle & Schedule Adjustments - Day 0",
        id: "cannes-2023-day0",
        author: "zyt",
        date: "May 2023"
      },
      {
        title: "Sleepless Night & Five Films Marathon - Day 1",
        id: "cannes-2023-day1",
        author: "zyt",
        date: "May 2023"
      },
      {
        title: "Exhaustion & Final Reflections - Day 2 & 3",
        id: "cannes-2023-day2-day3",
        author: "zyt",
        date: "May 2023"
      }
    ],
    films: [],
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

  const contentTypes = [
    { value: "all", label: "All" },
    { value: "ratings", label: "Ratings" },
    { value: "coverage", label: "Festival Coverage" }
  ];

  const [selectedFestival, setSelectedFestival] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedContentType, setSelectedContentType] = useState("all");

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
          <FilterSelect label="Content" value={selectedContentType} options={contentTypes} onChange={setSelectedContentType} />
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

                {(selectedContentType === "all" || selectedContentType === "ratings") && (
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
                )}

                {(selectedContentType === "all" || selectedContentType === "coverage") && festival.articles && festival.articles.length > 0 && (
                  <div className="mt-12">
                    <h3 className="text-lg mb-4 font-medium">Festival Coverage</h3>
                    <div className="space-y-3">
                      {festival.articles.map((article, articleIndex) => (
                        <div key={articleIndex} className="border-l-2 border-border pl-4">
                          {article.id ? (
                            <Link
                              to={`/festival-coverage/${article.id}`}
                              className="text-lg hover:underline"
                            >
                              {article.title}
                            </Link>
                          ) : article.url ? (
                            <a 
                              href={article.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-lg hover:underline"
                            >
                              {article.title}
                            </a>
                          ) : (
                            <span className="text-lg">{article.title}</span>
                          )}
                          {(article.author || article.date) && (
                            <p className="text-sm text-muted-foreground mt-1">
                              {article.author && <span>{article.author}</span>}
                              {article.author && article.date && <span> · </span>}
                              {article.date && <span>{article.date}</span>}
                            </p>
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </section>
            ))}
          </div>
        )}
      </PageContainer>
    </Layout>
  );
};

export default FestivalRatings;
