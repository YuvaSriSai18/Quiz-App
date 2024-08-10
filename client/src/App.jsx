import React, { useEffect } from "react";
import ResponsiveAppBar from "./components/Navbar/ResponsiveAppBar";
import AllRoutes from "./AllRoutes";
import { BrowserRouter, useLocation } from "react-router-dom";

function AppContent() {
  const location = useLocation();

  // List of routes where the NavBar should not be displayed
  const noNavBarRoutes = [
    "/writequiz",
    "/create",
    "/update",
    "/wr",
    "/quizinstructions",
  ];

  // Check if the current route matches any of the noNavBarRoutes
  const showNavBar = !noNavBarRoutes.some((route) =>
    location.pathname.includes(route)
  );

  return (
    <>
      {showNavBar && <ResponsiveAppBar />}
      <AllRoutes />
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <AppContent />
    </BrowserRouter>
  );
}

export default App;
