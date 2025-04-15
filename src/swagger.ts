import swaggerAutogen from "swagger-autogen";

const doc = {
  info: {
    version: "v1.0.0",
    title: "Documentação da API do your bank",
    description: "API para gerenciamento de contas e transações financeiras.",
  },
  servers: [
    {
      url: "http://localhost:3000",
      description: "Servidor de desenvolvimento",
    },
  ],
  components: {
    schemas: {
      registerUserBody: {
        $name: "Henrique Douglas",
        $email: "henrique@gmail.com",
        $password: "123456",
        $document: "999.999.999-98",
        $gender: "M",
        income: 0,
      },
      responseRegisterUser: {
        name: "Henrique Douglas"
      },
      errorResponse: {
        message: "Mensagem de erro"
      }
    }
  },
};

const outputFile = "./swagger_output.json";

const endpointsFiles = [
  "./src/routes/user.routes.ts",
  "./src/routes/auth.routes.ts",
  "./src/routes/client.routes.ts",
  "./src/routes/creditCard.routes.ts",
  "./src/routes/operator.routes.ts",
  "./src/routes/recharge.routes.ts",
  "./src/routes/movement.routes.ts",
];

swaggerAutogen({ openapi: "3.0.0" })(outputFile, endpointsFiles, doc);
