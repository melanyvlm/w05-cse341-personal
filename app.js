const express = require("express");
const dotenv = require("dotenv");
const { initDb } = require("./db/connect");
const moviesRoutes = require("./routes/movies");
const swaggerUi = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");

dotenv.config();
const app = express();

app.use(express.json());
app.use("/movies", moviesRoutes);

// 📘 Swagger setup
const swaggerOptions = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movies API",
      version: "1.0.0",
      description: "API documentation for the Movies database project",
    },
    servers: [{ url: process.env.RENDER_URL || "http://localhost:3000" }],
  },
  apis: ["./routes/*.js"],
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// 🔌 Connect to database and start server
initDb((err) => {
  if (err) {
    console.error("❌ Database connection failed:", err);
  } else {
    app.listen(3000, () => {
      console.log("🚀 Server running on port 3000");
    });
  }
});
