import FeaturedPosts from "@/components/home-page/featured-posts";
import Hero from "@/components/home-page/hero";
import { getFeaturedPosts } from "@/lib/posts-utail";
import { PostData } from "@/type/post";
import Head from "next/head";
import { Fragment } from "react";

interface HomePageProps {
  posts: PostData[];
}

export default function HomePage(props: HomePageProps) {
  return (
    <Fragment>
      <Head>
        <title>Max&apos; Blog</title>
        <meta
          name="description"
          content="I post about programming and web development."
        />
      </Head>
      <Hero />
      <FeaturedPosts posts={props.posts} />
    </Fragment>
  );
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: {
      posts: featuredPosts,
    },
  };
}
