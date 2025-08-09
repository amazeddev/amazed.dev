---
title: REST API - JWT Authentication
excerpt: A simple way to implement JWT authentication in a REST API written in Express and TypeScript. Creating a secure authentication system with refresh tokens.
date: January 15, 2023
tags: [node, express, ts, mongo, jwt]
cover_img: restfull_api_jwt_authentication.jpg
published: true
---

## Securing API with JWT base authentication

This is next article covering process of building simple REST API with _Express_ and _MongoDB_. Each article could be treated as separate entity, but I think they work best as a whole story. Also, this is not end of series!

#### RESTfull API z Express, MongoDB, JWT

1. [Express + TypeScript - Project Configuration](https://amazed.dev/blog/en/ts-express-base-config)
2. [Express + TypeScript - ESLint and Prettier](https://amazed.dev/blog/en/ts-express-linter-prettier)
3. [Express + TypeScript - CRUD Boilerplate](https://amazed.dev/blog/en/ts-express-base-crud)
4. [Express + TypeScript - Application Structure](https://amazed.dev/blog/en/ts-express-structure)
5. [Express + TypeScript - MongoDB Configuration](https://amazed.dev/blog/en/ts-express-mongo)
6. **Express + TypeScript - REST API JWT Authentication**

So, if this article should be continuation of me building RESTful API with _Express_ & _MongoDB_, we will use already created base API as a base. We will extend already created API of _Books_ with possibility to create and authenticate "Users". Each user will be able to get books records stored, but only logged users will be able to write them (create, update and remove). Validation of users will be base on _**JWT**_ (JSON Web Token).

> ## What is JWT
>
> JWT (JSON Web Token) is a standard for creating access tokens based on JSON format. It is commonly used for authentication and authorization in web applications. A JWT token consists of three parts:
>
> - **Header** - contains information about the token type and the algorithm used for signing
> - **Payload** - contains the data (claims) that we want to transmit
> - **Signature** - a signature that verifies the token's authenticity

## Setting up JWT Authentication

To implement JWT authentication in our Express application, we need to install a few packages:

```bash:terminal
npm i jsonwebtoken bcryptjs
npm i --save-dev @types/jsonwebtoken @types/bcryptjs
```

The `jsonwebtoken` package will be used for creating and verifying JWT tokens, while `bcryptjs` will help us hash passwords.

## User Model and Types

First, let's create a user model and necessary types. We'll create a new file `src/users/users.model.ts`:

```ts:src/users/users.model.ts
import { Schema, model, Document } from "mongoose";
import bcrypt from "bcryptjs";

export interface IUser extends Document {
  email: string;
  password: string;
  refreshToken?: string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

export type CreateUserInput = Omit<IUser, "refreshToken" | "comparePassword">;
export type UpdateUserInput = Partial<CreateUserInput>;

const userSchema = new Schema<IUser>(
  {
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    refreshToken: { type: String },
  },
  { timestamps: true }
);

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as Error);
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword: string) {
  return bcrypt.compare(candidatePassword, this.password);
};

export const User = model<IUser>("User", userSchema);
```

## Authentication Service

Now, let's create an authentication service that will handle user registration, login, and token management. Create a new file `src/auth/auth.service.ts`:

```ts:src/auth/auth.service.ts
import jwt from "jsonwebtoken";
import { User, CreateUserInput } from "../users/users.model";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";
const JWT_REFRESH_SECRET = process.env.JWT_REFRESH_SECRET || "your-refresh-secret-key";

export const generateTokens = (userId: string) => {
  const accessToken = jwt.sign({ userId }, JWT_SECRET, { expiresIn: "15m" });
  const refreshToken = jwt.sign({ userId }, JWT_REFRESH_SECRET, { expiresIn: "7d" });
  return { accessToken, refreshToken };
};

export const register = async (input: CreateUserInput) => {
  const existingUser = await User.findOne({ email: input.email });
  if (existingUser) {
    throw new Error("User already exists");
  }

  const user = await User.create(input);
  const { accessToken, refreshToken } = generateTokens(user._id.toString());

  // Save refresh token to user
  user.refreshToken = refreshToken;
  await user.save();

  return { user, accessToken, refreshToken };
};

export const login = async (email: string, password: string) => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid credentials");
  }

  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    throw new Error("Invalid credentials");
  }

  const { accessToken, refreshToken } = generateTokens(user._id.toString());

  // Update refresh token
  user.refreshToken = refreshToken;
  await user.save();

  return { user, accessToken, refreshToken };
};

export const refreshToken = async (token: string) => {
  try {
    const decoded = jwt.verify(token, JWT_REFRESH_SECRET) as { userId: string };
    const user = await User.findById(decoded.userId);

    if (!user || user.refreshToken !== token) {
      throw new Error("Invalid refresh token");
    }

    const { accessToken, refreshToken } = generateTokens(user._id.toString());

    // Update refresh token
    user.refreshToken = refreshToken;
    await user.save();

    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error("Invalid refresh token");
  }
};

export const logout = async (userId: string) => {
  await User.findByIdAndUpdate(userId, { refreshToken: null });
};
```

## Authentication Middleware

Let's create a middleware to protect routes that require authentication. Create a new file `src/middlewares/auth.middleware.ts`:

```ts:src/middlewares/auth.middleware.ts
import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User, IUser } from "../users/users.model";

const JWT_SECRET = process.env.JWT_SECRET || "your-secret-key";

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: IUser;
    }
  }
}

export const authenticate = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader?.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECRET) as { userId: string };

    const user = await User.findById(decoded.userId);
    if (!user) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    req.user = user;
    next();
  } catch (error) {
    return res.status(401).json({ message: "Unauthorized" });
  }
};
```

## Authentication Controller

Now, let's create a controller to handle authentication routes. Create a new file `src/auth/auth.controller.ts`:

```ts:src/auth/auth.controller.ts
import { Request, Response } from "express";
import * as authService from "./auth.service";

export const register = async (req: Request, res: Response) => {
  try {
    const { user, accessToken, refreshToken } = await authService.register(req.body);
    res.status(201).json({ user, accessToken, refreshToken });
  } catch (error) {
    res.status(400).json({ message: (error as Error).message });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const { user, accessToken, refreshToken } = await authService.login(email, password);
    res.json({ user, accessToken, refreshToken });
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
};

export const refresh = async (req: Request, res: Response) => {
  try {
    const { refreshToken } = req.body;
    const tokens = await authService.refreshToken(refreshToken);
    res.json(tokens);
  } catch (error) {
    res.status(401).json({ message: (error as Error).message });
  }
};

export const logout = async (req: Request, res: Response) => {
  try {
    if (!req.user?._id) {
      throw new Error("User not authenticated");
    }
    await authService.logout(req.user._id.toString());
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ message: (error as Error).message });
  }
};
```

## Authentication Routes

Finally, let's create the routes for our authentication endpoints. Create a new file `src/auth/auth.routes.ts`:

```ts:src/auth/auth.routes.ts
import { Router } from "express";
import { authenticate } from "../middlewares/auth.middleware";
import * as authController from "./auth.controller";

const authRouter = Router();

authRouter.post("/register", authController.register);
authRouter.post("/login", authController.login);
authRouter.post("/refresh", authController.refresh);
authRouter.post("/logout", authenticate, authController.logout);

export default authRouter;
```

## Using Authentication in the Application

To use the authentication system, we need to add the auth routes to our main application file `src/app.ts`:

```ts:src/app.ts
import express from "express";
import authRouter from "./auth/auth.routes";
import booksRouter from "./books/books.routes";
import { authenticate } from "./middlewares/auth.middleware";

const app = express();
app.use(express.json());

// Public routes
app.use("/api/auth", authRouter);

// Protected routes
app.use("/api/books", authenticate, booksRouter);

export default app;
```

## Summary

In this article, I've shown how to implement JWT authentication in a REST API using Express and TypeScript. The implementation includes:

1. User registration and login
2. JWT token generation and verification
3. Refresh token mechanism
4. Protected routes
5. Logout functionality

The complete code for the application from this article can be found in the [GitHub repository](https://github.com/amazeddev/express-ts).

Remember to:

- Store sensitive data (like JWT secrets) in environment variables
- Use HTTPS in production
- Implement proper error handling
- Add rate limiting for authentication endpoints
- Consider adding password reset functionality
- Add email verification if needed
