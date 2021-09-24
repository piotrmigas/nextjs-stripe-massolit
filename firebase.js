const admin = require("firebase-admin");

const serviceAccount = require("./service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

const db = admin.firestore();
const auth = admin.auth();
const timestamp = admin.firestore.FieldValue.serverTimestamp();

module.exports = {
  db,
  auth,
  timestamp,
};
