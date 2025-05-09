---
title: Express + TypeScript - MongoDB Configuration
excerpt: The next stage of working with Express and TypeScript. This time focusing on connecting and adapting MongoDB in the application.
date: December 27, 2022
tags: [node, express, ts, mongo]
cover_img: express-rest-starter-with-mongodb.jpg
published: true
---

## Introduction

<div class="admission">
Articles in this series:

1. [Express + TypeScript - Project Configuration](https://amazed.dev/blog/en/ts-express-base-config)
2. [Express + TypeScript - ESLint and Prettier](https://amazed.dev/blog/en/ts-express-linter-prettier)
3. [Express + TypeScript - CRUD Boilerplate](https://amazed.dev/blog/en/ts-express-base-crud)
4. [Express + TypeScript - Application Structure](https://amazed.dev/blog/en/ts-express-structure)
5. **Express + TypeScript - MongoDB Configuration**
6. [Express + TypeScript - Request Validation with Joi](https://amazed.dev/blog/en/ts-express-validation)
7. [Express + TypeScript - Application Middlewares](https://amazed.dev/blog/en/ts-express-middlewares)
</div>

## Database Instance

To avoid building the application on "mocked" data in the form of a non-persistent list of elements, the next step is to connect a MongoDB database.
In simple development conditions, this can be done in at least two ways. The first is to use the cloud client MongoDB, which is [Mongo Atlas](https://www.mongodb.com/cloud/atlas). The second is to use Docker and, for development purposes, run a local MongoDB container.

I'll use the second solution. All the necessary information needed to run the container can be found on the [official mongo image](https://hub.docker.com/_/mongo) page. Just run the following command in the terminal and enjoy the container.

```bash:terminal
docker run -d -p 27017:27017 --name mongo-books \
  -e MONGO_INITDB_ROOT_USERNAME=user \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  mongo
```

When creating the container, I pass three environment variables that will affect how I connect to the container later in the code. `MONGO_INITDB_ROOT_USERNAME` and `MONGO_INITDB_ROOT_PASSWORD` determine the login and password that will be needed to connect to the mongo instance in the container.

After creating the instance in the container, a default `test` database is created, and my collections will be stored there. This behavior can be changed, but it's beyond the scope of this simple example.

## Database Connection

When the database instance is already running, the next step is to install the `Mongoose` package, which is an ODM for Mongo (Object Data Modeling), meaning a package that makes it easier to work with Mongo for Node applications. You can think of `mongoose` as ORMs for SQL databases. It helps build document schemas and facilitates data validation.

```bash:terminal
npm i mongoose
```

I can now establish a basic connection to the database by adding the `connect()` method from the `mongoose` package to the `src/index.ts` file. The `connect` method takes a connection string and optionally a connection settings object and a callback that will fire after the connection is established. I'm skipping the settings object because `mongoose` has very good and completely sufficient defaults for such a training application.

```ts:src/index.ts
import { connect } from "mongoose";
import app from "./app";

const PORT = process.env.PORT || 5000;

// mongodb://<userName>:<password>@localhost:27017
connect("mongodb://user:password@localhost:27017", () =>
  console.log("Connected to MongoDB")
);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});
```

The `console.log` in the callback will tell us about the success of the database connection. We'll see it in the terminal right under the information that our server has started on port 5000. Inside the `connect()` method's connection string, you need to replace the appropriate places with your data passed to the Docker container.

## Schema and Data Model

The basic feature that distinguishes MongoDB from SQL databases is that the database will accept different data structures. However, too much freedom can be detrimental for developers, which is why I use `mongoose`, which allows building object data schemas, a kind of template for what will be stored in it.

For the schema and data model that will be built on its basis, I create a new file `src/books/books.model.ts`. In it, I create an `IBook` interface describing the type of data object that will be stored in the database. Based on it, I create an object schema in which I specify, among other things, the data type (must correspond to the interface, but passed in the form of constructors), and whether the field is required. In the schema, you can also pass validation parameters or include default values.

Finally, I export the `mongoose` model built on the basis of the interface and schema, which, when imported in other files, will allow for reading and writing data defined in it.

I added the `enum bookCover` to the data model described in previous articles. In the schema, I specify that it is `type: String`, but also that it should take an enum value.

```ts:src/books/books.model.ts
import { Schema, model } from "mongoose";

export enum bookCover {
  paperback = "paperback",
  hardcover = "hardcover",
}

interface IBook {
  title: string;
  author: string;
  published: number;
  cover: bookCover;
}

export type CreateBookInput = IBook;
export type UpdateBookInput = Partial<IBook>;

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  published: Number,
  cover: { type: String, enum: bookCover, required: true },
});

export const Book = model<IBook>("Book", bookSchema);
```

From the `src/books/books.model.ts` file, I also export two types `CreateBookInput` and `UpdateBookInput`. These will be the types that I expect to receive in `req.body` for requests to create and update records. Thanks to inheritance from the same interface as the schema, I maintain very readable data consistency.

> ### TypeScript utility types
>
> Global TypeScript utility types make the most common type transformations easier. The ones I use most often are:
>
> - `Partial<Type>` - creates a type where all fields of the transformed type `Type` become optional;
> - `Pick<Type, Keys>` - creates a type built on the basis of the transformed type `Type`, but selects only its fields passed in the second argument. When there is more than one field, they should be passed as strings separated by the | (vertical bar) character, e.g., `Pick<Todo, "title" | "completed">`;
> - `Omit<Type, Keys>` - similar to `Pick`, but takes all fields of type `Type` except those passed in the second argument.

## Using the Model

When the model is ready, it's time to use it in services. In more complex systems, an additional application layer is usually separated, namely a repository describing typical methods for reading and writing data. For simplicity, I'm skipping this step here, and operations on the `Book` model will be performed in `src/books/books.service.ts`.

```ts:src/books/books.service.ts
import { Book, CreateBookInput, UpdateBookInput } from "./books.model";

const getAllBooks = async () => await Book.find({});

const getBookById = async (id: string) => await Book.findById(id);

const createBook = async (input: CreateBookInput) => {
  const { title, author, published, cover } = input;
  return await Book.create({ title, author, published, cover });
};

const updateBookById = async (id: string, input: UpdateBookInput) => {
  return await Book.findByIdAndUpdate(id, input, { new: true });
};

const deleteBookById = async (id: string) => {
  await Book.findByIdAndDelete(id);
};

export default {
  getAllBooks,
  getBookById,
  createBook,
  updateBookById,
  deleteBookById,
};
```

## Better Connection

The last step will be to take care of separating the code responsible for database connection into a separate file and ensuring proper connection management. In the `src/config/dbConnection.ts` file, I place the previously used `connect()` method, but this time a few elements are added.

```ts:src/config/dbConnection.ts
import { connect, connection } from "mongoose";

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;

export const conncetDB = () => {
  connect(`mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}`);
};

connection.on("connecting", () =>
  console.log("connecting to mongoDB...")
);
connection.on("connected", () =>
  console.log("succesfully connected to mongoDB!")
);
connection.on("disconnected", () => {
  console.log("disconnected from mongoDB!");
  setTimeout(conncetDB, 1000);
});
connection.on("error", () =>
  console.log("could not connect to mongoDB!")
);
```

First, all connection string elements should be loaded as environment variables! This is a good practice that allows working in a local environment without code changes. It's enough to include the necessary variables in the `.env` file.

```:.env
PORT=5000
DB_USER=user
DB_PASS=password
DB_HOST=localhost
DB_PORT=27017
```

The second element worth paying attention to is listening for events related to database connection. This is possible by adding callbacks to these events. In this case, they are simple `console.log()` with information. Only in the case of the `"disconnected"` event do I try to reconnect after a second.

`mongoose` handles many events related to database connection, the basic ones are:

- _connecting_ - starts connection;
- _connected_ - connected;
- _disconnected_ - disconnected (also in case of error);
- _reconnecting_ - retries connection;
- _close_ - properly ended connection;
- _error_ - connection error;
- _all_ - all events

Now I just import and run the `connectDB()` function in `src/index.ts` and everything works the same as before the changes, and the database connection is separated from the server code itself.

```ts:src/index.ts
import app from "./app";
import { conncetDB } from "./config/dbConnection";

const PORT = process.env.PORT || 5000;

conncetDB();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});
```

## Summary

Connecting the database, in this case MongoDB, was the next step in building a REST application boilerplate written using the Express framework and TypeScript.

The complete code for the application from the above article can be found in the [GitHub repository](https://github.com/amazeddev/express-ts/tree/mongo).
