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
} from "@mui/material";
import Stack from "@mui/material/Stack";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";

import "firebase/auth";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getAllIngredients } from "../../modules/ingredientManager";
import { getAllMealTypes } from "../../modules/mealTypeManager";
import { GetMealById, UpdateMeal } from "../../modules/mealManager";
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

export default function EditMealForm() {
  const { mealId } = useParams();

  const [mealTypes, setMealTypes] = useState([]);
  const [ingredients, setIngredients] = useState([]);
  const [userChoices, setUserChoices] = useState({});

  const navigate = useNavigate();

  useEffect(() => {
    GetMealById(mealId).then((meal) => setUserChoices(meal));
  }, []);

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
    copy["date"] = event.toDate();
    setUserChoices(copy);
  };

  const handleSaveButtonClick = (event) => {
    event.preventDefault();
    const newMeal = {
      Id: userChoices.id,
      Date: userChoices.date,
      UserProfileId: 0,
      MealTypeId: userChoices.mealTypeId,
      ingredients: userChoices.ingredients,
    };
    UpdateMeal(newMeal)
      .catch((e) => alert(e.message))
      .then(() => navigate("/"));
  };

  return mealTypes.length &&
    ingredients.length &&
    Object.keys(userChoices).length ? (
    <>
      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <Box sx={{ minWidth: 120 }}>
            <Stack spacing={2}>
              <LocalizationProvider dateAdapter={AdapterMoment}>
                <DesktopDatePicker
                  label="Date"
                  inputFormat="MM-DD-YYYY"
                  value={userChoices.date}
                  onChange={handelDateChange}
                  name="date"
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>

              <FormControl>
                <InputLabel id="demo-simple-select-label">
                  Meal Types
                </InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={userChoices.mealTypeId}
                  label="Meal Type"
                  name="mealTypeId"
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
                <InputLabel id="demo-multiple-checkbox-label">Food</InputLabel>
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={userChoices.ingredients}
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
                  name="ingredients"
                >
                  {ingredients.map((food) => {
                    return (
                      <MenuItem key={food.id} value={food.id}>
                        <Checkbox
                          checked={
                            userChoices.ingredients.indexOf(food.id) > -1
                          }
                        />
                        <ListItemText primary={food.name} />
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </Stack>
          </Box>
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
      <Button
        style={{ marginTop: "2em" }}
        variant="contained"
        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
        className="submit_button"
      >
        {" "}
        Update{" "}
      </Button>
    </>
  ) : null;
}
