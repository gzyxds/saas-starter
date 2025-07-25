import { Layout } from "@/components/layout/layout";
import { SectionLayout } from "@/components/layout/section-layout";
import { Hero } from "@/components/sections/hero";
import { Features } from "@/components/sections/features";
import { Pricing } from "@/components/ui/pricing";
import { Testimonials } from "@/components/sections/testimonials";
import { FAQ } from "@/components/sections/faq";
// import { ArrowRight, Sparkles } from "lucide-react";
import { CTASection } from "@/components/sections/cta-section";
import { Locale } from "@/lib/i18n";
import { getDictionary } from "@/lib/dictionaries";
import { AboutSection, ContentSection, FeatureSection } from "@/components/sections/content-section";
import { getAllCases } from "@/lib/cases";
import { CaseShowcaseGrid } from "@/components/ui/case-showcase-grid";
import { SupportCard } from "@/components/ui/support-card";
import { Headphones, Rocket, Target } from "lucide-react";

export default async function HomePage({
  params,
}: {
  params: { lang: Locale };
}) {
  const dict = await getDictionary(params.lang);

  return (
    <Layout dict={dict}>
      <Hero dict={dict} params={params} />
      <Features dict={dict} />

      {/* 新增内容区块示例 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <AboutSection title="我们的故事">
          <p>这是纯文本内容区块的示例。它非常适合故事、关于页面或任何不需要配图的内容。</p>
          <p>该组件自动处理间距、排版和响应式设计，确保您的内容在所有设备上都看起来很棒。</p>
        </AboutSection>

        <ContentSection
          title="高级分析仪表板"
          layout="text-left"
          image={{
            src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=400&fit=crop&crop=center",
            alt: "分析仪表板",
            width: 600,
            height: 400
          }}
        >
          <p>我们的高级分析仪表板为您的业务性能提供实时洞察。跟踪关键指标，监控用户行为，做出数据驱动的决策。</p>
          <p>通过可自定义的小部件和交互式图表，您可以完全按照您需要的方式可视化数据。导出报告，设置警报，与您的团队协作。</p>
        </ContentSection>

        <FeatureSection
          title="无缝集成"
          layout="text-right"
          image={{
            src: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=600&h=400&fit=crop&crop=center",
            alt: "集成插图"
          }}
        >
          <p>与100多个热门工具和服务连接。我们的API优先方法确保您可以与任何系统集成，无论多么复杂。</p>
          <p>从CRM系统到营销自动化工具，我们都能满足您的需求。在几分钟内设置集成，而不是几小时。</p>
        </FeatureSection>
      </div>

      {/* 案例展示区块 */}
      {(() => {
        const cases = getAllCases(params.lang);
        return (
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
            <h2 className="text-3xl font-bold text-foreground mb-8 text-center">
              {dict.cases?.pageTitle || "成功案例"}
            </h2>
            <CaseShowcaseGrid cases={cases} lang={params.lang} dict={dict} />
          </div>
        );
      })()}
      {/*Pricing Section*/}
      <SectionLayout
        id="pricing"
        title={dict?.pricing?.title || "Simple, Transparent Pricing"}
        description={dict?.pricing?.description}
        locale={params.lang}
      >
        <Pricing dict={dict} />
      </SectionLayout>
      <Testimonials dict={dict} params={params} />

      {/* 支持服务区块 */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 my-16">
        <div className="mb-12 text-center">
          <h2 className="text-3xl font-bold mb-4">支持服务</h2>
          <p className="text-muted-foreground">
            居中对齐的卡片，用于显示支持服务和功能
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <SupportCard
            icon={Headphones}
            title="24/7 支持"
            description="我们专家团队提供全天候支持"
          />
          <SupportCard
            icon={Rocket}
            title="入门指导"
            description="引导式设置和个性化入门体验"
          />
          <SupportCard
            icon={Target}
            title="培训"
            description="全面的培训材料和认证计划"
          />
        </div>
      </div>
      <FAQ dict={dict} />
      <CTASection
        variant="gradient"
        title={dict.home.bottomCta.title}
        description={dict.home.bottomCta.description}
        buttons={[
          {
            text: dict.common.buttons.getStartedNow,
            variant: "secondary",
          },
          {
            text: dict.common.buttons.viewDocumentation,
            variant: "secondary",
            href: dict.common.buttons.documentationUrl,
          },
        ]}
        trustIndicators={dict.home.bottomCta.trustIndicators?.map(text => ({ text }))}
        maxWidth="4xl"
      />
    </Layout>
  );
} 