const express = require("express");
const app = express();

const { connectToDB } = require("./db/db.connect");

const Manga = require("./models/manga.model");

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

// async function insertData(data) {
//   try {
//     const savedData = await Manga.insertMany(data);
//     console.log(savedData);
//   } catch (error) {
//     console.log(error);
//   }
// }

// insertData(mangaData)

app.get("/mangas", async (req, res) => {
  try {
    const mangas = await Manga.find();
    res.json(mangas);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

app.get("/mangas/:id", async (req, res) => {
  try {
    const manga = await Manga.findById(req.params.id);

    if (!manga) {
      return res.status(404).json({ message: "Manga not found" });
    }

    res.json(manga);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

app.post("/mangas", async (req, res) => {
  const { coverURL, title, description, author } = req.body;

  if (!coverURL || !title || !description || !author) {
    return res
      .status(404)
      .json({ message: "Please fill in all required fields" });
  }

  try {
    const newManga = new Manga({ coverURL, title, description, author });
    const savedManga = await newManga.save();

    res.status(201).json(savedManga);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

app.put("/mangas/:id", async (req, res) => {
  try {
    const editedManga = await Manga.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });

    if (!editedManga) {
      return res.status(404).json({ message: "Manga not found" });
    }

    res.json(editedManga);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Internal server error", error: error.message });
  }
});

app.listen(4000, () => {
  console.log("App is listening on PORT 4000");
});
