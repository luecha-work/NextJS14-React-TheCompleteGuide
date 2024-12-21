import { Post } from "@/type/post";
import PostsGrid from "../posts/posts-grid";
import classes from "./featured-posts.module.css";

interface FeaturedPostsProps {
  posts: Post[];
}

function FeaturedPosts(props: FeaturedPostsProps) {
  return (
    <section className={classes.latest}>
      <h2>Featured Posts</h2>
      <PostsGrid posts={props.posts} />
    </section>
  );
}

export default FeaturedPosts;
