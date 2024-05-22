"use server";

import { uploadImage } from "@/lib/cloudinary";
import { storePost, updatePostLikeStatus } from "@/lib/posts";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createPost(
  prevState: { errors: string[] },
  formData: FormData
): Promise<{ errors: string[] }> {
  const title = formData.get("title") as string;
  const image = formData.get("image") as File;
  const content = formData.get("content") as string;

  let errors: string[] = [];

  if (!title || title.trim().length === 0) {
    errors.push("Title is required");
  }

  if (!content || content.trim().length === 0) {
    errors.push("Content is required");
  }

  if (!image || !(image instanceof File) || image.size === 0) {
    errors.push("Image is required");
  }

  if (errors.length > 0) {
    return { errors };
  }

  let imageUrl;
  try {
    imageUrl = await uploadImage(image);
  } catch (error) {
    throw new Error(
      "Image upload failed, post was not created. Please try again later."
    );
  }

  await storePost({
    imageUrl,
    title,
    content,
    userId: 1,
  });

  redirect("/feed");
}

export async function togglePostLikeStatus(postId: number) {
  await updatePostLikeStatus(postId, 2);

  revalidatePath("/", "layout");
}
