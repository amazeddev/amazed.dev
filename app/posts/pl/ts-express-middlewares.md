---
title: Express + TypeScript - middlewares aplikacji
excerpt: Omówienie działania i sposobów użycia middlewares w aplikacji Express + TS. Wykorzystanie middlewares do logowania, error-handlingu oraz zabezpieczenia API.
date: January 1, 2023
tags: [node, express, ts]
cover_img: between.jpg
published: true
---

## Wstęp

<div class="admission">
Artykuły w tym cyklu:

1. [Express + TypeScript - konfiguracja projektu](https://amazed.dev/blog/ts-express-base-config)
2. [Express + TypeScript - ESLint i Prettier](https://amazed.dev/blog/ts-express-linter-prettier)
3. [Express + TypeScript - CRUD boilerplate](https://amazed.dev/blog/ts-express-base-crud)
4. [Express + TypeScript - struktura aplikacji](https://amazed.dev/blog/ts-express-structure)
5. [Express + TypeScript - konfiguracja MongoDB](https://amazed.dev/blog/ts-express-mongo)
6. [Express + TypeScript - walidacja requestów z biblioteką Joi](https://amazed.dev/blog/ts-express-validation)
7. **Express + TypeScript - middlewares aplikacji**
</div>

## Middlewares

W frameworku `Express` _middlewares są to funkcje, które wykonywane są w trakcie przetwarzania \_requestu_ przez serwer. Można powiedzieć, że wszystko co ma dostęp do obiektuów `req` i `res` i wykonuje się pomiędzy zarejestrowaniem zapytania a zwróceniem odpowiedzi to _middleware_.

Idąc tym tokiem myślenia obsługa _requestów_, czyli cały routing, kontrolery to też swego rodzaju _middleware_. Stąd też, każdy _middleware_ może pełnić kilka funkcji:

- wywoływać dowolny kod;
- wprowadać zmiany w obiektach `req` i `res`;
- zakańczać cykl obsługi zapytania;
- przekazywać wywołanie do kolejnej funkcji _middleware_;

Jeden z ostatnich dwuch podpunktów musi być jednak spełniony. Jeśli funkcja nie zwróci odpowiedzi na zapytanie, to musi ona przekazać wywołanie do kolejnego _middleware_, wywołując metodę `next()`.

Funkje _middleware_ można podzielić na trzy podstawowe grupy, ze względu na to gdzie są wywołane i jak szeroki _scope_ zapytań obejmują:

- application-level middleware
- route-level middleware
- error-handling middleware

### Application-level middleware

Pierwszym typem _middleware_ są funkcje wywoływane na obiekcie aplikacji poprzez metodę `app.use()` (lub pokrewne metody związane z metodami _HTTP_). Mogą one mieć scope związany z jakimś _URL-em_ lub być wywołane dla wszystkich przychodzących zapytań.

Prostym przykładem takiej funkcji jest _logger_, który będzie odpalany dla każdego _requestu_, po czym, po wywołaniu własnego kodu, przekaze za pomocą metody `next()`, kontext wywołania do kolejnego _middleware_, w tym wypadku do _routera_.

```ts:src/middlewares/logger.middleware.ts
import { NextFunction, Request, Response } from "express";

export const logger = (req: Request, res: Response, next: NextFunction) => {
  const { url, method } = req;
  const time = new Date().toISOString();
  console.log(`${time} - [${method}] ${url}`);
  next();
};
```

Sama funkcja jest bardzo prosta, wyodrępnia ona interesujace mnie dane z obiektu `req`, loguje je wraz z chwilowym czasem wywołania, a na końcu przekazuje _'pałeczkę'_ do kolejnej funkcji za pomocą `next()`.

W `src/app.ts` wystarczy zaimportować funkcję i przekazać ją wywołaniu `app.use(logger)`. Swoją zrogą, poniżej widać, że _middleware_ o zasięgu aplikacji jest również `express.json()`, który parsuje (przekształca) `body` _requestu_ w formacie _JSON_ na zrozumiały na _JS_ i _TS_ obiekt.

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

Teraz gdy wywołam po sobie kilka różnych zapytań do serwera, w logach zobaczę powiązane z tym logi:

```bash
2022-12-29T22:07:43.417Z - [GET] /api/books/63ac4658f8e95c6765f38fbe
2022-12-29T22:08:12.631Z - [GET] /api/books
```

_Middleware_ tego typu mogą być również wywoływane wewnątrz wywołania metody `app.use()` obsługującej konkretny _routing_. W takim wypadku, ze względu na to, że moja aplikacja ma tylko jeden _router_. _Logger middlaeware_ może zostać użyty w następujacy sposób, nie zmieniając działania aplikacji:

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

Dzięki takiemu podejsci możliwe jest podpinanie różnych funkcji w zależności od potrzeb.

### Route-level middleware

Jak sama nazwa wskazuje jest to funkcja, która swoje wywołanie ogranicza do pojedyńczego _router'a_ aplikacji. Są to bardzo podobne funkcje, do opisanych wyżej, z tą różnicą, że ich wywołanie odbywa się na obiekcie `router` a nie `app`.

### Error-handling middlewares

Ten typ middleware przeznaczony jest do obsługi błędów aplikacji w porządany przez użytkownika sposób. Od poprzednich _middlewares_ odróżnia go składnie argumentów, wymaga on bowiem czterech, a nie trzech, mianowicie `( err: ApplicationError, req: Request, res: Response, next: NextFunction)`.

Budowę takiego _ogólno-aplikacyjnego_ _middleware_ do obsługi błędów zacznę od zbudowania nowej klasy `ApplicationError`, która rozszerza klasę `Error`. Celem jest przechowywanie w instancji i przekazywanie dalej, oprócz samego _error message_ również _status code_ związanego z błędem.

```ts:src/errors/application.error.ts
export class ApplicationError extends Error {
  public statusCode: number;
  constructor(statusCode: number, message: string) {
    super(message);
    this.statusCode = statusCode;
  }
}
```

Gdy to już mam, mogę dopisać sam customowy _middleware_ obsługujący błędy aplikacji.

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

Funkcja przyjmuje _error_ i na jego podstawie zwraca _response_ z wyciągniętymi `statusCode` i `message`. W wypadku, gdy którejś wartości brakuje, uzupełniam je _defaultami_. Taki generyczny _response_ związany z błędem, można później rozszerzyć o więcej informacji, np. _status code_, informacje o powodzeniu _requestu_, czy chociażby _stack_trace_ błędu.

Teraz mogę dodać nowopowstały _middleware_ do aplikacji.

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

Ostatnim krokiem jest przekazanie każdego błędu aplikcji _złapanego_ w kontrolerze do `errorHandler` _middleware_ za pomocą metody `next()`. Z tego też względu, we wszystkich funkcjach w kontrolerze rozszerzam listę przyjmowanych argumentów o `next: NextFunction`, a w każdym bloku `try/catch` zamiast zwracać błąd wysyłam go do handlera używając `next(error)`.

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

Warto zwrócić uwagę na sposób obsługi błędów wynikających z logiki aplikacji. W metodzie `getBookByIdHandler()`, gdy nie znajduję rekordu o podanym `id`, przy obecnym sposobie obsługi błędów, wystarczy, że utworzę nową instancję `ApplicationError` przekazując do konstruktora porządany _status code_ i _error message_ jako argumenty i przekażę ją do _zhandlowania_ dalej metodą `next()`.

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

Tak samo ma się sprawa w metodach `createBookHandler` i `updateBookByIdHandler`.

## Bonus - przydatne 3rd party middlewares

#### morgan

`morgan` jest loggerem dla aplikacji opartych o `Node`. Aby zainstalować paczkę wraz ze wsparciem dla _TypeScript_ w terminalu uruchamiam:

```bash:terminal
npm i morgan
npm i --save-dev @types/morgan
```

Używa się go jak innych _application-level middlewares_, wywołując `app.use(morgan("<format>"))`.

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

Jako logger zwraca on znacznie więcej użytecznych informacji. W porównaniu do _customowego_ `logger`, `morgan("tiny")` - argument oznacza format prezentacji logów, więcej w dokumentacji - zwraca oprócz samych informacji o `request` również dane z `response` takie jak np. _status code_ czy długość trwania zapytania.

```bash
GET /api/books 200 202 - 6.439 ms
GET /api/books/63ac4658f8e95c6765f38fbe 200 100 - 3.393 ms
```

#### helmet

Jest to zbiór małych _middlewares_ odpowiadajacych za zabezpieczenie aplikacji poprzez ustawienie czy modyfikację wielu _HTTP Headers_. Celem jest zabezpieczenie znanych i popularnych luk w zabezpieczeniach.

Instalujemy przy pomocy:

```bash:terminal
npm i helmet
```

Użycie wygląda identycznie jak w przypadku innych zewnętrznych _middlewares_: `app.use(helmet())`.

#### cors

Jest to _middleware_ pozwalające na zarządzanie polityką _CORS_ (cross-origin resource sharing) w aplikacji _Express_.

```bash:terminal
npm i cors
npm i --save-dev @types/cors
```

Po szczegółowe informacje i przykłady użycia odsyłam do [dokumentacji cors](https://www.npmjs.com/package/cors).

## Podsumowanie

W taki oto sposób, przybliżyłem sposób działania i zamysł leżący za funkcjami _middlewares_ frameworku `Express`. Opisałem do tego ciekawe sposoby ich zastosowania: `logger` zwracający w logach aplikacji informacje o zapytaniach do serwera, oraz `errorHandler` dzięki któremu obsługa błędów aplikacji jest generyczna, prosta i znajduje się w jednym miejscu.

Jak zwykle kod związany z powyższym artykułem znajduje się w [repozytorium github](https://github.com/amazeddev/express-ts/tree/middlewares)
