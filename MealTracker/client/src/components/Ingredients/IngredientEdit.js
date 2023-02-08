import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getIngredientById } from "../../modules/ingredientManager";

export const IngredientEdit = () => {
  const { foodId } = useParams();
  const [food, setFood] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    getIngredientById(foodId).then((food) => setFood(food));
  });
};
