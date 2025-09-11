import { MDXProvider } from "@mdx-js/react";
import { MDXRemote, type MDXRemoteSerializeResult } from "next-mdx-remote";
import { useEffect, useState } from "react";
import { SiGithub } from "react-icons/si";
import { Link, useParams } from "react-router";
import yarnpng from "@/assets/yarn.png";
import { Footer } from "@/components/Footer";
import { getPost, getPostSourceUrl } from "@/lib/posts";

export default function PostRoute() {
  const { slug } = useParams();

  useEffect(() => {
    const iconEl = document.querySelector<HTMLLinkElement>('link[rel="icon"]');
    if (iconEl) {
      iconEl.href = yarnpng;
    }
  });

  const [content, setContent] = useState<MDXRemoteSerializeResult>();
  useEffect(() => {
    if (slug)
      getPost(slug).then((content) => {
        setContent(content);

        if (content.frontmatter.title) {
          const titleEl = document.querySelector<HTMLTitleElement>("title");
          if (titleEl) {
            titleEl.innerText = String(content.frontmatter.title);
          }
        }
      });
  }, [slug]);

  return (
    <div className="flex flex-col p-4">
      <div className="flex flex-col gap-4">
        <div
          id="header"
          className="w-full rounded-2xl bg-orange-300/30 px-4 py-2 flex items-center"
        >
          <img src={yarnpng} className="size-7" alt="" />
          {/* <img src="https://shay.cat/favicon.ico" className="size-8 rounded-md ms-auto" /> */}
          <div className="ms-auto flex items-center gap-2 overflow-x-auto shrink">
            <a href={slug ? getPostSourceUrl(slug) : "#"}>
              <SiGithub className="text-2xl" />
            </a>
            {/*
              I realized this doesn't make much sense when the source url is
              right next to it, except to accommodate LLM scrapers, which I'm
              not explicitly interested in doing right now
              <a href={getPostRawUrl(slug)}>
                <SiMdx className="text-2xl"/>
              </a>
            */}
          </div>
        </div>
        <div className="2xl:max-w-2xl 2xl:mx-auto">
          <div id="content">
            <MDXProvider>
              {content ? (
                <MDXRemote
                  {...content}
                  components={{
                    h1: (props) => (
                      <h1 className="text-5xl font-black" {...props} />
                    ),
                    h2: (props) => (
                      <h2 className="text-4xl font-bold" {...props} />
                    ),
                    h3: (props) => (
                      <h3 className="text-3xl font-bold" {...props} />
                    ),
                    h4: (props) => (
                      <h4 className="text-2xl font-bold" {...props} />
                    ),
                    h5: (props) => (
                      <h5 className="text-xl font-bold" {...props} />
                    ),
                    h6: (props) => (
                      <h6 className="text-lg font-bold" {...props} />
                    ),
                    a: (props) => {
                      const className = "text-sky-600 hover:underline";
                      if (props.href.startsWith("/")) {
                        const { href, ...rest } = props;
                        return (
                          <Link className={className} to={href} {...rest} />
                        );
                      }
                      return <a className={className} {...props} />;
                    },
                  }}
                />
              ) : null}
            </MDXProvider>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
}
