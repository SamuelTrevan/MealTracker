import { getToken } from "./authManager";
const _apiUrl = "/api/meal";

export const GetCurrentUserMeals = (date) => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/bydate/${date}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("An unknown error occurred while trying to get meals");
      }
    });
  });
};

export const postNewMeal = (newMeal) => {
  return getToken().then((token) => {
    return fetch(_apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newMeal),
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("This Meal already exists");
      }
    });
  });
};

export const DeleteMeal = (mealId) => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/${mealId}`, {
      method: "Delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (!resp.ok) {
        throw new Error(
          "An unknown error occurred while trying to get delete meal"
        );
      }
    });
  });
};

export const GetMealById = (id) => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/${id}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("An unknown error occurred while trying to get meal");
      }
    });
  });
};

export const UpdateMeal = (meal) => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/edit/${meal.Id}`, {
      method: "PUT",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(meal),
    }).then((resp) => {
      if (!resp.ok) {
        throw new Error("An unknown error occurred while trying to edit meal");
      }
    });
  });
};
