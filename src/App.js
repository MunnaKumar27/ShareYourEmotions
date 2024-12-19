// src/App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Post from "./pages/Post";
import CreatePost from "./pages/CreatePost";  // Import CreatePost
import Navbar from "./components/Navbar";
import About from "./components/About";
import "./App.css";


function App() {
    return (
        <Router>
            <Navbar />
            <div className="container">
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/post/:id" element={<Post />} />
                    <Route path="/create" element={<CreatePost />} /> {/* Create route */}
                    <Route path="/about" element={<About />} /> {/* Add route for About */}
                </Routes>
            </div>
        </Router>
    );
}

export default App;
