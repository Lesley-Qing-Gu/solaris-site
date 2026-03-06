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
  url?: string;
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

const featuredArticles = [
  {
    id: "berlinale-2026-report",
    title: "Beyond the Golden Bear: The Hollow Text and Performance of Berlin 2026",
    festival: "Berlin Film Festival 2026",
    image: "https://images.unsplash.com/photo-1478720568477-152d9b164e26?w=800&q=80"
  },
  {
    id: "cannes-2025-final",
    title: "Please Return My 'Mastermind' for Free - Cannes final",
    festival: "Cannes Film Festival 2025",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=800&q=80"
  },
  {
    id: "berlin-2025-final",
    title: "The End of the Spree - Berlin final",
    festival: "Berlin Film Festival 2025",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?w=800&q=80"
  }
];

const festivalData: FestivalData[] = [
  {
    name: "Berlin Film Festival",
    year: 2026,
    articles: [
      {
        title: "Beyond the Golden Bear: The Hollow Text and Performance of Berlin 2026",
        id: "berlinale-2026-report",
        author: "KID Y",
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
        url: "https://weibo.com/6755944278/5268178873092088?wm=3333_2001&from=10G2293010&sourcetype=weixin&rp_trans=M1lxcHNIeFo5VTgwdWQ5bnQ5YWhUK1UyeldsWFlKdmNVZktwYUY5RDhROURCMVZ2TUgzMnM3aFlpM3F2K0FpVFJoTjM4QjFoVGg3K0ZMUkZvREEyOHBFY2htM2thL1NGNU1xRWN3SkxmaTkxU1BFNU91ci9ZamwwZlpZR0pEcjRnQzBsc3VhMzMvU0ZVbEZLK2VOazBnPT0%3D&s_trans=hjyPh8zORNW20mjRdgWYqw%3D%3D_5268178873092088_s&s_channel=4",
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
        url: "https://weibo.com/6755944278/5268396741492960?wm=3333_2001&from=10G2293010&sourcetype=weixin&rp_trans=M1lxcHNIeFo5VTgwdWQ5bnQ5YWhUK1UyeldsWFlKdmNVZktwYUY5RDhROURCMVZ2TUgzMnM3aFlpM3F2K0FpVDE2TDlhNjBVWUdNN1ZrK0tPMy9rbUgyNUVUQUhXNHRpcG1QeG5kYk9JeDUxU1BFNU91ci9ZamwwZlpZR0pEcjRnQzBsc3VhMzMvU0ZVbEZLK2VOazBnPT0%3D&s_trans=hjyPh8zORNW20mjRdgWYqw%3D%3D_5268396741492960_s&s_channel=4",
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
        title: "One Battle After Another! - Day 1",
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
      {
        film: "Two Seasons, Two Strangers",
        director: "Sho Miyake",
        year: 2025,
        rating: "3.50",
        note: "首先恭喜唱哥荣获金豹奖，但就我而言这大概是他近几年最差的创作？影片改编自柘植义春的两部短篇漫画《海边的叙景》和《雪洞里的本桑》，通过沈恩敬所饰演的编剧一角将这两个故事作为虚构的写作与想象串联了起来。我猜三宅唱在进行如此改编的时候一定想到了洪常秀，因为片中不仅有这些元电影与虚实交互的情节，甚至连几个分镜都像是照搬了《自由之丘》《剧场前》等洪片。但与漫画原作不同，也与洪常秀所有电影都不同的地方在于，三宅唱/编剧笔下的人物形象总是被进一步扩充以至于太过于实际，留白的空间被稀释了也就难以让情绪进一步蔓延。大概从《惠子，凝视》（也许更早）开始唱哥就热衷于去探索庸常生活中潜藏的魅力，但本作虚构的笔触和精致的画面又与这一庸常一定程度上背道而驰的，故事讲完了，电影也就结束了，仅此而已。当然，拿了洛迦诺最高奖也就意味着三宅唱离三大主竞赛舞台更近一步了。这对无疑是一个好消息，正如朋友所说，唱的电影都是游刃有余地游离于商业与艺术之间，他总是会启用日本知名演员，但同时又保住自己作者的笔触，充满了情感的镜头，对身边事物细致的观察，对语言与文化交流的思考…还是很期待他在得到更多主流关注后能交出怎样新的创作，让我们拭目以待吧。",
        image: "https://a.ltrbxd.com/resized/film-poster/1/3/3/9/6/5/2/1339652-two-seasons-two-strangers-0-460-0-690-crop.jpg?v=294be8ef47",
        url: "https://weibo.com/6755944278/5200419875197528?wm=3333_2001&from=10G2293010&sourcetype=weixin&rp_trans=M1lxcHNIeFo5VTgwdWQ5bnQ5YWhUK1UyeldsWFlKdmNVZktwYUY5RDhRK0hsTG5rc09jNTZtczdNOUJPY3UxN0xvWW5scDdwejBlbWlPUU9wKzZYcXhPWWlKSWdUNko3UWR2bFZkWHpmbzExU1BFNU91ci9ZamwwZlpZR0pEcjRnQzBsc3VhMzMvU0ZVbEZLK2VOazBnPT0%3D&s_trans=hjyPh8zORNW20mjRdgWYqw%3D%3D_5200419875197528_s&s_channel=4",
      },
      {
        film: "Dry Leaf",
        director: "Alexandre Koberidze",
        year: 2025,
        rating: "5.00",
        note: "这位在德国留学的格鲁吉亚导演同时继承苏联前辈帕拉杰诺夫的浪漫与诗意与德国电影人，尤其是法罗基—史得耶尔一派，对于影像本体的探索。《落叶球》全片都由一个低分辨率低数码相机拍摄，是名副其实的数字“坏影像”。但是通过这样低清、充满了噪点且糊成一团的影像，科贝利泽却捕捉到了无数绝大多数无法企及的视点。故事开始于一个《迷雾中的她》的引子，由一连串无边无际没有尽头的寻找组成，最终又在冥冥之中形成了一个周而复始的环形结构。科贝利泽似乎不怎么在乎人的存在甚至让一些角色隐形，而是将镜头对准无人知晓的山泉和荒废的球场，还有一些在影像中不可见的事物，朦胧地描摹出时间流逝的形态，这是一种局部断裂却又无限延伸的时间性，从而生成了幽灵般的现实，源自自然与模拟相悖却又相辅相成的缠绕。最终我们意识到，这部电影关于以一种特别的速率（落叶球的弧线）拾起那些必然且不曾看见的消失，从私人领域过渡到社会性的忧伤。也许看完之后一个比较有趣的比较对象是亚美尼亚裔加拿大导演阿托姆·伊格杨的《月历》。两者都关于大高加索地区的图景，都采用非常规的摄影器材，都执迷于拍摄一些来自历史的遗迹，甚至都试图去探索影像中不被看见的内容。伊格杨，就像他拍摄那些教堂一样，将《月历》的叙事结构打造是如此精致且有序，最终它的情节落在私人领域，而它真正故事只能发生在镜头之外；与之相反，《落叶球》无论是拍摄对象，叙事结构都是随意且闲散的，它的侧重点最终过渡社会性的思考，不可见之物也在劣质影像中被“看见”了。虽然两位导演我都很喜欢，但科贝利泽无疑完成得更加极致且深远。",
        image: "https://a.ltrbxd.com/resized/film-poster/9/5/4/2/1/6/954216-dry-leaf-0-460-0-690-crop.jpg?v=2d7d57ccb3",
        url: "https://weibo.com/6755944278/5199886133233828?wm=3333_2001&from=10G2293010&sourcetype=weixin&rp_trans=M1lxcHNIeFo5VTgwdWQ5bnQ5YWhUK1UyeldsWFlKdmNVZktwYUY5RDhRK0hsTG5rc09jNTZtczdNOUJPY3UxN1JoTjM4QjFoVGg3K0ZMUkZvREEyOG1OdTIxbzF6RE02ekQrQURwakNYcXQxU1BFNU91ci9ZamwwZlpZR0pEcjRnQzBsc3VhMzMvU0ZVbEZLK2VOazBnPT0%3D&s_trans=hjyPh8zORNW20mjRdgWYqw%3D%3D_5199886133233828_s&s_channel=4",
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
    films: [
      {
        film: "Miroirs No. 3",
        director: "Christian Petzold",
        year: 2025,
        rating: "4.50",
        note: "第三天，终于看到了一部年度级别的作品，佩措尔德的《镜的第三乐章》。很惊讶这次佩措尔德居然放下了前两作的神秘主义符号，而是回归了最基本的情节剧和精细的人物写作，简洁明了，甚至有点抽象的叙事和姿态，关于精神的创伤与人际关系的脆弱，永恒的爱让谎言滋生，却又让秘密无处遁形。",
        image: "https://a.ltrbxd.com/resized/film-poster/1/0/6/5/1/9/7/1065197-mirrors-no-3-0-460-0-690-crop.jpg?v=30ef3cac4b",
        url: "https://weibo.com/6755944278/5167510753116793?wm=3333_2001&from=10G2293010&sourcetype=weixin&rp_trans=M1lxcHNIeFo5VTgwdWQ5bnQ5YWhUK1UyeldsWFlKdmNVZktwYUY5RDhROW96SzN0Tm4xSy9GMWUyY0lPTm5wTnRrT3c5cUlzQlVaM0I3VE1KRTVMalg0RTNXTit6bStaMmVjSFZQTitqTWgxU1BFNU91ci9ZamwwZlpZR0pEcjRnQzBsc3VhMzMvU0ZVbEZLK2VOazBnPT0%3D&s_trans=hjyPh8zORNW20mjRdgWYqw%3D%3D_5167510753116793_s&s_channel=4",
      },
      {
        film: "Sirāt",
        director: "Oliver Laxe",
        year: 2025,
        rating: "4.00",
        note: "终于补上了备受好评的《接近终点》，整个人都燥起来了🤘拉克谢重新定义了当代电影中泛滥的“锐舞-影像”，techno在这里几乎不关于个体的沉沦或者惰性的反抗，而是一种虚无的，带有后殖民主义意味的自由，没有终点的旅程逃脱了社会的暴力，却逃不出一无所获的悲剧宿命，茫茫一片的沙漠里除了死亡什么也没有。",
        image: "https://a.ltrbxd.com/resized/film-poster/1/0/3/7/7/7/7/1037777-sirat-2025-0-460-0-690-crop.jpg?v=1660cb1f29",
        url: "https://weibo.com/6755944278/5168182484534628?wm=3333_2001&from=10G2293010&sourcetype=weixin&rp_trans=M1lxcHNIeFo5VTgwdWQ5bnQ5YWhUK1UyeldsWFlKdmNVZktwYUY5RDhROW96SzN0Tm4xSy9GMWUyY0lPTm5wTjZNUnhacWFyaW1nVUZ0bWppalRSWitJRC9WNHR5OTFVM0ljUHFmd0VvaHgxU1BFNU91ci9ZamwwZlpZR0pEcjRnQzBsc3VhMzMvU0ZVbEZLK2VOazBnPT0%3D&s_trans=hjyPh8zORNW20mjRdgWYqw%3D%3D_5168182484534628_s&s_channel=4",
      },
      {
        film: "Militantropos",
        director: "Alina Gorlova",
        year: 2025,
        rating: "4.00",
        note: "本届戛纳迄今为止最惊喜的纪录片，来自导演双周《Militantropos》（本片目前的豆瓣译名《武装部队》为错误翻译，根据导演解释片名为拉丁语的“士兵”和希腊语的“人类”的结合，也许可以翻译成《军人》或者《军中人》？）。作为又一部关于俄乌战争的纪录片，本片几乎是放弃了对于宏大叙事的讴歌，而将战争，或者说暴力，只作为多个镜头中或外的抽象的符号，它真正关心的是战争如何波及乌克兰的每个居民，是他们的生活，他们的住所，他们的人际关系，还包括周遭炮火下顽强生长的大自然。通过这样的影像，三位乌克兰导演浓重又充满诗意的拥抱了个体的面容与动作，镜头下的每一个生者或死者，甚至每一株花草树木都成为了具体的意向，也因此才能坚定我们的信念。",
        image: "https://a.ltrbxd.com/resized/film-poster/1/3/4/1/5/1/2/1341512-militantropos-0-460-0-690-crop.jpg?v=07904f8953",
        url: "https://weibo.com/6755944278/5169098707440139?wm=3333_2001&from=10G2293010&sourcetype=weixin&rp_trans=M1lxcHNIeFo5VTgwdWQ5bnQ5YWhUK1UyeldsWFlKdmNVZktwYUY5RDhROW96SzN0Tm4xSy9GMWUyY0lPTm5wTmxsblFBVWY2ckdBMm1sU2tzNlMzMnRWMExnakdta0VWYWZQdlBiMmhSYlIxU1BFNU91ci9ZamwwZlpZR0pEcjRnQzBsc3VhMzMvU0ZVbEZLK2VOazBnPT0%3D&s_trans=hjyPh8zORNW20mjRdgWYqw%3D%3D_5169098707440139_s&s_channel=4",
      },
      {
        film: "Alpha",
        director: "Julia Ducournau",
        year: 2025,
        rating: "2.00",
        note: "朱莉亚·迪库诺又一部口碑分化的大作《阿尔法》。从来都不是迪库诺的粉丝，但如果说在《生吃》《钛》里她依靠类型、奇观、议题的较好的把控而较为成功，那到了《阿尔法》没有一方面是合格的。影片杂糅了很多议题，比如移民、艾滋、校园暴力，血液（疾病）作为被人歧视的隐喻，但是比较浮于表面，甚至又有特别蹩脚的结尾镜头。而另一方面，将人变成石膏像还算有趣，但迪库诺弱化了本来较强的恐怖/cult，对于设定的具体表现都没多少镜头，反而强调这个设定背后带来的痛苦，完全变成了苦情剧。 ",
        image: "https://a.ltrbxd.com/resized/film-poster/1/1/6/7/8/0/8/1167808-alpha-2025-1-0-460-0-690-crop.jpg?v=74341d582c",
        url: "https://weibo.com/6755944278/5169098707440139?wm=3333_2001&from=10G2293010&sourcetype=weixin&rp_trans=M1lxcHNIeFo5VTgwdWQ5bnQ5YWhUK1UyeldsWFlKdmNVZktwYUY5RDhROW96SzN0Tm4xSy9GMWUyY0lPTm5wTmxsblFBVWY2ckdBMm1sU2tzNlMzMnRWMExnakdta0VWYWZQdlBiMmhSYlIxU1BFNU91ci9ZamwwZlpZR0pEcjRnQzBsc3VhMzMvU0ZVbEZLK2VOazBnPT0%3D&s_trans=hjyPh8zORNW20mjRdgWYqw%3D%3D_5169098707440139_s&s_channel=4",
      },
      {
        film: "Yes",
        director: "Nadav Lapid",
        year: 2025,
        rating: "5.00",
        note: "理解影片的关键信息在于出片头所引用的乔治格索斯的达达主义名画《社会支柱》，这幅作品描绘一战后腐朽的魏玛社会如何引狼入室，让纳粹党成功支配了国家，这放在当下以色列的语境里已经不言而喻了。因此，第一部分所有那些肮脏龌龊的纸醉金迷，那些对侵略暴行毫无道德的狂欢都成为了最辛辣的讽刺，拉皮德延续了前作短片中凶猛的身体性，以一种几乎是失心病狂，毫无章法（in a good way）的姿态作为生活在这样的国家的唯一法理；而当道德阀值的不断降低，即便是这些丧失了底线的人们也无法承受良心上的考量，于是10月7号的事件成为了开脱暴行的麻痹药剂，全然不顾镜头外惨无人道的，真实的炮火，与镜头内被鲜血染红的屏幕。以色列是Yes！而巴勒斯坦则是No！戈达尔的正反打再一次上演，将影像引向令人绝望的高潮，走向没有尽头的深渊之路。极具力度的批判与讽刺。",
        image: "https://a.ltrbxd.com/resized/film-poster/1/0/3/6/5/7/0/1036570-yes-2025-0-460-0-690-crop.jpg?v=346a63b249",
        url: "https://weibo.com/6755944278/5169206263026798?wm=3333_2001&from=10G2293010&sourcetype=weixin&rp_trans=M1lxcHNIeFo5VTgwdWQ5bnQ5YWhUK1UyeldsWFlKdmNVZktwYUY5RDhROW96SzN0Tm4xSy9GMWUyY0lPTm5wTjUyTktJOE96R2V5RlVTVC9zVnpkZHFESFpSMUNJY3M3MGtiVFNhc2lmdXgxU1BFNU91ci9ZamwwZlpZR0pEcjRnQzBsc3VhMzMvU0ZVbEZLK2VOazBnPT0%3D&s_trans=hjyPh8zORNW20mjRdgWYqw%3D%3D_5169206263026798_s&s_channel=4",
      },
      {
        film: "Resurrection",
        director: "Bi Gan",
        year: 2025,
        rating: "2.00",
        note: "电影的六个段落融合了不同的类型，渴望将中国历史与世界电影史串联在一起，但是毕赣匮乏的想象力却让它完全比拟不上它所“致敬”的前辈们，只作为一种拿来主义式的拼贴成为了空泛格调的附庸。也许第一部分的梦剧场依旧有着美丽的执行力，那么接下来造作的戏仿和浅显的内容则一步步将电影拖入了深渊，简单粗暴的用梦来搪塞所有的不足，创作者也在这个过程中不断露怯。有利纳斯的雄作《花》在前，再看这样的电影只觉得土鳖。",
        image: "https://a.ltrbxd.com/resized/film-poster/7/9/0/1/8/8/790188-resurrection-2025-0-460-0-690-crop.jpg?v=119318da05",
        url: "https://weibo.com/6755944278/5169729568507414?wm=3333_2001&from=10G2293010&sourcetype=weixin&s_trans=hjyPh8zORNW20mjRdgWYqw%3D%3D_5169729568507414_s&s_channel=4",
      },
      {
        film: "The Secret Agent",
        director: "Kleber Mendonça Filho",
        year: 2025,
        rating: "4.50",
        note: "电影设定在70年代军政府时期的巴西。由《毒枭》男星瓦格纳·马拉饰演的主角马塞洛因迫害被迫逃到了累西腓，但他的敌人并没有轻易放过他。尽管有这么一个很典型的类型片设定，但影片第一部分的节奏却是波澜不惊的，小门多萨再一次从他在累西腓的小家出发（这里是他从小生活的祖宅，也是他所有短片和第一部长片《舍间声响》的拍摄地），逐渐拓展到周遭的，深爱的，记忆中的，或者是想象中的诸多事件，描绘出彼时巴西的风土人情，当然还有暴力的滋生；主角的前史在这一过程中被慢慢揭开，影像的节奏也越来越快逐渐进入类型片的语境。一场猫鼠游戏如预期般上演，却断裂在了最高潮的时刻。语气如此突然的转变让整个故事成为了时代中一粒微不足道的沙，甚至永远都没有被揭开的那天。那么有什么可以见证这时代的变迁？门多萨给出的答案是电影，是迷影文化，《幽灵画像》中消失的电影院在本片再一次出现，作为历史的遗迹保存着那些未曾被挖掘的真相。看好拿编剧或者更高的奖项。",
        image: "https://a.ltrbxd.com/resized/film-poster/1/1/0/4/3/4/8/1104348-the-secret-agent-2025-0-460-0-690-crop.jpg?v=3bcd2a3e02",
        url: "https://weibo.com/6755944278/5169947908247095?wm=3333_2001&from=10G2293010&sourcetype=weixin&rp_trans=M1lxcHNIeFo5VTgwdWQ5bnQ5YWhUK1UyeldsWFlKdmNVZktwYUY5RDhROW96SzN0Tm4xSy9GMWUyY0lPTm5wTlJ5MnRJajJyR3dlNFJyM0QzTHBjdnVZaGdyK0c4bkZTUnZzQ2V0RGdoTjUxU1BFNU91ci9ZamwwZlpZR0pEcjRnQzBsc3VhMzMvU0ZVbEZLK2VOazBnPT0%3D&s_trans=hjyPh8zORNW20mjRdgWYqw%3D%3D_5169947908247095_s&s_channel=4",
      },
      {
        film: "The Phoenician Scheme",
        director: "Wes Anderson",
        year: 2025,
        rating: "4.00",
        note: "《腓尼基计划》顾名思义就是发生在腓尼基地区，今中东黎巴嫩，埃及，土耳其等地的一项秘密计划，因此片中的文化符号做了一个眼花缭乱的大混搭，你可以看见土耳其毡帽，大马士革刀，埃及木乃伊等一系列不可能存在同一时空的物件，尽管本质上这是一种白人中心主义的挪用，但它荒谬又浮夸的演绎和对美国文化入侵的批判又使其讨巧的成为了这一现象的反面。韦斯安德森再一次拥抱了充满漫画感的叙述逻辑，使得这个故事就像是一个不切实际的幻想，一个创造乌托邦的梦，一个成为人类的机会。",
        image: "https://a.ltrbxd.com/resized/film-poster/1/0/2/5/0/4/7/1025047-the-phoenician-scheme-0-460-0-690-crop.jpg?v=606059b69f",
        url: "https://weibo.com/6755944278/5170450099602595?wm=3333_2001&from=10G2293010&sourcetype=weixin&rp_trans=M1lxcHNIeFo5VTgwdWQ5bnQ5YWhUK1UyeldsWFlKdmNVZktwYUY5RDhROW96SzN0Tm4xSy9GMWUyY0lPTm5wTjA4VndsK1BCZXRzSVh6NFhsV0EzOVd4MEFFakY2YytKSkdESG42TUhvbEoxU1BFNU91ci9ZamwwZlpZR0pEcjRnQzBsc3VhMzMvU0ZVbEZLK2VOazBnPT0%3D&s_trans=hjyPh8zORNW20mjRdgWYqw%3D%3D_5170450099602595_s&s_channel=4",
      },
    ],
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
        title: "Eephus & Carax's Self-Portrait - Day 6",
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
    name: "Berlin Film Festival",
    year: 2024,
    films: [
      {
        film: "Above the Dust",
        director: "Wang Xiaoshuai",
        year: 2024,
        rating: "1.00",
        note: "小帅导演热衷于讲述每代人有每代人的苦难，但他对于情景的展现局限于最基本的看图说话或者是更加低级的主旨句表达，向着时代的病症无力的抗击一通以收获良心的自我感动，更别提这混乱不堪的故事编排，在这部名为“沃土”的电影中观众们只能看到导演焦头烂额地拼凑着各种点到为止的议题输出，却感知不到任何小老百姓对于脚下黄土的真正情感，从这一点来说简直比同样关注于西北农村的《隐入尘烟》还要苍白无力。",
        image: "https://a.ltrbxd.com/resized/film-poster/8/4/9/8/7/2/849872-above-the-dust-0-460-0-690-crop.jpg?v=c41c91b9a7",
        url: "https://weibo.com/6755944278/5003411011666515?wm=3333_2001&from=10G2293010&sourcetype=weixin&rp_trans=M1lxcHNIeFo5VTgwdWQ5bnQ5YWhUK1UyeldsWFlKdmNVZktwYUY5RDhRK3hWWFB6b255TXcxaHVCNzZaZWlUMXRVVlliTEhYTmtocW96dHUrSUdBZ1VuN0c4T3cxZmw5OUhBS2FzV3BPczUxU1BFNU91ci9ZamwwZlpZR0pEcjRnQzBsc3VhMzMvU0ZVbEZLK2VOazBnPT0%3D&s_trans=hjyPh8zORNW20mjRdgWYqw%3D%3D_5003411011666515_s&s_channel=4",
      },
      {
        film: "Pepe",
        director: "Nelson Carlos de los Santos Arias",
        year: 2024,
        rating: "4.00",
        note: "非常大胆而有趣的尝试，将毒枭pablo的命运移植到这只名为pepe的河马身上，却全然遵循自然的生成而没有任何浪漫化的想象，同时时间的概念被完全放弃，镜头的运动中是络绎不绝的空间，延至历史的轨道一路向前。 ​​​",
        image: "https://a.ltrbxd.com/resized/film-poster/1/0/5/9/2/3/9/1059239-pepe-0-460-0-690-crop.jpg?v=c9f427a8eb",
        url: "https://weibo.com/6755944278/5003831245538096?wm=3333_2001&from=10G2293010&sourcetype=weixin&rp_trans=M1lxcHNIeFo5VTgwdWQ5bnQ5YWhUK1UyeldsWFlKdmNVZktwYUY5RDhRK3hWWFB6b255TXcxaHVCNzZaZWlUMWhyUlVkSkViWUtBN1FJQnA4Kzh4MjBXZlc2VU1uOHEyUWJvRkZ3SVBuL0oxU1BFNU91ci9ZamwwZlpZR0pEcjRnQzBsc3VhMzMvU0ZVbEZLK2VOazBnPT0%3D&s_trans=hjyPh8zORNW20mjRdgWYqw%3D%3D_5003831245538096_s&s_channel=4",
      },
      {
        film: "All the Long Nights",
        director: "Sho Miyake",
        year: 2024,
        rating: "4.00",
        note: "依旧是那个能够拍出细微情绪的三宅唱，原以为选用新海诚电影的男女主角（会标志着其向更加商业制作的转型，没想到依旧延续了《惠子，凝视》的创作思路让一切从简，它的内容无关爱情或是任何戏剧化的情感连接，只关乎于两个普通人（或是精神病患者）如何在理想的社会环境互相搀扶并在工作中寻找自我，同时也没有忽视在旁枝末节中设置可能的阴霾；另一方面，城市的脉动得到了进一步的探索，人们在念白之中仰望星空，镜头中却呈现出夜晚都市的星星点点，经由光线的呼吸传递出人物的成长，无需一点赘言。",
        image: "https://a.ltrbxd.com/resized/film-poster/9/7/8/6/2/8/978628-all-the-long-nights-0-460-0-690-crop.jpg?v=c3eb620f7d",
        url: "https://weibo.com/6755944278/5004191095064177?wm=3333_2001&from=10G2293010&sourcetype=weixin&rp_trans=M1lxcHNIeFo5VTgwdWQ5bnQ5YWhUK1UyeldsWFlKdmNVZktwYUY5RDhRK3hWWFB6b255TXcxaHVCNzZaZWlUMUhOcHlrblg5bnQyaHNIaW14b1dKZi8vdW5PazRyb2pQaVFWNnlrYnVEK2QxU1BFNU91ci9ZamwwZlpZR0pEcjRnQzBsc3VhMzMvU0ZVbEZLK2VOazBnPT0%3D&s_trans=hjyPh8zORNW20mjRdgWYqw%3D%3D_5004191095064177_s&s_channel=4",
      },
      {
        film: "Dahomey",
        director: "Mati Diop",
        year: 2024,
        rating: "4.00",
        note: "还是挺惊喜的，虽然关乎于近两年微博闹得沸沸扬扬的国宝归还议题，但没有像“逃出xx博物馆”那样作为纯情绪输出的民族主义政宣工具，而是提供了一组相对的视角：人对于物的研究，及物对于人的凝视。前者虽然未能真正意义上的深入议题，但也放置出可能的角度而不显得偏颇；后者则汲取了那些面露深情的目光，随之以视觉与听觉上的抚摸反刍，从而输出反殖民主义的本质，为第三世界的群众赋权。",
        image: "https://a.ltrbxd.com/resized/film-poster/9/9/3/1/3/9/993139-dahomey-0-460-0-690-crop.jpg?v=1f91d7f3a8",
        url: "https://weibo.com/6755944278/5004903701284900?wm=3333_2001&from=10G2293010&sourcetype=weixin&rp_trans=M1lxcHNIeFo5VTgwdWQ5bnQ5YWhUK1UyeldsWFlKdmNVZktwYUY5RDhRK3hWWFB6b255TXcxaHVCNzZaZWlUMXcwSThwMHpWTkdJSmhvNit3WTVOY0o3RE9tMWhxM0RZR1FHUVppd0RacHAxU1BFNU91ci9ZamwwZlpZR0pEcjRnQzBsc3VhMzMvU0ZVbEZLK2VOazBnPT0%3D&s_trans=hjyPh8zORNW20mjRdgWYqw%3D%3D_5004903701284900_s&s_channel=4",
      },
      {
        film: "Chime",
        director: "Kiyoshi Kurosawa",
        year: 2024,
        rating: "4.50",
        note: "虽然受限于短片的体量。黑泽清依旧成功沿用自己的方法论让观众毛骨悚然。古怪的声效和鬼魅的摄影赋予了极其丰富的画外空间，使得恶的因子在影像中涌动，不断加剧的异化直至结尾却突然收获了一抹平静，好似doppelgänger彻底占据了本体, [悪は存在しない]。",
        image: "https://a.ltrbxd.com/resized/film-poster/1/1/0/3/5/6/3/1103563-chime-0-460-0-690-crop.jpg?v=1d10e9fa56",
        url: "https://weibo.com/6755944278/5024264612743532?wm=3333_2001&from=10G2293010&sourcetype=weixin&rp_trans=M1lxcHNIeFo5VTgwdWQ5bnQ5YWhUK1UyeldsWFlKdmNVZktwYUY5RDhRK3hWWFB6b255TXcxaHVCNzZaZWlUMVB3YXVuRzBrR2RId1VQeEE0SFZIZDNkU1Vld1V1RnZZdVB6UlQvUFNHS1YxU1BFNU91ci9ZamwwZlpZR0pEcjRnQzBsc3VhMzMvU0ZVbEZLK2VOazBnPT0%3D&s_trans=hjyPh8zORNW20mjRdgWYqw%3D%3D_5024264612743532_s&s_channel=4",
      },
    ],
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
        title: "The Zone of Interest & Gourmet's Death - Day 2 and 3",
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

        {/* Featured Articles Section */}
        <div className="mb-16">
          <h2 className="text-2xl mb-6">Recent Coverage</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {featuredArticles.map((article) => (
              <Link
                key={article.id}
                to={`/festival-coverage/${article.id}`}
                className="group block"
              >
                <div className="aspect-[3/2] overflow-hidden mb-3">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover grayscale group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <p className="text-sm text-muted-foreground mb-2">{article.festival}</p>
                <h3 className="text-lg group-hover:underline">{article.title}</h3>
              </Link>
            ))}
          </div>
        </div>

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

                {(selectedContentType === "all" || selectedContentType === "coverage") && festival.articles && festival.articles.length > 0 && (
                  <div className="mb-12">
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

                {(selectedContentType === "all" || selectedContentType === "ratings") && festival.films.length > 0 && (
                  <div className="space-y-8">
                    {festival.films
                      .map((film, idx) => ({ ...film, originalIndex: idx }))
                      .sort((a, b) => {
                        const ratingA = parseFloat(a.rating.split(' ')[0]);
                        const ratingB = parseFloat(b.rating.split(' ')[0]);
                        return ratingB - ratingA;
                      })
                      .map((film, rankIndex) => (
                      <div key={film.originalIndex} className="grid md:grid-cols-[80px_1fr_auto] gap-4 items-start">
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
                          {film.url && (
                            <a 
                              href={film.url} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="text-sm hover:underline mt-2 inline-block"
                            >
                              Read More →
                            </a>
                          )}
                        </div>
                        <div className="text-lg md:text-right nav-text font-medium">{film.rating}</div>
                      </div>
                    ))}
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
