import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { Stack } from "@mui/system";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterMoment } from "@mui/x-date-pickers/AdapterMoment";
import moment from "moment";
import { useEffect, useState } from "react";
import Plot from "react-plotly.js";
import { useNavigate } from "react-router-dom";
import { DeleteMeal, GetCurrentUserMeals } from "../../modules/mealManager";
import { Edit } from "@mui/icons-material";

const mealTypeMap = { breakfast: 1, lunch: 2, dinner: 3, snack: 4 };

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
      <Container>
        <Grid container spacing={2} mt={10} mb={10} ml={0}>
          <Grid item xs={4}>
            <LocalizationProvider dateAdapter={AdapterMoment}>
              <DesktopDatePicker
                sx={{ maxWidth: 345 }}
                label="Date"
                inputFormat="MM/DD/YYYY"
                value={selectedDate}
                onChange={(event) =>
                  setSelectedDate(event.format(`MM-DD-YYYY`))
                }
                name="Date"
                renderInput={(params) => <TextField {...params} />}
              />
            </LocalizationProvider>
          </Grid>

          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Grid container>
                  <Grid item xs={4}>
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
                      layout={{
                        width: 320,
                        height: 240,
                        title: "Daily Totals",
                      }}
                    />
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Typography>Total Carbs: {usermeals.totalCarbs}</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Typography>Total Fat: {usermeals.totalFat}</Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Typography>
                      Total Protein: {usermeals.totalProtein}
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={2}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                    }}
                  >
                    <Typography>
                      Total Sodium: {usermeals.totalSodium}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          </Grid>

          {usermeals.meals
            .sort(
              (a, b) =>
                mealTypeMap[a.mealName.toLowerCase()] -
                mealTypeMap[b.mealName.toLowerCase()]
            )
            .map((meal) => (
              <Grid item xs={6}>
                <Box key={meal.id}>
                  <Card sx={{ mb: 2 }}>
                    <CardActionArea>
                      <Grid container>
                        <Plot
                          data={[
                            {
                              values: [
                                meal.totalCarbs,
                                meal.totalFat,
                                meal.totalProtein,
                              ],
                              labels: ["Carbs", "Fat", "Protein"],
                              domain: { column: 0 },
                              name: "GHG Emissions",
                              hoverinfo: "label+percent+name",
                              hole: 0.4,
                              type: "pie",
                            },
                          ]}
                          layout={{
                            width: 320,
                            height: 240,
                            title: "Meal Totals",
                          }}
                        />
                        <CardContent
                          sx={{
                            display: "flex",
                            flexDirection: "column",
                            justifyContent: "center",
                          }}
                        >
                          <Typography gutterBottom variant="h5" component="div">
                            {meal.mealName}
                          </Typography>
                          <Typography>
                            Total Carbs(g): {meal.totalCarbs}
                          </Typography>
                          <Typography>Total Fat(g): {meal.totalFat}</Typography>
                          <Typography>
                            Total Protein(g): {meal.totalProtein}
                          </Typography>
                          <Typography>
                            Total Sodium(mg): {meal.totalSodium}
                          </Typography>
                        </CardContent>
                      </Grid>
                    </CardActionArea>

                    <Stack direction="row" spacing={2}>
                      <Button
                        size="small"
                        color="primary"
                        startIcon={<DeleteIcon />}
                        onClick={(event) =>
                          handelDeleteButtonClick(event, meal.id)
                        }
                      >
                        Delete
                      </Button>
                      <Button
                        size="small"
                        color="primary"
                        endIcon={<Edit />}
                        onClick={() => navigate(`/meal/edit/${meal.id}`)}
                      >
                        Edit
                      </Button>
                    </Stack>
                  </Card>
                </Box>
              </Grid>
            ))}
        </Grid>
        {/* </Grid>
        </Grid> */}
      </Container>
    </>
  );
};
