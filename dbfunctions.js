
import {posts} from "./posts"
export const dbfunctions = {
  postsHomePage: (p=posts) => {
    const featured = p
      .filter((post) => typeof post.homepagePosition === "number")
      .sort((a, b) => a.homepagePosition - b.homepagePosition);
      return featured;
  },

  postsByTags: (tags,p=posts) => {
    if (!Array.isArray(posts)) return [];
    const tagList = Array.isArray(tags) ? tags : [tags];
    return p.filter((post) =>
      post.tags.some((tag) => tagList.includes(tag))
    );
  },
  isPostFeatured:(p=posts)=>{
     const featured = p
      .filter((post) =>  post.isFeatured === true)
      return featured;

  }
};
