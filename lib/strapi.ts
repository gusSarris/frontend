// lib/strapi.ts
// Basic param typing for query building
type Primitive = string | number | boolean;
type Value = Primitive | Primitive[] | null | undefined;
export function newURL(path: string, params: Record<string, Value> = {}): URL {
  const base = (process.env.STRAPI_URL ?? "").replace(/\/$/, "");
  if (!base) throw new Error("Missing STRAPI_URL");
  const clean = path.replace(/^\/?api\/?/, "").replace(/^\/+/, "");
  const url = new URL(`${base}/api/${clean}`);
  for (const [k, v] of Object.entries(params)) {
    if (v == null || v === "") continue;
    if (Array.isArray(v)) {
      v.forEach((it) => url.searchParams.append(k, String(it)));
    } else {
      url.searchParams.set(k, String(v));
    }
  }
  return url;
}
/** Old numbered-array populate builder (kept for header/footer where it worked fine) */
function populateParams(paths: readonly string[]) {
  const out: Record<string, string> = {};
  paths.forEach((p, i) => (out[`populate[${i}]`] = p));
  return out;
}
/** New: object-shaped populate builder
 * Example:
 *   p({
 *     page: { populate: ["seo"] },
 *     blogs: { populate: "*" }
 *   })
 * -> {
 *   "populate[page][populate][0]": "seo",
 *   "populate[blogs][populate]": "*"
 * }
 *
 * For deeper nesting you can do:
 *   p({ page: { populate: { seo: { populate: "*" } } } })
 */
function p(schema: Record<string, any>) {
  const out: Record<string, string> = {};
  const walk = (prefix: string, node: any) => {
    if (Array.isArray(node)) {
      node.forEach((v, i) => walk(`${prefix}[${i}]`, v));
    } else if (node && typeof node === "object") {
      for (const [k, v] of Object.entries(node)) walk(`${prefix}[${k}]`, v);
    } else {
      out[prefix] = String(node);
    }
  };
  for (const [k, v] of Object.entries(schema)) walk(`populate[${k}]`, v);
  return out;
}
export function strapiMediaURL(path?: string) {
  if (!path) return "";
  if (path.startsWith("http")) return path;
  const base = (process.env.STRAPI_URL ?? "").replace(/\/$/, "");
  return `${base}${path}`;
}
// ────────────────────────────────────────────────────────────────────────────
// HEADER
// ────────────────────────────────────────────────────────────────────────────
export async function getHeader() {
  const paths = [
    "header",
    "header.logo",
    "header.logo.imageSrc",
    "header.MainNav", // note the capital M & N
    "header.MainNav.navlink",
  ] as const;
  const url = newURL("header", populateParams(paths));
  const res = await fetch(url.toString(), {
    next: { revalidate: 60 }, // ISR
  });
  if (!res.ok) throw new Error("Failed to fetch Header");
  return res.json();
}
// ────────────────────────────────────────────────────────────────────────────
// FOOTER
// ────────────────────────────────────────────────────────────────────────────
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
  const res = await fetch(url.toString(), {
    next: { revalidate: 60 }, // ISR
  });
  if (!res.ok) throw new Error("Failed to fetch Footer");
  return res.json();
}
// ────────────────────────────────────────────────────────────────────────────
/** HOME: uses the new object-shaped populate so `page`, `page.seo`, and `blogs`
 * coexist without clobbering each other.
 */
// ────────────────────────────────────────────────────────────────────────────
export async function getHome() {
  const params = p({
    page: { populate: ["seo"] },
    blogs: {
      // Fallback so the DZ itself is populated
      populate: "*",
      // Per-component rules
      on: {
        "dependent.hero": {
          populate: {
            herotop:  { populate: "*" },
            herocta:  { populate: "*" },
            
          },
        },
        "shared.featured": {
          populate: {
            posts: { populate: "*" },
          },
        },
        "shared.featured2": { populate: "*" },
      },
    },
  });

  const url = newURL("home", params);

  const res = await fetch(url.toString(), {
    next: { revalidate: 60 },
  });
  if (!res.ok) throw new Error("Failed to fetch Home");
  return res.json();
}
