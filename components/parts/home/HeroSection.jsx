import Image from 'next/image'

export default function HeroSection({title,subtitle,body,imageAlt}) {
  return (
    <section className="relative overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12 px-6 lg:px-10 py-20 md:py-32">
        {/* Text block */}
        <div className="w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold leading-tight mb-6">
            {title}
          </h1>
          <p className="text-lg sm:text-xl text-[var(--forest-moss)] max-w-md mx-auto md:mx-0 mb-8">
            {subtitle}
          </p>
          <a
            href="#learn"
            className="inline-block rounded-full bg-[var(--golden-oyster)] px-8 py-3 font-semibold hover:bg-[var(--spore-brown)] hover:text-[var(--mycelium-white)] transition"
          >
            Start Growing
          </a>
        </div>

        {/* Hero Illustration / Image */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end">
          <Image
            src="/bg.png"
            alt="Vintage mushroom illustration"
            width={420}
            height={420}     // adjust to your image's aspect ratio
            className="max-w-[420px] w-full h-auto select-none pointer-events-none"
            priority          // ensures it loads quickly
          />
        </div>
      </div>
    </section>
  )
}
