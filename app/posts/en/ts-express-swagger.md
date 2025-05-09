---
title: Express + TypeScript - API Documentation with Swagger
excerpt: Every application should be documented in a clear and comprehensive way. APIs written in Express and TS can be easily enriched with great documentation using Swagger.
date: January 7, 2023
tags: [node, express, ts, swagger]
cover_img: swagger.jpg
published: false
---

## Introduction

<div class="admission">
Articles in this series:

1. [Express + TypeScript - Project Configuration](https://amazed.dev/blog/ts-express-base-config)
2. [Express + TypeScript - ESLint and Prettier](https://amazed.dev/blog/ts-express-linter-prettier)
3. [Express + TypeScript - CRUD Boilerplate](https://amazed.dev/blog/ts-express-base-crud)
4. [Express + TypeScript - Application Structure](https://amazed.dev/blog/ts-express-structure)
5. [Express + TypeScript - MongoDB Configuration](https://amazed.dev/blog/ts-express-mongo)
6. [Express + TypeScript - Request Validation with Joi](https://amazed.dev/blog/ts-express-validation)
7. [Express + TypeScript - Application Middlewares](https://amazed.dev/blog/ts-express-middlewares)
</div>

## What is Swagger

Swagger (now known as OpenAPI) is a set of tools for designing, building, documenting, and consuming REST APIs. It provides a standardized way to describe REST APIs, making it easier for developers to understand and use them.

The main components of Swagger are:

1. **Swagger Editor** - a browser-based editor for designing and documenting APIs
2. **Swagger UI** - a collection of HTML, JavaScript, and CSS assets that dynamically generate beautiful documentation from a Swagger-compliant API
3. **Swagger Codegen** - a tool that generates client libraries, server stubs, and API documentation from a Swagger specification

## Setting up Swagger in Express

To add Swagger documentation to our Express application, we need to install a few packages:

```bash:terminal
npm i swagger-ui-express swagger-jsdoc
```

The first package provides the Swagger UI interface, while the second one allows us to generate Swagger documentation from JSDoc comments in our code.

## Creating Swagger Configuration

Let's create a new file `src/config/swagger.ts` to store our Swagger configuration:

```ts:src/config/swagger.ts
import swaggerJsdoc from "swagger-jsdoc";

const options = {
  definition: {
    openapi: "3.0.0",
    info: {
      title: "Books API",
      version: "1.0.0",
      description: "A simple Express API for managing books",
    },
    servers: [
      {
        url: "http://localhost:5000",
        description: "Development server",
      },
    ],
  },
  apis: ["./src/books/*.ts"], // Path to the API docs
};

export const specs = swaggerJsdoc(options);
```

This configuration defines basic information about our API, such as its title, version, and description. It also specifies where to look for API documentation (in our case, in the `src/books` directory).

## Adding Swagger UI to Express

Now, let's add Swagger UI to our Express application. We'll modify the `src/app.ts` file:

```ts:src/app.ts
import express from "express";
import swaggerUi from "swagger-ui-express";
import { specs } from "./config/swagger";
import booksRouter from "./books/books.routes";

const app = express();
app.use(express.json());

// Swagger documentation route
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(specs));

app.use("/api/books", booksRouter);

export default app;
```

This adds a new route `/api-docs` that will serve our Swagger documentation.

## Documenting API Endpoints

Now, let's document our API endpoints using JSDoc comments. We'll modify our controller file to include Swagger documentation:

```ts:src/books/books.controller.ts
import { Request, Response } from "express";
import bookService from "./book.service";

/**
 * @swagger
 * /api/books:
 *   get:
 *     summary: Returns a list of books
 *     tags: [Books]
 *     responses:
 *       200:
 *         description: The list of books
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                       title:
 *                         type: string
 *                       author:
 *                         type: string
 *                       published:
 *                         type: number
 */
const getAllBooksHandler = (req: Request, res: Response) => {
  const response = bookService.getAllBooks();
  res.json({
    data: response,
  });
};

/**
 * @swagger
 * /api/books/{id}:
 *   get:
 *     summary: Get a book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       200:
 *         description: The book description by id
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     author:
 *                       type: string
 *                     published:
 *                       type: number
 *       404:
 *         description: The book was not found
 */
const getBookByIdHandler = (req: Request, res: Response) => {
  const { id } = req.params;
  const response = bookService.getBookById(id);

  if (!response) {
    res.status(404).json({ msg: "Book not found" });
  }

  res.json({
    data: response,
  });
};

/**
 * @swagger
 * /api/books:
 *   post:
 *     summary: Create a new book
 *     tags: [Books]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - author
 *               - published
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               published:
 *                 type: number
 *     responses:
 *       201:
 *         description: The book was successfully created
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     author:
 *                       type: string
 *                     published:
 *                       type: number
 */
const createBookHandler = (req: Request, res: Response) => {
  const { title, author, published } = req.body;

  const response = bookService.createBook({ title, author, published });

  res.status(201).json({
    data: response,
  });
};

/**
 * @swagger
 * /api/books/{id}:
 *   put:
 *     summary: Update a book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               author:
 *                 type: string
 *               published:
 *                 type: number
 *     responses:
 *       200:
 *         description: The book was updated
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     title:
 *                       type: string
 *                     author:
 *                       type: string
 *                     published:
 *                       type: number
 *       404:
 *         description: The book was not found
 */
const updateBookByIdHandler = (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author, published } = req.body;

  const response = bookService.updateBookById(id, { title, author, published });

  res.status(200).json({
    data: response,
  });
};

/**
 * @swagger
 * /api/books/{id}:
 *   delete:
 *     summary: Delete a book by id
 *     tags: [Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: string
 *         required: true
 *         description: The book id
 *     responses:
 *       204:
 *         description: The book was deleted
 *       404:
 *         description: The book was not found
 */
const deleteBookByIdHandler = (req: Request, res: Response) => {
  const { id } = req.params;

  bookService.deleteBookById(id);

  res.status(204);
};

export default {
  getAllBooksHandler,
  getBookByIdHandler,
  createBookHandler,
  updateBookByIdHandler,
  deleteBookByIdHandler,
};
```

## Testing the Documentation

Now you can start your server and visit `http://localhost:5000/api-docs` to see your API documentation. The Swagger UI will show all your endpoints, their parameters, request bodies, and responses.

## Summary

Adding Swagger documentation to your Express API is a great way to make it more accessible and easier to use. The documentation is automatically generated from your code, so it will always be up to date with your implementation.

The complete code for the application from the above article can be found in the [GitHub repository](https://github.com/amazeddev/express-ts/tree/swagger).
