const express = require("express");
require("dotenv").config();
const app = express();
require("./models/db");
app.use(express.json());
const PORT = process.env.PORT || 5000;
const cors = require("cors");
app.use(cors());
const usersRouter = require("./routes/users");

app.use("/users", usersRouter);
app.listen(PORT, () => {
  console.log(`connect server localHost ${PORT}`);
});
