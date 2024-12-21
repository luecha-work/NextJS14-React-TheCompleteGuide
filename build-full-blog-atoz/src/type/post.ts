export interface Post {
  title: string;
  image: string;
  excerpt: string;
  date: string;
  slug: string;
}

export interface PostContent {
  title: string;
  image: string;
  date: string;
  slug: string;
  content: string;
}

export interface PostData {
  slug: string;
  title: string;
  date: string;
  content: string;
  image: string;
  excerpt: string;
  isFeatured: boolean;
  [key: string]: unknown;
}
