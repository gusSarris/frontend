const posts = [
  {
    id: 'p1',
    imageSrc: '/postSmall.png',
    imageAlt: 'Agar',
    badge: 'Lab Hack',
    title: 'Cloning from the Grocery Store Shelf',
    excerpt: 'Ever wondered if you can clone a store-bought mushroom? Spoiler: You totally can.',
    href: '/posts/cloning-from-grocery-store-shelf',
    author: 'Dr. Mycelia Spore',
    authorAvatar: '/avatars/avatar.png',
    datePosted: '2025-07-15',
    readingTime: '4 min read',
    commentCount: 12,
    tags: ['cloning', 'agar', 'mushrooms'],
    body: `
      <p><strong>Mushroom cloning</strong> is easier than you think. In this article, Dr. Mycelia Spore walks you through each essential step.</p>
      <p>First, sterilize your workspace and gather fresh tissue from a store-bought specimen. Then prepare agar plates and incubate them under controlled conditions.</p>
      <ul>
        <li>Step 1: Cut a small piece of tissue</li>
        <li>Step 2: Transfer to an agar plate</li>
        <li>Step 3: Incubate at 25°C for 7–10 days</li>
      </ul>
      <p>Once you see mycelial growth, you’re ready to transfer to spawn or substrate! Happy cloning.</p>
    `,
    relatedArticles: [
      {
        imageSrc: '/smallPost.png',
        slug: 'when-to-mist-when-to-leave-it',
        title: 'When to Mist, When to Leave It',
        href: '/posts/when-to-mist-when-to-leave-it'
      },
      {
        imageSrc: '/smallPost.png',
        slug: 'fruiting-chamber-in-a-bookshelf',
        title: 'How I Built a Fruiting Chamber in a Bookshelf',
        href: '/posts/fruiting-chamber-in-a-bookshelf'
      }
    ]
  },
  {
    id: 'p2',
    imageSrc: '/postSmall.png',
    imageAlt: 'Misting',
    badge: 'Growing Tips',
    title: 'When to Mist, When to Leave It',
    excerpt: 'Proper humidity keeps pins perky—but don’t overdo it. Here’s how.',
    href: '/posts/when-to-mist-when-to-leave-it',
    author: 'SporeMaster Jane',
    authorAvatar: '/avatars/avatar.png',
    datePosted: '2025-07-20',
    readingTime: '3 min read',
    commentCount: 8,
    tags: ['humidity', 'misting', 'fruiting'],
    body: `
      <p>Maintaining the right humidity is crucial for healthy mushroom fruiting. In this guide, SporeMaster Jane explains the dos and don’ts.</p>
      <p><em>Under-misting</em> can cause stalled growth, while overdoing it promotes bacterial contamination.</p>
      <ol>
        <li>Check humidity daily with a hygrometer.</li>
        <li>Mist lightly around the edges of the chamber.</li>
        <li>Increase air exchange to prevent pooling.</li>
      </ol>
      <p>Follow these steps and watch your pins pop!</p>
    `,
    relatedArticles: [
      {
        imageSrc: '/smallPost.png',
        slug: 'cloning-from-grocery-store-shelf',
        title: 'Cloning from the Grocery Store Shelf',
        href: '/posts/cloning-from-grocery-store-shelf'
      },
      {
        imageSrc: '/smallPost.png',
        slug: 'creating-your-own-grain-spawn',
        title: 'Creating Your Own Grain Spawn',
        href: '/posts/creating-your-own-grain-spawn'
      }
    ]
  },
  {
    id: 'p3',
    imageSrc: '/postSmall.png',
    imageAlt: 'Fruiting Chamber',
    badge: 'DIY Setup',
    title: 'How I Built a Fruiting Chamber in a Bookshelf',
    excerpt: 'A cozy closet setup that works with no fancy gear.',
    href: '/posts/fruiting-chamber-in-a-bookshelf',
    author: 'DIY Myco',
    authorAvatar: '/avatars/avatar.png',
    datePosted: '2025-07-25',
    readingTime: '5 min read',
    commentCount: 5,
    tags: ['DIY', 'fruiting chamber', 'bookshelf'],
    body: `
      <p>Transform an old bookshelf into a <strong>fully-functional fruiting chamber</strong> with minimal cost and effort.</p>
      <p>You’ll need plastic sheeting, a humidity controller, and some LED strip lights.</p>
      <h3>Materials</h3>
      <ul>
        <li>Bookshelf (at least 4 shelves)</li>
        <li>Plastic sheeting & duct tape</li>
        <li>Humidifier and fan</li>
        <li>LED grow lights</li>
      </ul>
      <p>Step-by-step photos guide you through the build—no carpentry skills required!</p>
    `,
    relatedArticles: [
      {
        imageSrc: '/smallPost.png',
        slug: 'cloning-from-grocery-store-shelf',
        title: 'Cloning from the Grocery Store Shelf',
        href: '/posts/cloning-from-grocery-store-shelf'
      },
      {
        imageSrc: '/smallPost.png',
        slug: 'when-to-mist-when-to-leave-it',
        title: 'When to Mist, When to Leave It',
        href: '/posts/when-to-mist-when-to-leave-it'
      }
    ]
  },
  {
    id: 'p4',
    imageSrc: '/postSmall.png',
    imageAlt: 'Spawn',
    badge: 'Lab Hack',
    title: 'Creating Your Own Grain Spawn',
    excerpt: 'Learn how to prep grain for optimal mycelium growth at home.',
    href: '/posts/creating-your-own-grain-spawn',
    author: 'MycoTech Chris',
    authorAvatar: '/avatars/avatar.png',
    datePosted: '2025-07-30',
    readingTime: '6 min read',
    commentCount: 3,
    tags: ['spawn', 'grain', 'substrate'],
    body: `
      <p>Grain spawn is the backbone of any mushroom grow. This tutorial shows you how to sterilize and inoculate grains safely.</p>
      <p>Chris covers:<ul>
        <li>Choosing the right grain</li>
        <li>Sterilization methods</li>
        <li>Inoculation techniques</li>
      </ul></p>
      <p>By the end, you’ll have fluffy, healthy spawn ready for bulk substrate.</p>
    `,
    relatedArticles: [
      {
        imageSrc: '/smallPost.png',
        slug: 'pressure-cooker-vs-autoclave',
        title: 'Pressure Cooker vs. Autoclave: Which to Use?',
        href: '/posts/pressure-cooker-vs-autoclave'
      },
      {
        imageSrc: '/smallPost.png',
        slug: 'top-5-substrates-for-home-cultivation',
        title: 'Top 5 Substrates for Home Cultivation',
        href: '/posts/top-5-substrates-for-home-cultivation'
      }
    ]
  },
  {
    id: 'p5',
    imageSrc: '/postSmall.png',
    imageAlt: 'Sterilization',
    badge: 'Lab Hack',
    title: 'Pressure Cooker vs. Autoclave: Which to Use?',
    excerpt: 'A comparison of sterilization methods for small-scale labs.',
    href: '/posts/pressure-cooker-vs-autoclave',
    author: 'LabGuru Lee',
    authorAvatar: '/avatars/avatar.png',
    datePosted: '2025-08-02',
    readingTime: '7 min read',
    commentCount: 9,
    tags: ['sterilization', 'lab equipment', 'safety'],
    body: `
      <p>When working in small labs, choosing the right sterilizer can save time and money. Lee breaks down the pros and cons of each.</p>
      <h3>Comparison Table</h3>
      <table>
        <tr><th>Method</th><th>Cost</th><th>Cycle Time</th></tr>
        <tr><td>Pressure Cooker</td><td>Low</td><td>60–90 min</td></tr>
        <tr><td>Autoclave</td><td>High</td><td>30–45 min</td></tr>
      </table>
      <p>Use this guide to pick the best tool for your lab’s scale and budget.</p>
    `,
    relatedArticles: [
      {
        imageSrc: '/smallPost.png',
        slug: 'creating-your-own-grain-spawn',
        title: 'Creating Your Own Grain Spawn',
        href: '/posts/creating-your-own-grain-spawn'
      },
      {
        imageSrc: '/smallPost.png',
        slug: 'building-an-led-fruit-chamber',
        title: 'Building an LED Fruit Chamber',
        href: '/posts/building-an-led-fruit-chamber'
      }
    ]
  },
  {
    id: 'p6',
    imageSrc: '/postSmall.png',
    imageAlt: 'Substrate Prep',
    badge: 'Growing Tips',
    title: 'Top 5 Substrates for Home Cultivation',  
    excerpt: 'From sawdust to straw—find out which substrates work best.',  
    href: '/posts/top-5-substrates-for-home-cultivation',  
    author: 'GreenThumb Alice',  
    authorAvatar: '/avatars/avatar.png',  
    datePosted: '2025-08-05',  
    readingTime: '4 min read',  
    commentCount: 6,  
    tags: ['substrate', 'cultivation', 'homegrow'],  
    body: `
      <p>Selecting the right substrate can make or break your grow. Alice reviews five popular options:</p>
      <ol>
        <li><strong>Sawdust</strong> – High nitrogen, great for oyster mushrooms.</li>
        <li><strong>Straw</strong> – Cheap and easy to source.</li>
        <li><strong>Coco Coir</strong> – Retains moisture evenly.</li>
        <li><strong>Wood Chips</strong> – Ideal for shiitake.</li>
        <li><strong>Manure Mix</strong> – Nutrient-rich for button mushrooms.</li>
      </ol>
      <p>Use this guide to match your strain with the perfect bedrock.</p>
    `,
    relatedArticles: [
      {
        imageSrc: '/smallPost.png',  
        slug: 'pressure-cooker-vs-autoclave',  
        title: 'Pressure Cooker vs. Autoclave: Which to Use?',  
        href: '/posts/pressure-cooker-vs-autoclave'  
      },  
      {
        imageSrc: '/smallPost.png',  
        slug: 'diy-humidity-tent-for-fruiting',  
        title: 'DIY Humidity Tent for Fruiting',  
        href: '/posts/diy-humidity-tent-for-fruiting'  
      }  
    ]  
  },  
  {
    id: 'p7',  
    imageSrc: '/postSmall.png',  
    imageAlt: 'Lighting Setup',  
    badge: 'DIY Setup',  
    title: 'Building an LED Fruit Chamber',  
    excerpt: 'A step-by-step guide to assembling energy-efficient lighting.',  
    href: '/posts/building-an-led-fruit-chamber',  
    author: 'BrightGrow Bob',  
    authorAvatar: '/avatars/avatar.png',  
    datePosted: '2025-08-07',  
    readingTime: '5 min read',  
    commentCount: 4,  
    tags: ['LED', 'lighting', 'DIY'],  
    body: `
      <p>LED lighting can boost yields while lowering energy costs. Bob shows you how to wire and mount strips safely.</p>
      <h3>Key Steps</h3>
      <ul>
        <li>Select the right wavelength (around 6500K).</li>
        <li>Calculate lumens per square foot.</li>
        <li>Ensure proper ventilation.</li>
      </ul>
      <p>By the end, your fruiting chamber will shine bright—for abundant pinsets.</p>
    `,
    relatedArticles: [
      {
        imageSrc: '/smallPost.png',  
        slug: 'top-5-substrates-for-home-cultivation',  
        title: 'Top 5 Substrates for Home Cultivation',  
        href: '/posts/top-5-substrates-for-home-cultivation'  
      },  
      {
        imageSrc: '/smallPost.png',  
        slug: 'when-and-how-to-harvest-your-mushrooms',  
        title: 'When and How to Harvest Your Mushrooms',  
        href: '/posts/when-and-how-to-harvest-your-mushrooms'  
      }  
    ]  
  },  
  {
    id: 'p8',  
    imageSrc: '/postSmall.png',  
    imageAlt: 'Humidity Tent',  
    badge: 'Growing Tips',  
    title: 'DIY Humidity Tent for Fruiting',  
    excerpt: 'Keep the mist where it belongs with this simple tent build.',  
    href: '/posts/diy-humidity-tent-for-fruiting',  
    author: 'TentBuilder Tara',  
    authorAvatar: '/avatars/avatar.png',  
    datePosted: '2025-08-10',  
    readingTime: '3 min read',  
    commentCount: 2,  
    tags: ['humidity', 'tent', 'fruiting'],  
    body: `
      <p>A humidity tent can drastically improve your fruiting success. Tara’s design uses PVC and ziplock sheets.</p>
      <p>Benefits include:</p>
      <ul>
        <li>Easy access via zip openings</li>
        <li>Uniform mist distribution</li>
        <li>Low cost</li>
      </ul>
      <p>Follow along with clear photos and do it yourself in under an hour.</p>
    `,
    relatedArticles: [
      {
        imageSrc: '/smallPost.png',  
        slug: 'building-an-led-fruit-chamber',  
        title: 'Building an LED Fruit Chamber',  
        href: '/posts/building-an-led-fruit-chamber'  
      },  
      {
        imageSrc: '/smallPost.png',  
        slug: 'when-to-mist-when-to-leave-it',  
        title: 'When to Mist, When to Leave It',  
        href: '/posts/when-to-mist-when-to-leave-it'  
      }  
    ]  
  },  
  {
    id: 'p9',  
    imageSrc: '/postSmall.png',  
    imageAlt: 'Harvest',  
    badge: 'Harvesting',  
    title: 'When and How to Harvest Your Mushrooms',  
    excerpt: 'Timing is everything—learn the best harvesting practices.',  
    href: '/posts/when-and-how-to-harvest-your-mushrooms',  
    author: 'HarvestHero Hank',  
    authorAvatar: '/avatars/avatar.png',  
    datePosted: '2025-08-12',  
    readingTime: '4 min read',  
    commentCount: 7,  
    tags: ['harvest', 'timing', 'techniques'],  
    body: `
      <p>Harvest at the peak of maturity for maximum flavor and shelf life. Hank covers signs to watch for:</p>
      <ul>
        <li>Cap edge starting to uncurl</li>
        <li>Gills fully exposed</li>
        <li>Stem firmness</li>
      </ul>
      <p>Learn proper cutting and post-harvest handling to avoid bruising.</p>
    `,
    relatedArticles: [
      {
        imageSrc: '/smallPost.png',  
        slug: 'diy-humidity-tent-for-fruiting',  
        title: 'DIY Humidity Tent for Fruiting',  
        href: '/posts/diy-humidity-tent-for-fruiting'  
      },  
      {
        imageSrc: '/smallPost.png',  
        slug: 'best-methods-to-preserve-your-yield',  
        title: 'Best Methods to Preserve Your Yield',  
        href: '/posts/best-methods-to-preserve-your-yield'  
      }  
    ]  
  },  
  {
    id: 'p10',  
    imageSrc: '/postSmall.png',  
    imageAlt: 'Preservation',  
    badge: 'Preservation',  
    title: 'Best Methods to Preserve Your Yield',  
    excerpt: 'Drying, freezing, and tincturing—what works best and why.',  
    href: '/posts/best-methods-to-preserve-your-yield',  
    author: 'PreservePro Pat',  
    authorAvatar: '/avatars/avatar.png',  
    datePosted: '2025-08-15',  
    readingTime: '6 min read',  
    commentCount: 5,  
    tags: ['preservation', 'drying', 'tincture'],  
    body: `
      <p>Once you’ve harvested, preserving your mushrooms extends usability and potency. Pat compares three methods:</p>
      <h4>1. Air Drying</h4>
      <p>Simple and low-cost, but takes 2–4 days.</p>
      <h4>2. Freeze-Drying</h4>
      <p>Quick and retains nutrients, but requires special equipment.</p>
      <h4>3. Alcohol Tincture</h4>
      <p>Extracts active compounds into a liquid form—great for medicinal use.</p>
      <p>Choose the method that matches your needs and equipment.</p>
    `,
    relatedArticles: [
      {
        imageSrc: '/smallPost.png',  
        slug: 'when-and-how-to-harvest-your-mushrooms',  
        title: 'When and How to Harvest Your Mushrooms',  
        href: '/posts/when-and-how-to-harvest-your-mushrooms'  
      },  
      {
        imageSrc: '/smallPost.png',  
        slug: 'cloning-from-grocery-store-shelf',  
        title: 'Cloning from the Grocery Store Shelf',  
        href: '/posts/cloning-from-grocery-store-shelf'  
      }  
    ]  
  }  
];  
