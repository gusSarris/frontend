export default function Socials({ socials }) {
  return (
    <div>
      <h4 className="text-[var(--spore-brown)] font-semibold text-base mb-2">
        {socials.title}
      </h4>
      <div className="flex justify-center md:justify-start gap-1 mt-2">
        {socials.social.map((item) => (
          <a
            key={item.name}
            href={item.href}
            target="_blank"
            rel="noopener noreferrer"
            className={item.color}
            aria-label={item.name}
          >
            {/* The SVG string will render as SVG */}
            <span dangerouslySetInnerHTML={{ __html: item.svg }} />
          </a>
        ))}
      </div>
    </div>
  )
}
