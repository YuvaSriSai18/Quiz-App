import React, { useEffect } from "react";
import ResponsiveAppBar from "./components/Navbar/ResponsiveAppBar";
import AllRoutes from "./AllRoutes";
import { BrowserRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "./reducers/authentication/authSlice";
import axios from "axios";

function App() {
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.userData);

  const getUser = async () => {
    try {
      const response = await axios.get(`https://quiz-app-aqqo.onrender.com/login/success`, {
        withCredentials: true,
      });
      // console.log("res", response);
      dispatch(setUserData(response.data.user));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
  }, []);

  return (
    <BrowserRouter>
      <ResponsiveAppBar />
      <AllRoutes />
    </BrowserRouter>
  );
}

export default App;
