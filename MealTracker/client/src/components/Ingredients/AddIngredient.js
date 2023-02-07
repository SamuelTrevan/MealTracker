import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  getAllIngredients,
  postNewIngredient,
} from "../../modules/ingredientManager";

export const AddIngredientForm = () => {
  const [ingredient, setIngredient] = useState([]);
  const [userChoices, setUserChoices] = useState({
    name: "",
    imageUrl: "",
    servingSize: 0,
    fat: 0,
    protein: 0,
    carbs: 0,
    sodium: 0,
  });
  const navigate = useNavigate();

  useEffect(() => {
    getAllIngredients().then((food) => setIngredient(food));
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
      postNewIngredient(newFood)
        .catch((e) => alert(e.message))
        .then(() => navigate("/food"));
    } else {
      alert("Please complete the form");
    }
  };

  const handleInputChange = (event) => {
    const copy = { ...userChoices };
    copy[event.target.name] = event.target.value;
    setUserChoices(copy);
  };

  return (
    <form className="ticketForm">
      <h2 className="ticketForm__title">Add New Food</h2>
      <fieldset>
        <div className="form-group">
          <label htmlFor="name">Name: </label>
          <input
            required
            autoFocus
            name="name"
            type="text"
            className="form-control"
            placeholder="ex.. banana"
            value={userChoices.name}
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="imageUrl">Image Url: </label>
          <input
            required
            autoFocus
            name="imageUrl"
            type="text"
            className="form-control"
            placeholder="example.com"
            value={userChoices.imageUrl}
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="servingSize">Serving Size: </label>
          <input
            required
            autoFocus
            name="servingSize"
            type="number"
            className="form-control"
            placeholder=""
            value={userChoices.servingSize}
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="fat">Fat in grams: </label>
          <input
            required
            autoFocus
            name="fat"
            type="number"
            className="form-control"
            placeholder=""
            value={userChoices.fat}
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="protein">Protein in grams: </label>
          <input
            required
            autoFocus
            name="protein"
            type="number"
            className="form-control"
            placeholder=""
            value={userChoices.protein}
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="carbs">Carbs in grams: </label>
          <input
            required
            autoFocus
            name="carbs"
            type="number"
            className="form-control"
            placeholder=""
            value={userChoices.carbs}
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <fieldset>
        <div className="form-group">
          <label htmlFor="sodium">Sodium in miligrams: </label>
          <input
            required
            autoFocus
            name="sodium"
            type="number"
            className="form-control"
            placeholder=""
            value={userChoices.sodium}
            onChange={handleInputChange}
          />
        </div>
      </fieldset>
      <Button
        style={{ marginTop: "2em" }}
        variant="contained"
        onClick={(clickEvent) => handleSaveButtonClick(clickEvent)}
        className="submit_button"
      >
        {" "}
        Add New Food{" "}
      </Button>
    </form>
  );
};
