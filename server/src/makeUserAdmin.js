var admin = require("firebase-admin");

var serviceAccount = require("../bugandaService.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const uid = "tSNvutsU9kQY542zxAE4GbClDWI2"
admin.auth().setCustomUserClaims(uid, {admin: true}).then((res) => { console.log(res)})
console.log("done")