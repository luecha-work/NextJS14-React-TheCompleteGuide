import { S3 } from "@aws-sdk/client-s3";
import sql from "better-sqlite3";
import slugify from "slugify";
import xss from "xss";

const s3 = new S3({
  region: process.env.AWS_REGION as string,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

const db = sql("meals.db");

export async function getMeals(): Promise<Meal[]> {
  await new Promise<Meal[]>((resolve) => setTimeout(resolve, 5000));

  return db.prepare("SELECT * FROM meals").all() as Meal[];
}

export async function getMeal(slug: string): Promise<Meal> {
  await new Promise((resolve) => setTimeout(resolve, 5000));

  return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug) as Meal;
}

export async function saveMeal(meal: ShareMealFormData) {
  const slug = slugify(meal.title, { lower: true });
  meal.instructions = xss(meal.instructions);

  const extension = meal.image.name.split(".").pop();
  const fileName = `${slug}.${extension}`;

  const bufferedImage = await meal.image.arrayBuffer();

  s3.putObject({
    Bucket: process.env.AMPLIFY_BUCKET as string,
    Key: `public/images/${fileName}`,
    Body: Buffer.from(bufferedImage),
    ContentType: meal.image.type,
  });

  meal.image = fileName;

  db.prepare(
    `
    INSERT INTO meals
      (title, summary, instructions, creator, creator_email, image, slug)
    VALUES (
      @title,
      @summary,
      @instructions,
      @creator,
      @creator_email,
      @image,
      @slug
    )
  `
  ).run({
    ...meal,
    slug: slug,
  });
}
