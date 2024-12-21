import AllPosts from "@/components/posts/all-posts";
import { Post } from "@/type/post";

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

function AllPostsPage() {
  return <AllPosts posts={DUMMY_POSTS} />;
}

export default AllPostsPage;
