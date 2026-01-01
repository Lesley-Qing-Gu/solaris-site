import { useParams, Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import PageContainer from "@/components/layout/PageContainer";

interface ReviewData {
  id: string;
  title: string;
  film: string;
  director: string;
  year: number;
  author: string;
  date: string;
  content: string[];
}

const reviewsData: Record<string, ReviewData> = {
  "brutalist-review": {
    id: "brutalist-review",
    title: "The Weight of Form",
    film: "The Brutalist",
    director: "Brady Corbet",
    year: 2024,
    author: "Member One",
    date: "December 15, 2024",
    content: [
      "In László Tóth's hands, concrete becomes flesh. Brady Corbet's three-hour epic understands that architecture is never neutral — it carries the weight of its maker's displacement, ambition, and inevitable compromise.",
      "Adrien Brody disappears into Tóth with an intensity that borders on self-annihilation. This is not the mannered suffering of prestige performance but something rawer: the erosion of a man by his own vision. Guy Pearce, as the patron who enables and destroys in equal measure, gives perhaps his finest work — all surface charm concealing depths of need.",
      "Corbet shoots in VistaVision, and the format matters. The horizontal expanse mirrors Tóth's brutalist structures: imposing, uncompromising, designed to dwarf the human figures that move through them. When we finally see the completed community center, it's both triumph and tomb.",
      "The film's three-hour runtime is deliberate, perhaps essential. Immigration, assimilation, artistic compromise — these are processes that cannot be rushed. We feel every year of Tóth's American journey, every small death along the way to his compromised success.",
      "This is a film about what America does to its dreamers. Not the dream itself, but the machinery that processes it. Tóth arrives with visions of pure form; he leaves having learned that every building, like every immigrant, must negotiate with the earth it stands on.",
    ],
  },
  "flow-review": {
    id: "flow-review",
    title: "Without Words",
    film: "Flow",
    director: "Gints Zilbalodis",
    year: 2024,
    author: "Member Two",
    date: "December 8, 2024",
    content: [
      "What remains when language is stripped away? Gints Zilbalodis answers with water, light, and the primal grammar of survival. A cat navigates a flooded world, and we remember what cinema was before dialogue dominated.",
      "Flow operates on pure visual logic. A house submerged. A boat discovered. A tentative community of survivors formed across species lines. Zilbalodis trusts his images completely, never explaining what the flood means or where it came from. The world simply is, and the cat must move through it.",
      "The animation style — somewhere between the handcrafted and the digital — serves the story's otherworldly quality. These are not quite realistic animals but creatures of fable, their emotions legible through movement rather than anthropomorphized expression.",
      "At barely ninety minutes, the film achieves an emotional density that longer, more elaborate works often miss. When the cat finally finds safety, we've earned that arrival. Every obstacle overcome, every bond formed, registers with the weight of lived experience.",
      "This is animation as meditation. Not the manufactured sentiment of mainstream studios, but something closer to poetry — each frame a careful arrangement of color and light in service of something words would only diminish.",
    ],
  },
  "past-lives-review": {
    id: "past-lives-review",
    title: "The Space Between",
    film: "Past Lives",
    director: "Celine Song",
    year: 2023,
    author: "Member Three",
    date: "March 22, 2024",
    content: [
      "In-yun is not fate. It's the accumulation of small moments across lifetimes, the weight of might-have-been. Celine Song's debut understands that some distances cannot be crossed, only witnessed.",
      "The film's structure is deceptively simple: two childhood friends in Seoul, separated by emigration, reunited decades later in New York. What Song does with this premise is extraordinary — she makes the space between people visible, tangible, almost unbearable.",
      "Greta Lee and Teo Yoo carry the film's central silence with remarkable precision. Their Nora and Hae Sung are not tragic lovers kept apart by circumstance but something more honest: two people who might have been everything to each other, had the world been different. The conditional tense is the film's true subject.",
      "John Magaro, as Nora's husband Arthur, gives the performance of the year in a role that could easily become invisible. His scene with Hae Sung, two men who love the same woman in different registers, is devastating in its understatement.",
      "Song shoots New York like a city of ghosts. Every subway platform, every bar, every apartment becomes a threshold between what is and what might have been. When Nora walks Hae Sung to his Uber in the film's final scene, we understand that some goodbyes are not endings but the recognition of an ending that happened long ago.",
    ],
  },
};

const ReviewDetail = () => {
  const { id } = useParams<{ id: string }>();
  const review = id ? reviewsData[id] : null;

  if (!review) {
    return (
      <Layout>
        <PageContainer>
          <p>Review not found.</p>
          <Link to="/reviews" className="text-muted-foreground hover:opacity-60 transition-opacity">
            ← Back to Reviews
          </Link>
        </PageContainer>
      </Layout>
    );
  }

  return (
    <Layout>
      <PageContainer>
        <article className="prose-reading mx-auto">
          <Link 
            to="/reviews" 
            className="text-sm text-muted-foreground hover:opacity-60 transition-opacity nav-text inline-block mb-8"
          >
            ← Reviews
          </Link>
          
          <header className="mb-12">
            <h1 className="text-3xl md:text-4xl mb-4 text-balance">{review.title}</h1>
            <p className="text-lg text-muted-foreground mb-4">
              On <em>{review.film}</em> ({review.director}, {review.year})
            </p>
            <p className="text-sm text-muted-foreground nav-text">
              {review.author} · {review.date}
            </p>
          </header>
          
          <div className="space-y-6 text-foreground/90">
            {review.content.map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </article>
      </PageContainer>
    </Layout>
  );
};

export default ReviewDetail;
