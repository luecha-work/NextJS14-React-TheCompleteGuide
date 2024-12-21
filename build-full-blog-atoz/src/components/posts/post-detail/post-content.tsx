import type { PostContent } from "@/type/post";
import ReactMarkdown from "react-markdown";
import PostHeader from "./post-header";

import classes from "./post-content.module.css";

const DUMMY_POSTS: PostContent = {
  title: "First Post",
  image: "getting-started-nextjs.png",
  date: "2023-01-01",
  slug: "getting-started-with-nextjs1",
  content: "# This is a first post",
};

function PostContent() {
  const imagePath = `/Images/posts/${DUMMY_POSTS.slug}/${DUMMY_POSTS.image}`;

  return (
    <article className={classes.content}>
      <PostHeader title={DUMMY_POSTS.title} image={imagePath} />
      <ReactMarkdown>{DUMMY_POSTS.content}</ReactMarkdown>
    </article>
  );
}

export default PostContent;
