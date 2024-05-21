interface Post {
  id: number;
  image: string;
  title: string;
  content: string;
  createdAt: string;
  userFirstName: string;
  userLastName: string;
  likes: number;
  isLiked: boolean;
}

interface StorePost {
  title: string;
  imageUrl: string;
  content: string;
  userId: number;
}
