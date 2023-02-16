import {
  Box,
  Button,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  OutlinedInput,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import "firebase/auth";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllIngredients } from "../../modules/ingredientManager";
import { getAllMealTypes } from "../../modules/mealTypeManager";
import { postNewMeal } from "../../modules/mealManager";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function CreateMeal() {
  const [mealTypes, setMealTypes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [userChoices, setUserChoices] = useState({
    Date: new Date(),
    UserProfileId: 0,
    MealTypeId: "",
    Ingredient: [],
  });
  const navigate = useNavigate();

  useEffect(() => {
    getAllIngredients().then((food) => setIngredients(food));
  }, []);

  useEffect(() => {
    getAllMealTypes().then((type) => setMealTypes(type));
  }, []);

  const handleInputChange = (event) => {
    const copy = { ...userChoices };
    copy[event.target.name] = event.target.value;
    setUserChoices(copy);
  };

  const handelDateChange = (event) => {
    const copy = { ...userChoices };
    copy["Date"] = event.format(`MM-DD-YYYY`);
    setUserChoices(copy);
  };

  const handleSaveButtonClick = (event) => {
    event.preventDefault();
    const newMeal = {
      Date: userChoices.Date,
      UserProfileId: 0,
      MealTypeId: userChoices.MealTypeId,
      ingredients: userChoices.Ingredient,
    };
    if (userChoices.MealTypeId && userChoices.Ingredient) {
      postNewMeal(newMeal)
        .catch((e) => alert(e.message))
        .then(() => navigate("/"));
    } else {
      alert("Please complete the form");
    }
  };

  return (
    <>
      <Typography variant="h2" align="center" p={5}>
        Create A New Meal
      </Typography>
      <Grid container>
        <Grid item xs={3}></Grid>
        <Grid item xs={6}>
          <Box sx={{ minWidth: 120 }}>
            <Stack spacing={2}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label="Date"
                  inputFormat="MM-DD-YYYY"
                  value={userChoices.Date}
                  onChange={handelDateChange}
                  name="Date"
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>

              <FormControl>
                <InputLabel id="select-label">Meal Types</InputLabel>
                <Select
                  labelId="select-label"
                  id="select"
                  value={userChoices.MealTypeId}
                  label="Meal Type"
                  name="MealTypeId"
                  onChange={handleInputChange}
                >
                  {mealTypes.map((type) => {
                    {
                      return (
                        <MenuItem key={type.id} value={type.id}>
                          {type.name}
                        </MenuItem>
                      );
                    }
                  })}
                </Select>
              </FormControl>

              <FormControl>
                <InputLabel id="multiple-checkbox-label">Food</InputLabel>
                <Select
                  labelId="multiple-checkbox-label"
                  id="multiple-checkbox"
                  multiple
                  value={userChoices.Ingredient}
                  onChange={handleInputChange}
                  input={<OutlinedInput label="Tag" />}
                  renderValue={(selected) =>
                    selected
                      .map(
                        (foodId) =>
                          ingredients.find((item) => item.id === foodId).name
                      )
                      .join(", ")
                  }
                  MenuProps={MenuProps}
                  name="Ingredient"
                >
                  {ingredients.map((food) => (
                    <MenuItem key={food.id} value={food.id}>
                      <Checkbox
                        checked={userChoices.Ingredient.indexOf(food.id) > -1}
                      />
                      <ListItemText primary={food.name} />
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Stack>
          </Box>
          <Button
            sx={{ marginTop: "2em" }}
            variant="contained"
            onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
            className="submit_button"
          >
            {" "}
            Create Meal{" "}
          </Button>
        </Grid>
        <Grid item xs={3}></Grid>
      </Grid>
    </>
  );
}
