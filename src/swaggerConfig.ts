import swaggerJSDoc from "swagger-jsdoc";

const swaggerOptions: swaggerJSDoc.Options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Node API",
      version: "1.0.0",
      description: "API documentation for the Node API",
    },
    servers: [
      {
        url: "http://localhost:3000",
      },
    ],
  },
  apis: ["./src/swaggerDocs.ts", "./src/routes/*.ts"], // Path to the API docs
};

export default swaggerOptions;
