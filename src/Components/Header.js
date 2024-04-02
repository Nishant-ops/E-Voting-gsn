import React from "react";
import { Box, Typography, Button } from "@mui/material";
import "./Header.css";
import { Link } from "react-router-dom";
function Header({ connectToWeb3 }) {
  return (
    <Box className="header_wrapper">
      <Link to="/">
        <Typography className="header_title">E-Voting</Typography>
      </Link>
      <Box>
        <Button
          onClick={connectToWeb3}
          variant="contained"
          style={{
            backgroundColor: "purple",
            color: "aqua",
            marginRight: "20px",
          }}
        >
          connect
        </Button>
        <Link to="/create">
          <Button
            varaint="contained"
            className="create_a_voting"
            style={{ backgroundColor: "purple", color: "aqua" }}
          >
            Create a Voting
          </Button>
        </Link>
      </Box>
    </Box>
  );
}

export default Header;
