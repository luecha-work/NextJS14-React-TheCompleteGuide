import type { PostContent, PostData } from "@/type/post";
import ReactMarkdown from "react-markdown";
import PostHeader from "./post-header";

import classes from "./post-content.module.css";

interface PostContentProps {
  post: PostData;
}

function PostContent(props: PostContentProps) {
  const { post } = props;
  const imagePath = `/Images/posts/${post.slug}/${post.image}`;

  return (
    <article className={classes.content}>
      <PostHeader title={post.title} image={imagePath} />
      <ReactMarkdown>{post.content}</ReactMarkdown>
    </article>
  );
}

export default PostContent;
