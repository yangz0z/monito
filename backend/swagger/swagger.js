import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';

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
        url: process.env.MY_URL, 
        description: 'local server'
      },
  ],
  apis: ["./routes/**/*.js", "./swagger/*"],
};

const specs = swaggerJsdoc(options);

export { swaggerUi, specs };