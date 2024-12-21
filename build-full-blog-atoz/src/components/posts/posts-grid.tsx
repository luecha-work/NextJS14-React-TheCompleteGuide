import PostsItem from "./post-item";

import classes from "./posts-grid.module.css";

function PostsGrid(props) {
  const { posts } = props;

  return (
    <ul className={classes.grid}>
      {posts.map((post) => (
        <PostsItem />
      ))}
    </ul>
  );
}

export default PostsGrid;
