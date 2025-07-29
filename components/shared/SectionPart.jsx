export default function SectionPart({ title, subtitle,classAttr={section:"",section_inner:"",title:"",body:""},children }) {
  return (
    <section className={"md:pt-10 pb-6 "+classAttr.section}>
      <div className={"max-w-7xl mx-auto px-6 py-12 md:px-12 md:mt-12 "+classAttr.inner}>
        <h2 className={"text-3xl md:text-5xl font-serif font-semibold text-[#2F2E2C]  md:mb-16 "+classAttr.title}>
        {title}
      </h2>
      
      {subtitle && (
        <p className={"text-[#6E4B3A] mt-2 text-base "+classAttr.body}>
          {subtitle}
        </p>
      )}
      {children}
      </div>
      
    </section>
  )
}
