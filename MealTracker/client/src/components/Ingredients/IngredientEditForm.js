import { Box, Button, FormControl, Grid, TextField } from "@mui/material";
import { useEffect, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import {
  EditIngredient,
  getIngredientById,
} from "../../modules/ingredientManager";

export const IngredientEditForm = () => {
  const { foodId } = useParams();
  const [food, setFood] = useState({});

  const [userChoices, setUserChoices] = useState({
    name: "",
    imageUrl: "",
    servingSize: 0,
    fat: 0,
    protein: 0,
    carbs: 0,
    sodium: 0,
    id: 0,
  });

  const navigate = useNavigate();

  useEffect(() => {
    getIngredientById(foodId).then((food) => setUserChoices(food));
  }, []);

  const handleSaveButtonClick = (event) => {
    event.preventDefault();
    const newFood = {
      name: userChoices.name,
      imageUrl: userChoices.imageUrl,
      servingSize: userChoices.servingSize,
      fat: userChoices.fat,
      protein: userChoices.protein,
      carbs: userChoices.carbs,
      sodium: userChoices.sodium,
      id: foodId,
    };
    if (
      userChoices.name &&
      userChoices.imageUrl &&
      userChoices.servingSize &&
      userChoices.fat &&
      userChoices.protein &&
      userChoices.carbs &&
      userChoices.sodium
    ) {
      EditIngredient(newFood)
        .catch((e) => alert(e.message))
        .then(() => navigate("/food"));
    } else {
      alert("Please complete the form");
    }
  };

  return (
    <>
      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <FormControl>
            <Box
              component="form"
              sx={{
                "& .MuiTextField-root": { m: 1, width: "25ch" },
              }}
              noValidate
              autoComplete="off"
            >
              <div>
                <TextField
                  required={true}
                  id="outlined-required"
                  label="Food Name"
                  value={userChoices.name}
                  onChange={(evt) => {
                    const copy = { ...userChoices };
                    copy.name = evt.target.value;
                    setUserChoices(copy);
                  }}
                />
              </div>
              <div>
                <TextField
                  required={true}
                  id="outlined-required"
                  label="Image Url"
                  value={userChoices.imageUrl}
                  onChange={(evt) => {
                    const copy = { ...userChoices };
                    copy.imageUrl = evt.target.value;
                    setUserChoices(copy);
                  }}
                />
              </div>
              <img
                src={userChoices.imageUrl}
                alt={userChoices.name}
                height="100"
              ></img>
              <div>
                <TextField
                  required={true}
                  id="outlined-required"
                  label="Serving Size (in grams)"
                  value={userChoices.servingSize}
                  onChange={(evt) => {
                    const copy = { ...userChoices };
                    copy.servingSize = evt.target.value;
                    setUserChoices(copy);
                  }}
                />
              </div>
              <div>
                <TextField
                  required={true}
                  id="outlined-required"
                  label="Fat (in grams)"
                  value={userChoices.fat}
                  onChange={(evt) => {
                    const copy = { ...userChoices };
                    copy.fat = evt.target.value;
                    setUserChoices(copy);
                  }}
                />
              </div>
              <div>
                <TextField
                  required={true}
                  id="outlined-required"
                  label="Protein (in grams)"
                  value={userChoices.protein}
                  onChange={(evt) => {
                    const copy = { ...userChoices };
                    copy.protein = evt.target.value;
                    setUserChoices(copy);
                  }}
                />
              </div>
              <div>
                <TextField
                  required={true}
                  id="outlined-required"
                  label="Carbs (in grams)"
                  value={userChoices.carbs}
                  onChange={(evt) => {
                    const copy = { ...userChoices };
                    copy.carbs = evt.target.value;
                    setUserChoices(copy);
                  }}
                />
              </div>
              <div>
                <TextField
                  required={true}
                  id="outlined-required"
                  label="Sodium (in miligrams)"
                  value={userChoices.sodium}
                  onChange={(evt) => {
                    const copy = { ...userChoices };
                    copy.sodium = evt.target.value;
                    setUserChoices(copy);
                  }}
                />
              </div>
              <Button
                style={{ marginTop: "2em" }}
                variant="contained"
                onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
                className="btn btn-primary"
              >
                Save Food
              </Button>
            </Box>
          </FormControl>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </>
  );
};
