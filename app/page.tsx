// pages/index.jsx
import Hero from "@/components/parts/home/HeroSection"
import ContentGrid from "@/components/grids/ContentGrid"
import Hor_4cols from "@/components/grids/Hor_4cols"
import SectionPart from "@/components/shared/SectionPart"

export default function Home() {
  // Data for the “Most Popular” section
  import {dummyposts} from '../dummyposts'
  
  return (
    <main>
      <div className="top_section">
        <Hero />
      </div>
      {/* Most Popular */}
      <SectionPart title="Most Popular" classAttr={{ section: "bg-[#F4F1ED]" }}>
         <ContentGrid {...mostPopular} />
      </SectionPart>
      
      {/* From Spores to Stories */}
      <SectionPart title="From Spores to stories" classAttr={{ section: "bg-[#F9F7F4]" }}>
        <Hor_4cols {...fromSpores} />
      </SectionPart>t

    </main>
  )
}
