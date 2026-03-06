import Layout from "@/components/layout/Layout";
import PageContainer from "@/components/layout/PageContainer";

interface NewsItem {
  id: string;
  title: string;
  date: string;
  content: string;
  link?: {
    label: string;
    url: string;
  };
}


const newsItems: NewsItem[] = [
  {
    id: "4",
    title: "SOLARIS at the 76th Berlinale",
    date: "February 13, 2026",
    content:
      "We're thrilled to announce that our editorial team has arrived in Berlin for the 76th Berlin International Film Festival.\n\nEditors zyt, LesleyGujiji, Cardinal, and 奇异果 will be bringing you on-the-ground coverage throughout the festival — including first impressions, reviews, and conversations from one of cinema's most vital gathering places.\n\nStay tuned for updates from the Berlinale as we explore this year's Competition, Panorama, Forum, and beyond.",
  },
  {
    id: "1",
    title: "Instagram account is now live!",
    date: "January 16, 2026",
    content:
      "We’re excited to announce that our Instagram account is now live 🎉 \n\nStarting this week, we’ll be sharing weekly updates curated for Chinese cinephiles, including: \nKey film news and festival highlights,\nShort reviews and first impressions of new and classic films,\nOngoing conversations around cinema, authorship, and contemporary film culture.\n\nFollow us on Instagram and join us in exploring what matters most to Chinese film lovers today:",
    link: {
      label: "@solariscinema2026",
      url: "https://www.instagram.com/solariscinema2026/",
    },
  },
  {
    id: "2",
    title: "Annual Top 10 2025 Published",
    date: "December 31, 2025",
    content:
      "SOLARIS Annual Top 10 2025 is now published. Readers can explore the collective ranking in the Annual Top 10 section, as well as each editor’s individual Top Ten list.\n\nThis year, we also present a few light-hearted internal distinctions:\nBest Duo — 大马哈鱼 & 欢\nLeast Likely to Talk About Films — 大马哈鱼\nTheir Life, My Dream — Cardinal\nMost Humorous — Young\n\nWe wish all our readers a thoughtful and joyful New Year.",
  },
  {
    id: "3",
    title: "New Editorial Team Announced",
    date: "December 17, 2025",
    content:
     "In December, the new SOLARIS editorial team was officially formed.\n Editors-in-Chief: Cardinal, LesleyGujiji\n Associate Editors: zyt, 欧, 冬客\n\nWe look forward to the coming year as SOLARIS continues to expand internationally, embrace diverse perspectives, and move forward with clarity and confidence."
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
              <p className="whitespace-pre-line text-foreground/90">
                {item.content}
              </p>

              {item.link && (
                <a
                  href={item.link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-block mt-4 underline text-foreground hover:text-muted-foreground transition"
                >
                  {item.link.label}
                </a>
              )}

            </article>
          ))}
        </div>
      </PageContainer>
    </Layout>
  );
};

export default News;
