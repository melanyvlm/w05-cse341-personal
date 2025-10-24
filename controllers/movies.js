// controllers/movies.js
const mongodb = require("../db/connect");
const ObjectId = require("mongodb").ObjectId;

// ✅ GET all movies
const getAllMovies = async (req, res) => {
  try {
    const result = await mongodb.getDb().collection("movies").find();
    const movies = await result.toArray();
    res.status(200).json(movies);
  } catch (error) {
    res.status(500).json({ error: "Error fetching movies: " + error.message });
  }
};

// ✅ GET one movie by ID
const getSingleMovie = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id))
      return res.status(400).json({ error: "Invalid movie ID format" });

    const movie = await mongodb
      .getDb()
      .collection("movies")
      .findOne({ _id: new ObjectId(id) });

    if (!movie) return res.status(404).json({ error: "Movie not found" });
    res.status(200).json(movie);
  } catch (error) {
    res.status(500).json({ error: "Error fetching movie: " + error.message });
  }
};

// ✅ POST create movie
const createMovie = async (req, res) => {
  try {
    const { title, director, year, genre } = req.body;

    // Basic validation
    if (!title || !director || !year || !genre) {
      return res.status(400).json({ error: "All fields are required" });
    }

    const newMovie = { title, director, year, genre };
    const response = await mongodb.getDb().collection("movies").insertOne(newMovie);

    if (response.acknowledged) res.status(201).json(response);
    else res.status(500).json({ error: "Failed to create movie" });
  } catch (error) {
    res.status(500).json({ error: "Error creating movie: " + error.message });
  }
};

// ✅ PUT update movie
const updateMovie = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id))
      return res.status(400).json({ error: "Invalid movie ID format" });

    const { title, director, year, genre } = req.body;
    if (!title || !director || !year || !genre)
      return res.status(400).json({ error: "All fields are required" });

    const movie = { title, director, year, genre };
    const response = await mongodb
      .getDb()
      .collection("movies")
      .updateOne({ _id: new ObjectId(id) }, { $set: movie });

    if (response.modifiedCount > 0) res.status(204).send();
    else res.status(404).json({ error: "Movie not found or not updated" });
  } catch (error) {
    res.status(500).json({ error: "Error updating movie: " + error.message });
  }
};

// ✅ DELETE movie
const deleteMovie = async (req, res) => {
  try {
    const id = req.params.id;
    if (!ObjectId.isValid(id))
      return res.status(400).json({ error: "Invalid movie ID format" });

    const response = await mongodb
      .getDb()
      .collection("movies")
      .deleteOne({ _id: new ObjectId(id) });

    if (response.deletedCount > 0) res.status(200).send();
    else res.status(404).json({ error: "Movie not found" });
  } catch (error) {
    res.status(500).json({ error: "Error deleting movie: " + error.message });
  }
};

module.exports = {
  getAllMovies,
  getSingleMovie,
  createMovie,
  updateMovie,
  deleteMovie,
};
