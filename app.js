const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const router = require("./routers/router");
const cors = require("cors");
const errorHandler = require("./middlewares/errorHandler");

app.use(cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(router);
app.use(errorHandler);

// Ganti username sama password di config DB aja, sisany biarin samaan
// Kalau mau sambil coba run di postman, run server pake "npm run dev" aja
// Buat test run "npm run test <nama file test>" aja biar ga ke run semua

// Selama Testing & Develop ini Jangan di Uncomment ya Gaes!
// // Gunakan Saat Production Saja!
// app.listen(port, () => {
//   console.log(`app listen on port ${port}`);
// });

module.exports = app;
