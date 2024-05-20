import NewsList from "@/components/news-list";
import { getLatestNews } from "@/lib/news";

async function LatestNewsPage() {
  const latestNews = await getLatestNews();

  return (
    <>
      <h1>Latest News</h1>
      <NewsList news={latestNews} />
    </>
  );
}

export default LatestNewsPage;
