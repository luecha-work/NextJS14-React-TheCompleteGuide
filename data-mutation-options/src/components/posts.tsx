"use client";

import { togglePostLikeStatus } from "@/actions/posts";
import { formatDate } from "@/lib/format";
import { useOptimistic } from "react";
import LikeButton from "./like-icon";

interface PostProps {
  readonly post: Post;
  readonly action: (postId: number) => void;
}

function Post({ post, action }: PostProps) {
  return (
    <article className="post">
      <div className="post-image">
        <img src={post.image} alt={post.title} />
      </div>
      <div className="post-content">
        <header>
          <div>
            <h2>{post.title}</h2>
            <p>
              Shared by {post.userFirstName} on{" "}
              <time dateTime={post.createdAt}>
                {formatDate(post.createdAt)}
              </time>
            </p>
          </div>
          <div>
            <form
              action={action.bind(null, post.id)}
              className={post.isLiked ? "liked" : ""}
            >
              <LikeButton />
            </form>
          </div>
        </header>
        <p>{post.content}</p>
      </div>
    </article>
  );
}

interface PostsProps {
  readonly posts: Post[];
}

export default function Posts({ posts }: PostsProps) {
  const [optimisticPost, updateOptimisticPost] = useOptimistic(
    posts,
    (prevPosts: Post[], updatedPostId: number) => {
      const updatedPostIndatx = prevPosts.findIndex(
        (post) => post.id === updatedPostId
      );

      if (updatedPostIndatx === -1) {
        return prevPosts;
      }

      const updatedPost = { ...prevPosts[updatedPostIndatx] };

      updatedPost.likes = updatedPost.likes + (updatedPost.isLiked ? -1 : 1);
      updatedPost.isLiked = !updatedPost.isLiked;
      const newPosts = [...prevPosts];
      newPosts[updatedPostIndatx] = updatedPost;

      return newPosts;
    }
  );

  const updatePosts = async (postId: number) => {
    updateOptimisticPost(postId);
    await togglePostLikeStatus(postId);
  };

  if (!optimisticPost || optimisticPost.length === 0) {
    return <p>There are no posts yet. Maybe start sharing some?</p>;
  }

  return (
    <ul className="posts">
      {optimisticPost.map((post) => (
        <li key={post.id}>
          <Post post={post} action={updatePosts} />
        </li>
      ))}
    </ul>
  );
}
