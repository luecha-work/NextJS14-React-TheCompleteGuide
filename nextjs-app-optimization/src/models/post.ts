interface Post {
  id: number;
  image_url: string;
  title: string;
  content: string;
  created_at: string;
  user_id: number;
}

interface PostData {
  imageUrl: string;
  title: string;
  content: string;
  userId: number;
}
