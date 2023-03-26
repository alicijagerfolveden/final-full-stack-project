import { Box } from "@mui/material";
import Typography from "@mui/material/Typography";

export const Footer = () => {
  return (
    <Box component="footer" sx={{ paddingTop: 5 }}>
      <Typography component="p">
        Copyright © Register to events. All rights reserved.
      </Typography>
    </Box>
  );
};
