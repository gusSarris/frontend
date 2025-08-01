// components/PostCard.jsx
import Image from 'next/image';

// components/PostCard.jsx
import Image from 'next/image';

export default function PostCard({
  imageSrc,
  imageAlt,
  badge,
  title,
  text,
}) {
  return (
    <div className="bg-[#F4F1ED]">
      <div className="rounded-xl overflow-hidden mb-4 relative">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={400}      // adjust or switch to `fill` as needed
          height={250}
          className="rounded-xl"
        />
        <span className="absolute top-3 left-3 bg-[#F6BE6B] text-[#2F2E2C] text-sm font-medium px-3 py-1 rounded-full shadow">
          {badge}
        </span>
      </div>
      <h3 className="font-semibold text-[#2F2E2C] text-base md:text-2xl md:mb-2">
        {title}
      </h3>
      <p className="text-[#6E4B3A] mt-1 text-base">
        {text}
      </p>
    </div>
  );
}
