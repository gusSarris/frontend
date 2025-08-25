import Link from "next/link";

export default function FooterLogo({footerLogo,copyright}) {
    return (
        <div>
            <Link href="/">
                <h4 className="text-[var(--spore-brown)] font-semibold text-base mb-2">
                    {footerLogo.imageAlt}
                </h4>
            </Link>
            <p>
                {copyright[0].children[0].text}
                <br />
                {copyright[1].children[0].text}
            </p>
        </div>
    )

}
