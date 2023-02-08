import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Hello from "./Hello";
import { AddIngredientForm } from "./Ingredients/AddIngredient";
import { IngredientDelete } from "./Ingredients/IngredientDelete";
import { IngredientDetails } from "./Ingredients/IngredientDetails";
import IngredientList from "./Ingredients/IngredientList";
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
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/food" element={<IngredientList />} />
          <Route path="/food/add" element={<AddIngredientForm />} />
          <Route path="/food/:foodId" element={<IngredientDetails />} />
          <Route path="/food/delete/:foodId" element={<IngredientDelete />} />
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
