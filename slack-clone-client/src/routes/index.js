import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Team from './CreateTeam';

export default () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/register" exact element={<Register />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/create-team" exact element={<Team />} />

    </Routes>
  </BrowserRouter>
);
