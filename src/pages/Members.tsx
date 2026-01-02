import Layout from "@/components/layout/Layout";
import PageContainer from "@/components/layout/PageContainer";
import membersImage from "@/assets/members.jpg";

const Members = () => {
  return (
    <Layout>
      <PageContainer>
        <article className="mx-auto max-w-2xl">
          <header className="mb-12">
            <h1 className="text-3xl md:text-4xl text-balance">Members</h1>
            <p className="mt-3 text-sm text-foreground/60">
              A small collective of Chinese cinephiles.
            </p>
          </header>

          {/* Members image */}
          <figure className="mb-14">
            <img
              src={membersImage}
              alt="SOLARIS members"
              className="w-full grayscale"
            />
            <figcaption className="mt-3 text-sm tracking-wide text-foreground/60">
              Members photo © 迷宫中的站起来
            </figcaption>
          </figure>

          {/* Roles */}
          <section className="space-y-10 text-foreground/90">
            <div className="space-y-2">
              <div className="text-sm uppercase tracking-widest text-foreground/60">
                Editor-in-Chief
              </div>
              <div className="text-lg md:text-xl leading-relaxed">
                Cardinal <span className="text-foreground/60">·</span> LesleyGujiji
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm uppercase tracking-widest text-foreground/60">
                Deputy Editors
              </div>
              <div className="text-lg md:text-xl leading-relaxed">
                欧 <span className="text-foreground/60">·</span> 冬客
              </div>
            </div>

            <div className="space-y-2">
              <div className="text-sm uppercase tracking-widest text-foreground/60">
                Founders
              </div>
              <div className="text-lg md:text-xl leading-relaxed">
                迷宫中的站起来
                <span className="text-foreground/60"> · </span>
                丧面人
              </div>
            </div>

            {/* <div className="pt-2">
              <div className="text-sm uppercase tracking-widest text-foreground/60">
                Members
              </div> */}

              {/* airy placeholder */}
              {/* <div className="mt-6 rounded-lg border border-foreground/10 p-6">
                <p className="text-sm text-foreground/70">
                  To be announced.
                </p>
                <p className="mt-2 text-xs text-foreground/50">
                  We keep this list minimal — names appear when people are ready.
                </p>
              </div>
            </div> */}
          </section>
        </article>
      </PageContainer>
    </Layout>
  );
};

export default Members;
