// lib/strapi.ts
export async function getHome() {
  const url = new URL(`${process.env.STRAPI_URL}/api/home`);

  // populate "page" fully (title, slug, seo, etc.)
  url.searchParams.append("populate[page][populate]", "*");

  // populate dynamic zone "blogs" fully
  url.searchParams.append("populate[blogs][populate]", "*");


  const res = await fetch(url.toString(), {
    next: { revalidate: 60 }, // ISR caching (1 minute)
    // headers: {
    //   Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`, // if you use tokens
    // },
  });

  if (!res.ok) throw new Error("Failed to fetch Home");
  return res.json();
}
