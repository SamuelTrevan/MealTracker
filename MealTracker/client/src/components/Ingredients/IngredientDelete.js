import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  DeleteIngredient,
  getIngredientById,
} from "../../modules/ingredientManager";

export const IngredientDelete = () => {
  const { foodId } = useParams();
  const [food, setFood] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    getIngredientById(foodId).then((food) => setFood(food));
  }, []);

  const handleSaveButtonClick = (event) => {
    event.preventDefault();
    DeleteIngredient(foodId)
      .catch((e) => alert(e.message))
      .then(() => navigate("/food"));
  };

  return (
    <>
      <h1>Are you sure you want to delete {food.name}</h1>
      <Card sx={{ maxWidth: 345 }}>
        <CardActionArea>
          <CardMedia
            component="img"
            height="275"
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
      <Button
        variant="contained"
        onClick={(event) => handleSaveButtonClick(event)}
      >
        Delete
      </Button>
      <Button variant="contained" onClick={() => navigate(`/food`)}>
        Back
      </Button>
    </>
  );
};
