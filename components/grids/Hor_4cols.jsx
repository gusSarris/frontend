import ArticleCard2 from "@/components/parts/ui/ArticleCard2";
export default function Hor_4cols(posts) {
  return (
      <div className=" grid grid-cols-1 md:grid-cols-4 md:gap-12  space-y-6 lg:col-span-2">
        {posts.map((item, i) => (
          <ArticleCard2 key={i} {...item} />
        ))}
      </div>

    
  );
}
