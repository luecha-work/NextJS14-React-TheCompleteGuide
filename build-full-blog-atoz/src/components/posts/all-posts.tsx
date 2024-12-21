import { Post } from "@/type/post";
import classes from "./all-posts.module.css";
import PostsGrid from "./posts-grid";

interface AllPostsProps {
  posts: Post[];
}

function AllPosts(props: AllPostsProps) {
  return (
    <section className={classes.posts}>
      <h1>All Posts</h1>
      <PostsGrid posts={props.posts} />
    </section>
  );
}

export default AllPosts;
