import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getIngredientById } from "../../modules/ingredientManager";

export const IngredientDetails = () => {
  const { foodId } = useParams();
  const [food, setFood] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    getIngredientById(foodId).then((food) => setFood(food));
  });

  return (
    <Card sx={{ maxWidth: 345 }}>
      <CardActionArea>
        <CardMedia
          component="img"
          height="140"
          image={food.imageUrl}
          alt={food.name}
        ></CardMedia>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {food.name}
          </Typography>
          <div>Serving Size: {food.servingSize} grams</div>
          <div>Fat: {food.fat} grams</div>
          <div>Carbs: {food.carbs} grams</div>
          <div>Protein: {food.protein} grams</div>
          <div>Sodium: {food.sodium} miligrams</div>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};
