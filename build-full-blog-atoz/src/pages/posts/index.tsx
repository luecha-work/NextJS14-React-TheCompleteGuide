import AllPosts from "@/components/posts/all-posts";
import { getFeaturedPosts } from "@/lib/posts-utail";
import { PostData } from "@/type/post";

interface AllPostsPageProps {
  posts: PostData[];
}

function AllPostsPage({ posts }: AllPostsPageProps) {
  return <AllPosts posts={posts} />;
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
