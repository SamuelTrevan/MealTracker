import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  TextField,
  Typography,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { useNavigate } from "react-router-dom";
import { DeleteMeal, GetCurrentUserMeals } from "../../modules/mealManager";

export const GetAllMealsByUserId = () => {
  const [usermeals, setUserMeals] = useState({ meals: [] });
  const [selectedDate, setSelectedDate] = useState(
    moment().format(`MM-DD-YYYY`)
  );

  const navigate = useNavigate();

  const handelDeleteButtonClick = (event, mealId) => {
    event.preventDefault();
    DeleteMeal(mealId)
      .catch((e) => alert(e.message))
      .then(() =>
        GetCurrentUserMeals(selectedDate).then((meal) => setUserMeals(meal))
      );
  };

  useEffect(() => {
    GetCurrentUserMeals(selectedDate).then((meal) => setUserMeals(meal));
  }, [selectedDate]);

  return (
    <>
      <LocalizationProvider dateAdapter={AdapterMoment}>
        <DesktopDatePicker
          label="Date"
          inputFormat="MM/DD/YYYY"
          value={selectedDate}
          onChange={(event) => setSelectedDate(event.format(`MM-DD-YYYY`))}
          name="Date"
          renderInput={(params) => <TextField {...params} />}
        />
      </LocalizationProvider>
      <Card>
        <CardContent>
          <Typography>Total for the day!</Typography>
          <Typography>Total Carbs: {usermeals.totalCarbs}</Typography>
          <Typography>Total Fat: {usermeals.totalFat}</Typography>
          <Typography>Total Protein: {usermeals.totalProtein}</Typography>
          <Typography>Total Sodium: {usermeals.totalSodium}</Typography>
          <Plot
            data={[
              {
                values: [
                  usermeals.totalCarbs,
                  usermeals.totalFat,
                  usermeals.totalProtein,
                ],
                labels: ["Carbs", "Fat", "Protein"],
                domain: { column: 0 },
                name: "GHG Emissions",
                hoverinfo: "label+percent+name",
                hole: 0.4,
                type: "pie",
              },
            ]}
            layout={{ width: 320, height: 240, title: "Daily Totals" }}
          />
        </CardContent>
      </Card>
      {usermeals.meals.map((meal) => (
        <div key={meal.id}>
          <Card sx={{ maxWidth: 345 }}>
            <CardActionArea>
              <Plot
                data={[
                  {
                    values: [meal.totalCarbs, meal.totalFat, meal.totalProtein],
                    labels: ["Carbs", "Fat", "Protein"],
                    domain: { column: 0 },
                    name: "GHG Emissions",
                    hoverinfo: "label+percent+name",
                    hole: 0.4,
                    type: "pie",
                  },
                ]}
                layout={{ width: 320, height: 240, title: "Meal Totals" }}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  {meal.mealName}
                </Typography>
                <Typography>Total Carbs(g): {meal.totalCarbs}</Typography>
                <Typography>Total Fat(g): {meal.totalFat}</Typography>
                <Typography>Total Protein(g): {meal.totalProtein}</Typography>
                <Typography>Total Sodium(mg): {meal.totalSodium}</Typography>
              </CardContent>
            </CardActionArea>
            <Button
              variant="contained"
              onClick={(event) => handelDeleteButtonClick(event, meal.id)}
            >
              Delete
            </Button>
            <Button
              variant="contained"
              onClick={() => navigate(`/meal/edit/${meal.id}`)}
            >
              Edit
            </Button>
          </Card>
        </div>
      ))}
    </>
  );
};
