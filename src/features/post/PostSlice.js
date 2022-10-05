import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import apiService from "../../app/apiService";
import { POSTS_PER_PAGE } from "../../app/config";
import { cloudinaryUpload } from "../../utils/cloudinary";
import { getCurrentUserProfile } from "../user/UserSlice";

const initialState = {
  isloading: false,
  error: null,
  postsById: {},
  currentPagePosts: [],
};

export const createPost =
  ({ content, image }) =>
  async (dispatch) => {
    dispatch(postslice.actions.startLoading());
    try {
      const imageUrl = await cloudinaryUpload(image);
      const response = await apiService.post("/posts", {
        content,
        image: imageUrl,
      });
      dispatch(postslice.actions.createPostSuccess(response.data));
      toast.success("Request create post");
    } catch (error) {
      dispatch(postslice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const deletePost = (id) => async (dispatch) => {
  dispatch(postslice.actions.startLoading());
  try {
    await apiService.delete(`/posts/${id}`);
    dispatch(postslice.actions.deletePostSuccess(id));
    toast.success("Delete post successfully");
    dispatch(getCurrentUserProfile());
  } catch (error) {
    dispatch(postslice.actions.hasError(error.message));
    toast.error(error.message);
  }
};

export const getPost =
  ({ userID, page = 1, limit = POSTS_PER_PAGE }) =>
  async (dispatch) => {
    dispatch(postslice.actions.startLoading());
    try {
      const params = { page, limit };
      const response = await apiService.get(`/posts/user/${userID}`, {
        params,
      });
      if (page === 1) dispatch(postslice.actions.resetPost());
      dispatch(postslice.actions.getPostSuccess(response.data));
    } catch (error) {
      dispatch(postslice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const sendPostReaction =
  ({ postId, emoji }) =>
  async (dispatch) => {
    dispatch(postslice.actions.startLoading());
    try {
      const response = await apiService.post(`/reactions`, {
        targetType: "Post",
        targetId: postId,
        emoji,
      });
      dispatch(
        postslice.actions.sendPostReactionSuccess({
          postId,
          reactions: response.data,
        })
      );
    } catch (error) {
      dispatch(postslice.actions.hasError(error.message));
      toast.error(error.message);
    }
  };

export const PutPost =
  ({ content, image, _id }) =>
  async (dispatch) => {
    dispatch(postslice.actions.startLoading());
    try {
      // upload image to cloudinary
      const imageUrl = await cloudinaryUpload(image);
      const response = await apiService.put(`/posts/${_id}`, {
        content,
        image: imageUrl,
      });
      dispatch(postslice.actions.PutPostSuccess(response.data));
      toast.success("Update post successfully");
      dispatch(getCurrentUserProfile());
      return Promise.resolve(response);
    } catch (error) {
      dispatch(postslice.actions.hasError(error.message));
      toast.error(error.message);
      return Promise.reject(error);
    }
  };

const postslice = createSlice({
  name: "post",
  initialState,
  reducers: {
    startLoading(state) {
      state.isloading = true;
    },
    hasError(state, action) {
      state.isloading = false;
      state.error = action.payload;
    },
    createPostSuccess(state, action) {
      state.isloading = false;
      state.error = null;
      const newPost = action.payload;
      if (state.currentPagePosts.length % POSTS_PER_PAGE === 0)
        state.currentPagePosts.pop();
      state.postsById[newPost._id] = newPost;
      state.currentPagePosts.unshift(newPost._id);
    },
    getPostSuccess(state, action) {
      state.isloading = false;
      state.error = null;

      const { posts, count } = action.payload;
      posts.forEach((post) => {
        state.postsById[post._id] = post;
        if (!state.currentPagePosts.includes(post._id))
          state.currentPagePosts.push(post._id);
      });
      state.totalPosts = count;
    },
    resetPost(state, action) {
      state.postsById = {};
      state.currentPagePosts = [];
    },
    sendPostReactionSuccess(state, action) {
      state.isloading = false;
      state.error = null;
      const { postId, reactions } = action.payload;
      state.postsById[postId].reactions = reactions;
    },
    deletePostSuccess(state, action) {
      state.isloading = false;
      state.currentPagePosts = state.currentPagePosts.filter(
        (postId) => postId !== action.payload
      );
      state.error = null;
      delete state.postsById[action.payload];
    },
    PutPostSuccess(state, action) {
      state.isloading = false;
      state.error = null;
      const newPost = action.payload;
      state.postsById[newPost.postId] = newPost;
    },
  },
});

export default postslice.reducer;
