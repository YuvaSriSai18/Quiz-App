import React, { useEffect } from "react";
import ResponsiveAppBar from "./components/Navbar/ResponsiveAppBar";
import AllRoutes from "./AllRoutes";
import { BrowserRouter } from "react-router-dom";

function App() {
  return (
    <BrowserRouter>
      <ResponsiveAppBar />
      <AllRoutes />
    </BrowserRouter>
  );
}

export default App;
