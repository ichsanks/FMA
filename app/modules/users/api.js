import { database, auth } from "../../config/firebase";

const userref = database.ref("users");

const generatePassword = () => {
  const possible =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
  let password = "";

  for (var i = 0; i < 8; i++)
    password += possible.charAt(Math.floor(Math.random() * possible.length));

  return password;
};

export const fetchUsers = callback => {
  userref
    .orderByChild("name")
    .once("value", snapshot => {
      callback(true, snapshot.val(), null);
    })
    .catch(error => callback(false, null, error));
};

export const fetchCurrentUser = (uid, callback) => {
  userref
    .child(uid)
    .once("value")
    .then(snapshot => {
      const data = snapshot.val();
      callback(true, { ...data, uid }, null);
    })
    .catch(error => callback(false, null, error));
};

export const addUser = (userdata, callback) => {
  const password = generatePassword();
  const { email, name } = userdata;
  auth
    .createUserWithEmailAndPassword(email, password)
    .then(userdata => {
      userref
        .child(userdata.user.uid)
        .set({ email, name, password, role: "user", token: null });
    })
    .then(() => {
      callback(true, null);
    })
    .catch(error => callback(false, error));
};

export const deleteUser = (uid, callback) => {
  userref
    .child(uid)
    .remove()
    .then(() => callback(true, null))
    .catch(error => (false, error));
};

export const resetPassword = (uid, callback) => {
  const password = generatePassword();
  userref
    .child(uid)
    .update({ password })
    .then(() => callback(true, null))
    .catch(error => callback(false, error));
};

export const getUserToken = (uid, callback) => {
  if (uid === "admin") {
    userref
      .orderByChild("role")
      .equalTo("admin")
      .once("value")
      .then(snapshot => {
        const users = snapshot.val();
        let data = [];
        for (let i in users) {
          let user = users[i];
          if (user.token) data.push(user.token);
        }
        callback(true, data, null);
      })
      .catch(error => callback(false, null, error));
  } else {
    userref
      .child(uid)
      .once("value", snapshot => {
        callback(true, snapshot.val().token, null);
      })
      .catch(error => callback(false, null, error));
  }
};
