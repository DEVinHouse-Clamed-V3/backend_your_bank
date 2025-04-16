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
        name: "Henrique Douglas",
      },
      errorResponse: {
        message: "Mensagem de erro",
      },
      responseGetCreditCardsByClient: [
        {
          id: 9,
          client_id: 12,
          placeholder: "Henrique Douglas",
          number: "8568280719675632",
          cvv: "535",
          expiration_date: "2030-04-15",
          limit: "50.00",
          created_at: "2025-04-15T21:12:39.799Z",
          updated_at: "2025-04-15T21:12:39.799Z",
        },
      ],
      responseGetOperators: [
        {
          id: 1,
          name: "Operadora 1",
          cover: "url_da_imagem",
          created_at: "2025-04-15T21:12:39.799Z",
          updated_at: "2025-04-15T21:12:39.799Z",
        },
      ],
      responseGetBalanceByClient: {
        balance: 1000.5,
      },
      responseCreateRecharge: {
        id: 1,
        client_id: 1,
        value: 100,
        type: "SAIDA",
        balance: 900.5,
        description: "Recarga de 100 para o número 999999999",
        created_at: "2025-04-15T21:12:39.799Z",
        updated_at: "2025-04-15T21:12:39.799Z",
      },
      responseGetMovementByClientAndDate: [
        {
          id: 14,
          client_id: 12,
          value: 999,
          type: "ENTRADA",
          description: "Bônus de criação de conta",
          balance: 999,
          created_at: "2025-04-15T21:12:39.839Z",
          updated_at: "2025-04-15T21:12:39.839Z",
        },
      ],
    },
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
      },
    },
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
