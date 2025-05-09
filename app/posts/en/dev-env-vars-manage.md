---
slug: dev-env-vars-manage
title: Managing Local Environment Variables - direnv
excerpt: direnv as a simple way to manage environment variables during development.
date: December 12, 2022
tags: [utils, shell]
cover_img: env-manage.jpg
published: true
---

# Problem

During development, loading and reading local environment variables can cause many issues. If I do not use _Docker_ and do not load variables through it, adding them in the standard _Linux_ way using 'export NAME=VALUE' in the terminal is very cumbersome.

Usually, packages that allow automatic loading of variables from a file, such as _.env_, come to the rescue. For _Node_, this is the well-known [_dotenv_](https://www.npmjs.com/package/dotenv). Using it is very simple: we create a _.env_ file and add all the environment variables we want to use during development.

```:.env
PORT=5000
```

Using an example application from a previous article, the _dotenv_ package can be used as follows:

```ts:src/index.ts
import express, { Request, Response } from "express";
import * as dotenv from 'dotenv' // import package
dotenv.config() // load variables into process.env

const app = express();
const PORT = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log('Server started on port ${PORT}!');
});
```

Now, simply install the package as a _dev dependency_.

```bash:terminal
npm i -D dotenv
```

Thanks to this package, we have access to all environment variables. Moreover, if 'dotenv.config()' is called in the main application file (_app entry point_), all imported modules will also have access to the variables via the 'process.env' object.

This solution is not inherently bad. Everything works correctly, but the issue arises with the additional dependency that is used only for development. Also, the two extra lines of code are not a big deal, but why add them if they are not necessary?

## direnv

_direnv_ is not a _Node_ dependency but a shell extension. It allows automatic loading of environment variables based on the directory you are in. It only requires the presence of a '.envrc' file in the directory specifying how the variables should be loaded, and it loads them into a sub-shell of the terminal accordingly.

### Installation

Most Linux distributions and macOS already have this program installed.

For it to work correctly with the terminal shell, you need to _attach_ its execution in the shell configuration file:

- For **BASH**, modify _~/.bashrc_: 'eval "$(direnv hook bash)"'
- For **ZSH**, modify _~/.zshrc_: 'eval "$(direnv hook zsh)"'

For more supported shells, refer to the documentation.

### Simple Usage

Now, to use environment variables just like before, i.e., loading them from a _.env_ file, simply add another file: _.envrc_. Then, run the command 'direnv allow .', which allows the _direnv_ package to automatically load environment variables.

To continue loading variables from the _.env_ file, we can instruct the package to load variables from that file using the command 'direnv dotenv [shell] [path_to_.env_file]', in our case:

```bash:terminal
direnv dotenv zsh ./.env
```

Now, when we start the application in the same directory, it will have all the variables specified in the file loaded.

To simplify the entire workflow, we can specify the 'dotenv' command directly in the _.envrc_ file.

```:.envrc
dotenv
```

In this case, as long as _.env_ and _.envrc_ are in the same directory, the _direnv_ package will always automatically load the variables in that directory. This allows us to remove the _dotenv_ dependency and all related code fragments. This solution also works independently of the programming language of the application!
