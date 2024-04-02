import CreateNewVoting from "./Components/CreateNewVoting";
import Header from "./Components/Header";
import Home from "./Components/Home";
// import "./index.css";
import React from "react";
import Voting from "./Components/Voting";
import { Route, Routes } from "react-router";
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create" element={<CreateNewVoting />} />
        <Route path="/:id" element={<Voting />} />
      </Routes>
    </>
  );
}

export default App;
