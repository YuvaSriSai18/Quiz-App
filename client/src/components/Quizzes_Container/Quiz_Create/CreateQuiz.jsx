import { Box, Paper, Tooltip } from "@mui/material";
import React from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import { NavLink } from "react-router-dom";
export default function CreateQuiz() {
  return (
    <NavLink to={"/create"}>
      <Tooltip title="Create Quiz" arrow placement="right-start">
        <Box
          bgcolor={"#eeeeee"}
          display={"flex"}
          flexDirection={"column"}
          justifyContent={"center"}
          width={190}
          mt={2}
          height={230}
          borderRadius={2}
        >
          <AddRoundedIcon sx={{ alignSelf: "center", fontSize: "50px" }} />
        </Box>
      </Tooltip>
    </NavLink>
  );
}
