import Newsletter from "../parts/other/Newsletter";
import Socials from "../parts/other/Socials";
import FooterLogo from "../parts/other/FooterLogo";
// components/Footer.jsx
export default function Footer({ footerLogo, copyright, socials, subscribe }) {
  return (
    <footer className="bg-[var(--forest-moss)] text-[var(--forest-moss)] text-sm py-12 mt-32">
      <div className="max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-1 md:grid-cols-3 gap-10 text-center md:text-left">
        {/* Left */}
        <FooterLogo footerLogo={footerLogo} copyright={copyright} />
        {/* Middle: Newsletter */}
        <Newsletter subscribe={subscribe} />
        {/* Right: Social */}
        <Socials socials={socials} />
      </div>
    </footer>
  );
}
