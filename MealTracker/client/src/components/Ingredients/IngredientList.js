import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import { useEffect, useState } from "react";
import { getAllIngredients } from "../../modules/ingredientManager";

export default function IngredientList() {
  const [ingredients, setIngredients] = useState([]);

  function createData(
    name,
    imageUrl,
    servingSize,
    fat,
    protein,
    carbs,
    sodium
  ) {
    return {
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
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Foods</TableCell>
            {/* <TableCell>Image</TableCell> */}
            <TableCell>Serving Size&nbsp;(g)</TableCell>
            <TableCell>Fat&nbsp;(g)</TableCell>
            <TableCell>Protein&nbsp;(g)</TableCell>
            <TableCell>Carbs&nbsp;(g)</TableCell>
            <TableCell>Sodium&nbsp;(mg)</TableCell>
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
              {/* <TableCell align="right">{row.imageUrl}</TableCell> */}
              <TableCell>{row.servingSize}</TableCell>
              <TableCell>{row.fat}</TableCell>
              <TableCell>{row.protein}</TableCell>
              <TableCell>{row.carbs}</TableCell>
              <TableCell>{row.sodium}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
