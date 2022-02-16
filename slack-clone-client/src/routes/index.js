import React, { Component } from 'react';
import { BrowserRouter, Switch, Route, Routes } from 'react-router-dom';
import Home from "./Home";

export default () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" exact element={<Home />} />

    </Routes>
  </BrowserRouter>
);
