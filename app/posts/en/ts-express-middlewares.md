---
title: Express + TypeScript - Application Middlewares
excerpt: Understanding the operation and usage of middlewares in Express + TS applications. Using middlewares for logging, error handling, and API security.
date: January 1, 2023
tags: [node, express, ts]
cover_img: between.jpg
published: true
---

## Introduction

<div class="admission">
Articles in this series:

1. [Express + TypeScript - Project Configuration](https://amazed.dev/blog/ts-express-base-config)
2. [Express + TypeScript - ESLint and Prettier](https://amazed.dev/blog/ts-express-linter-prettier)
3. [Express + TypeScript - CRUD Boilerplate](https://amazed.dev/blog/ts-express-base-crud)
4. [Express + TypeScript - Application Structure](https://amazed.dev/blog/ts-express-structure)
5. [Express + TypeScript - MongoDB Configuration](https://amazed.dev/blog/ts-express-mongo)
6. [Express + TypeScript - Request Validation with Joi Library](https://amazed.dev/blog/ts-express-validation)
7. **Express + TypeScript - Application Middlewares**
</div>

## Middlewares

In the `Express` framework, _middlewares are functions that are executed during the processing of a \_request_ by the server. You could say that anything that has access to the `req` and `res` objects and executes between request registration and response return is a _middleware_.

Following this line of thinking, request handling, including all routing and controllers, is also a type of _middleware_. Therefore, each _middleware_ can serve several functions:

- execute any code;
- modify the `req` and `res` objects;
- end the request-response cycle;
- pass control to the next _middleware_ function;

However, one of the last two points must be fulfilled. If the function doesn't return a response to the request, it must pass control to the next _middleware_ by calling the `next()` method.

Middleware functions can be divided into three basic groups, depending on where they are called and how broad their request _scope_ is:

- application-level middleware
- route-level middleware
- error-handling middleware

### Application-level middleware

The first type of _middleware_ consists of functions called on the application object using the `app.use()` method (or related methods associated with _HTTP_ methods). They can have a scope related to a specific _URL_ or be called for all incoming requests.

A simple example of such a function is a _logger_ that will be triggered for every _request_, and after executing its own code, it will pass the execution context to the next _middleware_ using the `next()` method, in this case to the _router_.

```ts:src/middlewares/logger.middleware.ts
import { NextFunction, Request, Response } from "express";

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const { url, method } = req;
  const time = new Date().toISOString();
  console.log(`${time} - [${method}] ${url}`);
  next();
};
```

The function itself is very simple - it extracts the data I'm interested in from the `req` object, logs it along with the current time, and then passes the 'baton' to the next function using `next()`.

In `src/app.ts`, it's enough to import the function and pass it to `app.use(logger)`. By the way, below you can see that `express.json()` is also an application-level _middleware_ that parses (transforms) the _JSON_ formatted _request_ body into a _JS_ and _TS_ understandable object.

```ts:src/app.ts
import express from "express";
import booksRouter from "./books/books.routes";
import { logger } from "./middlewares/logger.middleware";

const app = express();
app.use(express.json());

app.use(logger);

app.use("/api/books", booksRouter);

export default app;
```

Now when I make several different requests to the server in sequence, I'll see related logs:

```bash
2022-12-29T22:07:43.417Z - [GET] /api/books/63ac4658f8e95c6765f38fbe
2022-12-29T22:08:12.631Z - [GET] /api/books
```

This type of _middleware_ can also be called inside the `app.use()` method handling specific _routing_. In this case, since my application has only one _router_, the _logger middleware_ can be used in the following way without changing the application's behavior:

```ts:src/app.ts
import express from "express";
import booksRouter from "./books/books.routes";
import { logger } from "./middlewares/logger.middleware";

const app = express();
app.use(express.json());

// app.use(logger);

app.use("/api/books", logger, booksRouter);

export default app;
```

This approach allows for attaching different functions depending on needs.

### Route-level middleware

As the name suggests, this is a function that limits its execution to a single _router_ in the application. These are very similar functions to those described above, with the difference that they are called on the `router` object rather than `app`.

### Error-handling middlewares

This type of middleware is designed to handle application errors in a user-desired way. It differs from previous _middlewares_ in its argument syntax, as it requires four instead of three, namely `( err: ApplicationError, req: Request, res: Response, next: NextFunction)`.

I'll start building such a _general-application_ error handling _middleware_ by creating a new `ApplicationError` class that extends the `Error` class. The goal is to store and pass along, besides the _error message_ itself, the _status code_ associated with the error.

```ts:src/errors/application.error.ts
export class ApplicationError extends Error {
  public statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}
```

Once I have this, I can write the custom _middleware_ for handling application errors.

```ts:src/middlewares/errorHandler.middleware.ts
import { NextFunction, Request, Response } from "express";
import { ApplicationError } from "../errors/application.error";

export const errorHandler = (
  err: ApplicationError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errStatus = err.statusCode || 500;
  const errMessage = err.message || "Something went wrong";
  res.status(errStatus).json({
    error: errMessage,
  });
};
```

The function takes an _error_ and returns a _response_ with extracted `statusCode` and `message`. If either value is missing, I fill them with _defaults_. Such a generic error-related _response_ can later be extended with more information, such as _status code_, request success information, or even error _stack_trace_.

Now I can add the newly created _middleware_ to the application.

```ts:src/app.ts
import express from "express";
import booksRouter from "./books/books.routes";
import { errorHandler } from "./middlewares/errorHandler.middleware";
import { logger } from "./middlewares/logger.middleware";

const app = express();
app.use(express.json());
app.use(logger);

app.use("/api/books", booksRouter);

app.use(errorHandler);

export default app;
```

The last step is to pass every application error _caught_ in the controller to the `errorHandler` _middleware_ using the `next()` method. For this reason, in all functions in the controller, I extend the list of accepted arguments with `next: NextFunction`, and in each `try/catch` block, instead of returning an error, I send it to the handler using `next(error)`.

```ts:src/books/books.controller.ts
import { NextFunction, Request, Response } from "express";
import { ApplicationError } from "../errors/application.error";
import bookService from "./books.service";
import {
  createBookValidator,
  updateBookValidator,
} from "./utils/validation.utils";

const getAllBooksHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ data: await bookService.getAllBooks() });
  } catch (error) {
    next(error);
  }
};

const getBookByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const response = await bookService.getBookById(id);
    if (!response) {
      next(new ApplicationError(404, "Book not found"));
    }
    res.json({ data: response });
  } catch (error) {
    next(error);
  }
};

const createBookHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { title, author, published, cover } = req.body;
  const { error } = createBookValidator({ title, author, published, cover });
  if (error) {
    next(
      new ApplicationError(400, error.details.map((err) => err.message).join(","))
    );
  }

  try {
    const response = await bookService.createBook({
      title,
      author,
      published,
      cover,
    });

    res.status(201).json({
      data: response,
    });
  } catch (error) {
    next(error);
  }
};

const updateBookByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  const { title, author, published, cover } = req.body;
  const { error } = updateBookValidator({ title, author, published, cover });
  if (error) {
    next(
      new ApplicationError(400, error.details.map((err) => err.message).join(","))
    );
  }
  try {
    const response = await bookService.updateBookById(id, { title, author, published, cover });
    res.status(200).json({ data: response });
  } catch (error) {
    next(error);
  }
};

const deleteBookByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    await bookService.deleteBookById(id);
    res.status(204);
  } catch (error) {
    next(error);
  }
};

export default {
  getAllBooksHandler,
  getBookByIdHandler,
  createBookHandler,
  updateBookByIdHandler,
  deleteBookByIdHandler,
};
```

It's worth noting the way application logic errors are handled. In the `getBookByIdHandler()` method, when I don't find a record with the given `id`, with the current error handling approach, it's enough to create a new instance of `ApplicationError`, passing the desired _status code_ and _error message_ as arguments to the constructor, and pass it for further handling using the `next()` method.

```ts:src/books/books.controller.ts
const getBookByIdHandler = async (req: Request, res: Response, next: NextFunction) => {
  const { id } = req.params;
  try {
    const response = await bookService.getBookById(id);
    if (!response) {
      next(new ApplicationError(404, "Book not found"));
    }
    res.json({ data: response });
  } catch (error) {
    next(error);
  }
};
```

The same applies to the `createBookHandler` and `updateBookByIdHandler` methods.

## Bonus - Useful 3rd Party Middlewares

#### morgan

`morgan` is a logger for `Node`-based applications. To install the package along with TypeScript support, run in the terminal:

```bash:terminal
npm i morgan
npm i --save-dev @types/morgan
```

It's used like other _application-level middlewares_, by calling `app.use(morgan("<format>"))`.

```ts:src/app.ts
import express from "express";
import morgan from "morgan";
import booksRouter from "./books/books.routes";
import { errorHandler } from "./middlewares/errorHandler.middleware";

const app = express();
app.use(express.json());
app.use(morgan("tiny"));

app.use("/api/books", booksRouter);

app.use(errorHandler);

export default app;
```

As a logger, it returns much more useful information. Compared to the _custom_ `logger`, `morgan("tiny")` - the argument indicates the log presentation format, more in the documentation - returns not only information about the `request` but also data from the `response` such as _status code_ or request duration.

```bash
GET /api/books 200 202 - 6.439 ms
GET /api/books/63ac4658f8e95c6765f38fbe 200 100 - 3.393 ms
```

#### helmet

This is a collection of small _middlewares_ responsible for securing the application by setting or modifying various _HTTP Headers_. The goal is to protect against known and popular security vulnerabilities.

Install using:

```bash:terminal
npm i helmet
```

Usage looks identical to other external _middlewares_: `app.use(helmet())`.

#### cors

This is a _middleware_ that allows managing the _CORS_ (cross-origin resource sharing) policy in an _Express_ application.

```bash:terminal
npm i cors
npm i --save-dev @types/cors
```

For detailed information and usage examples, I refer you to the [cors documentation](https://www.npmjs.com/package/cors).

## Summary

In this way, I've explained the operation and concept behind _middleware_ functions in the `Express` framework. I've also described interesting ways to use them: a `logger` that returns information about server requests in the application logs, and an `errorHandler` that makes application error handling generic, simple, and centralized in one place.

As usual, the code related to the above article can be found in the [GitHub repository](https://github.com/amazeddev/express-ts/tree/middlewares)
