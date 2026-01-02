import Layout from "@/components/layout/Layout";
import PageContainer from "@/components/layout/PageContainer";

const About = () => {
  return (
    <Layout>
      <PageContainer>
        <article className="prose-reading mx-auto">
          <h1 className="text-3xl md:text-4xl mb-12 text-balance">
            About
          </h1>

          <div className="space-y-8 text-foreground/90">
            {/* Chinese */}
            <p>
              欢迎来到「索拉里斯」。一个聚焦电影、影像文化与观影经验的中国影迷组织。
              我们记录光落在银幕时自己眼中的影像，讨论它们留下的痕迹与感受，
              并在这些分歧中，试图找到更丰富、更深远的洞见。
              我们提供一个不断延展的交流平台，呈现多元观点，
              共同探讨电影的可能与边界。
            </p>

            {/* English */}
            <p>
              Welcome to SOLARIS. A Chinese film collective dedicated to the
              discussion and exploration of cinema, viewing experiences, and
              film culture. We record the light as it falls on the screen,
              discuss how it lingers in our minds and hearts, and in that
              division, seek deeper, more nuanced insight.
            </p>

            <p>
              Here, we offer an ever-expanding platform where diverse
              perspectives can be shared to collectively explore the
              possibilities and boundaries of cinema.
            </p>
          </div>
        </article>
      </PageContainer>
    </Layout>
  );
};

export default About;
