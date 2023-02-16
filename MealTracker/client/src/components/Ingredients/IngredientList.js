import {
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Dialog,
  DialogTitle,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAllIngredients } from "../../modules/ingredientManager";

export default function IngredientList() {
  const [ingredients, setIngredients] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedFood, setSelectedFood] = useState(null);

  const navigate = useNavigate();

  function createData(
    id,
    name,
    imageUrl,
    servingSize,
    fat,
    protein,
    carbs,
    sodium
  ) {
    return {
      id,
      name,
      imageUrl,
      servingSize,
      fat,
      protein,
      carbs,
      sodium,
    };
  }
  const rows = ingredients.map((ingredient) =>
    createData(
      `${ingredient.id}`,
      `${ingredient.name}`,
      `${ingredient.imageUrl}`,
      `${ingredient.servingSize}`,
      `${ingredient.fat}`,
      `${ingredient.protein}`,
      `${ingredient.carbs}`,
      `${ingredient.sodium}`
    )
  );

  useEffect(() => {
    getAllIngredients().then((food) => setIngredients(food));
  }, []);

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <>
      <Button
        variant="contained"
        onClick={() => {
          navigate("/food/add");
        }}
      >
        Add New Food
      </Button>
      <Grid container>
        <Grid item xs={2}></Grid>
        <Grid item xs={8}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 650 }} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>
                    <b>Foods</b>
                  </TableCell>
                  <TableCell>
                    <b>Serving Size&nbsp;(g)</b>
                  </TableCell>
                  <TableCell>
                    <b>Fat&nbsp;(g)</b>
                  </TableCell>
                  <TableCell>
                    <b>Protein&nbsp;(g)</b>
                  </TableCell>
                  <TableCell>
                    <b>Carbs&nbsp;(g)</b>
                  </TableCell>
                  <TableCell>
                    <b>Sodium&nbsp;(mg)</b>
                  </TableCell>
                  <TableCell></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell component="th" scope="row">
                      {row.name}
                    </TableCell>
                    <TableCell>{row.servingSize}</TableCell>
                    <TableCell>{row.fat}</TableCell>
                    <TableCell>{row.protein}</TableCell>
                    <TableCell>{row.carbs}</TableCell>
                    <TableCell>{row.sodium}</TableCell>
                    <TableCell>
                      <Button
                        variant="outlined"
                        onClick={() => {
                          setSelectedFood(row);
                          setOpen(true);
                        }}
                      >
                        Details
                      </Button>
                      <Button
                        variant="outlined"
                        onClick={() => navigate(`/food/edit/${row.id}`)}
                      >
                        Edit
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>

          {selectedFood ? (
            <Dialog onClose={handleClose} open={open}>
              <DialogTitle>Set backup account</DialogTitle>
              <Card sx={{ maxWidth: 345 }}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="275"
                    image={selectedFood.imageUrl}
                    alt={selectedFood.name}
                  ></CardMedia>
                  <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                      {selectedFood.name}
                    </Typography>
                    <div>Serving Size: {selectedFood.servingSize} grams</div>
                    <div>Fat: {selectedFood.fat} grams</div>
                    <div>Carbs: {selectedFood.carbs} grams</div>
                    <div>Protein: {selectedFood.protein} grams</div>
                    <div>Sodium: {selectedFood.sodium} miligrams</div>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Dialog>
          ) : null}
        </Grid>
        <Grid item xs={2}></Grid>
      </Grid>
    </>
  );
}
