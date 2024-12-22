import type { PostContent, PostData } from "@/type/post";
import Image from "next/image";
import PostHeader from "./post-header";

import ReactMarkdown from "react-markdown";
import { PrismLight as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  default as css,
  default as js,
} from "react-syntax-highlighter/dist/cjs/languages/prism/javascript";
import atomDark from "react-syntax-highlighter/dist/cjs/styles/prism/atom-dark";

import classes from "./post-content.module.css";

SyntaxHighlighter.registerLanguage("js", js);
SyntaxHighlighter.registerLanguage("css", css);

interface PostContentProps {
  post: PostData;
}

function PostContent(props: PostContentProps) {
  const { post } = props;
  const imagePath = `/Images/posts/${post.slug}/${post.image}`;

  const customRenderers = {
    img: ({ alt, src }: { alt?: string; src?: string }) => {
      return (
        <div className={classes.image}>
          <Image
            src={`/Images/posts/${post.slug}/${src}`}
            alt={alt || ""}
            width={600}
            height={300}
          />
        </div>
      );
    },
    // paragraph(paragraph: {
    //   node: { children: { type: string; url: string; alt: string }[] };
    //   children: React.ReactNode;
    // }) {
    //   const { node } = paragraph;
    //   console.log(`image.url: ${node.children[0].url}`);

    //   if (node.children[0].type === "image") {
    //     const image = node.children[0];
    //     return (
    //       <div className={classes.image}>
    //         <Image
    //           src={`/Images/posts/${post.slug}/${image.url}`}
    //           alt={image.alt || ""}
    //           width={600}
    //           height={300}
    //         />
    //       </div>
    //     );
    //   }

    //   return <p>{paragraph.children}</p>;
    // },
    code(code: { className?: string; children?: React.ReactNode }) {
      const language = code.className?.replace("language-", "") || "text";
      const codeContent = String(code.children);

      return (
        <SyntaxHighlighter style={atomDark} language={language} showLineNumbers>
          {codeContent}
        </SyntaxHighlighter>
      );
    },
  };

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown components={customRenderers}>{post.content}</ReactMarkdown>
    </article>
  );
}

export default PostContent;
