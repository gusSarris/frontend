import SectionHeader from "@/components/shared/SectionHeader";
import FeaturedArticle from "../parts/ui/FeaturedArticle";
import ArticleCard1 from "../parts/ui/ArticleCard1";

export default function ContentGrid({ header, featured, miniItems }) {
  return (
    <section className={header.bgClass}>
      <div className="max-w-7xl mx-auto px-6 py-12 md:px-12">
        <SectionHeader title={header.title} subtitle={header.subtitle} />
        <div className="grid lg:grid-cols-4 gap-8">
          <FeaturedArticle {...featured} />
          <div className="space-y-6 lg:col-span-2 lg:ml-12">
            {miniItems.map((item, i) => (
              <ArticleCard1 key={i} {...item} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
