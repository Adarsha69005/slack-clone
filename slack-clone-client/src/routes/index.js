import React from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Team from './CreateTeam';
import ViewTeam from './ViewTeam';
// import { AuthProvider } from '../Hooks/useAuth';
import {useAuth}  from "../Hooks/useAuth";

const RequireAuth = ({ redirectPath = "/login", children }) => {

  const authed = useAuth();
  console.log('at requireauth', authed);
  if (!authed) {
    return <Navigate to={redirectPath} replace />;
  }
  return children;
}

export default () => (
  <BrowserRouter>

    <Routes>
      <Route path="/" exact element={<Home />} />
      <Route path="/register" exact element={<Register />} />
      <Route path="/login" exact element={<Login />} />
      <Route path="/view-team/:teamId" exact element={<ViewTeam />} />
      {/* <Route path="/view-team/:teamId?/:channelId?" exact element={<ViewTeam />} /> */}
      <Route path="/create-team" exact element={<RequireAuth><Team /></RequireAuth>} />

    </Routes>
  </BrowserRouter>
);
