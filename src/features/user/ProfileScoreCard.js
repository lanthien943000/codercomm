import { Card, Divider, Stack, Typography } from "@mui/material";
import React from "react";
import { fNumber } from "../../utils/NumberFormat";

function ProfileScoreCard({ profile }) {
  const { friendCount, postCount } = profile;
  return (
    <Card sx={{ p: 3 }}>
      <Stack
        direction="row"
        alignItems="center"
        justifyContent="center"
        divider={<Divider orientation="vertical" flexItem />}
      >
        <Stack width={1} textAlign="center">
          <Typography variant="h4">{fNumber(friendCount)}</Typography>
          <Typography>Friends</Typography>
        </Stack>
        <Stack width={1} textAlign="center">
          <Typography variant="h4">{fNumber(postCount)}</Typography>
          <Typography>Posts</Typography>
        </Stack>
      </Stack>
    </Card>
  );
}

export default ProfileScoreCard;
