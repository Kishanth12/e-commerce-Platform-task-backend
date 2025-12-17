import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "E-Commerce API Documentation",
    version: "1.0.0",
    description:
      "API documentation for E-Commerce application with authentication, products, and orders",
  },
  servers: [
    {
      url: "http://localhost:5001/api",
      description: "Development server",
    },
  ],
  components: {
    securitySchemes: {
      BearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
  },
  security: [
    {
      BearerAuth: [],
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js", "./src/models/*.js", "./controllers/*.js"],
};

const swaggerSpec = swaggerJSDoc(options);

export const swaggerDocs = (app,port) => {
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

  // JSON endpoint for swagger spec
  app.get("/api-docs.json", (req, res) => {
    res.setHeader("Content-Type", "application/json");
    res.send(swaggerSpec);
  });

  console.log(`docs available at http://localhost:${port}/api-docs`);
};

export default swaggerSpec;
