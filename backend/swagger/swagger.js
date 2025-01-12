const swaggerUi = require("swagger-ui-express");
const swaggerJsdoc = require("swagger-jsdoc");

const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "MONITO Api",
            description: "모니또 REST API 명세서",
            version: "1.0.0",
        },
    },
    servers: [
        {
          url: 'https://localhost:3000', 
          description: 'local server'
        },
    ],
    apis: ["./routes/**/*.js", "./swagger/*"],
};

const specs = swaggerJsdoc(options);

module.exports = {
swaggerUi,
specs,
};
  