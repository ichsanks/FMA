import { auth, database } from "../../config/firebase";

export const signIn = (data, callback) => {
  const { email, password } = data;
  auth
    .signInWithEmailAndPassword(email, password)
    .then(response => callback(true, email, null))
    .catch(error => callback(false, null, error));
};

export const getUser = (user, callback) => {
  database
    .ref("users")
    .child(user.id)
    .once("value")
    .then(snapshot => {
      const exists = snapshot.val() !== null;
      if (exists) {
        user = snapshot.val();
      }
      const data = { exists, user };
      callback(true, data, null);
    })
    .catch(error => callback(false, null, error));
};

export const signOut = callback => {
  auth
    .signOut()
    .then(() => {
      if (callback) {
        callback(true, null, null);
      }
    })
    .catch(error => {
      if (callback) {
        callback(false, null, error);
      }
    });
};
