import { PostData } from "@/type/post";
import fs from "fs";
import matter from "gray-matter";
import path from "path";

const postsDirectory = path.join(process.cwd(), "src/posts");

function getPostsFiles() {
  return fs.readdirSync(postsDirectory).filter((file) => file.endsWith(".md"));
}

function getPostsData(postIdentifier: string): PostData {
  const postSlug = postIdentifier.replace(/\.md$/, "");
  const filePath = path.join(postsDirectory, `${postSlug}.md`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }

  const fileContent = fs.readFileSync(filePath, "utf-8");
  const { data, content } = matter(fileContent);

  const postData: PostData = {
    slug: postSlug,
    title: data.title as string,
    date: data.date as string,
    image: data.image as string,
    excerpt: data.excerpt as string,
    isFeatured: data.isFeatured as boolean,
    content,
  };

  return postData;
}

function getAllPosts(): PostData[] {
  const postFiles = getPostsFiles();

  const allPosts = postFiles.map((postFile) => {
    return getPostsData(postFile);
  });

  const sortedPosts = allPosts.sort((postA, postB) =>
    postA.date > postB.date ? -1 : 1
  );

  return sortedPosts;
}

function getFeaturedPosts(): PostData[] {
  const allPosts = getAllPosts();

  const featuredPosts = allPosts.filter((post) => post.isFeatured);

  return featuredPosts;
}

export { getAllPosts, getFeaturedPosts, getPostsData, getPostsFiles };
