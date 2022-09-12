import { Routes, Route } from "react-router-dom";
import Home from "./common/home/Home";
import Cards from "./components/cards/Cards";

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
