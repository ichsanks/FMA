import { auth, database } from "../../config/firebase";
import { AsyncStorage } from "react-native";
import firebase from "firebase";

const userref = database.ref("users");

export const signIn = (data, callback) => {
  const { email, password, token } = data;
  auth
    .signInWithEmailAndPassword(email, password)
    .then(response => {
      userref
        .child(response.user.uid)
        .once("value")
        .then(snapshot => {
          const userdata = snapshot.val();
          return { ...userdata, uid: response.user.uid };
        })
        .then(userdata => {
          userref
            .child(userdata.uid)
            .update({ token })
            .then(() => {
              callback(true, { ...userdata, token }, null);
            });
        });
    })
    .catch(error => callback(false, null, error));
};

export const signOut = (uid, callback) => {
  auth
    .signOut()
    .then(() => {
      userref
        .child(uid)
        .child("token")
        .set(null);
    })
    .then(() => callback(true, null))
    .catch(error => callback(false, error));
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

export const updatePassword = (pass, callback) => {
  const { uid, newPassword } = pass;
  userref
    .child(uid)
    .update({ password: newPassword })
    .then(() => callback(true, null))
    .catch(error => callback(false, error));
};

export const isLogged = (email, callback) => {
  userref
    .orderByChild("email")
    .equalTo(email)
    .once("value", snapshot => {
      const data = snapshot.val();
      let token = null;
      for (let uid in data) {
        token = data[uid].token;
      }
      callback(true, token, null);
    })
    .catch(error => callback(false, null, null));
};

export const validatePassword = (pass, callback) => {
  const { currPassword } = pass;
  const user = firebase.auth().currentUser;
  const cred = firebase.auth.EmailAuthProvider.credential(
    user.email,
    currPassword
  );
  user
    .reauthenticateAndRetrieveDataWithCredential(cred)
    .then(() => callback(true, null))
    .catch(error => callback(false, error));
};
