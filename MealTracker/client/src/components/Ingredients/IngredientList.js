import {
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { getAllIngredients } from "../../modules/ingredientManager";

export default function IngredientList() {
  const [ingredients, setIngredients] = useState([]);

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

      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Foods</TableCell>
              <TableCell>Serving Size&nbsp;(g)</TableCell>
              <TableCell>Fat&nbsp;(g)</TableCell>
              <TableCell>Protein&nbsp;(g)</TableCell>
              <TableCell>Carbs&nbsp;(g)</TableCell>
              <TableCell>Sodium&nbsp;(mg)</TableCell>
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
                    onClick={() => navigate(`/food/${row.id}`)}
                  >
                    Details
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => navigate(`/food/edit/${row.id}`)}
                  >
                    Edit
                  </Button>
                  <Button
                    variant="outlined"
                    onClick={() => navigate(`/food/delete/${row.id}`)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
