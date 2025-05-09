---
title: Express + TypeScript - CRUD Boilerplate
excerpt: Introduction to creating a CRUD application in Express with TypeScript. Explanation of routing and methods for handling request data.
date: December 16, 2022
tags: [node, express, ts]
cover_img: node_express_CRUD_starter.jpg
published: true
---

## Introduction

In this post, I demonstrate how to build a simple **CRUD** application as an extension of the _boilerplate_ created in [Express + TypeScript - Project Configuration](https://amazed.dev/blog/ts-express-base-config). This article will focus on routing and extracting data from HTTP requests. Database topics are omitted to keep this article concise and will be covered in later parts of this series.

The complete code discussed in this article is available in the [GitHub repository](https://github.com/amazeddev/express-ts/tree/base-crud).

<div class="admission">
Articles in this series:

1. [Express + TypeScript - Project Configuration](https://amazed.dev/blog/ts-express-base-config)
2. [Express + TypeScript - ESLint and Prettier](https://amazed.dev/blog/ts-express-linter-prettier)
3. **Express + TypeScript - CRUD Boilerplate**
4. [Express + TypeScript - Application Structure](https://amazed.dev/blog/ts-express-structure)
5. [Express + TypeScript - MongoDB Configuration](https://amazed.dev/blog/ts-express-mongo)
6. [Express + TypeScript - Request Validation with Joi](https://amazed.dev/blog/ts-express-validation)
7. [Express + TypeScript - Application Middleware](https://amazed.dev/blog/ts-express-middlewares)
</div>

## First Server

The `src/index.ts` file, created in the previously linked article, is very simple and doesn't require detailed discussion. It imports necessary elements from the `express` framework, initializes the application, registers a basic HTTP request handler, and finally starts listening on port `5000`.

```ts
import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(5000, () => {
  console.log("Server started on port 5000!");
});
```

## Routing

### CRUD Application

CRUD stands for **C**reate - **R**ead - **U**pdate - **D**elete, describing a standard way of building simple services operating on a given data entity. The application must allow for creating, retrieving, updating, and deleting records.

To extend the application, I start by defining a simple data storage object to simulate a database (actual database integration will be covered in future articles). This will be a simple list containing objects with a predefined `type Book`, representing a basic book entity. The service simulates a simplified library application, which I will gradually expand.

```ts
import express from "express";

const app = express();

const randomId = (): string => Math.random().toString(36).slice(2, 7);

interface Book {
  id: string;
  title: string;
  author: string;
  published: number;
}

const books: Book[] = [
  {
    id: randomId(),
    title: "Ice",
    author: "Dukaj",
    published: 2007,
  },
];

// Routing

// GET all books

// GET single book

// POST new book

// PUT (update) book

// DELETE book

app.listen(5000, () => {
  console.log("Server started on port 5000!");
});
```

## CRUD Endpoints

### GET All Books

```ts
app.get("/api/books", (req: Request, res: Response) => {
  res.json({ data: books });
});
```

### POST a New Book

```ts
app.post("/api/books", (req: Request, res: Response) => {
  const { title, author, published } = req.body;
  const newBook = { id: randomId(), title, author, published };
  books.push(newBook);
  res.status(201).json({ data: newBook });
});
```

### GET a Single Book by ID

```ts
app.get("/api/books/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const book = books.find(item => item.id === id);
  res.json({ data: book });
});
```

### DELETE a Book by ID

```ts
app.delete("/api/books/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  books = books.filter(book => book.id !== id);
  res.status(204).send();
});
```

### PUT (Update) a Book by ID

```ts
app.put("/api/books/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author, published } = req.body;
  const existingBook = books.find(item => item.id === id);

  if (!existingBook) {
    const newBook = { id: randomId(), title, author, published };
    books.push(newBook);
    return res.status(201).json({ data: newBook });
  }

  const updatedBook: Book = {
    id,
    title: title || existingBook.title,
    author: author || existingBook.author,
    published: published || existingBook.published,
  };

  books = books.map(book => (book.id === id ? updatedBook : book));
  res.json({ data: updatedBook });
});
```

## Summary

Even though this was a lengthy explanation, the application remains a single-file project. However, what we now have is a simple **CRUD** application that provides a solid foundation for further development. The complete code for this application is available in the [repository](https://github.com/amazeddev/express-ts/tree/base-crud).

Upcoming articles will cover topics such as database integration, proper error handling, middleware usage, and more.

