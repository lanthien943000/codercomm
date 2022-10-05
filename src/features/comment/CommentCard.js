import React, { useState } from "react";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { fDate } from "../../utils/FormatTime";
import CommentReaction from "./CommentReaction";
import { useDispatch } from "react-redux";
import { deleteComment } from "./CommentSlice";
import useAuth from "../../hooks/useAuth";
import DeleteIcon from "@mui/icons-material/DeleteOutline";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";

function CommentCard({ comment }) {
  const dispatch = useDispatch();

  const handleDelete = async (id) => {
    try {
      dispatch(deleteComment({ id, postId: comment.post }));
    } catch (error) {
      throw error;
    }
  };

  const [openDialog, setOpenDialog] = useState(false);
  const { user } = useAuth();
  const userId = user?._id;

  return (
    <Stack direction="row" spacing={2}>
      <Avatar alt={comment.author?.name} src={comment.author?.avatarUrl} />
      <Paper sx={{ p: 1.5, flexGrow: 1, bgcolor: "background.neutral" }}>
        <Stack
          direction="row"
          alignItems={{ sm: "center" }}
          justifyContent="space-between"
          sx={{ mb: 0.5 }}
        >
          <Typography variant="subtitle2" sx={{ fontWeight: 600 }}>
            {comment.author?.name}
          </Typography>
          <Typography variant="caption" sx={{ color: "text.disabled" }}>
            {fDate(comment.createdAt)}
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          {comment.content}
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <CommentReaction comment={comment} />
        </Box>
        {userId === comment.author._id && (
          <IconButton
            onClick={() => {
              setOpenDialog(true);
            }}
            sx={{ color: "primary.main" }}
          >
            <DeleteIcon sx={{ fontSize: 20 }} />
          </IconButton>
        )}
        <Dialog
          open={openDialog}
          onClose={() => {
            setOpenDialog(false);
          }}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Delete Comment</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Do you want delete this comment?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => {
                setOpenDialog(false);
              }}
            >
              Cancel
            </Button>
            <Button
              onClick={() => {
                setOpenDialog(false);
                handleDelete(comment._id);
              }}
              autoFocus
            >
              Ok
            </Button>
          </DialogActions>
        </Dialog>
      </Paper>
    </Stack>
  );
}

export default CommentCard;
