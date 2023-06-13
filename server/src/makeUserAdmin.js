var admin = require("firebase-admin");

var serviceAccount = require("../bugandaService.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});
const uid = "YT8GwPSXCbNhzkO3oO82KyCS4tq1"
admin.getAuth().setCustomUserClaims(uid, {admin: true}).then((res) => { console.log(res)})
console.log("done")