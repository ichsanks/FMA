import { database } from "../../config/firebase";

const dbref = database.ref("assets");

export const fetchAssets = callback => {
  dbref.on("value", snapshot => {
    callback(true, snapshot.val(), null);
  });
};

export const checkAssetAvailability = (code, callback) => {
  dbref
    .child(code)
    .once("value")
    .then(snapshot => {
      const exist = snapshot.val() !== null;
      callback(true, exist, null);
    });
};

export const addAsset = (data, callback) => {
  const { code, name, pic, location, user } = data.asset,
    history = {
      timestamp: "now",
      action: "New asset added",
      user
    };

  dbref
    .child(code)
    .set({ name, pic, location })
    .then(() => callback(true, null, null))
    .catch(error => callback(false, null, error));
};

export const updateAsset = (asset, callback) => {
  const { code, name, pic, location, prevData, user } = asset;
  dbref
    .child(code)
    .set({ name, pic, location })
    .then(() => callback(true, asset, null))
    .catch(error => callback(false, null, error));
};

export const deleteAsset = (code, callback) => {
  dbref
    .child(code)
    .remove()
    .then(() => callback(true, null))
    .catch(error => callback(false, error));
};
