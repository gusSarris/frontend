// If you're on the App Router and this is purely presentational, you can omit "use client".
// If you plan to fetch on the client or use hooks here, add:
// "use client";

import SectionPart from '@/components/shared/SectionPart';
import Image from 'next/image';
import Link from 'next/link';
import ArticleCard3 from '@/components/parts/ui/ArticleCard3';
export default function RandomPosts() {
  // 🔥 Replace these with real data (e.g. from Strapi) or pass in via props
  const posts = [
    {
      slug: 'pantoja-vs-erceg-ufc-301',
      imageSrc: '/postSmall.png',         // put images in /public/images/
      title: 'Alexandre Pantoja vs Steve Erceg prediction | UFC 301',
      author: 'Staff Predictions',
      date: 'May 2, 2024',
      tag: 'UFC Predictions',
      excerpt:
        'Alexandre Pantoja vs. Steve Erceg is this weekend’s main event at UFC 301 in Rio de Janeiro, Brazil. Here’s our breakdown…',
    },
    {
      slug: 'aldo-vs-martinez-ufc-301',
      imageSrc: '/postSmall.png',
      title: 'Jose Aldo Jr. vs Jonathan Martinez prediction | UFC 301',
      author: 'Braeden Arbour',
      date: 'May 3, 2024',
      tag: 'UFC Predictions',
      excerpt:
        'The King of Rio, Jose Aldo Jr., returns to the octagon after retiring two years ago. Here’s our fight breakdown…',
    },
    {
      slug: 'nicolau-vs-perez-espn-55',
      imageSrc: '/postSmall.png',
      title: 'Matheus Nicolau vs Alex Perez prediction | UFC on ESPN 55',
      author: 'Staff Predictions',
      date: 'April 26, 2024',
      tag: 'UFC Predictions',
      excerpt:
        'Matheus Nicolau and Alex Perez go head-to-head in the main event of UFC on ESPN 55. Here’s what to expect…',
    },
  ];

  return (
    <SectionPart title="Growing Mushrooms">
      
        {posts.map((post,i) => (
          <div className="mb-24">
          <ArticleCard3 key={i} {...post} />
           </div>
        ))}
     

    </SectionPart>

  );
}
