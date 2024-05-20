import { getNewsItem } from "@/lib/news";
import { NewsItem } from "@/models/news-item";
import { notFound } from "next/navigation";

interface ImagePageProps {
  readonly params: {
    slug: string;
  };
}

async function ImagePage({ params }: ImagePageProps) {
  const newsItemSlug = params.slug;

  const newsItem: NewsItem | undefined = await getNewsItem(newsItemSlug);

  if (!newsItem) {
    notFound();
  }

  return (
    <div id="fullscreen-image">
      <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
    </div>
  );
}

export default ImagePage;
