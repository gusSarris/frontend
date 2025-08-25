// pages/index.jsx
import Hero from "@/components/parts/home/HeroSection"
import ContentGrid from "@/components/grids/ContentGrid"
import SectionPart from "@/components/shared/SectionPart"
import { getHome } from "@/lib/strapi";

export default async function Home() {
  // Data for the “Most Popular” section
  const { data } = await getHome()
  return (
    <main>
      <div className="top_section">
        <Hero {...data.blogs[0].herotop} cta={data.blogs[0].herocta} />
      </div>
      {/* <SectionPart title="Most Popular" classAttr={{ section: "bg-[#F4F1ED]" }}>
         <ContentGrid posts={fn.postsHomePage()} />
      </SectionPart> */}
      
       {/* <SectionPart title="From Spores to stories" classAttr={{ section: "bg-[#F9F7F4]" }}>
        <Hor_4cols {fn.isPostFeatured()} />
      </SectionPart> */}

    </main>
  )
  
}
