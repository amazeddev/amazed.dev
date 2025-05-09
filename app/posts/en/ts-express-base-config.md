---
title: Express + TypeScript - Project Configuration
excerpt: A post showing how to easily configure a Node.js project for later use as a base in server applications. The project uses TypeScript and Express.JS.
date: December 9, 2022
tags: [node, express, ts]
cover_img: node-base-config.jpg
published: true
---

## Introduction

This post describes a simple way to start working with `TypeScript` and `Node`, specifically with its `Express` framework. In this post, we will create a simple _boilerplate_ application, which will be expanded with more advanced features in subsequent articles. I will discuss project configuration, application structure, database integration, and more.

This post, like the others in this series, contains the complete discussed code in the [GitHub repository](https://github.com/amazeddev/express-ts/tree/boilerplate).

<div class="admission">
Articles in this series:

1. **Express + TypeScript - Project Configuration**
2. [Express + TypeScript - ESLint and Prettier](https://amazed.dev/blog/ts-express-linter-prettier)
3. [Express + TypeScript - CRUD Boilerplate](https://amazed.dev/blog/ts-express-base-crud)
4. [Express + TypeScript - Application Structure](https://amazed.dev/blog/ts-express-structure)
5. [Express + TypeScript - MongoDB Configuration](https://amazed.dev/blog/ts-express-mongo)
6. [Express + TypeScript - Request Validation with Joi](https://amazed.dev/blog/ts-express-validation)
7. [Express + TypeScript - Application Middleware](https://amazed.dev/blog/ts-express-middlewares)
</div>

## Why?

> ### Express.JS
>
> [Express](https://expressjs.com/) is one of the most popular Node.js frameworks for writing backend applications. It is simple, minimalist, and imposes very few restrictions on the developer. The application structure can be almost any design, and the framework does not enforce any _pattern_. However, the internet is full of best practices and application development patterns.
>
> _Express_ is great for building REST APIs, CRUD applications, and integrating with various databases. The simple application created in this and subsequent articles will utilize the framework's simplicity and flexibility, as well as the richness of various extensions available for Express.

When we hear _Express.JS_, we often think of a _REST API_ written in _JavaScript_. Aware of JavaScript's limitations due to the lack of static typing but still wanting to use a simple, well-proven framework that allows for extensive customization, I decided to write an application using _TypeScript_. As we will soon see, the framework and language work together excellently!

## Getting Started

The first step should be to ensure that _Node_ and _NPM_ are installed on your system.

```bash
node -v
npm -v
```

Next, I navigate to the directory where I want to start the project. In the chosen folder, as with any _Node.js_ project, I begin by initializing the project. The `-y` flag skips all questions asked by the _CLI_ and fills them with defaults.

```bash
npm init -y
```

Alongside the newly created _package.json_ file, I create a `/src` folder and an `index.js` file inside it, which will be the application's entry file.

In _package.json_, all dependencies used in the project are recorded. Apart from dependencies, it also contains basic project information. Here, I focus only on preparing a starter for later use in other applications. First, I change the `"main"` field from `index.js` to `src/index.js` according to the folder structure I just created.

```json
{
  "name": "express-ts",
  "version": "1.0.0",
  "description": "",
  "main": "src/index.js",
  "type": "module",
  "scripts": {
    "test": "echo "Error: no test specified" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Now, to demonstrate that the application works, without focusing on _TypeScript_ and _Express_ features yet, I fill _src/index.js_ with the simplest possible _"server"_, which only listens on `localhost:5000/` and returns _"Hello World!"_. The first line imports `express` using ES modules, enabled by setting `"type": "module"` in _package.json_.

```js
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(5000, () => {
  console.log("Server started on port 5000!");
});
```

To run the service, I need to install its dependency, the _Express_ framework.

```bash
npm i express
```

After installation, I can start the application from the terminal within the project directory:

```bash
node src/index.js
```

The terminal will show a message that the application has started on port 5000. Opening `http://localhost:5000` in a browser will display _"Hello world!"_.

## Initializing TypeScript

To use `TypeScript` in the application, I install it as a _dev dependency_ along with useful type declarations for _Node_ and _Express_.

```bash
npm i -D typescript @types/express @types/node
```

Next, I initialize TypeScript in the project:

```bash
npx tsc --init
```

This generates a `tsconfig.json` file, which defines how TypeScript should compile the project. Important settings include:

```json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "target": "es2020",
    "module": "commonjs",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

Now, I rename `src/index.js` to `src/index.ts` and update its contents:

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

I can now compile the TypeScript project using:

```bash
npx tsc
```

Then, I run the generated JavaScript file:

```bash
node dist/index.js
```

## Automating Build & Restart

I install _nodemon_ and _ts-node_ for automatic rebuild and restart on changes:

```bash
npm i -D nodemon ts-node
```

Then, I add this script to _package.json_:

```json
"start:dev": "nodemon src/index.ts"
```

Now, running `npm run start:dev` will watch for changes and restart the server automatically.

## Conclusion

This _boilerplate_ serves as a foundation for more advanced projects with _Express_ and _TypeScript_, ensuring better code clarity, type safety, and optimized production builds. The complete code is available in the [GitHub repository](https://github.com/amazeddev/express-ts/tree/boilerplate).
