// components/Footer.jsx
export default function Footer() {
  return (
    <footer className="bg-[var(--forest-moss)] text-[var(--forest-moss)] text-sm py-12 mt-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        {/* Left */}
        <div>
          <h4 className="text-[var(--spore-brown)] font-semibold text-base mb-2">
            MushroomFriend
          </h4>
          <p>
            All rights reserved.
            <br />
            &copy; 2025 MushroomFriend
          </p>
        </div>

        {/* Middle: Newsletter */}
        <div>
          <h4 className="text-[var(--spore-brown)] font-semibold text-base mb-2">
            Subscribe and get news
          </h4>
          <div className="flex items-center bg-white rounded-md overflow-hidden shadow-sm max-w-md mx-auto md:mx-0">
            <input
              type="email"
              placeholder="Your email"
              className="w-full px-4 py-2 text-[var(--spore-brown)] focus:outline-none"
            />
            <button className="bg-[var(--golden-oyster)] px-4 py-2 text-[var(--spore-brown)] font-bold hover:bg-[var(--spore-brown)] hover:text-white transition">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </button>
          </div>
        </div>

        {/* Right: Social */}
        <div>
          <h4 className="text-[var(--spore-brown)] font-semibold text-base mb-2">
            Follow us
          </h4>
          <div className="flex justify-center md:justify-start gap-1 mt-2">
            <a
              href="https://facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#1877F2] hover:text-[var(--golden-oyster)]"
              aria-label="Facebook"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.877v-6.987h-2.54v-2.89h2.54V9.845c0-2.507 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.772-1.63 1.562v1.875h2.773l-.443 2.89h-2.33v6.987C18.343 21.128 22 16.991 22 12z" />
              </svg>
            </a>
            <a
              href="https://pinterest.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#E60023] hover:text-[var(--golden-oyster)]"
              aria-label="Pinterest"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-8 h-8 fill-current"
                viewBox="0 0 24 24"
              >
                <path d="M12.04 2C6.66 2 2.54 6.12 2.54 11.5c0 3.62 2.09 6.75 5.1 8.25-.07-.7-.14-1.78.03-2.54.15-.65.97-4.11.97-4.11s-.25-.51-.25-1.25c0-1.17.68-2.04 1.52-2.04.72 0 1.07.54 1.07 1.19 0 .73-.47 1.83-.71 2.85-.2.84.42 1.53 1.25 1.53 1.5 0 2.65-1.58 2.65-3.87 0-2.03-1.46-3.45-3.54-3.45-2.41 0-3.83 1.81-3.83 3.68 0 .73.28 1.52.63 1.95.07.08.08.15.06.23-.06.25-.19.84-.22.96-.04.16-.14.19-.31.12-1.17-.48-1.9-1.97-1.9-3.18 0-2.59 1.89-4.96 5.45-4.96 2.86 0 5.09 2.04 5.09 4.77 0 2.84-1.79 5.13-4.27 5.13-.83 0-1.62-.43-1.89-.94l-.51 1.94c-.18.71-.66 1.6-.99 2.14.75.23 1.54.35 2.37.35 5.38 0 9.5-4.12 9.5-9.5S17.42 2 12.04 2z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
