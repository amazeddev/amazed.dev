---
title: Express + TypeScript - Request Validation with Joi
excerpt: A simple way to validate data from incoming requests to an API written with Express and TS using the Joi library.
date: December 29, 2022
tags: [node, express, ts]
cover_img: check.jpg
published: true
---

## Introduction

<div class="admission">
Articles in this series:

1. [Express + TypeScript - Project Configuration](https://amazed.dev/blog/en/ts-express-base-config)
2. [Express + TypeScript - ESLint and Prettier](https://amazed.dev/blog/en/ts-express-linter-prettier)
3. [Express + TypeScript - CRUD Boilerplate](https://amazed.dev/blog/en/ts-express-base-crud)
4. [Express + TypeScript - Application Structure](https://amazed.dev/blog/en/ts-express-structure)
5. [Express + TypeScript - MongoDB Configuration](https://amazed.dev/blog/en/ts-express-mongo)
6. **Express + TypeScript - Request Validation with Joi**
7. [Express + TypeScript - Application Middlewares](https://amazed.dev/blog/en/ts-express-middlewares)
</div>

## Project Preparation

I continue discussing the problem of validation and error handling based on the article [Express + TypeScript - MongoDB Configuration](https://amazed.dev/blog/ts-express-mongo).

## Where to Validate

Continuing work on a REST API written in `Express` and `TypeScript`, the problem of validating external requests arises. Usually, for such simple projects, two approaches are considered.

The first involves validating the object I want to save at the data model level. `mongoose` provides the ability to add validation conditions for each field to the schema. However, this approach has drawbacks. The validation proposed by `mongoose` is quite simple and limited, and when we start adding many rules there, the schema becomes unreadable. Secondly, I believe this is not the place for validation. The request passes through all layers of the application before being checked for data correctness.

The second way, much better, is validation at the communication layer level. The request should be checked where we still have access to it, not just to arguments built on its basis. Hence the decision to perform validation inside controllers.

## How to Validate

For the validation itself, I'll use the `Joi` library, which I need to install.

```bash:terminal
npm i joi
```

Now inside `src/books` I create a `utils` folder and in it a file `validation.utils.ts`, which will contain functions helping to validate inputs for requests to create and update records. As parameters of these functions, I pass data types `CreateBookInput` and `UpdateBookInput` reflecting `req.body`, which will be validated.

```ts:src/books/utils/validation.utils.ts
import Joi from "joi";
import { bookCover, CreateBookInput, UpdateBookInput } from "../books.model";

export const createBookValidator = (data: CreateBookInput) => {
  const schema = Joi.object({
    title: Joi.string().min(2).max(100).required(),
    author: Joi.string().min(2).max(50).required(),
    published: Joi.number().min(1000).max(2022).required(),
    cover: Joi.string().valid(bookCover).required(),
  });

  return schema.validate(data, { abortEarly: false });
};

export const updateBookValidator = (data: UpdateBookInput) => {
  const schema = Joi.object({
    title: Joi.string().min(2).max(100),
    author: Joi.string().min(2).max(50),
    published: Joi.number().min(1000).max(2022),
    cover: Joi.string().valid(bookCover),
  });

  return schema.validate(data, { abortEarly: false });
};
```

Validation using the `Joi` package takes place in two stages. In the first, I create an object schema, describing in it what conditions each field of the passed object should meet. You can enforce data type like `string()` or `number()`, key length (`max()` and `min()`), whether it's required (`required()`), whether the value is in an enum or some passed list of desired values, and many others, which you can read about in the package documentation.

The second stage is validating the object passed in the argument, i.e., in my case, what will come in `req.body` with the schema described above. The `.validate()` method returns an object with `value` and `error` keys. In case of successful validation, the `value` object contains the validated data. In case of failure, the `error` object contains the validation error.

If I pass the options object `{ abortEarly: false }` as the second argument to the `.validate()` method, validation will not be interrupted after encountering the first error, but will check and return in the `error` object a list of all errors in the format `[{ message: string; path: string; type: string }]`.

`updateBookValidator()` differs from `createBookValidator()` only in that each field is not required (`required()`).

When the helper functions for validation are ready, it's enough to import them in the controller and use them before calling service methods. From the result of the function, it's enough to extract the potential `error` object and if it exists, return HTTP status **400 - Bad Request**, along with the error message itself.

```ts:src/books/books.controller.ts
const createBookHandler = async (req: Request, res: Response) => {
  const { title, author, published, cover } = req.body;

  // Validate request
  const { error } = createBookValidator({ title, author, published, cover });
  if (error) {
    return res.status(400).json({
      error: error.details.map((err) => err.message).join(","),
    });
  }

  try {
    const response = await bookService.createBook({ title, author, published, cover });
    res.status(201).json({ data: response });
  } catch (error) {
    res.status(500).json({ error });
  }
};
```

```ts:src/books/books.controller.ts
const updateBookByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author, published, cover } = req.body;

  // Validate request
  const { error } = updateBookValidator({ title, author, published, cover });
  if (error) {
    return res.status(400).json({
      error: error.details.map((err) => err.message).join(","),
    });
  }

  try {
    const response = await bookService.updateBookById(id, { title, author, published, cover });
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(500).json({ error });
  }
};
```

If I used `{ abortEarly: false }` inside the validator, the list of errors needs to be mapped to a single string.

## Summary

In this short article, I described a simple and efficient way to validate requests to my API. Validation takes place in the first layer of the application, i.e., already at the routing and controller level. The complete code for the application described in this article can be found in the [GitHub repository](https://github.com/amazeddev/express-ts/tree/validators).
