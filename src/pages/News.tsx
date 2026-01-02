import Layout from "@/components/layout/Layout";
import PageContainer from "@/components/layout/PageContainer";

interface NewsItem {
  id: string;
  title: string;
  date: string;
  content: string;
}

const newsItems: NewsItem[] = [
  {
    id: "1",
    title: "Annual Top 10 2025 Published",
    date: "December 31, 2024",
    content:
      "SOLARIS Annual Top 10 2025 is now published. Readers can explore the collective ranking in the Annual Top 10 section, as well as each editor’s individual Top Ten list.\n\nThis year, we also present a few light-hearted internal distinctions:\nBest Duo — 大马哈鱼 & 欢\nLeast Likely to Talk About Films — 大马哈鱼\nTheir Life, My Dream — Cardinal\nMost Humorous — Young\n\nWe wish all our readers a thoughtful and joyful New Year.",
  },
  {
    id: "2",
    title: "New Editorial Team Announced",
    date: "December 17, 2024",
    content:
     "In December, the new SOLARIS editorial team was officially formed.\n Editors-in-Chief: Cardinal, LesleyGujiji\n Associate Editors: 欧, 冬客\n\nWe look forward to the coming year as SOLARIS continues to expand internationally, embrace diverse perspectives, and move forward with clarity and confidence."
  },
];

const News = () => {
  return (
    <Layout>
      <PageContainer>
        <h1 className="text-3xl md:text-4xl mb-12">News</h1>
        
        <div className="space-y-12">
          {newsItems.map((item) => (
            <article key={item.id} className="border-b border-border pb-8 last:border-b-0">
              <time className="text-sm text-muted-foreground nav-text block mb-2">
                {item.date}
              </time>
              <h2 className="text-xl mb-3">{item.title}</h2>
              <p className="whitespace-pre-line text-foreground/90">{item.content}</p>
            </article>
          ))}
        </div>
      </PageContainer>
    </Layout>
  );
};

export default News;
