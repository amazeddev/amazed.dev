---
title: Express + TypeScript - Application Structure
excerpt: How to structure a project and what REST actually is. Presentation of a simple and universal REST architecture for applications written in Express and TS.
date: December 22, 2022
tags: [node, express, ts]
cover_img: app-structure.jpg
published: true
---

## Introduction

<div class="admission">
Articles in this series:

1. [Express + TypeScript - Project Configuration](https://amazed.dev/blog/ts-express-base-config)
2. [Express + TypeScript - ESLint and Prettier](https://amazed.dev/blog/ts-express-linter-prettier)
3. [Express + TypeScript - CRUD Boilerplate](https://amazed.dev/blog/ts-express-base-crud)
4. **Express + TypeScript - Application Structure**
5. [Express + TypeScript - MongoDB Configuration](https://amazed.dev/blog/ts-express-mongo)
6. [Express + TypeScript - Request Validation with Joi](https://amazed.dev/blog/ts-express-validation)
7. [Express + TypeScript - Application Middlewares](https://amazed.dev/blog/ts-express-middlewares)
</div>

## Why Application Structure Matters

The basic problem with a growing application is how to systematize the code to make it simple, readable, and easy to develop. Writing such an application is not easy, regardless of the language or framework, and usually involves following certain proven practices or architectural patterns.

Express allows writing applications in a very simple way, practically not imposing any requirements on how to write. This has undeniable advantages - I can build applications however I want, but on the other hand, getting stuck in a dead end is very easy and common for inexperienced developers.

## What is REST

REST (Representational State Transfer) is an architectural style for distributed systems, such as the World Wide Web. It was first described by Roy Fielding in his doctoral dissertation in 2000. REST is not a protocol or standard, but a set of architectural constraints that can be applied to any protocol.

The basic assumptions of REST are:

1. **Client-Server Architecture** - separation of concerns between client and server
2. **Statelessness** - each request from client to server must contain all information necessary to understand the request
3. **Cacheability** - responses must implicitly or explicitly define themselves as cacheable or non-cacheable
4. **Uniform Interface** - a uniform interface between components
5. **Layered System** - components cannot see beyond the immediate layer with which they are interacting
6. **Code on Demand (optional)** - servers can temporarily extend or customize the functionality of a client by transferring executable code

## Application Structure

The structure of a REST application written in Express can be very diverse. However, there are some common patterns that are worth following. One of them is the separation of concerns, which means dividing the application into layers responsible for different aspects of its operation.

In this article, I'll show a simple structure that can be used as a starting point for building REST applications. It's based on the following layers:

1. **Routes** - responsible for routing HTTP requests to appropriate handlers
2. **Controllers** - responsible for handling HTTP requests and responses
3. **Services** - responsible for business logic
4. **Models** - responsible for data structure and database operations

Let's start with the services. They should contain business logic and have no idea what `request` and `response` are. Based on predefined arguments, they should return specific results.

Therefore, in the file `/src/books/book.service.ts`, everything related to creating, saving, or deleting elements from the `books` list. For simplicity, database connection will be discussed in the next article, so the `books` list itself (pretending to be a database) and data type definitions related to it will also go into the above-mentioned file.

```ts:src/books/books.service.ts
const randomId = () => Math.random().toString(36).slice(2, 7);

type Book = {
  id: string;
  title: string;
  author: string;
  published: number;
};

type BookInput = Omit<Book, "id">;

let books: Book[] = [
  {
    id: randomId(),
    title: "Lód",
    author: "Dukaj",
    published: 2007,
  },
];

const getAllBooks = (): Book[] => books;

const getBookById = (id: string): Book | undefined =>
  books.find((book) => book.id === id);

const createBook = (input: BookInput): Book => {
  const { title, author, published } = input;
  const newBook = {
    id: randomId(),
    title,
    author,
    published,
  };
  books.push(newBook);
  return newBook;
};

const deleteBookById = (id: string): void => {
  books = books.filter((user) => user.id !== id);
};

export default {
  getAllBooks,
  getBookById,
  createBook,
  deleteBookById,
};
```

All these methods reflect the logic of queries from the previous article. They were just extracted as a new layer of abstraction.

### Controllers

The next file I created is `src/books/books.controller.ts`. This is already the communication layer of my application. Generally, controller methods can be understood as HTTP request handlers. They always take `(req: Request, res: Response)`, extract necessary information from the `req` object and pass it to service methods. Finally, they return the result of the service's work in a standardized HTTP response format (usually JSON) along with a status describing the method's result.

```ts:src/books/books.controller.ts
import { Request, Response } from "express";
import bookService from "./book.service";

const getAllBooksHandler = (req: Request, res: Response) => {
  const response = bookService.getAllBooks();
  res.json({
    data: response,
  });
};

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

const createBookHandler = (req: Request, res: Response) => {
  const { title, author, published } = req.body;

  const response = bookService.createBook({ title, author, published });

  res.status(201).json({
    data: response,
  });
};

const updateBookByIdHandler = (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author, published } = req.body;

  const response = bookService.updateBookById(id, { title, author, published });

  res.status(200).json({
    data: response,
  });
};

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

All methods are very predictable, they destructure `req.params` or `req.body`, pass arguments to `bookService` methods and return the result via `res.json()`. Only `getBookByIdHandler` differs slightly, as it reacts to the lack of a result from the `bookService.getBookById(id)` method and returns failure information along with a 404 status.

```ts:src/books/books.controller.ts
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
```

Error handling will be described in more detail in articles about database connection and in the next one specifically related to error handling.

### Routes

The last new file will be `/src/books/books.routes.ts`, containing a module mapping URL addresses and HTTP methods to handlers imported from `src/books/books.controller.ts` handling HTTP requests.

```ts:src/books/books.routes.ts
import { Router } from "express";
import booksController from "./books.controller";

const booksRouter = Router();

//GET all books
booksRouter.get("/", booksController.getAllBooksHandler);

// POST book
booksRouter.post("/", booksController.createBookHandler);

// GET one book by id
booksRouter.get("/:id", booksController.getBookByIdHandler);

// DELETE book by id
booksRouter.delete("/:id", booksController.deleteBookByIdHandler);

// PUT (update) book by id
booksRouter.put("/:id", booksController.updateBookByIdHandler);

export default booksRouter;
```

At the very beginning, I import `Router` from `express`, which will allow registering handlers along with their corresponding URLs and HTTP methods. I export such a `booksRouter` object at the end to use it later in the main application file.

## Main Module and Server

The main module can be understood as a piece of code that imports and somehow combines all business modules with their functionalities, and then exports them to the outside as a single object.

```ts:src/app.ts
import express from "express";
import booksRouter from "./books/books.routes";

const app = express();
app.use(express.json());

app.use("/api/books", booksRouter);

export default app;
```

The server, on the other hand, is the part of the application that is run as a server. It imports the main application module, provides necessary configurations for its operation (here environment variables), and maintains listening for requests to the application.

```ts:src/index.ts
import app from "./app";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});
```

Apart from purely structural values, such separation has one huge advantage. When testing the application, I will be able to test its main module without the need to initialize the server. More about tests in the next articles.

## Summary

Express, in all its simplicity, allows writing unstructured code that will become increasingly difficult to maintain and develop as the application grows.

That's why following standards and good practices in writing code is extremely important. The next articles will show that applying just two simple principles: modular architecture and separation of concerns will allow further simple development of this application. The code of the above application is in the [GitHub repository](https://github.com/amazeddev/express-ts/tree/structure).
