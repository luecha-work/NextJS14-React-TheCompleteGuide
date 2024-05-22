import PostForm from "@/components/post-form";
import { storePost } from "@/lib/posts";
import { redirect } from "next/navigation";

export default function NewPostPage() {
  async function createPost(
    prevState: { errors: string[] },
    formData: FormData
  ): Promise<{ errors: string[] }> {
    "use server";
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

    storePost({
      imageUrl: "", // Process and store image as needed
      title,
      content,
      userId: 1,
    });

    redirect("/feed");
    return { errors: [] };
  }

  return <PostForm action={createPost} />;
}
