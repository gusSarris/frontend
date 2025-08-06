// components/PostCard.jsx
import Image from 'next/image';
import Link from 'next/link';

export default function ArticleCard2({
  imageSrc,
  imageAlt,
  badge,
  title,
  text,
}) {
  return (
  <Link href="/">
 <div className="bg-[#F4F1ED] rounded-xl  overflow-hidden shadow hover:shadow-lg transition-shadow duration-300 md:min-h-[400]">
      <div className=" overflow-hidden mb-4 relative">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={400}    
          height={250}
          
        />
        <span className="absolute top-3 left-3 bg-[#F6BE6B] text-[#2F2E2C] text-sm font-medium px-3 py-1 rounded-full shadow">
          {badge}
        </span>
      </div>
      <div className="p-4">
        <h3 className="font-semibold text-[#2F2E2C] text-base md:text-2xl md:mb-2">
        {title}
      </h3>
      <p className="text-[#6E4B3A] mt-1 text-base">
        {text}
      </p>
      </div>
      
    </div>
      </Link>

  );
}
