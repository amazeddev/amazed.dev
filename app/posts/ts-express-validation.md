---
title: Express + TypeScript - walidacja requestów z biblioteką Joi
excerpt: Prosty sposób walidacji danych z requestów przychodzących do API pisanego z Express i TS przy użyciu biblioteki Joi.
date: December 29, 2022
tags: [node, express, ts]
cover_img: check.jpg
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
6. **Express + TypeScript - walidacja requestów z biblioteką Joi**
7. [Express + TypeScript - middlewares aplikacji](https://amazed.dev/blog/ts-express-middlewares)
</div>

## Przygotowanie projektu

Omawiany problem walidacji i _error handlingu_ kontynuuję na podstawie artykułu [Express + TypeScript - konfiguracja MongoDB](https://amazed.dev/blog/ts-express-mongo).

## Gdzie walidować

Kontynuując pracę nad _REST-owym_ API pisanym w `Express` i `TypeScript` pojawia się problem walidacji _requestów_ z zewnątrz. Zazwyczaj przy tak prostych projektach pod uwagę brane są dwie drogi.

Pierwsza polega na walidowaniu obiektu za, który chcę zapisać na poziomie _modelu_ danych. `mongoose` daje możliwość dodania do _schemy_ warunków walidacji każdego z pól. Sposób ten ma jednak wady. Walidacja proponowana przez `mongoose` jest dość prosta i ograniczona, a gdy zaczniemy dodawać tam dużo zasad, _schema_ staje się nieczytelna. Po drógie, uważam, że to nie jest miejsce na walidację. _Request_ przechodzi przez wszystkie warstwy aplikacji, zanim zostanie sprawdzony pod względem poprawności danych.

Drógim spoosbem, znacznie lepszym jest walidacja na poziomie warstwy komunikacji. _Request_ powinien być sprawdzany tam, gdzie wciąż mamy do niego dostęp, a nie tylko do argumentów zbudowanych na jego postawie. Stąd też decyzja aby walidacja odbywała się wewnątrz kontrolerów.

## Jak walidować

Do samej walidacji wykorzystam bibliotekę `Joi`, którą muszę zainstalować.

```bash:terminal
npm i joi
```

Teraz wewnątrz `src/books` tworzę folder `utils` a w nim plik `validation.utils.ts`, który będzie zawierał funkcje pomagające w walidacji _inputów_ dla _requestów_ tworzenia i nadpisywania rekordów. Jako parametry tych funkcji przekazuje typy danych `CreateBookInput` i `UpdateBookInput` odzwierciedlające `req.body`, które będzie walidowane.

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

Walidacja za pomocą pakietu `Joi` odbywa się w dwóch etapach. W pierwszym tworzę _schemę_ obiektu, opisując w niej jakie warunki powinno spełaniać każde z pól przekazywanego obiektu. Można wymuszać typ danych jak `string()` czy `number()`, długość klucza (`max()` i `min()`), czy jest wymagany (`required()`), czy wartość zawiera się _enumie_ lub jakiejś przekazanej liście porządanych wartości i wiele innych, o których można poczytać w dokumentacji pakietu.

Drugim etapem jest walidacja przekazanego w argumencie obiektum czyli w moim wypadku tego co przyjdzie w `req.body` z opisaną wyżej _schemą_. Metoda `.validate()` zwraca obiekt z kluczami `value` i `error`. W przypadku powodzenia walidacji, w obiekcie `value` zawiera zwalidowane dane. W przypadku niepowodzenia natomiast obiekt `error` zawiera bład walidacji.

Jeśli do metody `.validate()` jako drugi argument przekażę obiekt opcji `{ abortEarly: false }`, walidacja nie zostanie przerwana po napotkaniu pierwszego błędu, tylko sprawdzi i zwróci w obiekcie `error` listę wszystkich błędów w formacie `[{ message: string; path: string; type: string }]`.

`updateBookValidator()` od `createBookValidator()` różni się tylko tym, że każde z pól nie jest wymagane (`required()`).

Gdy _helper functions_ do walidacji są już gotowe wystarczy zaimportować je w kontrolerze i użyć przed wywołaniem metod serwisu. Z wyniku funkcji wystarczy wyodrębnić potencjalny obiekt `error` i jeśli istnieje to zwrócić _HTTP status_ **400 - Bad Request**, wraz z samą treścią błędu.

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

Jeśli użyłem `{ abortEarly: false }` wewnątrz walidatora, listę błędów trzeba zmapować na pojedynczy _string_.

## Podsumowanie

W tym krótkim artykule opisałem prosty i wydajny sposób walidacji _requestów_ do mojego API. Walidacja odbywa się w pierwszej warstwie aplikacji, czyli już na poziomie routingu i kontrolera. Pełny kod aplikacji opisany w tym artykule można znaleźć w [repozytorium github](https://github.com/amazeddev/express-ts/tree/validators).
