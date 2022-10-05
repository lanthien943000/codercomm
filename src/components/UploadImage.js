import { Stack, styled, Typography } from "@mui/material";
import { Box } from "@mui/system";
import React from "react";
import isString from "lodash/isString";
import { useDropzone } from "react-dropzone";
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto";
import RejectionFiles from "./RejectionFiles";

const DropzoneStyle = styled("div")(({ theme }) => ({
  outline: "none",
  overflow: "hidden",
  position: "relative",
  height: 200,
  padding: theme.spacing(3, 1),
  borderRadius: theme.shape.borderRadius,
  transition: theme.transitions.create("padding"),
  backgroundColor: "#f4f6f8",
  border: `1px dashed alpha("#919EAB", 0.32)`,
  "&:hover": { opacity: 0.72, cursor: "pointer" },
}));

function UploadImage({ error = false, file, helperTexl, sx, ...other }) {
  console.log(file);
  const {
    getRootProps,
    getInputProps,
    isDragActive,
    isDragReject,
    fileRejections,
  } = useDropzone({ multiple: false, ...other });
  return (
    <Box sx={{ width: "100%", ...sx }}>
      <DropzoneStyle
        {...getRootProps()}
        sx={{
          ...(isDragActive && { opacity: 0.72 }),
          ...((isDragReject || error) && {
            color: "error.main",
            borderColor: "error.light",
            bgcolor: "error.lighter",
          }),
          ...(file && { padding: "5% 0 " }),
        }}
      >
        <input {...getInputProps()} />

        <Stack
          direction="column"
          spacing={2}
          justifyContent="center"
          alignItems="center"
          sx={{ height: "100%" }}
        >
          <AddAPhotoIcon />
          <Typography
            gutterBottom
            variant="body2"
            sx={{ color: "#637381" }}
            textAlign="center"
          >
            Drop or Select Image
          </Typography>
        </Stack>

        {file && (
          <Box
            sx={{
              top: 8,
              left: 8,
              borderRadius: 1,
              position: "absolute",
              width: `calc(100%-16px)`,
              height: `calc(100%-16px)`,
              overflow: "hidden",
              "& img": { objectFit: "cover", width: 1, height: 1 },
            }}
          >
            <img
              src={isString(file) ? file : file.preview}
              alt="file preview"
            />
          </Box>
        )}

        {fileRejections.length > 0 && (
          <RejectionFiles fileRejections={fileRejections} />
        )}
        {helperTexl && helperTexl}
      </DropzoneStyle>
    </Box>
  );
}

export default UploadImage;
