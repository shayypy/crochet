import { serialize } from "next-mdx-remote/serialize";
import remarkGfm from "remark-gfm";

const repository = "shayypy/crochet";
const branch = "main";

export const getPostSourceUrl = (slug: string) => {
  return `https://github.com/${repository}/blob/${branch}/posts/${slug}.mdx`;
};

export const getPostRawUrl = (slug: string) => {
  return new URL(`/crochet/raw/${slug}.mdx`, location.origin).href;
};

export const getPost = async (slug: string) => {
  const url = getPostRawUrl(slug);
  const response = await fetch(url, { method: "GET" });
  if (!response.ok) {
    console.error(response);
  }

  const serialized = await serialize(await response.text(), {
    parseFrontmatter: true,
    mdxOptions: {
      remarkPlugins: [remarkGfm],
    },
  });
  return serialized;
};
