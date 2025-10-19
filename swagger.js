// swagger.js
const swaggerJSDoc = require("swagger-jsdoc");

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Movies API",
      version: "1.0.0",
      description: "API documentation for your Movies project",
    },
    servers: [
      {
        url: "https://w05-cse341-personal.onrender.com",
        description: "Production server",
      },
      {
        url: "http://localhost:3000",
        description: "Local server",
      },
    ],
  },
  apis: ["./routes/*.js"], // <== Aquí Swagger leerá tus anotaciones
};

const swaggerSpec = swaggerJSDoc(options);
module.exports = swaggerSpec;
