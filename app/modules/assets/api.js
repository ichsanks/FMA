import { auth, database, cloudFunction } from "../../config/firebase";
import pdfMake from "pdfmake/build/pdfmake";
import vfsFonts from "pdfmake/build/vfs_fonts";

const assetref = database.ref("assets");
const locationref = database.ref("locations");

export const fetchAssets = (location, callback) => {
  location = location || "R. Kasir";
  assetref
    .orderByChild("location")
    .equalTo(location)
    .once("value")
    .then(snapshot => {
      callback(true, snapshot.val(), null);
    });
};

export const addAsset = (asset, callback) => {
  const { code, name, pic, location } = asset;

  assetref
    .child(code)
    .set({ name, pic, location })
    .then(() => callback(true, null, null))
    .catch(error => callback(false, null, error));
};

export const updateAsset = (asset, callback) => {
  const { code, name, pic, location } = asset;
  const condition = asset.condition || "BAIK";
  assetref
    .child(code)
    .set({ name, pic, condition, location })
    .then(() => callback(true, null))
    .catch(error => callback(false, error));
};

export const deleteAsset = (code, callback) => {
  assetref
    .child(code)
    .remove()
    .then(() => callback(true, null))
    .catch(error => callback(false, error));
};

export const fetchCurrentAsset = (code, callback) => {
  assetref
    .child(code)
    .once("value")
    .then(snapshot => {
      const data = snapshot.val();
      callback(true, { ...data, code }, null);
    })
    .catch(error => callback(false, null, error));
};

export const changeBorrowState = (data, callback) => {
  const { code, state, uid, username, borrower, borroweruid } = data;
  if (["rejected", "cancelled", "returned"].includes(state)) {
    assetref
      .child(code)
      .child("borrow")
      .set({ borrowState: false })
      .then(() => callback(true, { borrowState: false }, null))
      .catch(error => callback(false, null, error));
  } else if (state === "approved") {
    assetref
      .child(code)
      .child("borrow")
      .update({ borrowState: true, approver: username })
      .then(() =>
        callback(true, { borrowState: true, borrower, borroweruid }, null)
      )
      .catch(error => callback(false, null, error));
  } else if (state === "proposing") {
    assetref
      .child(code)
      .child("borrow")
      .set({ borrowState: state, borrower: username, borroweruid: uid })
      .then(() =>
        callback(
          true,
          { borrowState: state, borrower: username, borroweruid: uid },
          null
        )
      )
      .catch(error => callback(false, null, error));
  }
};

export const checkAssetAvailability = (code, callback) => {
  assetref
    .child(code)
    .once("value")
    .then(snapshot => {
      const exist = snapshot.val() !== null;
      callback(true, exist, null);
    })
    .catch(error => callback(false, null, error));
};

export const moveAssetLocation = (data, callback) => {
  const { code, location } = data;
  assetref
    .child(code)
    .update({ location })
    .then(() => {
      callback(true, null, null);
    })
    .catch(error => callback(false, null, error));
};

export const fetchLocations = callback => {
  locationref.on("value", snapshot => {
    callback(true, snapshot.val(), null);
  });
};

export const getReportData = callback => {
  let report = {
    content: [],
    styles: {
      header: {
        fontSize: 16,
        bold: true
      }
    }
  };
  let locations = [];

  locationref
    .once("value")
    .then(snapshot => {
      snapshot.val().forEach(location => {
        locations.push(location.name);
      });
      return locations;
    })
    .then(locations => {
      let promises = [];
      locations.map((location, index) => {
        promises.push(
          assetref
            .orderByChild("location")
            .equalTo(location)
            .once("value")
            .then(snapshot => {
              let assets = snapshot.val();
              let table = {
                table: {
                  headerRows: 4,
                  widths: [20, 100, "*", 100],
                  body: [
                    [
                      {
                        border: [false, false, false, false],
                        text: "DAFTAR ASET",
                        colSpan: 4,
                        style: "header",
                        alignment: "center"
                      },
                      {},
                      {},
                      {}
                    ],
                    [
                      {
                        border: [false, false, false, false],
                        text: "BPJS KETENAGAKERJAAN CABANG LANGSA",
                        colSpan: 4,
                        style: "header",
                        alignment: "center"
                      },
                      {},
                      {},
                      {}
                    ],
                    [
                      {
                        border: [false, false, false, false],
                        text: `Lokasi: ${location}`,
                        colSpan: 4,
                        bold: true,
                        margin: [0, 20, 0, 10]
                      },
                      {},
                      {},
                      {}
                    ],
                    ["No", "Kode", "Nama", "Kondisi"]
                  ]
                }
              };

              if (assets) {
                let i = 1;
                let pic = null;
                Object.keys(assets).forEach(index => {
                  if (i === 1) pic = assets[index]["pic"];
                  table.table.body.push([
                    { text: `${i}.`, alignment: "right" },
                    index,
                    assets[index]["name"],
                    assets[index]["condition"] || "Baik"
                  ]);
                  i++;
                });

                table.table.body.push([
                  {
                    text: "Langsa,",
                    margin: [350, 50, 0, 0],
                    border: [false, false, false, false],
                    colSpan: 4
                  },
                  {},
                  {},
                  {}
                ]);
                table.table.body.push([
                  {
                    text: pic,
                    margin: [350, 50, 0, 0],
                    border: [false, false, false, false],
                    colSpan: 4
                  },
                  {},
                  {},
                  {}
                ]);
              } else
                table.table.body.push([
                  { text: "Tidak ada aset", colSpan: 4 },
                  {},
                  {},
                  {}
                ]);

              if (index !== 0) table.pageBreak = "before";

              return table;
            })
        );
      });
      return Promise.all(promises);
    })
    .then(content => {
      report.content = content;
      callback(true, report, null);
    })
    .catch(error => callback(null, null, error));
};

export const sendReport = (report, callback) => {
  const email = auth.currentUser.email;

  pdfMake.createPdf(report).getBase64(file => {
    fetch(`${cloudFunction}/sendReport`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        file,
        email
      })
    })
      .then(() => callback(true, null))
      .catch(error => callback(true, error));
  });
};
