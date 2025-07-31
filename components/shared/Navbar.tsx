// components/Navbar.tsx
import Link from "next/link";
import Image from "next/image";
export default function Navbar() {
  return (
  <div className="top_section">
    <header className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 py-6">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 group">
           <Image
        src="/logo.png"
        alt="My Site Logo"
        width={103}
        height={89}
        className="h-8 w-auto"
        priority // loads eagerly—good for logos
      />
<span
          className="text-2xl font-semibold tracking-tight group-hover:text-[var(--golden-oyster)] transition-colors">MushroomFriend</span>        </Link>

        {/* Navigation links */}
        <nav className="hidden md:flex items-center gap-8 font-medium">
          <Link href="/" className="hover:text-[var(--golden-oyster)] transition">Home</Link>
          <Link href="/learn" className="hover:text-[var(--golden-oyster)] transition">Learn</Link>
          <Link href="/grow-kits" className="hover:text-[var(--golden-oyster)] transition">Grow Kits</Link>
          <Link href="/blog" className="hover:text-[var(--golden-oyster)] transition">Blog</Link>
          <Link href="/contact" className="hover:text-[var(--golden-oyster)] transition">Contact</Link>
        </nav>
      <button
      id="mobileBtn"
      type="button"
      className="md:hidden"
      aria-label="Open menu"
    >
      {/* Simple hamburger icon */}
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        className="w-7 h-7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M4 6h16M4 12h16M4 18h16"
        />
      </svg>
    </button>
    </header>
    <nav
      id="mobileNav"
      className="md:hidden hidden flex-col gap-4 items-center pb-6 text-lg font-medium"
    >
      <Link href="#home" className="hover:text-[var(--golden-oyster)] transition">
        Home
      </Link>
      <Link href="#learn" className="hover:text-[var(--golden-oyster)] transition">
        Learn
      </Link>
      <Link href="#kits" className="hover:text-[var(--golden-oyster)] transition">
        Grow Kits
      </Link>
      <Link href="#blog" className="hover:text-[var(--golden-oyster)] transition">
        Blog
      </Link>
      <Link href="#contact" className="hover:text-[var(--golden-oyster)] transition">
        Contact
      </Link>
    </nav>
    </div>
  );
}
