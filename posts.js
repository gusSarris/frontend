// data/mushrooms.js
// A collection of mushroom cultivation posts keyed by slug
const posts = {
  "bulk-substrate-breakdown": {
    title: "Bulk Substrate Breakdown: What Grows Best & Why",
    published: "July 9, 2025",
    category: "Technique",
    imageSrc: "/images/post.png",
    imageAlt: "Bulk substrate example",
    tags: [
      { label: "substrate", href: "/tags/substrate" },
      { label: "technique", href: "/tags/technique" },
      { label: "beginner", href: "/tags/beginner" }
    ],
    content: (
      <>
        <p>
          When it comes to mushroom cultivation, choosing the right substrate can make or break
          your grow. Straw, coco coir, and sawdust are the big three—and each has its strengths
          and quirks.
        </p>
        <h2>🥥 Coco Coir</h2>
        <p>
          Lightweight, easy to hydrate, and resistant to contamination. It’s a solid option for
          beginners using monotubs or bags.
        </p>
        <h2>🌾 Straw</h2>
        <p>
          Cheap and easy to find, but it requires pasteurization and careful handling. Great for
          bulk growers using buckets or outdoor beds.
        </p>
        <h2>🌲 Hardwood Sawdust</h2>
        <p>
          Best for gourmet varieties like shiitake. Needs sterilization and usually works best
          with supplemented blocks.
        </p>
        <p>
          In the end, your environment, goals, and mushroom species will guide your choice. Test
          and tweak—it’s half the fun!
        </p>
      </>
    )
  },

  "substrate-moisture-control": {
    title: "Substrate Moisture Control: Finding the Sweet Spot",
    published: "June 18, 2025",
    category: "Guide",
    imageSrc: "/images/moisture.jpg",
    imageAlt: "Measuring substrate moisture",
    tags: [
      { label: "moisture", href: "/tags/moisture" },
      { label: "guide", href: "/tags/guide" }
    ],
    content: (
      <>
        <p>
          Maintaining the right moisture level is crucial for mycelium colonization. Too wet and
          you encourage contamination; too dry and the mycelium struggles to expand.
        </p>
        <p>
          Aim for a moisture content around 60%. You can test by squeezing a handful of substrate:
          only a few drops should release.
        </p>
      </>
    )
  },

  "outdoor-bed-basics": {
    title: "Outdoor Bed Basics: Growing Mushrooms in Your Garden",
    published: "May 2, 2025",
    category: "Technique",
    imageSrc: "/images/outdoor-bed.jpg",
    imageAlt: "Mushroom bed in garden",
    tags: [
      { label: "outdoor", href: "/tags/outdoor" },
      { label: "garden", href: "/tags/garden" }
    ],
    content: (
      <>
        <p>
          Outdoor beds can yield large harvests with minimal maintenance. Key steps include
          soil preparation, layering substrate, and protecting from pests.
        </p>
        <ol>
          <li>Choose a shaded spot with good drainage.</li>
          <li>Loosen the soil and add wood chips.</li>
          <li>Top with spawn-infused substrate and cover with straw.</li>
        </ol>
      </>
    )
  },

  "gourmet-shiitake-guide": {
    title: "Gourmet Shiitake Guide: From Log to Table",
    published: "April 12, 2025",
    category: "Guide",
    imageSrc: "/images/shiitake.jpg",
    imageAlt: "Fresh shiitake mushrooms",
    tags: [
      { label: "shiitake", href: "/tags/shiitake" },
      { label: "gourmet", href: "/tags/gourmet" }
    ],
    content: (
      <>
        <p>
          Shiitake thrive on hardwood logs. You’ll need to drill holes, plug inoculate with spawn,
          and incubate for 6–12 months.
        </p>
        <h2>⚙️ Inoculation Process</h2>
        <p>
          Drill 1-inch holes every 6 inches, insert spawn dowels, seal with wax, and stack logs in
          shade.
        </p>
      </>
    )
  },

  "straw-pasteurization-techniques": {
    title: "Straw Pasteurization Techniques: Safety First",
    published: "March 27, 2025",
    category: "Technique",
    imageSrc: "/images/pasteurize.jpg",
    imageAlt: "Pasteurizing straw",
    tags: [
      { label: "straw", href: "/tags/straw" },
      { label: "pasteurization", href: "/tags/pasteurization" }
    ],
    content: (
      <>
        <p>
          Proper pasteurization kills unwanted microbes while preserving beneficial bacteria that
          inhibit contaminants.
        </p>
        <h2>🔥 Hot Water Method</h2>
        <p>
          Soak straw in 65–75°C water for 1–2 hours, then drain and cool before spawning.
        </p>
      </>
    )
  },

  "coir-block-preparation": {
    title: "Coir Block Preparation: Quick & Easy Substrate",
    published: "February 10, 2025",
    category: "Tips",
    imageSrc: "/images/coir.jpg",
    imageAlt: "Hydrating coir block",
    tags: [
      { label: "coir", href: "/tags/coir" },
      { label: "tips", href: "/tags/tips" }
    ],
    content: (
      <>
        <p>
          Coco coir blocks expand up to 5x their size. Simply hydrate with water, fluff, and spawn.
        </p>
        <p>
          It’s beginner-friendly and less messy than loose substrates.
        </p>
      </>
    )
  }
};

export default posts;
