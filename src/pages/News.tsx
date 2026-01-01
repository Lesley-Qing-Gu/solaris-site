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
    title: "Annual Summary 2024 Published",
    date: "December 31, 2024",
    content: "Our collective's year-end list is now available. Ten films that defined our viewing year, with notes from contributing members.",
  },
  {
    id: "2",
    title: "Venice Coverage Complete",
    date: "September 12, 2024",
    content: "All festival ratings and notes from the 81st Venice International Film Festival have been added to the archive.",
  },
  {
    id: "3",
    title: "New Member Announcement",
    date: "August 1, 2024",
    content: "We welcome Member Five to the collective. Their first contributions will appear in the September ratings.",
  },
  {
    id: "4",
    title: "Site Launch",
    date: "January 1, 2024",
    content: "SOLARIS begins. A quiet space for film writing and collective memory.",
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
              <p className="text-foreground/90">{item.content}</p>
            </article>
          ))}
        </div>
      </PageContainer>
    </Layout>
  );
};

export default News;
