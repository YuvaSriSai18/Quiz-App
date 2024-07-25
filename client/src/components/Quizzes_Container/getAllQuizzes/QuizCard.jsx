import React, { useState } from "react";
import "./Quizzes.css";
import { NavLink, useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";

export default function QuizCard({ QuizObj, onDelete }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

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
        window.alert(response.data.msg);
        location.reload()
        handleClose();
        if (onDelete) {
          onDelete(QuizObj.QuizId);
        }
      })
      .catch((err) => {
        window.alert(`Error occurred in deleting a Quiz: ${err.message}`);
      });
  };

  return (
    <div
      className="outer_card"
      style={{
        width: "100%",
        maxWidth: "200px",
        height: "250px",
        border: "2px solid #bbbbbb",
        borderRadius: "12px",
        padding: "8px",
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        position: "relative",
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
        <p>Questions : {QuizObj.noOfQuestions}</p>
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
        <MenuItem onClick={() => navigate(`/update/${QuizObj.QuizId}`)}>Modify</MenuItem>
        <MenuItem onClick={deleteQuiz}>Delete</MenuItem>
      </Menu>
    </div>
  );
}
