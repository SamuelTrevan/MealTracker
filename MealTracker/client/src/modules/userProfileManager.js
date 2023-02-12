import { getToken } from "./authManager";
const _apiUrl = "api/userprofile";

export const GetCurrentUserId = () => {
  return getToken().then((token) => {
    return fetch(`${_apiUrl}/${firebaseUserId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => {
      if (resp.ok) {
        return resp.json();
      } else {
        throw new Error(
          "An unknown error occurred while trying to getting UserProfileId"
        );
      }
    });
  });
};
