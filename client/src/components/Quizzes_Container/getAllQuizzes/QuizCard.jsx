import React, { useState } from "react";
import "./Quizzes.css";
import { NavLink } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

export default function QuizCard({ QuizObj }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteQuiz = () => {
    axios
      .delete(`http://localhost:5500/quiz/${QuizObj.QuizId}`)
      .then((response) => {
        // Assuming your server sends a message as { msg: "Quiz removed" }
        window.alert(response.data.msg);
        window.location.reload();
        // Optionally, you might want to refresh the list or perform other actions
      })
      .catch((err) => {
        // console.error(`Error occurred in deleting a Quiz: ${err}`);
        window.alert(`Error occurred in deleting a Quiz: ${err.message}`);
      });
  };

  return (
    <div
      className="outer_card"
      style={{
        width: {
          xs: "100%",
          md: "200px",
        },
        height: "250px",
        border: "2px solid #bbbbbb",
        borderRadius: "12px",
        padding: "8px",
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        position: "relative", // Ensure proper positioning for the menu
      }}
    >
      <p className="inner_card">
        <MoreVertIcon
          sx={{
            float: "right",
            paddingTop: "8px",
            paddingRight: "5px",
            cursor: "pointer",
          }}
          onClick={handleClick}
        />
      </p>
      <h6 className="heading_1">{QuizObj.title}</h6>
      <p className="para_1">
        <p>Time : {QuizObj.duration} Min</p>
        <p>Questions : {QuizObj.noOfQuestions} </p>
      </p>
      <NavLink to={`/writequiz/${QuizObj.QuizId}`}>
        <button className="button">Start</button>
      </NavLink>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={open}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={handleClose}>Modify</MenuItem>
        <MenuItem onClick={deleteQuiz}>Delete</MenuItem>
      </Menu>
    </div>
  );
}
