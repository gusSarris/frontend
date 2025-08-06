import Image from 'next/image';
import Link from 'next/link';

export default function ArticleCard3({
  imageSrc,
  imageAlt,
  badge,
  title,
  text,
  tag,
  excerpt,
  author,
  date
}) {
  return (
  <Link href="/">
<div
            className="flex flex-col md:flex-row bg-white shadow-lg rounded-xl overflow-hidden"
          >
            {/* Image */}
            <div className="relative w-full md:w-1/3 h-64 md:h-auto">
              <Image
                src={imageSrc}
                alt={title}
                fill
                className="object-cover"
              />
            </div>

            {/* Text Content */}
            <div className="p-6 md:w-2/3 flex flex-col justify-between">
              <div>
                <span className="text-sm font-semibold text-orange-500 uppercase">
                  {tag}
                </span>
                <h2 className="text-2xl font-bold text-gray-900 mt-2">
                  {title}
                </h2>
                <p className="text-gray-600 mt-4">{excerpt}</p>
              </div>

              <div className="mt-6 flex items-center justify-between">
                <div className="text-sm text-gray-500">
                  By{' '}
                  <span className="font-medium text-gray-800">
                    {author}
                  </span>{' '}
                  • {date}
                </div>
                <Link
                  href="/"
                  className="text-sm font-medium text-blue-600 hover:underline"
                >
                  Read more →
                </Link>
              </div>
            </div>
          </div>
</Link>

  )
}