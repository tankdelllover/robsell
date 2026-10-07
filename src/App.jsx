import { BrowserRouter, Routes, Route } from "react-router-dom";

import { YearProvider } from "./context/YearContext";

import Home from "./pages/Home";
import Team from "./pages/Team";
import Compare from "./pages/Compare";

function App() {

    return (

        <YearProvider>

            <BrowserRouter>

                <Routes>

                    <Route path="/" element={<Home />} />

                    <Route
                        path="/team/:teamName"
                        element={<Team />}
                    />

                    <Route
                        path="/compare"
                        element={<Compare />}
                    />

                </Routes>

            </BrowserRouter>

        </YearProvider>

    );

}

export default App;