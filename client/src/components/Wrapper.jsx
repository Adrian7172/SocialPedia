import { Box } from "@mui/material";
const { styled } = require("@mui/system");

const Wrapper = styled(Box)(({ theme }) => ({
  margin: "1.2rem 0",
  padding: "1rem",
  border: "1px solid",
  borderColor: theme.palette.secondary.main,
  borderRadius: "1rem",
}));

export default Wrapper;
