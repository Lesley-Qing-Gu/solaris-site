import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PageContainer from "@/components/layout/PageContainer";

interface Review {
  id: string;
  title: string;
  film: string;
  director: string;
  year: number;
  author: string;
  date: string;
  excerpt: string;
}

const reviews: Review[] = [
  {
    id: "tt35499025-review",
    title: "生活是诗还是电影？",
    film: "What Does that Nature Say to You",
    director: "Sang-soo Hong",
    year: 2025,
    author: "欧",
    date: "March 12, 2026",
    excerpt: "大自然对我们说了什么？东华在寺庙谈论我们如何用身体感受世界，起身离开，摄影机呈现了一个向上抬起的动作，我们看着让东华在后文想起埋葬岳父的母亲的那棵树...",
  },
  {
    id: "yes-review",
    title: "笔记：同义词",
    film: "Yes",
    director: "Nadav Lapid",
    year: 2025,
    author: "欧",
    date: "October 31, 2025",
    excerpt: "只要一开始行走影片就在对抗撕裂，比如献出舌头的动作，给权力舔脚是yes，激吻是no。可以看到一个绝望的摇摆，好像支持战争的哪一方都在支持恐怖，Yes和No变成了同义词...",
  },
  {
    id: "two-seasons-two-strangers-review",
    title: "笔记：陌生的三宅唱，陌生的电影",
    film: "Two Seasons, Two Strangers",
    director: "Sho Miyake",
    year: 2025,
    author: "欧",
    date: "October 30, 2025",
    excerpt: "《惠子，凝视》是我2023年最喜欢的电影，而2024年《黎明的一切》又让我觉得这种“小而美”的路线已经走到了尽头。没想到《旅途中的日子》又找到了很多有趣的事物...",
  },
  {
    id: "enzo-review",
    title: "你的世界。",
    film: "Enzo",
    director: "Robin Campillo",
    year: 2025,
    author: "Cardinal",
    date: "September 8, 2025",
    excerpt: "电影的开始，用几组干净的镜头交待了16岁的男主人公Enzo作为工地学徒，所处的平凡朴素的工作环境。而笨拙并不熟练的工作表现好像已经显示了人物和环境的格格不入。但直到...",
  },
  {
    id: "eat-the-night-review",
    title: "世界的终结，青春的终结",
    film: "Eat the Night",
    director: "Caroline Poggi & Jonathan Vinel",
    year: 2024,
    author: "迷宫中的站起来",
    date: "November 26, 2024",
    excerpt: "屏幕外，作为多年玩家的兄妹二人以满面的泪水哀悼世界的终结，哀悼他们远逝的青春...",
  },
  {
    id: "man-and-cow-review",
    title: "人与牛。",
    film: "Afternoons of Solitude",
    director: "Albert Serra",
    year: 2024,
    author: "Cardinal",
    date: "November 24, 2024",
    excerpt: "开场，一组黑夜里对公牛的特写镜头似乎带来作者立场的引导：在以斗牛士为被摄对象的纪录电影中对动物的关照...",
  },
];

const Reviews = () => {
  return (
    <Layout>
      <PageContainer>
        <h1 className="text-3xl md:text-4xl mb-12">Reviews</h1>
        
        <div className="space-y-12">
          {reviews.map((review) => (
            <article key={review.id} className="border-b border-border pb-12 last:border-b-0">
              <Link to={`/reviews/${review.id}`} className="group block">
                <h2 className="text-2xl mb-2 group-hover:opacity-60 transition-opacity">
                  {review.title}
                </h2>
                <p className="text-muted-foreground mb-4">
                  On <em>{review.film}</em> ({review.director}, {review.year})
                </p>
                <p className="prose-reading text-foreground/90 mb-4">
                  {review.excerpt}
                </p>
                <p className="text-sm text-muted-foreground nav-text">
                  {review.author} · {review.date}
                </p>
              </Link>
            </article>
          ))}
        </div>
      </PageContainer>
    </Layout>
  );
};

export default Reviews;
