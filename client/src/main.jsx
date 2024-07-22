import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";

import { store } from "./reducers/store.js";
import { Provider } from "react-redux";

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
  <Provider store={store}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </Provider>
);
