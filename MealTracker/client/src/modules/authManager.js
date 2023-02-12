import firebase from "firebase/app";
import "firebase/auth";

const _apiUrl = "/api/userprofile";

const _doesUserExist = (firebaseUserId) => {
  return getToken().then((token) =>
    fetch(`${_apiUrl}/DoesUserExist/${firebaseUserId}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }).then((resp) => resp.ok)
  );
};

export const getCurrentUserId = () => {
  const currentUser = firebase.auth().currentUser;
  if (!currentUser) {
    throw new Error("Cannot get current user. Did you forget to login?");
  }
  return getToken().then((token) =>
    fetch(`${_apiUrl}/${currentUser.uid}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((user) => user.id)
  );
};

const _saveUser = (userProfile) => {
  return getToken().then((token) =>
    fetch(_apiUrl, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userProfile),
    }).then((resp) => resp.json())
  );
};

export const getToken = () => firebase.auth().currentUser.getIdToken();

export const login = (email, pw) => {
  return firebase
    .auth()
    .signInWithEmailAndPassword(email, pw)
    .then((signInResponse) => _doesUserExist(signInResponse.user.uid))
    .then((doesUserExist) => {
      if (!doesUserExist) {
        // If we couldn't find the user in our app's database, we should logout of firebase
        logout();

        throw new Error(
          "Something's wrong. The user exists in firebase, but not in the application database."
        );
      }
    })
    .catch((err) => {
      console.error(err);
      throw err;
    });
};

export const logout = () => {
  firebase.auth().signOut();
};

export const register = (userProfile, password) => {
  return firebase
    .auth()
    .createUserWithEmailAndPassword(userProfile.email, password)
    .then((createResponse) =>
      _saveUser({
        ...userProfile,
        firebaseUserId: createResponse.user.uid,
      })
    );
};

export const onLoginStatusChange = (onLoginStatusChangeHandler) => {
  firebase.auth().onAuthStateChanged((user) => {
    onLoginStatusChangeHandler(!!user);
  });
};
