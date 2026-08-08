import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Team from "./pages/Team";

import Compare from "./pages/Compare";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />

        <Route
          path="/team/:teamName"
          element={<Team />} />

         <Route 
          path="/compare"
          element={<Compare />}
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;