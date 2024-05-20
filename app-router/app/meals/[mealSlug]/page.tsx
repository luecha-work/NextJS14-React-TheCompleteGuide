import { getMeal } from "@/lib/meals";
import classes from "@/styles/meal-slug.module.css";
import Image from "next/image";
import { notFound } from "next/navigation";

interface MealDetailsPageProps {
  readonly params: {
    mealSlug: string;
  };
}

export async function generateMetadata({ params }: MealDetailsPageProps) {
  const meal: Meal = await getMeal(params.mealSlug);
  return {
    title: meal.title,
    description: meal.summary,
  };
}

async function MealDetailsPage({ params }: MealDetailsPageProps) {
  const meal: Meal = await getMeal(params.mealSlug);

  if (!meal) {
    notFound();
  }

  meal.instructions = meal.instructions.replace(/\n/g, "<br />");

  return (
    <>
      <header className={classes.header}>
        <div className={classes.image}>
          <Image
            src={`https://luecha-nextjs-demo-image.s3.ap-southeast-2.amazonaws.com/public/images/${meal.image}`}
            alt={meal.title}
            fill
          />
        </div>
        <div className={classes.headerText}>
          <h1>{meal.title}</h1>
          <p className={classes.creator}>
            by <a href={`mailto:${meal.creator_email}`}>{meal.creator}</a>
          </p>
          <p className={classes.summary}>{meal.summary}</p>
        </div>
      </header>
      <main>
        <p
          className={classes.instructions}
          dangerouslySetInnerHTML={{ __html: meal.instructions }}
        ></p>
      </main>
    </>
  );
}

export default MealDetailsPage;
