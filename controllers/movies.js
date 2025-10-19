const { getDb } = require("../db/connect");
const { ObjectId } = require("mongodb");

// 📌 Obtener todas las películas
const getAll = async (req, res) => {
  try {
    const db = getDb();
    const movies = await db.collection("movies").find().toArray();
    res.status(200).json(movies);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📌 Obtener una película por ID
const getById = async (req, res) => {
  try {
    const db = getDb();
    const id = new ObjectId(req.params.id);
    const movie = await db.collection("movies").findOne({ _id: id });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(200).json(movie);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📌 Crear una nueva película
const createMovie = async (req, res) => {
  try {
    const db = getDb();
    const { title, director, year, genre } = req.body;

    if (!title || !director || !year || !genre) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const result = await db.collection("movies").insertOne({
      title,
      director,
      year,
      genre,
    });

    res.status(201).json(result);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📌 Actualizar una película
const updateMovie = async (req, res) => {
  try {
    const db = getDb();
    const id = new ObjectId(req.params.id);
    const { title, director, year, genre } = req.body;

    const result = await db.collection("movies").updateOne(
      { _id: id },
      { $set: { title, director, year, genre } }
    );

    if (result.modifiedCount === 0) {
      return res.status(404).json({ message: "Movie not found or not modified" });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// 📌 Eliminar una película
const deleteMovie = async (req, res) => {
  try {
    const db = getDb();
    const id = new ObjectId(req.params.id);

    const result = await db.collection("movies").deleteOne({ _id: id });

    if (result.deletedCount === 0) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getById, createMovie, updateMovie, deleteMovie };
