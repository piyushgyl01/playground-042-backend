const express = require("express");
const app = express();

const { connectToDB } = require("./db/db.connect");

connectToDB();
app.use(express.json());

const cors = require("cors");

const corsOptions = {
  origin: "*",
  credentials: true,
  optionsSuccessStatus: 200,
};

app.use(cors(corsOptions));

app.get("/", (req, res) => {
  res.json("Manga Database! Browse your favorite mangas");
});

app.listen(4000, () => {
  console.log("App is listening on PORT 4000");
});
