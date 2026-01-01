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
    id: "brutalist-review",
    title: "The Weight of Form",
    film: "The Brutalist",
    director: "Brady Corbet",
    year: 2024,
    author: "Member One",
    date: "December 15, 2024",
    excerpt: "In László Tóth's hands, concrete becomes flesh. Corbet's three-hour epic understands that architecture is never neutral — it carries the weight of its maker's displacement, ambition, and inevitable compromise...",
  },
  {
    id: "flow-review",
    title: "Without Words",
    film: "Flow",
    director: "Gints Zilbalodis",
    year: 2024,
    author: "Member Two",
    date: "December 8, 2024",
    excerpt: "What remains when language is stripped away? Zilbalodis answers with water, light, and the primal grammar of survival. A cat navigates a flooded world, and we remember what cinema was before dialogue...",
  },
  {
    id: "past-lives-review",
    title: "The Space Between",
    film: "Past Lives",
    director: "Celine Song",
    year: 2023,
    author: "Member Three",
    date: "March 22, 2024",
    excerpt: "In-yun is not fate. It's the accumulation of small moments across lifetimes, the weight of might-have-been. Song's debut understands that some distances cannot be crossed, only witnessed...",
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
