import slugify from "slugify";

export const createSlug = (title, category = null) => {
  const opts = { lower: true, strict: true };

  const titleSlug = slugify(title, opts);

  if (category) {
    const categorySlug = slugify(category, opts);
    return `${categorySlug}/${titleSlug}`;
  }

  return titleSlug;
};