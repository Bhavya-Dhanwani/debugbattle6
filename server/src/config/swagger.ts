import swaggerJsdoc from "swagger-jsdoc";

const port = process.env.PORT || 5000;

const swaggerOptions: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "E-Commerce API Documentation",
      version: "1.0.0",
      description: "API Documentation for the E-Commerce backend (TypeScript) featuring authentication, user, product, cart, and order management.",
    },
    servers: [
      {
        url: `http://localhost:${port}`,
        description: "Development Server",
      },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
          description: "Enter your JWT token in the format: Bearer <token>",
        },
      },
      schemas: {
        User: {
          type: "object",
          properties: {
            id: { type: "string", example: "64f9b2c7e1234567890abcde" },
            name: { type: "string", example: "John Doe" },
            email: { type: "string", example: "john@example.com" },
            role: { type: "string", enum: ["user", "admin"], example: "user" },
          },
          required: ["id", "name", "email", "role"],
        },
        Product: {
          type: "object",
          properties: {
            _id: { type: "string", example: "64f9b2c7e1234567890abcdf" },
            name: { type: "string", example: "Mechanical Keyboard" },
            description: { type: "string", example: "RGB mechanical keyboard" },
            price: { type: "number", example: 99.99 },
            category: { type: "string", example: "Electronics" },
            stock: { type: "number", example: 50 },
            imageUrl: { type: "string", example: "http://example.com/keyboard.jpg" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
          required: ["_id", "name", "price", "category", "stock"],
        },
        CartItem: {
          type: "object",
          properties: {
            product: { $ref: "#/components/schemas/Product" },
            quantity: { type: "number", minimum: 1, example: 2 },
          },
          required: ["product", "quantity"],
        },
        Cart: {
          type: "object",
          properties: {
            _id: { type: "string", example: "64f9b2c7e1234567890abcda" },
            user: { type: "string", example: "64f9b2c7e1234567890abcde" },
            items: {
              type: "array",
              items: { $ref: "#/components/schemas/CartItem" },
            },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
          required: ["_id", "user", "items"],
        },
        OrderItem: {
          type: "object",
          properties: {
            product: { $ref: "#/components/schemas/Product" },
            quantity: { type: "number", minimum: 1, example: 2 },
            price: { type: "number", example: 99.99 },
          },
          required: ["product", "quantity", "price"],
        },
        Order: {
          type: "object",
          properties: {
            _id: { type: "string", example: "64f9b2c7e1234567890abcdb" },
            user: { type: "string", example: "64f9b2c7e1234567890abcde" },
            items: {
              type: "array",
              items: { $ref: "#/components/schemas/OrderItem" },
            },
            totalAmount: { type: "number", example: 199.98 },
            status: { type: "string", enum: ["pending", "processing", "shipped", "delivered", "cancelled"], example: "pending" },
            createdAt: { type: "string", format: "date-time" },
            updatedAt: { type: "string", format: "date-time" },
          },
          required: ["_id", "user", "items", "totalAmount", "status"],
        },
        RegisterDTO: {
          type: "object",
          properties: {
            name: { type: "string", example: "John Doe" },
            email: { type: "string", format: "email", example: "john@example.com" },
            password: { type: "string", format: "password", example: "password123" },
          },
          required: ["name", "email", "password"],
        },
        LoginDTO: {
          type: "object",
          properties: {
            email: { type: "string", format: "email", example: "john@example.com" },
            password: { type: "string", format: "password", example: "password123" },
          },
          required: ["email", "password"],
        },
        RefreshTokenDTO: {
          type: "object",
          properties: {
            refreshToken: { type: "string", example: "eyJhbGciOi..." },
          },
          required: ["refreshToken"],
        },
        AddCartItemDTO: {
          type: "object",
          properties: {
            productId: { type: "string", example: "64f9b2c7e1234567890abcdf" },
            quantity: { type: "number", minimum: 1, example: 2 },
          },
          required: ["productId", "quantity"],
        },
        CreateProductDTO: {
          type: "object",
          properties: {
            name: { type: "string", example: "Mechanical Keyboard" },
            description: { type: "string", example: "RGB mechanical keyboard" },
            price: { type: "number", example: 99.99 },
            category: { type: "string", example: "Electronics" },
            stock: { type: "number", example: 50 },
            imageUrl: { type: "string", example: "http://example.com/keyboard.jpg" },
          },
          required: ["name", "price", "category"],
        },
        UpdateProductDTO: {
          type: "object",
          properties: {
            name: { type: "string", example: "Mechanical Keyboard" },
            description: { type: "string", example: "RGB mechanical keyboard" },
            price: { type: "number", example: 99.99 },
            category: { type: "string", example: "Electronics" },
            stock: { type: "number", example: 50 },
            imageUrl: { type: "string", example: "http://example.com/keyboard.jpg" },
          },
        },
        AuthResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            statusCode: { type: "number", example: 200 },
            message: { type: "string", example: "Login successful" },
            data: {
              type: "object",
              properties: {
                user: { $ref: "#/components/schemas/User" },
                accessToken: { type: "string" },
                refreshToken: { type: "string" },
              },
              required: ["user", "accessToken", "refreshToken"],
            },
          },
          required: ["success", "statusCode", "message", "data"],
        },
        RefreshResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            statusCode: { type: "number", example: 200 },
            message: { type: "string", example: "Access token refreshed successfully" },
            data: {
              type: "object",
              properties: {
                accessToken: { type: "string" },
                refreshToken: { type: "string" },
              },
              required: ["accessToken", "refreshToken"],
            },
          },
          required: ["success", "statusCode", "message", "data"],
        },
        ProductResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            statusCode: { type: "number", example: 200 },
            message: { type: "string", example: "Product fetched successfully" },
            data: { $ref: "#/components/schemas/Product" },
          },
          required: ["success", "statusCode", "message", "data"],
        },
        ProductListResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            statusCode: { type: "number", example: 200 },
            message: { type: "string", example: "Products fetched successfully" },
            data: {
              type: "array",
              items: { $ref: "#/components/schemas/Product" },
            },
          },
          required: ["success", "statusCode", "message", "data"],
        },
        CartResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            statusCode: { type: "number", example: 200 },
            message: { type: "string", example: "Cart fetched successfully" },
            data: { $ref: "#/components/schemas/Cart" },
          },
          required: ["success", "statusCode", "message", "data"],
        },
        OrderResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            statusCode: { type: "number", example: 201 },
            message: { type: "string", example: "Order placed successfully" },
            data: { $ref: "#/components/schemas/Order" },
          },
          required: ["success", "statusCode", "message", "data"],
        },
        OrderListResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            statusCode: { type: "number", example: 200 },
            message: { type: "string", example: "Order history fetched successfully" },
            data: {
              type: "array",
              items: { $ref: "#/components/schemas/Order" },
            },
          },
          required: ["success", "statusCode", "message", "data"],
        },
        SuccessMessageResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            statusCode: { type: "number", example: 200 },
            message: { type: "string", example: "Operation successful" },
            data: { type: "object", nullable: true, default: null },
          },
          required: ["success", "statusCode", "message", "data"],
        },
        DeleteProductResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: true },
            statusCode: { type: "number", example: 200 },
            message: { type: "string", example: "Product deleted successfully" },
            data: {
              type: "object",
              properties: {
                id: { type: "string", example: "64f9b2c7e1234567890abcdf" },
              },
              required: ["id"],
            },
          },
          required: ["success", "statusCode", "message", "data"],
        },
        ErrorResponse: {
          type: "object",
          properties: {
            success: { type: "boolean", example: false },
            statusCode: { type: "number", example: 400 },
            message: { type: "string", example: "Error message details" },
          },
          required: ["success", "statusCode", "message"],
        },
      },
    },
  },
  apis: [
    "./src/routes/**/*.ts",
    "./src/routes/**/*.js",
    "./src/config/swagger.ts",
    "./dist/routes/**/*.js",
  ],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);

export default swaggerSpec;
