import { LoadingButton } from "@mui/lab";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getPost } from "./PostSlice";
import PostCard from "./PostCard";
import { Box, Modal, styled, Typography } from "@mui/material";
import UpdatePost from "./UpdatePost";

const BoxStyled = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  padding: theme.spacing(1),
  transform: "translate(-50%,-50%)",
  [theme.breakpoints.up("xs")]: {
    width: "100%",
  },
  [theme.breakpoints.up("sm")]: {
    width: "500px",
  },
}));

function PostList({ userId }) {
  const [page, setPage] = useState(1);

  const userID = userId._id;

  const { currentPagePosts, postsById, totalPosts, isloading } = useSelector(
    (state) => state.post
  );

  const [postUpdated, setPostUpdated] = useState(null);
  const hanldeUpdatePost = (post) => {
    setPostUpdated(post);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    if (userID) dispatch(getPost({ userID, page }));
  }, [dispatch, userID, page]);
  const posts = currentPagePosts.map((postId) => postsById[postId]);

  return (
    <div>
      {posts.map((post) => (
        <PostCard
          key={post._id}
          post={post}
          handleUpdate={() => {
            hanldeUpdatePost(post);
          }}
        />
      ))}
      <Box
        sx={{ display: "flex", justifyContent: "center", alignItems: "center" }}
      >
        {totalPosts ? (
          <LoadingButton
            variant="outlined"
            size="small"
            loading={isloading}
            onClick={() => setPage((page) => page + 1)}
            disabled={Boolean(totalPosts) && posts.length >= totalPosts}
            sx={{ mt: 1 }}
          >
            Load more
          </LoadingButton>
        ) : (
          <Typography>No Post Yet</Typography>
        )}
      </Box>
      <Modal
        open={!!postUpdated}
        onClose={() => {
          setPostUpdated(null);
        }}
      >
        <BoxStyled>
          <UpdatePost
            {...postUpdated}
            callback={() => {
              setPostUpdated(null);
            }}
          />
        </BoxStyled>
      </Modal>
    </div>
  );
}

export default PostList;
