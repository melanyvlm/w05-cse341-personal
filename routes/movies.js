// routes/movies.js
const express = require("express");
const router = express.Router();
const moviesController = require("../controllers/movies");

/**
 * @swagger
 * tags:
 *   name: Movies
 *   description: API for managing movies
 */

/**
 * @swagger
 * /movies:
 *   get:
 *     summary: Get all movies
 *     tags: [Movies]
 *     responses:
 *       200:
 *         description: List of all movies
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   _id:
 *                     type: string
 *                   title:
 *                     type: string
 *                   director:
 *                     type: string
 *                   year:
 *                     type: integer
 *                   genre:
 *                     type: string
 *   post:
 *     summary: Create a new movie
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - director
 *               - year
 *               - genre
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Inception"
 *               director:
 *                 type: string
 *                 example: "Christopher Nolan"
 *               year:
 *                 type: integer
 *                 example: 2010
 *               genre:
 *                 type: string
 *                 example: "Sci-Fi"
 *     responses:
 *       201:
 *         description: Movie created successfully
 */

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Get a movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The movie ID
 *     responses:
 *       200:
 *         description: Movie found
 *       404:
 *         description: Movie not found
 *   put:
 *     summary: Update a movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The movie ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - director
 *               - year
 *               - genre
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Interstellar"
 *               director:
 *                 type: string
 *                 example: "Christopher Nolan"
 *               year:
 *                 type: integer
 *                 example: 2014
 *               genre:
 *                 type: string
 *                 example: "Adventure"
 *     responses:
 *       204:
 *         description: Movie updated successfully
 *       404:
 *         description: Movie not found
 *   delete:
 *     summary: Delete a movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The movie ID
 *     responses:
 *       200:
 *         description: Movie deleted successfully
 *       404:
 *         description: Movie not found
 */

router.get("/", moviesController.getAllMovies);
router.get("/:id", moviesController.getSingleMovie);
router.post("/", moviesController.createMovie);
router.put("/:id", moviesController.updateMovie);
router.delete("/:id", moviesController.deleteMovie);

module.exports = router;
