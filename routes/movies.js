const express = require("express");
const router = express.Router();
const controller = require("../controllers/movies");

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
 *         description: List of movies
 */
router.get("/", controller.getAll);

/**
 * @swagger
 * /movies/{id}:
 *   get:
 *     summary: Get a movie by ID
 *     tags: [Movies]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         description: Movie ID
 *     responses:
 *       200:
 *         description: Movie details
 */
router.get("/:id", controller.getById);

/**
 * @swagger
 * /movies:
 *   post:
 *     summary: Add a new movie
 *     tags: [Movies]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               director:
 *                 type: string
 *               year:
 *                 type: number
 *               genre:
 *                 type: string
 *     responses:
 *       201:
 *         description: Movie created
 */
router.post("/", controller.createMovie);

router.put("/:id", controller.updateMovie);
router.delete("/:id", controller.deleteMovie);

module.exports = router;
