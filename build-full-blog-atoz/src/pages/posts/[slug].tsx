import PostContent from "@/components/posts/post-detail/post-content";
import { getPostsData, getPostsFiles } from "@/lib/posts-utail";
import { PostData } from "@/type/post";
import { GetStaticPropsContext } from "next";

interface PostDetailPageProps {
  post: PostData;
}

function PostDetailPage(props: PostDetailPageProps) {
  return <PostContent post={props.post} />;
}

export function getStaticProps(context: GetStaticPropsContext) {
  const { params } = context;

  if (!params || !params.slug) {
    return {
      notFound: true,
    };
  }

  const postData = getPostsData(params.slug as string);

  return {
    props: {
      post: postData,
    },
    revalidate: 600,
  };
}

export function getStaticPaths() {
  const postFilename = getPostsFiles();

  const slugs = postFilename.map((fileName) => fileName.replace(/\.md$/, ""));

  return {
    paths: slugs.map((slug) => ({ params: { slug } })),
    fallback: false,
  };
}

export default PostDetailPage;
