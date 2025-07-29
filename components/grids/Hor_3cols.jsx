import ArticleCard2 from "@/components/parts/ui/ArticleCard2";

export default function Hor_3cols({ miniItems }) {
  return (
    <div className="md:mt-16 grid grid-cols-1 md:grid-cols-3 md:gap-24  space-y-6 lg:col-span-2">
      {miniItems.map((item, i) => (
        <ArticleCard2 key={i} {...item} />
      ))}
    </div>
  );
}
