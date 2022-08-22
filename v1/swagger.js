const swaggerJSDoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");

//Basic MetaData about our API

const options = {
  definition: {
    openapi: "3.0.0",
    info: { title: "Pent Apartment Reviews API", version: "1.0.0" },
  },
  apis: ["../v1/routes/reviews"],
};

//Docs in JSON format
const swaggerSpec = swaggerJSDoc(options);

//Function to setup our docs
const swaggerDocs = (app, port) => {
  //Route handler to visit our docs
  app.use(
    "/api/v1/pent/reviews",
    swaggerUi.serve,
    swaggerUi.setup(swaggerSpec)
  );
  //Make Docs available in JSON format available
  app.get("/api/v1/pent/reviews.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(
    `Version 1 Docs are available on http://localhost:${port}/api/v1/pent/reviews`
  );
};

module.exports = { swaggerDocs };
