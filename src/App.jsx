import { Routes, Route } from "react-router-dom";
import React from "react";

import Home from "./common/home/Home";

function App() {
  return (
   <>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
   </>
   
  );
}

export default App;
