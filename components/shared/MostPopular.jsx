// components/MostPopular.jsx
import Image from 'next/image'

export default function FeaturedArticle({
  imageSrc,
  imageAlt,
  badge,
  headline,
  description,
}) {
  return (
    <div className="lg:col-span-2 space-y-4">
      <div className="relative rounded-lg overflow-hidden">
        <Image
          src={imageSrc}
          alt={imageAlt}
          width={800}
          height={500}
          className="w-full h-auto object-cover rounded-lg"
          priority
        />
        <span className="absolute top-3 left-3 bg-[#F6BE6B] text-[#2F2E2C] text-sm font-medium px-3 py-1 rounded-full shadow">
          {badge}
        </span>
      </div>
      <div>
        <h2 className="text-xl md:text-4xl font-semibold text-[#2F2E2C] my-8">
          {headline}
        </h2>
        <p className="mt-2 text-[#6E4B3A] text-sm md:text-base">
          {description}
        </p>
      </div>
    </div>
  )
}
