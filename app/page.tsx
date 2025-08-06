// pages/index.jsx
import Hero from "@/components/parts/home/HeroSection"
import ContentGrid from "@/components/grids/ContentGrid"
import Hor_4cols from "@/components/grids/Hor_4cols"
import SectionPart from "@/components/shared/SectionPart"

export default function Home() {
  // Data for the “Most Popular” section
  const mostPopular = {
    header: {
      title: "Most Popular",
      subtitle: null,
      bgClass: "bg-[#F4F1ED] px-6 py-10 md:px-12"
    },
    featured: {
      imageSrc: "/post.png",
      imageAlt: "Bulk Substrate",
      badge: "Technique",
      headline: "Bulk Substrate Breakdown: What Grows Best & Why",
      description:
        "Tried straw? Tried coco coir? This post dives into the real difference in yields, prep time, and contamination risk.",
    },
    miniItems: [
      {
        imageSrc: "/postSmall.png",
        imageAlt: "Agar",
        badge: "Lab Hack",
        title: "Cloning from the Grocery Store Shelf",
        text: "Ever wondered if you can clone a store-bought mushroom? Spoiler: You totally can.",
      },
      {
        imageSrc: "/postSmall.png",
        imageAlt: "Misting",
        badge: "Growing Tips",
        title: "When to Mist, When to Leave It",
        text: "Proper humidity keeps pins perky—but don’t overdo it. Here’s how.",
      },
      {
        imageSrc: "/postSmall.png",
        imageAlt: "Fruiting Chamber",
        badge: "DIY Setup",
        title: "How I Built a Fruiting Chamber in a Bookshelf",
        text: "A cozy closet setup that works with no fancy gear.",
      },
    ],
  }
  // Data for the “From Spores to Stories” section
  const fromSpores = {
    header: {
      title: "From Spores to Stories",
      subtitle:
        "Tips, techniques, and tales from the world of mushroom cultivation.",
      bgClass: "bg-[#F9F7F4]",
    },
    featured: {
      imageSrc: "/postSmall.png",
      imageAlt: "Agar plate",
      badge: "Lab Hack",
      headline: "Cloning from the Grocery Store Shelf",
      description:
        "Ever wondered if you can clone a store-bought mushroom? Spoiler: You totally can.",
    },
    miniItems: [
      {
        imageSrc: "/postSmall.png",
        imageAlt: "Misting mushroom",
        badge: "Growing Tips",
        title: "When to Mist, When to Leave It",
        text: "Proper humidity keeps pins perky—but don’t overdo it. Here’s how.",
      },
      {
        imageSrc: "/postSmall.png",
        imageAlt: "Fruiting chamber",
        badge: "DIY Setup",
        title: "How I Built a Fruiting Chamber in a Bookshelf",
        text:
          "A cozy closet setup that works with no fancy gear—just a little ingenuity.",
      },
      {
        imageSrc: "/postSmall.png",
        imageAlt: "Substrate",
        badge: "Technique",
        title: "Bulk Substrate Breakdown: What Grows Best",
        text: "Straw, coco coir, sawdust—what works best for your setup and why?",
      },
      {
        imageSrc: "/postSmall.png",
        imageAlt: "Misting mushroom",
        badge: "Growing Tips",
        title: "When to Mist, When to Leave It",
        text: "Proper humidity keeps pins perky—but don’t overdo it. Here’s how.",
      }
    ],
  }
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
