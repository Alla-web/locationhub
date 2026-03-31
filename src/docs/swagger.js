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
        description: 'Після логіну (httpOnly cookie)',
      },
    },
    schemas: {
      // тут прописуємо схеми для всіх сутностей проекту
      User: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            example: '64f123abc123abc123abc203',
          },
          name: {
            type: 'string',
            example: 'Anna',
          },
          email: {
            type: 'string',
            format: 'email',
            example: 'anna@example.com',
          },
          avatarUrl: {
            type: 'string',
            format: 'uri',
            example:
              'https://ac.goit.global/fullstack/react/default-avatar.jpg',
          },
          articlesAmount: {
            type: 'integer',
            example: 0,
          },
          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-03-01T10:00:00.000Z',
          },
          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-03-01T10:00:00.000Z',
          },
        },
      },
      Feedback: {
        type: 'object',
        properties: {
          _id: {
            type: 'string',
            example: '65a1b2c3d4e5f6789012345',
          },

          text: {
            type: 'string',
            example: 'Дуже гарне місце!',
          },

          rate: {
            type: 'number',
            minimum: 1,
            maximum: 5,
            example: 5,
          },

          ownerId: {
            type: 'object',
            description: 'Запопульований користувач',
            properties: {
              _id: {
                type: 'string',
                example: '65a1b2c3d4e5f6789012346',
              },
            },
          },

          locationId: {
            type: 'object',
            description: 'Запопульована локація',
            properties: {
              _id: {
                type: 'string',
                example: '65a1b2c3d4e5f6789012347',
              },
            },
          },

          createdAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-03-01T10:00:00.000Z',
          },

          updatedAt: {
            type: 'string',
            format: 'date-time',
            example: '2025-03-01T10:00:00.000Z',
          },

          _version: {
            type: 'number',
            example: 0,
          },
        },
      },
      Location: {
        type: 'object',
        required: ['_id', 'name'],

        properties: {
          _id: {
            type: 'string',
            example: '69c6be86a6613043f807c2f1',
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
