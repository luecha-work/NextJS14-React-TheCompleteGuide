"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { saveMeal } from "./meals";

function isInvalidText(text: string) {
  return !text || text.trim() == "";
}

export async function shareMeal(prevState: any, event: any) {
  const mealValues = {
    creator: event.get("name") as string,
    creator_email: event.get("email") as string,
    title: event.get("title") as string,
    summary: event.get("summary") as string,
    instructions: event.get("instructions") as string,
    image: event.get("image"),
  };

  if (
    isInvalidText(mealValues.title) ||
    isInvalidText(mealValues.summary) ||
    isInvalidText(mealValues.instructions) ||
    isInvalidText(mealValues.creator) ||
    isInvalidText(mealValues.creator_email) ||
    !mealValues.creator_email.includes("@") ||
    !mealValues.image ||
    mealValues.image.size === 0
  ) {
    return {
      message: "Invalid input.",
    };
  }

  await saveMeal(mealValues);
  revalidatePath("/meals");
  redirect("/meals");
}
