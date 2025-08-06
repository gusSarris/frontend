import SectionPart from "@/components/shared/SectionPart";
import FeaturedArticle from "../parts/ui/FeaturedArticle";
import ArticleCard1 from "../parts/ui/ArticleCard1";

export default function ContentGrid({ header, featured, miniItems }) {
  return (
        
        <div className="grid lg:grid-cols-4 gap-8">
          <FeaturedArticle {...featured} />
          <div className="space-y-6 lg:col-span-2 lg:ml-12">
            {miniItems.map((item, i) => (
              <ArticleCard1 key={i} {...item} />
            ))}
          </div>
        </div>
  );
}
