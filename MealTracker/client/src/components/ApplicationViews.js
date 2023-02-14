import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Hello from "./Hello";
import { AddIngredientForm } from "./Ingredients/AddIngredient";
import { IngredientDelete } from "./Ingredients/IngredientDelete";
import { IngredientDetails } from "./Ingredients/IngredientDetails";
import { IngredientEditForm } from "./Ingredients/IngredientEditForm";
import IngredientList from "./Ingredients/IngredientList";
import Login from "./Login";
import CreateMeal from "./Meals/CreateMeal";
import EditMealForm from "./Meals/MealEditForm";
import { GetAllMealsByUserId } from "./Meals/MealList";
import Register from "./Register";

export default function ApplicationViews({ isLoggedIn }) {
  return (
    <main>
      <Routes>
        <Route path="/">
          <Route
            index
            element={
              isLoggedIn ? <GetAllMealsByUserId /> : <Navigate to="/login" />
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/food" element={<IngredientList />} />
          <Route path="/food/add" element={<AddIngredientForm />} />
          <Route path="/food/:foodId" element={<IngredientDetails />} />
          <Route path="/food/delete/:foodId" element={<IngredientDelete />} />
          <Route path="/food/edit/:foodId" element={<IngredientEditForm />} />
          <Route path="/createmeal" element={<CreateMeal />} />
          <Route path="/meal/edit/:mealId" element={<EditMealForm />} />
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
