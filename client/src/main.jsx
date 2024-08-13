import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { store } from "./reducers/store.js";
import { Provider } from "react-redux";
import { GoogleOAuthProvider } from "@react-oauth/google";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import "@fontsource/poppins";

const theme = createTheme({
  typography: {
    fontFamily: [
      "Poppins", // Replace with your custom font family
      "Arial", // Backup font
      "sans-serif", // Fallback
    ].join(","),
  },
  palette: {
    primary: {
      main: "#1679AB", // Replace with your primary color
    },
    secondary: {
      main: "#dc004e", // Replace with your secondary color
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")).render(
  <GoogleOAuthProvider clientId="887297308007-rp2nb962fon9p83ld78k6p69im75e0da.apps.googleusercontent.com">
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <App />
      </ThemeProvider>
    </Provider>
  </GoogleOAuthProvider>
);
