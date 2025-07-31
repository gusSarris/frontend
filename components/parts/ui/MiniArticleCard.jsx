import Image from "next/image";
import Link from "next/link";

export default function MiniArticleCard({
  imageSrc,
  imageAlt,
  badge,
  title,
  text,
}) {
  return (
    <div className="bg-[#F4F1ED] rounded-xl p-4">
      <div className="flex space-x-4 md:mb-10">
        <div className="relative">
          <span className="absolute  inline-block  bg-[#F6BE6B] text-[#2F2E2C] text-[14px] mt-4 font-medium px-2 py-0.5 rounded-full left-2">
            {badge}
          </span>
          <Image
            src={imageSrc}
            alt={imageAlt}
            width={160}
            height={160}
            className="size-40 rounded-lg object-cover"
          />
        </div>
        <div className="flex-1">
          <Link href="/">
            <h3 className="font-bold     text-base md:text-2xl md:mb-2">
              {title}
            </h3>
          </Link>

          <p className="text-[#6E4B3A] mt-1 text-base">{text}</p>
        </div>
      </div>
    </div>
  );
}
