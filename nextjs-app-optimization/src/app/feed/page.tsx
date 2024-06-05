import Posts from "@/components/posts";
import { getPosts } from "@/lib/posts";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Posts",
  description: "Browse all our posts",
};

export default async function FeedPage() {
  const posts = await getPosts(null);
  return (
    <>
      <h1>All posts by all users</h1>
      <Posts posts={posts} />
    </>
  );
}
