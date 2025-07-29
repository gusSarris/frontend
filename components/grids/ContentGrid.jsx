import FeaturedArticle from "../parts/ui/FeaturedArticle";
import ArticleCard1 from "../parts/ui/ArticleCard1";

export default function ContentGrid({posts}) {
  const [first,...rest]=posts

  return (
        <div className="grid lg:grid-cols-4 gap-8">
           <FeaturedArticle  {...first} /> 
          <div className="space-y-6 lg:col-span-2 lg:ml-12">
            {rest.map((item, i) => (
              <ArticleCard1 key={i} {...item} />
            ))}
          </div>
        </div>
  );
}
