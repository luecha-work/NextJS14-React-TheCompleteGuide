import fs from "fs";
import matter from "gray-matter";
import path from "path";

const postsDirectory = path.join(process.cwd(), "src/posts");

interface PostData {
  slug: string;
  title: string;
  date: string;
  content: string;
  image: string;
  excerpt: string;
  isFeatured: boolean;
  [key: string]: unknown;
}

function getPostsFiles(fileName: string): PostData {
  const filePath = path.join(postsDirectory, fileName);

  const fileContent = fs.readFileSync(filePath, "utf-8");

  const { data, content } = matter(fileContent);

  const postSlug = fileName.replace(/\.md$/, "");

  const postData: PostData = {
    slug: postSlug,
    title: data.title as string,
    date: data.date as string,
    image: data.image as string,
    excerpt: data.excerpt as string,
    isFeatured: data.isFeatured as boolean,
    content,
    ...data,
  };

  return postData;
}

function getAllPosts(): PostData[] {
  const postFiles = fs.readdirSync(postsDirectory);

  const allPosts = postFiles.map((postFile) => {
    return getPostsFiles(postFile);
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

export { getAllPosts, getFeaturedPosts, getPostsFiles };
