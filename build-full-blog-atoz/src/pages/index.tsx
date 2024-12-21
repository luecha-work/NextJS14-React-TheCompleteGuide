import FeaturedPosts from "@/components/home-page/featured-posts";
import Hero from "@/components/home-page/hero";
import { Post } from "@/type/post";
import { Fragment } from "react";

const DUMMY_POSTS: Post[] = [
  {
    title: "First Post",
    image: "getting-started-nextjs.png",
    excerpt: "This is the first post.",
    date: "2023-01-01",
    slug: "getting-started-with-nextjs1",
  },
  {
    title: "Second Post",
    image: "nextjs-file-based-routing.png",
    excerpt: "This is the second post.",
    date: "2023-02-01",
    slug: "getting-started-with-nextjs2",
  },
];

export default function HomePage() {
  return (
    <Fragment>
      <Hero />
      <FeaturedPosts posts={DUMMY_POSTS} />
    </Fragment>
  );
}
