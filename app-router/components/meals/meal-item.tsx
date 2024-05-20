import Image from "next/image";
import Link from "next/link";

import classes from "@/styles/meal-item.module.css";

interface MealItemProps {
  readonly title: string;
  readonly slug: string;
  readonly image: string;
  readonly summary: string;
  readonly creator: string;
}

function MealItem({ title, slug, image, summary, creator }: MealItemProps) {
  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          <Image
            src={`https://luecha-nextjs-demo-image.s3.ap-southeast-2.amazonaws.com/public/images/${image}`}
            alt={title}
            fill
          />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}

export default MealItem;
