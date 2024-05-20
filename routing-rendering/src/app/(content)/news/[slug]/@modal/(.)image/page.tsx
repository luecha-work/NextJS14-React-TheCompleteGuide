import ModalBackdrop from "@/components/modal-backdrop";
import { getNewsItem } from "@/lib/news";
import { NewsItem } from "@/models/news-item";
import { notFound } from "next/navigation";

interface ImplementedImagePageProps {
  readonly params: {
    slug: string;
  };
}

async function ImplementedImagePage({ params }: ImplementedImagePageProps) {
  const newsItemSlug = params.slug;

  const newsItem: NewsItem | undefined = await getNewsItem(newsItemSlug);

  if (!newsItem) {
    notFound();
  }

  return (
    <>
      <ModalBackdrop />
      <dialog className="modal" open>
        <div id="fullscreen-image">
          <img
            style={{ width: "100%" }}
            src={`/images/news/${newsItem.image}`}
            alt={newsItem.title}
          />
        </div>
      </dialog>
    </>
  );
}

export default ImplementedImagePage;
