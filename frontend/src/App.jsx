import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import StatePage from "./StatePage";

import Main from "./components/Main";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div class="h-screen">
      <Router>
        <nav className="flex justify-center items-center py-5">
          <Link className="mx-10 text-black" to="/">
            Home
          </Link>
          <Link className="mx-10 text-black" to="/about">
            About
          </Link>
        </nav>
        <div className="h-[calc(100vh-4rem)] flex justify-center items-center">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/state/:stateAbbr" element={<StatePage />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
