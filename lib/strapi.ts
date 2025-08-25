// lib/strapi.ts
// lib/strapi.ts
type ParamPrimitive = string | number | boolean;
type ParamValue = ParamPrimitive | ParamPrimitive[] | null | undefined;
// lib/strapi.ts
type Primitive = string | number | boolean;
type Value = Primitive | Primitive[] | null | undefined;
export function newURL(path: string, params: Record<string, Value> = {}): URL {
  const base = (process.env.STRAPI_URL ?? "").replace(/\/$/, "");
  if (!base) throw new Error("Missing STRAPI_URL");
  const clean = path.replace(/^\/?api\/?/, "").replace(/^\/+/, "");
  const url = new URL(`${base}/api/${clean}`);
  for (const [k, v] of Object.entries(params)) {
    if (v == null || v === "") continue;
    if (Array.isArray(v))
      v.forEach((it) => url.searchParams.append(k, String(it)));
    else url.searchParams.set(k, String(v));
  }
  return url;
}
/** Build { "populate[0]": p0, "populate[1]": p1, ... } from an array */
function populateParams(paths: readonly string[]) {
  const out: Record<string, string> = {};
  paths.forEach((p, i) => (out[`populate[${i}]`] = p));
  return out;
}
export function strapiMediaURL(path?: string) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const base = (process.env.STRAPI_URL ?? "").replace(/\/$/, "");
  return `${base}${path}`;
}
export async function getHeader() {
  const paths = [
    "header",
    "header.logo",
    "header.logo.imageSrc",
    "header.MainNav", // note the capital M & N
    "header.MainNav.navlink",
  ] as const;

  const url = newURL("header", populateParams(paths));
  // Pull everything under the `header` component (includes nested media + repeatables)
  const res = await fetch(url.toString(), {
    next: { revalidate: 60 }, // ISR
  });
  if (!res.ok) throw new Error("Failed to fetch Header");
  // Return just the header payload for easy consumption in your UI
  return res.json();
}
export async function getFooter() {
  const paths = [
    "footer",
    "footer.smallLogo",
    "footer.smallLogo.imageSrc",
    "footer.subscribe", 
    "footer.socials",
    "footer.socials.social",
  ] as const;

  const url = newURL("footer", populateParams(paths));
  // Pull everything under the `footer` component (includes nested media + repeatables)
  const res = await fetch(url.toString(), {
    next: { revalidate: 60 }, // ISR
  });
  if (!res.ok) throw new Error("Failed to fetch Footer");
  // Return just the header payload for easy consumption in your UI
  return res.json();
}

export async function getHome() {
  const url = newURL("home");
  // blogs DZ base
  url.searchParams.append("populate[blogs][populate]", "*");
  // blogs -> when block is dependent.hero -> herocta -> link (fully)
  url.searchParams.append(
    "populate[blogs][on][dependent.hero][populate][herocta][populate][link][populate]",
    "*"
  );
  // (optional) if you also need herotop’s nested fields/media
  url.searchParams.append(
    "populate[blogs][on][dependent.hero][populate][herotop][populate]",
    "*"
  );
  const res = await fetch(url.toString(), {
    next: { revalidate: 60 }, // ISR caching (1 minute)
    // headers: {
    //   Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`, // if you use tokens
    // },
  });
  if (!res.ok) throw new Error("Failed to fetch Home");
  return res.json();
}
