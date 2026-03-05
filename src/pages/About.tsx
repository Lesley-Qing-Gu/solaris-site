import Layout from "@/components/layout/Layout";
import PageContainer from "@/components/layout/PageContainer";
import { Instagram, MessageCircle } from "lucide-react";

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

            {/* Social Media Links */}
            <div className="pt-8 border-t border-border">
              <h2 className="text-xl mb-6">Follow Us</h2>
              <div className="flex flex-wrap gap-4">
                <a
                  href="https://www.instagram.com/solariscinema2026/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors"
                >
                  <Instagram className="w-5 h-5" />
                  <span>Instagram</span>
                </a>
                <a
                  href="https://weibo.com/n/%E5%97%AF%E5%97%AF%E6%89%BE%E7%89%87%E9%98%BF"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors"
                >
                  <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M9.31 14.69c-1.48.14-2.75-.96-2.84-2.44-.09-1.48.99-2.82 2.47-2.96 1.48-.14 2.75.96 2.84 2.44.09 1.48-.99 2.82-2.47 2.96zm7.15-5.69c-.37-.08-.63-.12-.43-.44.43-.69.48-1.28.01-1.71-.88-.8-3.27-.08-6.01 1.8 0 0-.86.61-.64-.25.42-1.74.36-3.19-.36-4.03-1.61-1.88-5.9.07-9.58 4.35C-2.27 10.81.07 14.19.07 14.19c2.46 4.01 6.71 6.45 10.89 6.45 7.06 0 11.75-4.1 11.75-7.36 0-1.97-1.66-3.08-3.25-3.28zM8.5 19.59c-4.26.42-7.94-1.51-8.22-4.3-.28-2.79 3.03-5.39 7.29-5.81 4.26-.42 7.94 1.51 8.22 4.3.28 2.79-3.03 5.39-7.29 5.81zm11.58-9.88c-.31-.1-.52-.15-.36-.54.35-.84.39-1.56.01-2.08-1.07-.98-3.98-.1-7.31 2.19 0 0-1.05.74-.78-.31.51-2.12.44-3.88-.44-4.91-1.96-2.29-7.18.08-11.66 5.29C-2.77 13.17.09 17.33.09 17.33c2.99 4.88 8.17 7.85 13.25 7.85 8.59 0 14.3-4.99 14.3-8.96 0-2.4-2.02-3.75-3.96-3.99z"/>
                  </svg>
                  <span>Weibo</span>
                </a>
                <a
                  href="https://mp.weixin.qq.com/s?__biz=MzA3NDQzOTU0MA==&mid=2651242646&idx=1&sn=dca8fa1d89bc7e79cde7b87c0b6f19a3&chksm=8571a066c68412909a62881e8de864e1a1a54f35fc4227936fe27828c60e1864549b80161f48&mpshare=1&scene=1&srcid=0305MFHWpIHlZcDPvoLgem7B&sharer_shareinfo=26292db0ea5cc8886e78a4c9640ef52b&sharer_shareinfo_first=26292db0ea5cc8886e78a4c9640ef52b#rd"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 border border-border rounded-md hover:bg-muted transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <span>WeChat</span>
                </a>
              </div>
            </div>
          </div>
        </article>
      </PageContainer>
    </Layout>
  );
};

export default About;
