interface Posts {
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

interface PostData {
  imageUrl: string;
  title: string;
  content: string;
  userId: number;
}
