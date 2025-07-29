import Image from "next/image";
import Link from "next/link";
import { createSlug } from "@/tools";
export default function Article({
  slug
}) {  
  console.log('imageSrc',slug)
  return (
    <main className="bg-gray-50 text-gray-800 min-h-screen py-20">
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Article */}
        <article className="lg:col-span-2 bg-white rounded-lg shadow p-8">
          <h1 className="text-4xl font-bold mb-4">{title}</h1>
          {imageSrc && (
            <div className="w-full h-64 rounded overflow-hidden mb-6">
              <Image
                src={imageSrc}
                alt={imageAlt}
                width={1200}
                height={640}
                className="object-cover w-full h-full"
              />
            </div>
          )}
          <div className="flex flex-wrap items-center text-sm text-gray-600 mb-4">
            {tags.map((tag) => (
              <span
                key={tag}
                className="bg-green-100 text-green-800 px-2 py-1 rounded-full uppercase font-semibold mr-3"
              >
                {tag}
              </span>
            ))}
          </div>
          <div className="text-sm text-gray-500 mb-8">
            By{" "}
            <span className="font-medium text-gray-700">
              {author}
            </span>{" "}
            • {datePosted}
          </div>
          <div className="space-y-6 leading-relaxed prose prose-lg max-w-none text-gray-800">
            {/* {post.content.split("\n").map((para, idx) => (
              <p key={idx}>{para}</p>
            ))} */}
            {body}
          </div>
          <div className="mt-10">
            <Link
              href={category}
              className="inline-block text-sm font-medium text-gray-700 hover:text-green-700"
            >
              ← Back to all posts
            </Link>
          </div>
        </article>
        {/* Aside */}
        <aside className="space-y-8">
          {/* Author Box */}
          <div className="bg-white rounded-lg shadow p-6 flex items-center">
            <Image
              src={authorAvatar}
              alt={author.name}
              width={64}
              height={64}
              className="w-16 h-16 rounded-full object-cover flex-shrink-0"
            />
            <div className="ml-4">
              <h2 className="text-lg font-semibold">About the Author</h2>
              <p className="text-sm text-gray-600">Dr. Mycelia Spore is a seasoned mycologist who’s spent over a decade exploring the hidden world of fungi. After earning her Ph.D. in Fungal Biology from the University of Mycology, she pioneered several low-cost lab techniques for home cultivators. Her research on tissue culture has been published in leading scientific journals and featured at international conferences. When she’s not in the lab, she volunteers teaching urban mushroom-growing workshops and writing for popular science blogs. In her free time, she hikes old-growth forests in search of rare mushroom species and photographs them for her growing online archive.
</p>
            </div>
          </div>
          {/* Related Articles */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Related Articles</h2>
            <ul className="space-y-4">
              {relatedArticles.map(({title, imgSrc,category="Mushroom Growing" }) => (
                <li key={createSlug(title)} className="flex items-center">
                  <Image
                    src={imgSrc}
                    alt={title}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded object-cover flex-shrink-0"
                  />
                  <Link
                    href={createSlug(title,category)}
                    className="ml-3 text-sm font-medium text-blue-600 hover:underline"
                  >
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </aside>
      </div>
    </main>
  );
}
