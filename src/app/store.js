import { configureStore } from "@reduxjs/toolkit";
import CommentSlice from "../features/comment/CommentSlice";
import FriendSlice from "../features/friend/FriendSlice";
import PostSlice from "../features/post/PostSlice.js";
import UserSlice from "../features/user/UserSlice";

const store = configureStore({
  reducer: {
    post: PostSlice,
    comment: CommentSlice,
    friend: FriendSlice,
    user: UserSlice,
  },
});

export default store;
