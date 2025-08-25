export default function Newsletter({ subscribe }) {

    return (
        <div>
          <h4 className="text-[var(--spore-brown)] font-semibold text-base mb-2">
            {subscribe.title}
          </h4>
          <div className="flex items-center bg-white rounded-md overflow-hidden shadow-sm max-w-md mx-auto md:mx-0">
            <input
              type="email"
              placeholder={subscribe.emailPlaceholder}
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
    )
}
