import { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";

// import logo from ".../insightlegi_logo.jpg";

import Main from "./components/Main";
import About from "./components/About";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div class="h-screen">
      <Router>
        <nav className="flex justify-between items-center py-5">
          <div className="flex mx-10 text-black font-medium">
            <img src="./insightlegi_logo.jpg" alt="logo" />
            InsightLegi
          </div>
          <div>
            <Link className="mx-10 text-black" to="/">
              Home
            </Link>
            <Link className="mx-10 text-black" to="/about">
              About
            </Link>
          </div>
        </nav>
        <div className="h-[calc(100vh-4rem)] flex justify-center items-center">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/about" element={<About />} />
          </Routes>
        </div>
      </Router>
    </div>
  );
}

export default App;
