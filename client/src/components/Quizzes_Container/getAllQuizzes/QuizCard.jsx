import React, { useState } from "react";
import "./Quizzes.css";
import { NavLink, useNavigate } from "react-router-dom";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Typography,
} from "@mui/material";
import { format } from "date-fns";
export default function QuizCard({ QuizObj, onDelete }) {
  const [anchorEl, setAnchorEl] = useState(null);
  const [open, setOpen] = useState(false);
  const openMenu = Boolean(anchorEl);
  const navigate = useNavigate();

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCloseModal = () => {
    setOpen(false);
  };

  const deleteQuiz = () => {
    axios
      .delete(`http://localhost:5500/quiz/${QuizObj.QuizId}`)
      .then((response) => {
        window.alert(response.data.msg);
        location.reload();
        handleCloseMenu();
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
        <p>Questions : {QuizObj.noOfQuestions}</p>
      </p>
      <button onClick={handleClickOpen} className="button">
        View Details
      </button>

      <NavLink to={`/writequiz/${QuizObj.QuizId}`}>
        <button className="button">Start</button>
      </NavLink>
      <Menu
        id="demo-positioned-menu"
        aria-labelledby="demo-positioned-button"
        anchorEl={anchorEl}
        open={openMenu}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <MenuItem onClick={() => navigate(`/update/${QuizObj.QuizId}`)}>
          Modify
        </MenuItem>
        <MenuItem onClick={deleteQuiz}>Delete</MenuItem>
      </Menu>

      <Dialog open={open} maxWidth="100%" onClose={handleCloseModal}>
        <DialogTitle>
          <b style={{ textDecoration: "underline" }}>Quiz Details</b>
        </DialogTitle>
        <DialogContent>
          <Typography>
            <strong>Title :</strong> {QuizObj.title}
          </Typography>
          <Typography>
            <strong>Duration :</strong> {QuizObj.duration} Min
          </Typography>
          <Typography>
            <strong>Questions :</strong> {QuizObj.noOfQuestions}
          </Typography>
          <Typography>
            <strong>Pass Key :</strong> {QuizObj.roomPass}
          </Typography>
          <Typography>
            <strong>Open Time :</strong>{" "}
            {format(new Date(QuizObj.openTime), "MMM d, EEE, h:mm a")}
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
