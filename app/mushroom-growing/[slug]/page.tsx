import Image from "next/image";
import Link from "next/link";

const post = {
  title: "My First Blog Post",
  content: `Lorem ipsum dolor sit amet, consectetur adipiscing elit.
Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.`,
  author: {
    name: "Jane Doe",
    bio: "Full-stack developer and writer.",
    avatar: "/avatar.jpg",
  },
  date: "2025-08-05T12:00:00Z",
  tags: ["javascript", "webdev", "tutorial"],
  image: "/post.png",
  related: [
    {
      href: "#",
      title: "Understanding React Hooks",
      thumb: "/thumb-react-hooks.jpg",
    },
    {
      href: "#",
      title: "10 Tailwind Tips & Tricks",
      thumb: "/thumb-tailwind.jpg",
    },
    {
      href: "#",
      title: "Next.js Data Fetching",
      thumb: "/thumb-nextjs.jpg",
    },
  ],
};

export default function MyPage() {
  const formattedDate = new Date(post.date).toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <main className="bg-gray-50 text-gray-800 min-h-screen py-20">
      
      <div className="max-w-7xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Article */}
        <article className="lg:col-span-2 bg-white rounded-lg shadow p-8">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

          {post.image && (
            <div className="w-full h-64 rounded overflow-hidden mb-6">
              <Image
                src={post.image}
                alt={post.title}
                width={1200}
                height={640}
                className="object-cover w-full h-full"
              />
            </div>
          )}

          <div className="flex flex-wrap items-center text-sm text-gray-600 mb-4">
            {post.tags.map((tag) => (
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
              {post.author.name}
            </span>{" "}
            • {formattedDate}
          </div>

          <div className="space-y-6 leading-relaxed prose prose-lg max-w-none text-gray-800">
            {post.content.split("\n").map((para, idx) => (
              <p key={idx}>{para}</p>
            ))}
          </div>

          <div className="mt-10">
            <Link
              href="/blog"
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
              src={post.author.avatar}
              alt={post.author.name}
              width={64}
              height={64}
              className="w-16 h-16 rounded-full object-cover flex-shrink-0"
            />
            <div className="ml-4">
              <h2 className="text-lg font-semibold">About the Author</h2>
              <p className="text-sm text-gray-600">{post.author.bio}</p>
            </div>
          </div>

          {/* Related Articles */}
          <div className="bg-white rounded-lg shadow p-6">
            <h2 className="text-lg font-semibold mb-4">Related Articles</h2>
            <ul className="space-y-4">
              {post.related.map(({ href, title, thumb }) => (
                <li key={href} className="flex items-center">
                  <Image
                    src={thumb}
                    alt={title}
                    width={48}
                    height={48}
                    className="w-12 h-12 rounded object-cover flex-shrink-0"
                  />
                  <Link
                    href={href}
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
