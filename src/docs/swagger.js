import swaggerJSDoc from 'swagger-jsdoc';

const swaggerDefinition = {
  openapi: '3.0.0',

  info: {
    title: 'My API',
    version: '1.0.0',
    description: 'API documentation for LocationHub APP',
  },

  servers: [{ url: `http://localhost:${process.env.PORT}` }],

  components: {
    schemas: {
      // тут прописуємо схеми для всіх сутностей проекту
      Location: {
        type: 'object',
        required: ['_id', 'name'],

        properties: {
          _id: {
            type: 'string',
            example: '64f123abc',
            description: 'Унікальний ідентифікатор локації',
          },
          name: {
            type: 'string',
            example: 'Kharkiv',
            description: 'Location title',
          },
        },
      },
    },
  },
};

const options = {
  definition: swaggerDefinition,
  apis: ['./src/routes/**/*.js'],
};

export const swaggerSpec = swaggerJSDoc(options);
