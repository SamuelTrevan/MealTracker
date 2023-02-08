import { getToken } from "./authManager";

const _apiUrl = "/api/ingredient";

export const getAllIngredients = () => {
  return getToken().then((token) => {
    return fetch(_apiUrl, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get ingredients"
        );
      }
    });
  });
};

export const postNewIngredient = (newFood) => {
  return getToken().then((token) => {
    return fetch(_apiUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newFood),
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error("This food already exists");
      }
    });
  });
};

export const getIngredientById = (foodId) => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/food/${foodId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to get ingredients"
        );
      }
    });
  });
};

export const DeleteIngredient = (foodId) => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/food/delete/${foodId}`, {
      method: "Delete",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (!resp.ok) {
        throw new Error(
          "An unknown error occurred while trying to get delete food"
        );
      }
    });
  });
};
