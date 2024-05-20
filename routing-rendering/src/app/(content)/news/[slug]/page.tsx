import { getNewsItem } from "@/lib/news";
import { NewsItem } from "@/models/news-item";
import Link from "next/link";
import { notFound } from "next/navigation";

interface NewsDetailPageParams {
  readonly params: {
    slug: string;
  };
}

async function NewsDetailPage({ params }: NewsDetailPageParams) {
  const newSlug: string = params.slug;
  const newsItem: NewsItem | undefined = await getNewsItem(newSlug);

  if (!newsItem) {
    notFound();
  }

  return (
    <article className="news-article">
      <header>
        <Link href={`/news/${newsItem.slug}/image`}>
          <img src={`/images/news/${newsItem.image}`} alt={newsItem.title} />
        </Link>
        <h1>{newsItem.title}</h1>
        <time dateTime={newsItem.date}>{newsItem.date}</time>
      </header>
      <p>{newsItem.content}</p>
    </article>
  );
}

export default NewsDetailPage;
