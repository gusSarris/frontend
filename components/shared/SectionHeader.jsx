export default function SectionPart({ title, subtitle }) {
  return (
    <div className="py-10">
      <h2 className="text-2xl md:text-5xl font-serif font-semibold text-[#2F2E2C] lg:mb-4">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[#6E4B3A] mt-2 text-base">
          {subtitle}
        </p>
      )}
    </div>
  )
}
