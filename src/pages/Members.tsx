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
                <a href="https://boxd.it/2XfFF" className="hover:underline">
                  Cardinal
                </a>
                <span className="text-foreground/60"> · </span>
                <a href="https://boxd.it/4cJib" className="hover:underline">
                  LesleyGujiji
                </a>
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

            <div className="space-y-2">
              <div className="text-sm uppercase tracking-widest text-foreground/60">
                Members
              </div>
              <div className="text-lg md:text-xl leading-relaxed">
                dama
                <span className="text-foreground/60"> · </span>Parity
                <span className="text-foreground/60"> · </span>Garmonbozia
                <span className="text-foreground/60"> · </span>TWY
                <span className="text-foreground/60"> · </span>西卡里奥
                <span className="text-foreground/60"> · </span>乍暖
                <span className="text-foreground/60"> · </span>QQQQQT.
                <span className="text-foreground/60"> · </span>granite_silver
                <span className="text-foreground/60"> · </span>藍色大門
                <span className="text-foreground/60"> · </span>东瞅西
                <span className="text-foreground/60"> · </span>司马粮
                <span className="text-foreground/60"> · </span>被窝焖小狗
                <span className="text-foreground/60"> · </span>好风
                <span className="text-foreground/60"> · </span>冬客
                <span className="text-foreground/60"> · </span>小植野
                <span className="text-foreground/60"> · </span>蝴蝶脊
                <span className="text-foreground/60"> · </span>KID Y
                <span className="text-foreground/60"> · </span>莫失莫忘
                <span className="text-foreground/60"> · </span>船续前行
                <span className="text-foreground/60"> · </span>Satoko
                <span className="text-foreground/60"> · </span>ツ
                <span className="text-foreground/60"> · </span>Scapul
                <span className="text-foreground/60"> · </span>嘟嘟熊之父
                <span className="text-foreground/60"> · </span>红与橙
                <span className="text-foreground/60"> · </span>网师
                <span className="text-foreground/60"> · </span>筱原桜
                <span className="text-foreground/60"> · </span>萧萧黄叶闭疏窗
                <span className="text-foreground/60"> · </span>伍月
                <span className="text-foreground/60"> · </span>_椰耶
                <span className="text-foreground/60"> · </span>aof
                <span className="text-foreground/60"> · </span>
                  <a href="https://boxd.it/4cy3z" className="hover:underline">
                    MinamiFans
                  </a>
                <span className="text-foreground/60"> · </span>Stout
                <span className="text-foreground/60"> · </span>我喝奶茶不加奶
                <span className="text-foreground/60"> · </span>🍊会梦见◼️吗
              </div>
            </div>


          </section>
        </article>
      </PageContainer>
    </Layout>
  );
};

export default Members;
