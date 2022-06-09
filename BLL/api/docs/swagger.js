const swaggerJsdoc = require("swagger-jsdoc");

const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "TIME WORKOUT REST-API",
    description: "API DOCUMENTATION",
    version: "1.1.24-beta",
  },
  servers: [
    {
      url: "http://localhost:3090/api/v1",
      description: "Staging server on localhost, only for testing",
    },
    {
      url: "https://time-workout.herokuapp.com/api/v1",
      description: "Main production server",
    },
  ],
  components: {
    schemas: {
      user: {
        type: "object",
        required: [
          "name",
          "lastName",
          "password",
          "email",
          "gender",
          "birthday",
          "nationality",
        ],
        properties: {
          name: {
            type: "string",
          },
          lastName: {
            type: "string",
          },
          password: {
            type: "string",
          },
          email: {
            type: "string",
          },
          gender: {
            type: "string",
          },
          birthday: {
            type: "string",
          },
          profilePicture: {
            type: "string",
          },
          nationality: {
            type: "string",
          },
        },
      },
      userWithToken: {
        type: "object",
        properties: {
          data: {
            type: "object",
            properties: {
              token: {
                type: "string",
              },
              user: {
                type: "object",
                properties: {
                  userId: {
                    type: "integer",
                  },
                  name: {
                    type: "string",
                  },
                  lastName: {
                    type: "string",
                  },
                  email: {
                    type: "string",
                  },
                  gender: {
                    type: "string",
                  },
                  birthday: {
                    type: "string",
                  },
                  profilePicture: {
                    type: "string",
                  },
                  nationality: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
      userWithId: {
        type: "object",
        properties: {
          data: {
            type: "object",
            properties: {
              userId: {
                type: "integer",
              },
              name: {
                type: "string",
              },
              lastName: {
                type: "string",
              },
              email: {
                type: "string",
              },
              gender: {
                type: "string",
              },
              birthday: {
                type: "string",
              },
              profilePicture: {
                type: "string",
              },
              nationality: {
                type: "string",
              },
            },
          },
        },
      },
      challenge: {
        type: "object",
        properties: {
          tittle: {
            type: "string",
          },
          description: {
            type: "string",
          },
          startDate: {
            type: "string",
          },
          endDate: {
            type: "string",
          },
          days: {
            type: "object",
            properties: {
              days: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      challenges: {
        type: "object",
        properties: {
          data: {
            type: "array",
            items: {
              type: "object",
              properties: {
                challengeId: {
                  type: "integer",
                },
                userId: {
                  type: "integer",
                },
                tittle: {
                  type: "string",
                },
                description: {
                  type: "string",
                },
                followers: {
                  type: "integer",
                },
                startDate: {
                  type: "string",
                },
                endDate: {
                  type: "string",
                },
                days: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                timestamp: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      challengeWithId: {
        type: "object",
        properties: {
          data: {
            type: "object",
            properties: {
              challengeId: {
                type: "integer",
              },
              userId: {
                type: "integer",
              },
              tittle: {
                type: "string",
              },
              description: {
                type: "string",
              },
              followers: {
                type: "integer",
              },
              startDate: {
                type: "string",
              },
              endDate: {
                type: "string",
              },
              days: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              timestamp: {
                type: "string",
              },
            },
          },
        },
      },
      record: {
        type: "object",
        properties: {
          tittle: {
            type: "string",
          },
          description: {
            type: "string",
          },
          recordTable: {
            type: "object",
            properties: {
              records: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    timestamp: {
                      type: "string",
                    },
                    amount: {
                      type: "integer",
                    },
                  },
                },
              },
            },
          },
        },
      },
      records: {
        type: "object",
        properties: {
          data: {
            type: "array",
            items: {
              type: "object",
              properties: {
                recordId: {
                  type: "integer",
                },
                userId: {
                  type: "integer",
                },
                tittle: {
                  type: "string",
                },
                description: {
                  type: "string",
                },
                recordTable: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      amount: {
                        type: "integer",
                      },
                      timestamp: {
                        type: "string",
                      },
                    },
                  },
                },
                timestamp: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      recordWithId: {
        type: "object",
        properties: {
          data: {
            type: "object",
            properties: {
              recordId: {
                type: "integer",
              },
              userId: {
                type: "integer",
              },
              tittle: {
                type: "string",
              },
              description: {
                type: "string",
              },
              recordTable: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    amount: {
                      type: "integer",
                    },
                    timestamp: {
                      type: "string",
                    },
                  },
                },
              },
              timestamp: {
                type: "string",
              },
            },
          },
        },
      },
      routine: {
        type: "object",
        properties: {
          tittle: {
            type: "string",
          },
          privacy: {
            type: "boolean",
          },
          description: {
            type: "string",
          },
          exercisesInfo: {
            type: "object",
            properties: {
              routines: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    exerciseName: {
                      type: "string",
                    },
                    effortTime: {
                      type: "integer",
                    },
                    restTime: {
                      type: "integer",
                    },
                  },
                },
              },
            },
          },
        },
      },
      routines: {
        type: "object",
        properties: {
          data: {
            type: "array",
            items: {
              type: "object",
              properties: {
                routineId: {
                  type: "integer",
                },
                userId: {
                  type: "integer",
                },
                tittle: {
                  type: "string",
                },
                privacy: {
                  type: "boolean",
                },
                description: {
                  type: "string",
                },
                exercisesInfo: {
                  type: "array",
                  items: {
                    type: "object",
                    properties: {
                      restTime: {
                        type: "integer",
                      },
                      effortTime: {
                        type: "integer",
                      },
                      exerciseName: {
                        type: "string",
                      },
                    },
                  },
                },
                timestamp: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      routineWithId: {
        type: "object",
        properties: {
          data: {
            type: "object",
            properties: {
              routineId: {
                type: "integer",
              },
              userId: {
                type: "integer",
              },
              tittle: {
                type: "string",
              },
              privacy: {
                type: "boolean",
              },
              description: {
                type: "string",
              },
              exercisesInfo: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    restTime: {
                      type: "integer",
                    },
                    effortTime: {
                      type: "integer",
                    },
                    exerciseName: {
                      type: "string",
                    },
                  },
                },
              },
              timestamp: {
                type: "string",
              },
            },
          },
        },
      },
      tabata: {
        type: "object",
        properties: {
          tittle: {
            type: "string",
          },
          privacy: {
            type: "boolean",
          },
          description: {
            type: "string",
          },
          effortTime: {
            type: "integer",
          },
          rounds: {
            type: "integer",
          },
          restTime: {
            type: "integer",
          },
          exercises: {
            type: "object",
            properties: {
              exercises: {
                type: "array",
                items: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      tabatas: {
        type: "object",
        properties: {
          data: {
            type: "array",
            items: {
              type: "object",
              properties: {
                tabataId: {
                  type: "integer",
                },
                userId: {
                  type: "integer",
                },
                tittle: {
                  type: "string",
                },
                privacy: {
                  type: "boolean",
                },
                description: {
                  type: "string",
                },
                effortTime: {
                  type: "integer",
                },
                rounds: {
                  type: "integer",
                },
                restTime: {
                  type: "integer",
                },
                exercises: {
                  type: "array",
                  items: {
                    type: "string",
                  },
                },
                timestamp: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      tabataWithId: {
        type: "object",
        properties: {
          data: {
            type: "object",
            properties: {
              tabataId: {
                type: "integer",
              },
              userId: {
                type: "integer",
              },
              tittle: {
                type: "string",
              },
              privacy: {
                type: "boolean",
              },
              description: {
                type: "string",
              },
              effortTime: {
                type: "integer",
              },
              rounds: {
                type: "integer",
              },
              restTime: {
                type: "integer",
              },
              exercises: {
                type: "array",
                items: {
                  type: "string",
                },
              },
              timestamp: {
                type: "string",
              },
            },
          },
        },
      },
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        bearerFormat: "JWT",
      },
    },
    responses: {
      unauthorizedError: {
        description: "Access token is missing or invalid",
      },
    },
  },
};

/**
 * > options
 */
const options = {
  swaggerDefinition,
  apis: ["./BLL/api/routes/*.js"],
};

const openAPIConfiguration = swaggerJsdoc(options);

module.exports = openAPIConfiguration;
