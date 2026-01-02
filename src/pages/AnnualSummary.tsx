import { useState, useMemo, useEffect } from "react";
import Layout from "@/components/layout/Layout";
import PageContainer from "@/components/layout/PageContainer";
import FilterSelect from "@/components/ui/FilterSelect";

import g2025_01 from "@/images/top10/2025/01.png";
import g2025_02 from "@/images/top10/2025/02.png";
import g2025_03 from "@/images/top10/2025/03.png";

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
  gallery?: string[];
}

const annualData: YearData[] = [
  {
    year: 2025,
    films: [
      {
        rank: 1,
        film: "Yes",
        director: "Nadav Lapid",
        year: 2025,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/1/0/3/6/5/7/0/1036570-yes-2025-0-1000-0-1500-crop.jpg?v=346a63b249",
      },
      {
        rank: 2,
        film: "One Battle After Another",
        director: "Paul Thomas Anderson",
        year: 2025,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/9/5/1/2/7/7/951277-one-battle-after-another-0-1000-0-1500-crop.jpg?v=d27c4cc662",
      },
      {
        rank: 3,
        film: "The Secret Agent",
        director: "Kleber Mendonça Filho",
        year: 2025,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/1/1/0/4/3/4/8/1104348-the-secret-agent-2025-0-1000-0-1500-crop.jpg?v=3bcd2a3e02",
      },
      {
        rank: 4,
        film: "The Shrouds",
        director: "David Cronenberg",
        year: 2025,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/8/7/3/7/3/6/873736-the-shrouds-0-1000-0-1500-crop.jpg?v=6df7c5eb8e",
      },
      {
        rank: 5,
        film: "Afternoons of Solitude",
        director: "Albert Serra",
        year: 2025,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/8/7/7/9/1/5/877915-afternoons-of-solitude-0-1000-0-1500-crop.jpg?v=d81a720146",
      },
      {
        rank: 6,
        film: "Dry Leaf",
        director: "Aleksandre Koberidze",
        year: 2025,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/9/5/4/2/1/6/954216-dry-leaf-0-1000-0-1500-crop.jpg?v=2d7d57ccb3",
      },
      {
        rank: 7,
        film: "What Does That Nature Say to You",
        director: "Sang-soo Hong",
        year: 2025,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/1/2/9/9/4/1/1/1299411-what-does-that-nature-say-to-you-0-1000-0-1500-crop.jpg?v=7950691858",
      },
      {
        rank: 8,
        film: "Ariel",
        director: "Lois Patiño",
        year: 2025,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/1/1/4/9/9/4/5/1149945-ariel-2025-0-1000-0-1500-crop.jpg?v=029110a8fa",
      },
      {
        rank: 9,
        film: "L'Aventura",
        director: "Sophie Letourneur",
        year: 2025,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/1/1/9/8/3/2/3/1198323-laventura-0-1000-0-1500-crop.jpg?v=3afec38f31",
      },
      {
        rank: 10,
        film: "Heads or Fails",
        director: "Harpo Guit & Lenny Guit",
        year: 2025,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/1/1/1/6/9/1/8/1116918-heads-or-fails-0-1000-0-1500-crop.jpg?v=029b8c82e1",
      },
    ],
    gallery: [g2025_01, g2025_02, g2025_03]
  },
  {
    year: 2024,
    films: [
      {
        rank: 1,
        film: "By the Stream",
        director: "Sang-soo Hong",
        year: 2024,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/1/1/9/6/0/6/1/1196061-by-the-stream-0-1000-0-1500-crop.jpg?v=9b95188d1c",
      },
      {
        rank: 2,
        film: "Between the Temples",
        director: "Nathan Silver",
        year: 2024,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/1/0/1/4/0/5/9/1014059-between-the-temples-0-1000-0-1500-crop.jpg?v=cb222b8bf4",
      },
      {
        rank: 3,
        film: "Misericordia",
        director: "Alain Guiraudie",
        year: 2024,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/9/5/9/2/8/6/959286-misericordia-2024-0-1000-0-1500-crop.jpg?v=f9f047315a",
      },
      {
        rank: 4,
        film: "A Traveler's Needs",
        director: "Sang-soo Hong",
        year: 2024,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/1/0/3/3/3/0/0/1033300-a-travelers-needs-0-1000-0-1500-crop.jpg?v=8bf933ff44",
      },
      {
        rank: 5,
        film: "The Other Way Around",
        director: "Jonás Trueba",
        year: 2024,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/1/0/9/7/8/7/2/1097872-the-other-way-around-0-1000-0-1500-crop.jpg?v=0419e806f9",
      },
      {
        rank: 6,
        film: "Direct Action",
        director: "Ben Russell & Guillaume Cailleau",
        year: 2024,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/1/1/1/7/8/7/6/1117876-direct-action-0-1000-0-1500-crop.jpg?v=ac6bb67b26",
      },
      {
        rank: 7,
        film: "The Empire",
        director: "Bruno Dumont",
        year: 2024,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/8/3/5/2/9/3/835293-the-empire-2024-0-1000-0-1500-crop.jpg?v=3acb119b5a",
      },
      {
        rank: 8,
        film: "Eephus",
        director: "Carson Lund",
        year: 2024,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/1/1/1/0/0/6/0/1110060-eephus-0-1000-0-1500-crop.jpg?v=f133171185",
      },
      {
        rank: 9,
        film: "Super Happy Forever",
        director: "Kohei Igarashi",
        year: 2024,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/1/1/7/7/7/0/4/1177704-super-happy-forever-0-1000-0-1500-crop.jpg?v=0171aea2eb",
      },
      {
        rank: 10,
        film: "Juror #2",
        director: "Clint Eastwood",
        year: 2024,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/9/9/7/7/2/2/997722-juror-2-0-1000-0-1500-crop.jpg?v=14601fa694",
      },
    ],
  },
  {
    year: 2023,
    films: [
      {
        rank: 1,
        film: "Do Not Expect Too Much from the End of the World",
        director: "Radu Jude",
        year: 2023,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/8/4/2/1/0/7/842107-do-not-expect-too-much-from-the-end-of-the-world-0-1000-0-1500-crop.jpg?v=b3235d75c7",
      },
      {
        rank: 2,
        film: "Small, Slow but Steady",
        director: "Sho Miyake",
        year: 2023,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/8/3/4/1/3/7/834137-small-slow-but-steady-0-1000-0-1500-crop.jpg?v=403abd891a",
      },
      {
        rank: 3,
        film: "The Sweet East",
        director: "Sean Price Williams",
        year: 2023,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/9/1/0/5/2/9/910529-the-sweet-east-0-1000-0-1500-crop.jpg?v=ddbd45abe4",
      },
      {
        rank: 4,
        film: "Youth",
        director: "Wang Bing",
        year: 2023,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/4/2/3/8/2/7/423827-youth-spring-0-1000-0-1500-crop.jpg?v=e334e15763",
      },
      {
        rank: 5,
        film: "Anatomy of a Fall",
        director: "Justine Triet",
        year: 2023,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/8/2/2/0/9/3/822093-anatomy-of-a-fall-0-1000-0-1500-crop.jpg?v=4efab8aedc",
      },
      {
        rank: 6,
        film: "In Water",
        director: "Hong Sang-soo",
        year: 2023,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/9/7/1/3/7/2/971372-in-water-0-1000-0-1500-crop.jpg?v=c516f1f318",
      },
      {
        rank: 7,
        film: "The Beast",
        director: "Bertrand Bonello",
        year: 2023,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/8/2/0/4/4/8/820448-the-beast-0-1000-0-1500-crop.jpg?v=82e61c5fee",
      },
      {
        rank: 8,
        film: "Music",
        director: "Angela Schanelec",
        year: 2023,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/5/9/1/6/9/1/591691-music-0-1000-0-1500-crop.jpg?v=774087ee45",
      },
      {
        rank: 9,
        film: "Riddle of Fire",
        director: "Weston Razooli",
        year: 2023,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/1/0/0/4/9/6/3/1004963-riddle-of-fire-0-1000-0-1500-crop.jpg?v=40db790a84",
      },
      {
        rank: 10,
        film: "The Temple Woods Gang",
        director: "Rabah Ameur-Zaïmeche",
        year: 2023,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/9/0/1/3/7/7/901377-the-temple-woods-gang-0-1000-0-1500-crop.jpg?v=61e9eb1e02",
      },
    ],
  },
  {
    year: 2022,
    films: [
      {
        rank: 1,
        film: "Pacifiction",
        director: "Albert Serra",
        year: 2022,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/6/1/5/1/3/4/615134-pacifiction-0-1000-0-1500-crop.jpg?v=c41df341b8",
      },
      {
        rank: 2,
        film: "Nobody's Hero",
        director: "Alain Guiraudie",
        year: 2022,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/5/8/5/6/1/3/585613-nobody-s-hero-0-1000-0-1500-crop.jpg?v=b20f493ac6",
      },
      {
        rank: 3,
        film: "The Novelist's Film",
        director: "Sang-soo Hong",
        year: 2022,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/8/3/4/1/3/0/834130-the-novelist-s-film-0-1000-0-1500-crop.jpg?v=8ee4c90991",
      },
      {
        rank: 4,
        film: "Crimes of the Future",
        director: "David Cronenberg",
        year: 2022,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/7/3/6/3/1/8/736318-crimes-of-the-future-0-1000-0-1500-crop.jpg?v=ae8a4b1603",
      },
      {
        rank: 5,
        film: "Armageddon Time",
        director: "James Gray",
        year: 2022,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/5/4/2/7/1/9/542719-armageddon-time-0-1000-0-1500-crop.jpg?v=9e7b513cd5",
      },
      {
        rank: 6,
        film: "Walk Up",
        director: "Sang-soo Hong",
        year: 2022,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/9/0/3/1/5/0/903150-walk-up-0-1000-0-1500-crop.jpg?v=4658bcdf07",
      },
      {
        rank: 7,
        film: "The Fabelmans",
        director: "Steven Spielberg",
        year: 2022,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/7/2/1/2/8/8/721288-the-fabelmans-0-1000-0-1500-crop.jpg?v=93ea6717b8",
      },
      {
        rank: 8,
        film: "Nope",
        director: "Jordan Peele",
        year: 2022,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/6/8/2/5/4/7/682547-nope-0-1000-0-1500-crop.jpg?v=d6a6158cc3",
      },
      {
        rank: 9,
        film: "Let's Say Revolution",
        director: "Perceval & Klotz",
        year: 2021,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/7/6/2/8/7/9/762879-let-s-say-revolution-0-1000-0-1500-crop.jpg?v=870d8d0a73",
      },
      {
        rank: 10,
        film: "Blonde",
        director: "Andrew Dominik",
        year: 2022,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/2/2/8/5/9/4/228594-blonde-0-1000-0-1500-crop.jpg?v=7d0ba051a3",
      },
    ],
  },
  {
    year: 2021,
    films: [
      {
        rank: 1,
        film: "Annette",
        director: "Leos Carax",
        year: 2021,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/3/5/7/8/2/6/357826-annette-0-1000-0-1500-crop.jpg?v=de5f3a74c8",
      },
      {
        rank: 2,
        film: "Wheel of Fortune and Fantasy",
        director: "Ryūsuke Hamaguchi",
        year: 2021,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/7/1/3/5/2/3/713523-wheel-of-fortune-and-fantasy-0-1000-0-1500-crop.jpg?v=6351c215a2",
      },
      {
        rank: 3,
        film: "In Front of Your Face",
        director: "Sang-soo Hong",
        year: 2021,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/7/3/6/9/6/5/736965-in-front-of-your-face-0-1000-0-1500-crop.jpg?v=0d4365342e",
      },
      {
        rank: 4,
        film: "Drive My Car",
        director: "Ryūsuke Hamaguchi",
        year: 2021,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/6/7/9/2/9/1/679291-drive-my-car-0-1000-0-1500-crop.jpg?v=9e1f7c9f35",
      },
      {
        rank: 5,
        film: "Memoria",
        director: "Apichatpong Weerasethakul",
        year: 2021,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/4/4/1/4/7/5/441475-memoria-0-1000-0-1500-crop.jpg?v=12da0f404d",
      },
      {
        rank: 6,
        film: "Introduction",
        director: "Sang-soo Hong",
        year: 2021,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/7/1/3/5/1/7/713517-introduction-0-1000-0-1500-crop.jpg?v=55e3d54a7d",
      },
      {
        rank: 7,
        film: "Benedetta",
        director: "Paul Verhoeven",
        year: 2021,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/3/8/6/6/3/1/386631-benedetta-0-1000-0-1500-crop.jpg?v=9d52b3ab59",
      },
      {
        rank: 8,
        film: "France",
        director: "Bruno Dumont",
        year: 2021,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/5/2/9/6/3/5/529635-france-0-1000-0-1500-crop.jpg?v=fd16167125",
      },
      {
        rank: 9,
        film: "Bad Luck Banging or Loony Porn",
        director: "Radu Jude",
        year: 2021,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/7/0/8/7/6/4/708764-bad-luck-banging-or-loony-porn-0-1000-0-1500-crop.jpg?v=27b6ee08b8",
      },
      {
        rank: 10,
        film: "Evangelion: 3.0+1.0",
        director: "Hideaki Anno",
        year: 2021,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/2/0/8/8/7/7/208877-evangelion-3-0-1-0-thrice-upon-a-time-0-1000-0-1500-crop.jpg?v=1c02950f64",
      },
    ],
  },
  {
    year: 2020,
    films: [
      {
        rank: 1,
        film: "Undine",
        director: "Christian Petzold",
        year: 2020,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/5/4/2/7/9/6/542796-undine-0-1000-0-1500-crop.jpg?v=a00995e386",
      },
      {
        rank: 2,
        film: "Uncut Gems",
        director: "Ben Safdie & Joshua Safdie",
        year: 2020,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/4/0/4/2/6/6/404266-uncut-gems-0-1000-0-1500-crop.jpg?v=670cb7034d",
      },
      {
        rank: 3,
        film: "From Miyamoto to You",
        director: "Tetsuya Mariko",
        year: 2020,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/5/5/8/8/9/0/558890-miyamoto-0-1000-0-1500-crop.jpg?v=d6484065bb",
      },
      {
        rank: 4,
        film: "The Woman Who Ran",
        director: "Sang-soo Hong",
        year: 2020,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/5/8/7/6/1/3/587613-the-woman-who-ran-0-1000-0-1500-crop.jpg?v=d5af3d8b3a",
      },
      {
        rank: 5,
        film: "Soul",
        director: "Pete Docter & Kemp Powers",
        year: 2020,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/4/3/8/5/1/1/438511-soul-0-1000-0-1500-crop.jpg?v=8d0b74f9a8",
      },
      {
        rank: 6,
        film: "Fukuoka",
        director: "Lv Zhang",
        year: 2020,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/5/0/4/4/4/1/504441-fukuoka-0-1000-0-1500-crop.jpg?v=d405a0a004",
      },
      {
        rank: 7,
        film: "City Hall",
        director: "Frederick Wiseman",
        year: 2020,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/6/4/8/7/4/8/648748-city-hall-0-1000-0-1500-crop.jpg?v=05684c0d60",
      },
      {
        rank: 8,
        film: "Hot Gimmick: Girl Meets Boy",
        director: "Yuki Yamato",
        year: 2020,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/5/3/0/0/5/1/530051-hot-gimmick-girl-meets-boy-0-1000-0-1500-crop.jpg?v=b52c245bee",
      },
      {
        rank: 9,
        film: "The Salt of Tears",
        director: "Philippe Garrel",
        year: 2020,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/5/0/2/4/6/9/502469-the-salt-of-tears-0-1000-0-1500-crop.jpg?v=191edf3d99",
      },
      {
        rank: 10,
        film: "Richard Jewell",
        director: "Clint Eastwood",
        year: 2020,
        note: "",
        image: "https://a.ltrbxd.com/resized/film-poster/2/1/8/2/5/4/218254-richard-jewell-0-1000-0-1500-crop.jpg?v=dc2dc48c7b",
      },
    ],
  },

];

const AnnualSummary = () => {
  const years = useMemo(() => {
    return annualData.map((y) => ({ value: String(y.year), label: String(y.year) }));
  }, []);

  const [selectedYear, setSelectedYear] = useState(String(annualData[0].year));

  // index of currently shown gallery image
  const [galleryIndex, setGalleryIndex] = useState(0);

  const selectedData = useMemo(() => {
    return annualData.find((y) => y.year === Number(selectedYear));
  }, [selectedYear]);

  // reset gallery index when year changes
  useEffect(() => {
    setGalleryIndex(0);
  }, [selectedData]);

  const gallery = selectedData?.gallery ?? [];

  return (
    <Layout>
      <PageContainer>
        <h1 className="text-3xl md:text-4xl mb-8">Annual Top 10</h1>

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
                      {entry.film}
                    </h3>
                    <p className="text-muted-foreground mt-1">{entry.director}</p>
                  </div>
                </li>
              ))}
            </ol>
            {gallery.length > 0 && (
              <div className="mt-12">
                {/* Carousel container */}
                <div className="relative w-full">
                  <div className="w-full aspect-[3/2] overflow-hidden rounded bg-muted-foreground/5">
                    <img
                      src={gallery[galleryIndex]}
                      alt={`${selectedData?.year} gallery ${galleryIndex + 1}`}
                      className="w-full h-full object-cover grayscale hover:grayscale-0 transition"
                    />
                  </div>

                  {/* Prev button */}
                  <button
                    aria-label="Previous image"
                    onClick={() => setGalleryIndex((i) => (i - 1 + gallery.length) % gallery.length)}
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full w-10 h-10 flex items-center justify-center"
                  >
                    ‹
                  </button>

                  {/* Next button */}
                  <button
                    aria-label="Next image"
                    onClick={() => setGalleryIndex((i) => (i + 1) % gallery.length)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-black/40 text-white rounded-full w-10 h-10 flex items-center justify-center"
                  >
                    ›
                  </button>
                </div>

                {/* Dots */}
                <div className="mt-3 flex justify-center gap-2">
                  {gallery.map((img, idx) => (
                    <button
                      key={String(img)}
                      onClick={() => setGalleryIndex(idx)}
                      className={`w-2 h-2 rounded-full ${idx === galleryIndex ? "bg-foreground" : "bg-border"}`}
                      aria-label={`Go to image ${idx + 1}`}
                    />
                  ))}
                </div>
              </div>
            )}
          </section>
        )}
      </PageContainer>
    </Layout>
  );
};

export default AnnualSummary;
