// pages/index.jsx
import Hero from "@/components/parts/home/HeroSection"
import ContentGrid from "@/components/grids/ContentGrid"
import SectionPart from "@/components/shared/SectionPart"
import { getHome,strapiMediaURL } from "@/lib/strapi";

export default async function Home() {
  // Data for the “Most Popular” section
  const dt = await getHome()
  console.log('data',dt.data.blogs[1])
  return (
    <main>
      {/* <div className="top_section">
        <Hero heroTop={dt.data.blogs[0].herotop} cta={dt.data.blogs[0].herocta[0].link} strapiMediaURL={strapiMediaURL}/>
      </div> */}
      <SectionPart title="Most Popular" classAttr={{ section: "bg-[#F4F1ED]" }}>
        {/* <ContentGrid posts={data} /> */}
      </SectionPart>

      {/* <SectionPart title="From Spores to stories" classAttr={{ section: "bg-[#F9F7F4]" }}>
        <Hor_4cols {fn.isPostFeatured()} />
      </SectionPart> */}

    </main>
  )

}
