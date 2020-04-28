const fs = require("fs");
const blogPostsFolder = "./content/blog";

const getPathForPosts = () =>
  fs.readdirSync(blogPostsFolder).reduce((acc, postName) => {
    const trimmedName = postName.substring(0, postName.length - 3);

    return Object.assign(acc, {
      [`/blog/post/${trimmedName}`]: {
        page: "/blog/post/[slug]",
        query: {
          slug: trimmedName,
        },
      },
    });
  }, {});

module.exports = {
  webpack: (cfg) => {
    cfg.module.rules.push({
      test: /\.md$/,
      loader: "frontmatter-markdown-loader",
      options: { mode: ["react-component"] },
    });
    return cfg;
  },
  async exportPathMap(defaultPathMap) {
    return {
      ...defaultPathMap,
      ...getPathForPosts(),
    };
  },
};
