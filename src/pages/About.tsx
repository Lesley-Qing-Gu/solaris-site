import Layout from "@/components/layout/Layout";
import PageContainer from "@/components/layout/PageContainer";

const About = () => {
  return (
    <Layout>
      <PageContainer>
        <article className="prose-reading mx-auto">
          <h1 className="text-3xl md:text-4xl mb-12 text-balance">About</h1>
          
          <div className="space-y-6 text-foreground/90">
            <p>
              [Introduction text will be added here.]
            </p>
            
            <p>
              This space is reserved for the collective's introduction. 
              The text should breathe — unhurried, unadorned, present.
            </p>
          </div>
        </article>
      </PageContainer>
    </Layout>
  );
};

export default About;
