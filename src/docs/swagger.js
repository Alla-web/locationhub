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
    securitySchemes: {
      cookieAuth: {
        type: 'apiKey',
        in: 'cookie',
        name: 'accessToken',
        description: 'Після логіну (httpOnly cookie)'
      },
    },
    schemas: {
      // тут прописуємо схеми для всіх сутностей проекту
      Feedback: {
        type: 'object',
        properties: {
          _id: { type: 'string', example: '65a1b2c3d4e5f6789012345' },
          description: { type: 'string' },
          userName: { type: 'string' },
          rate: { type: 'number', minimum: 1, maximum: 5 },
          locationId: { type: 'string' },
          userId: { type: 'string' },
          createdAt: { type: 'string', format: 'date-time' },
          updatedAt: { type: 'string', format: 'date-time' },
        },
      },
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
