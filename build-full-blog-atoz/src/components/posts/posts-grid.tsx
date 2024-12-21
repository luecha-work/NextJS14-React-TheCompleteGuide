import { Post } from "@/type/post";
import PostsItem from "./post-item";
import classes from "./posts-grid.module.css";

interface PostsGridProps {
  posts: Post[];
}

function PostsGrid(props: PostsGridProps) {
  const { posts } = props;

  if (!posts) {
    return null;
  }

  return (
    <ul className={classes.grid}>
      {posts.map((post) => (
        <PostsItem key={post.slug} post={post} />
      ))}
    </ul>
  );
}

export default PostsGrid;
