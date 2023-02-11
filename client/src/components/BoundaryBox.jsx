
const { Box } = require("@mui/material");
const { styled } = require("@mui/system");


const BoundaryBox = styled(Box)({
    maxWidth: "1280px",
    width: "100%",
    height: "100%",
    // background: "red",
    margin: "0 auto",
    padding: "0 1rem"

})
export default BoundaryBox;