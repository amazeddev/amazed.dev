---
title: Express + TypeScript - ESLint and Prettier
excerpt: Every project should adhere to predefined style standards. Implementing ESLint and Prettier in your project will not only help maintain code cleanliness but also help catch potential errors.
date: January 9, 2023
tags: [node, express, ts]
cover_img: style.jpg
published: true
---

## Introduction

Every project should adhere to predefined style standards. Implementing ESLint and Prettier in your project will not only help maintain code cleanliness but also help catch potential errors. In today's development landscape, almost every project uses these or similar tools, and the more complex the project becomes, the more essential these tools are.

This post is a continuation of the article [Express + TypeScript - Project Configuration](https://amazed.dev/blog/ts-express-base-config), which I recommend reading first. The topics discussed here can also be applied to any Node.js and TypeScript project, as they are quite universal. The code discussed in the article can be found in the [GitHub repository](https://github.com/amazeddev/express-ts/tree/eslint-prettier).

<div class="admission">
Articles in this series:

1. [Express + TypeScript - Project Configuration](https://amazed.dev/blog/ts-express-base-config)
2. **Express + TypeScript - ESLint and Prettier**
3. [Express + TypeScript - CRUD Boilerplate](https://amazed.dev/blog/ts-express-base-crud)
4. [Express + TypeScript - Application Structure](https://amazed.dev/blog/ts-express-structure)
5. [Express + TypeScript - MongoDB Configuration](https://amazed.dev/blog/ts-express-mongo)
6. [Express + TypeScript - Request Validation with Joi Library](https://amazed.dev/blog/ts-express-validation)
7. [Express + TypeScript - Application Middlewares](https://amazed.dev/blog/ts-express-middlewares)
</div>

## ESLint

> A linter like ESLint is a tool that scans and checks your application code to find syntax errors, style issues, and questionable code quality.
>
> ESLint is a linter for ECMAScript in general and can be used in both JavaScript and TypeScript projects.

Initializing ESLint in a project involves adding an `.eslintrc.json` file (this file can have different extensions) in the main application directory, containing the linter configuration. However, there's no need to do this manually - you can simply run a method that will initialize the linter in your project.

```bash:terminal
npx eslint --init
```

`npx` installs necessary packages locally but removes them after the command finishes executing. This way, we don't pollute the system with packages used only occasionally.

After running the above command, you'll get several questions. Based on your answers, the package will generate a linter configuration that will be saved in the `.eslintrc.json` file.
The first questions are about agreeing to install packages - here, of course, I agree to everything. The next questions are more specific.

```bash
? How would you like to use ESLint? …
  To check syntax only
  To check syntax and find problems
▸ To check syntax, find problems, and enforce code style

? What type of modules does your project use? …
▸ JavaScript modules (import/export)
  CommonJS (require/exports)
  None of these

? Which framework does your project use? …
  React
  Vue.js
▸ None of these

? Does your project use TypeScript?
  No
‣ Yes

? Where does your code run? …
  Browser
✔ Node

? How would you like to define a style for your project? …
▸ Use a popular style guide
  Answer questions about your style

? Which style guide do you want to follow? …
▸ Standard: https://github.com/standard/eslint-config-standard-with-typescript
  XO: https://github.com/xojs/eslint-config-xo-typescript

? What format do you want your config file to be in? …
  JavaScript
  YAML
▸ JSON
```

After initializing the linter, my file looks like below. The only thing I changed is `"parserOptions.project": "./tsconfig.json"`, which passes the relative path to the `tsconfig.json` file. This is required if you want ESLint to work with TypeScript. Without this option, there's no support for type-related rules, etc.

```json:.eslintrc.json
{
  "env": {
    "es2021": true,
    "node": true
  },
  "extends": "standard-with-typescript",
  "overrides": [],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "rules": {}
}
```

## Prettier

Prettier is a code formatting tool that supports many programming languages. You just need to install it in your project.

```bash:termional
npm i -D prettier
```

Now I create a new `.prettierrc.json` file where I specify the rules I want the editor to follow when formatting my code.

```json:.prettierrc.json
{
  "singleQuote": true,
  "arrowParens": "avoid",
  "printWidth": 100,
  "tabWidth": 2
}
```

> Most code editors have built-in support for both ESLint and Prettier packages, so in VSC, for example, you just need to install plugins with the same names.
> If you want the code to be formatted automatically, just create a new `.vscode` file and fill it with the code below. This will tell the editor to automatically format the code every time you save a file. This setting can also be added globally to the editor settings.
>
> ```json:.vscode
> {
>   "editor.formatOnSave": true,
> }
> ```

## Prettier with ESLint

`Prettier` can work very efficiently with `ESLint`. This helps avoid formatting conflicts, meaning: sometimes Prettier auto-formats code sections that the linter then marks as errors. When I combine their functionality, `ESLint` won't mark elements affected by `Prettier`. To do this, I need to install a few additional packages:

```bash:termional
npm i -D eslint-config-prettier eslint-plugin-prettier
```

Now in the `.eslintrc.json` file, I extend the `extends` field with two new elements: `eslint-config-prettier` and `prettier` (now it's a list since there are three elements). To the `plugins` list, I add `eslint-plugin-prettier`.

> - `eslint-config-prettier` - disables all ESLint rules that might conflict with Prettier
> - `eslint-plugin-prettier` - adds Prettier rules to ESLint

Finally, just add the new rule `"prettier/prettier": "error"` which tells the linter to mark syntax that conflicts with formatting rules as errors.

```json:.eslintrc.json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": ["standard-with-typescript", "eslint-config-prettier", "prettier"],
  "plugins": ["eslint-plugin-prettier"],
  "overrides": [],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "rules": {
    "prettier/prettier": "error"
  }
}
```

When all ESLint and Prettier rules are properly installed and configured, the last thing is to add the ability to check and format code. I mentioned earlier that code editors have built-in (in the form of extensions) support for linters and formatters, but there are cases when you'll want to run syntax checking or formatting manually. Examples include so-called `pre-commit hooks`, which are commands that run during code commits, as the name suggests. This could also be one of the stages of a `CI/CD` pipeline.

For the above reasons, I'll add two scripts to `package.json`.

```json: package.json
{
  "name": "express-ts",
  "version": "1.0.0",
  "main": "src/index.js",
  "scripts": {
    "build": "npx tsc",
    "start": "node dist/index.js",
    "start:dev": "nodemon src/index.ts",
    "lint": "eslint . --ext .ts",
    "lint:fix": "eslint . --ext .ts --fix"
  },
  ...
}
```

`lint` checks the code according to the rules in the `eslint` configuration when run, while `lint:fix` does the same but tries to fix those errors and warnings that it can.

### Excluding Files

If you don't want certain files or folders to be considered in the formatting or linting process, you can add them to `.prettierignore` and `.eslintignore` files respectively. These files work the same way as `.gitignore` does for `git`. It's worth noting that the `node_modules` folder is automatically excluded from consideration, so you don't need to add it.

```:.prettierignore
dist
```

```:.eslintignore
dist
```

There's no point in checking the JavaScript code generated by the `npm run build` script for syntax and formatting in the application.

## Summary

The process of code formatting and automatic detection of style and syntax errors significantly facilitates application development and speeds up the software creation process. We avoid many errors during application building that are caught at the code writing stage. In the future, I'll discuss `CI/CD pipelines`, where setting up the above tools in the project will be essential for the proper functioning of automation processes. The code from the article can be found in the [GitHub repository](https://github.com/amazeddev/express-ts/tree/eslint-prettier).
