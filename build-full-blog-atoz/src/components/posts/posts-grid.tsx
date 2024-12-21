import PostsItem from "./post-item";
import classes from "./posts-grid.module.css";

interface Post {
  title: string;
  image: string;
  excerpt: string;
  date: string;
  slug: string;
}

interface PostsGridProps {
  posts: Post[];
}

function PostsGrid({ posts }: PostsGridProps) {
  return (
    <ul className={classes.grid}>
      {posts.map((post) => (
        <PostsItem key={post.slug} post={post} />
      ))}
    </ul>
  );
}

export default PostsGrid;
