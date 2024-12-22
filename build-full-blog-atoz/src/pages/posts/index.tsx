import AllPosts from "@/components/posts/all-posts";
import { getFeaturedPosts } from "@/lib/posts-utail";
import { PostData } from "@/type/post";
import Head from "next/head";
import { Fragment } from "react";

interface AllPostsPageProps {
  posts: PostData[];
}

function AllPostsPage({ posts }: AllPostsPageProps) {
  return (
    <Fragment>
      <Head>
        <title>All Posts</title>
        <meta
          name="description"
          content="A list of all programming-related tutorials and posts!"
        />
      </Head>
      <AllPosts posts={posts} />
    </Fragment>
  );
}

export function getStaticProps() {
  const allPosts = getFeaturedPosts();

  return {
    props: {
      posts: allPosts,
    },
  };
}

export default AllPostsPage;
