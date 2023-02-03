import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Hello from "./Hello";
import Login from "./Login";
import Register from "./Register";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route
            index
            element={isLoggedIn ? <Hello /> : <Navigate to="/login" />}
          />
          <Route></Route>

          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route />
          <Route />
          <Route />
          <Route>
            <Route />
            <Route />
          </Route>
          <Route />
        </Route>
      </Routes>
    </main>
  );
}