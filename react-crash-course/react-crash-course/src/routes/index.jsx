// router.js
import React from "react";
import { createBrowserRouter } from "react-router-dom";
import NewPost, { action as newPostAction } from "../components/NewPost";
import PostDetails, {
  loader as postDetailLoader,
} from "../components/PostDetails";
import Posts, { loader as postsLoader } from "../components/Posts";
import RootLayout from "../components/RootLayout";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      {
        path: "/",
        element: <Posts />,
        loader: postsLoader,
        children: [
          {
            path: "/create-post",
            element: <NewPost />,
            action: newPostAction,
          },
          {
            path: "/:postId",
            element: <PostDetails />,
            loader: postDetailLoader,
          },
        ],
      },
    ],
  },
]);
