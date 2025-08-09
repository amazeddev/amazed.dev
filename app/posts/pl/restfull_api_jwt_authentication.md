---
title: Autentykacja użytkownika RESTowego API oparta o JWT
excerpt: Kolejna część cyklu tutoriali opisujących budowę RESTful API. Tym razem dodamy możliwość tworzenia i logowani użytkowników. Oraz ograniczenie dostępu do zasobów wyłącznie dla zalogowanych, oparte o JWT.
date: January 15, 2023
tags: [node, express, mongo, JWT]
cover_img: restfull_api_jwt_authentication.jpg
published: true
---

## Zabezpieczenie API przy użyciu JSON Web Token (JWT)

Ten wpis jest kolejnym etapem mojej drogi przez proces budowania RESTowego API w _Express_ i _MongoDB_. Każdy wpis można traktować dość indywidualnie, ale myślę, że składają się one w niezłą całość. Dodam tylko, że to jeszcze nie koniec!

#### RESTfull API z Express, MongoDB, JWT

1. [Express + TypeScript - konfiguracja projektu](https://amazed.dev/blog/ts-express-base-config)
2. [Express + TypeScript - ESLint i Prettier](https://amazed.dev/blog/ts-express-linter-prettier)
3. [Express + TypeScript - CRUD boilerplate](https://amazed.dev/blog/ts-express-base-crud)
4. [Express + TypeScript - struktura aplikacji](https://amazed.dev/blog/ts-express-structure)
5. [Express + TypeScript - konfiguracja MongoDB](https://amazed.dev/blog/ts-express-mongo)
6. _**Express + TypeScript - autentykacja REST API oparta o JWT**_

Skoro ten wpis ma być kontynuacją wpisu o tworzeniu RESTful API z _Express_ i _MongoDB_, wykorzystamy API w nim utworzone jako podstawę. Do API pozwalającego na sprawdzanie, dodawanie i edycję rekordów związanych z książkami dodamy możliwość tworzenia i logowania (autentykacji) istniejących użytkowników. Każdy zainteresowany będzie mógł pobrać informacji o książkach, czyli wysyłać zapytania na endpointy korzystające z metody GET. Natomiast tylko zalogowani użytkownicy będą mogli dodawać, edytować i usuwać rekordy. Weryfikacja uprawnień będzie odbywała się przy pomocy _**JWT**_ (JSON Web Token).

> ### JWT
>
> Jest to standard, definiujący bezpieczny sposób wymiany danych między serwerem a klientem za pomocą obiektu JSON. Składa się z trzech części:
>
> - _header_ - algorytm szyfrowania tokenu
> - _payload_ - informacje przekazywane w tokenie, zazwyczaj dany konta, dla którego został wygenerowany, jakie użytkownik ma dostępy, oraz ile token jest ważny
> - _signature_ - podpis cyfrowy, będący zaszyfrowanymi przez serwer headerem i payloadem
>
> Token zatrzymywane po stronie klienta i pozwala na odpytywanie serwera o określone dane. Serwer na podstawie sobie znanego klucza odszyfrowuje token i sprawdza, czy dać klientowi dostęp do zasobów. Dodatkową korzyścią z używania JWT jest możliwość zakodowania w nim niezbędnych informacji o autentykującym się użytkowniku. Klient nie musi odpytywać serwer dodatkowo o te dane, wystarczy, że odkoduje _payload_ tokenu.

## Model użytkownika

Zacznijmy od zdefiniowania, co powinien zawierać użytkownik, którego będziemy dodawać do bazy danych w procesie rejestracji. Na pewno imię i hasło dostępu. Jako że w ostatnim czasie zamiast loginu używa się częściej maila, więc do shcemy dodajmy mail. Dobrym pomysłem jest też zapisanie, kiedy użytkownik został dodany. Dodajmy więc w pliku _src/models/User.ts_ model dla _User_.

```ts:src/models/User.ts
import { Schema, model, Document } from 'mongoose';

interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  date: Date;
}

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    min: 6,
  },
  email: {
    type: String,
    required: true,
    min: 8,
  },
  password: {
    type: String,
    required: true,
    min: 4,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

export default model<IUser>('User', userSchema);
```

Model użytkownika poza zmianą nazw pól nie różni się wiele od modelu _Book_. Jedyną nową rzeczą jest określenie minimalnej ilości znaków w poszczególnych polach. Ten bardzo prosty sposób wstępnej walidacji wartości wejściowych podmienimy w następnym wpisie bardziej kompleksową metodą, opartą o zewnętrzną bibliotekę.

## Endpoint rejestracji

Pierwszym endpointem do omówienia jest ten związany z rejestracją. Musimy w końcu najpierw kogoś dodać, aby mógł się zalogować. Zacznijmy od utworzenia w katalogu _src/routes/api/_ pliku definiującego endpointy użytkownika.

```ts:src/routes/api/auth.ts
import { Router, Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../../models/User';

const router = Router();

interface RegisterRequest {
  name: string;
  email: string;
  password: string;
}

interface LoginRequest {
  email: string;
  password: string;
}

router.post('/register', async (req: Request<{}, {}, RegisterRequest>, res: Response) => {
  try {
    // check if email exist in database
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) {
      return res.status(400).json({
        err: 'Email already exist'
      });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);

    // create new user
    const response = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: hashedPassword
    });

    res.json({
      data: response
    });
  } catch (err) {
    res.status(400).json({
      err
    });
  }
});

router.post('/login', async (req: Request<{}, {}, LoginRequest>, res: Response) => {
  // check if email exist
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return res.status(400).json({
      err: 'User not exist'
    });
  }

  // check if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword) {
    return res.status(400).json({
      err: 'Invalid password'
    });
  }

  // create and assign a token
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name
    },
    process.env.JWT_SECRET || 'default_secret'
  );

  res.json({
    msg: 'User logged in',
    token
  });
});

export default router;
```

Tworzenie użytkownika (rejestracja), jak na razie jest bardzo podobna do tworzenia rekordu książki. Musimy jednak, od razu zauważyć dwa problemy. Po pierwsze, powinniśmy sprawdzić, czy e-mail nie jest już używany. Po drugie, nie powinniśmy przechowywać hasła w bazie danych ot tak. Powinno być w jakiś sposób zakodowane, aby poprawić bezpieczeństwo naszego API.

Zacznijmy od sprawdzenia, czy nasz adres mail jest unikatowy, załatwiamy to dość prosto, korzystając z metody _.findOne()_ pakietu _mongoose_.

```js:src/routes/api/auth.js
...

router.post("/register", async (req, res) => {
  // check if email exist in database
  const emailExist = await User.findOne({ email: req.body.email });
  if (emailExist)
    return res.status(400).json({
      err: "Email already exist"
    });

...
```

Sprawa jest bardzo prosta. Wyszukujemy w bazie danych rekord, którego e-mail jest jednakowy z naszym, nowo dodawanym e-mailem. Jeśli metoda _.findOne()_ zwróci jakąś wartość, znaczy to, że mail jest już wykorzystany. Spowoduje to przerwanie procedowania requestu i zwrócenie informacji o błędzie wraz z statusem niepowodzenia. W przeciwnym wypadku nic się nie wydarzy, a aplikacja "pójdzie" dalej. Oczywiście jak w poprzednim projekcie, gdzie korzystaliśmy z operacji na bazie danych, nasz endpoint musi być metodą asynchroniczną (pamiętajmy o _async/await_).

Zaszyfrowanie hasła jest troszkę trudniejsze. Musimy posłużyć się zewnętrzną biblioteką [bcrypt.js](https://www.npmjs.com/package/bcryptjs).

```bash:terminal
npm i bcryptjs
```

Działanie _bcrypt.js_ można zawęzić do dwóch etapów, generowaniu randomowego ciąg bajtów (_salt_), zaszyfrowania (_hash_) naszego hasła przy użyciu _salt'a_. Wystarczy więc taki _hash_ podstawić w miejsce hasła przy tworzeniu użytkownika w metodzie _.create()_ i nasze hasło jest bezpieczne.

```js:src/routes/api/auth.js

...
  // hash password
  const salt = await bcrypt.genSalt(10);
  const heshedPassword = await bcrypt.hash(req.body.password, salt);

  // create new user
  try {
    const response = await User.create({
      name: req.body.name,
      email: req.body.email,
      password: heshedPassword
    });
    res.json({
      data: response
    });
  } catch (err) {
    res.status(400).json({
      err
    });
  }
});
```

Wystarczy teraz, że zaimportujemy nasz router do pliku _src/app.js_ i dodamy _middleware_ obsługujące odpowiedni endpoint. Analogicznie jak dla kolekcji _Books_.

```js:src/app.js
...

// Routers import
const bookRouter = require("./routes/api/book.js");
const authRouter = require("./routes/api/auth.js");

( ... )

// Routers
app.use("/api/books/", bookRouter);
app.use("/api/auth/", authRouter);

...
```

Możemy uznać endpoint rejestracji użytkownika za zakończony. Dodajmy więc jeden rekord do kolekcji _Users_.

```bash:terminal
curl -d '{"name":"Sebastian","email":"sebastian@mail.com","password":"pass123"}' -H "Content-Type: application/json" -X POST http://localhost:5000/api/auth/register
```

```bash
{
  "data": {
    "_id": "5db36e54735bcd41988c2ed7",
    "name": "Sebastian",
    "email": "sebastian@mail.com",
    "password": "$2a$10$uUsiKqm3Jmqyn4C.1VlvRets.2CYJck9i7eNi1kQ/GsC5XeELZN0q",
    "date": "2019-10-25T21:51:16.717Z",
    "__v": 0
  }
}
```

## Endpoint logowania

Kolejnym wymaganym endpointem, aby nasza autentykacja działała, jak powinna, jest logowanie. Będziemy tu wysyłać dane użytkownika, tj. e-mail i hasło, a serwer po porównaniu ich z bazą danych zwróci nam JWT, jeśli wszystko się powiedzie.

Zacznijmy od sprawdzenia, czy w ogóle użytkownik jest w bazie danych.

```js:src/routes/api/auth.js
...

router.post("/login", async (req, res) => {
  // check if email exist
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).json({
      err: "User not exist"
    });

  // check if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
  if (!validPassword)
    return res.status(400).json({
      err: "Invalid password"
    });
});

...
```

Sposób bardzo podobny do tego z rejestracji, tym razem jednak zwracamy błąd i przerywamy działanie aplikacji, gdy nie ma użytkownika o podanym adresie e-mail w bazie danych. W kolejnym etapie sprawdzamy hasło. Ponownie używamy pakietu _bcrypt.js_, tym razem jednak do sprawdzenia poprawności hasła. Do metody _bcrypt.compare()_ przekazujemy hasło podane przez logującego się użytkownika i _zahashowane_ hasło z bazy. Metoda porównuje je i zwraca _true_ jeśli zakodowane hasło pasuje do podanego.

W tym miejscu dochodzimy do etapu, gdzie użytkownik jest w bazie danych i jego hasło zgadza się z tym z bazy. Pora więc zwrócić mu JWT, który posłuży do komunikowania się z zabezpieczonymi endpointami. Potrzebujemy do tego zainstalować kolejną bibliotekę (pamiętajmy również, o zaimportowaniu jej jako _jwt_ na początku pliku _src/routes/api/auth.js_).

```bash:terminal
npm i jsonwebtoken
```

Dodajmy więc ostatnią część endpointu.

```js:src/routes/api/auth.js
...

router.post("/login", async (req, res) => {
  // check if email exist
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(400).json({
      err: "User not exist"
    });

  // check if password is correct
  const validPassword = await bcrypt.compare(req.body.password, user.password);
    if (!validPassword)
      return res.status(400).json({
        err: "Invalid password"
      });

  // create and assign o token
  const token = jwt.sign(
    {
      _id: user._id,
      name: user.name
    },
    process.env.JWT_SECRET
  );

  res.json({
    msg: "User logged in",
    token: token
  });
});

...
```

Bibliotek _jwt_ pozwala na stworzenie i podpisanie realnego tokena. Metoda _jwt.sign()_ przyjmuje jako parametry, w podstawowej formia, dane, które zostaną zapisane do _payload_ tokena (zazwyczaj podstawowe dane usera), oraz secret, znany tylko serwerowi string, przy pomocy którego kodowany jest _signature_ tokena. Oczywiście, aby zabezpieczyć ten string umieszczamy go w pliku _.env_ i pobieramy do naszego kodu jako zmienną środowiskową.

```js:.env
JWT_SECRET = sekretnykod;
```

Tak podpisany token zamieszczamy w odpowiedzi zwracanej przez endpoint.

```bash:terminal
$ curl -d {"email":"sebastian@mail.com","password":"pass123"} -H "Content-Type: application/json" -X POST http://localhost:5000/api/auth/login

{
  "msg": "User logged in",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZGIzNmU1NDczNWJjZDQxOTg4YzJlZDciLCJuYW1lIjoiU2ViYXN0aWFuIiwiaWF0IjoxNTcyMDQxNjg0fQ.6LyZEmAtYkifi5UO6m9ssX6FN7xjeWxSSV6ZEvBvMR0"
}
```

Jedyna rzecz, która pozostała nam do zrobienia to zabezpieczenie określonych endpointów przed dostępem nieupoważnionych osób.

## Middleware weryfikujące tożsamość

Jak już powiedziałem, część naszych endpointów związanych z kolekcją _Books_ powinna być zabezpieczona. Chodzi oczywiście o wszystkie te endpointy odpowiadające za zmiany w kolekcji. Aby to osiągnąć, musimy napisać funkcję, która będzie sprawdzała requesty pod względem posiadania, jak i poprawności tokena.

Utwórzmy więc taką funkcję w pliku _src/utils/verifyToken.ts_

```ts:src/utils/verifyToken.ts
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

interface AuthRequest extends Request {
  user?: {
    _id: string;
    name: string;
  };
}

const verifyToken = (req: AuthRequest, res: Response, next: NextFunction): void => {
  const token = req.header('Authentication');

  if (!token) {
    res.status(401).json({
      msg: 'Access Denied!'
    });
    return;
  }

  try {
    const verified = jwt.verify(token, process.env.JWT_SECRET || 'default_secret') as { _id: string; name: string };
    req.user = verified;
    next();
  } catch (err) {
    res.status(401).json({
      err
    });
  }
};

export default verifyToken;
```

Funkcja ta, jak przystało na _middleware_ przyjmuje parametry _req, res, next_. Dzięki nim możemy mieć dostęp do zapytania, jak i zwracać odpowiedź, oraz oczywiście blokować endpoint przy niepowodzeniu.

Aby zachować konwencję obowiązującą przy komunikacji z API, wysyłając JWT w zapytaniu, umieszczamy go w _headerze_ zapytania o nazwie _"Authentication"_, stąd też w takim właśnie _headerze_ będziemy go szukać. Mamy do niego dostęp z poziomu obiektu zapytanie (_req_). Gdy w zapytaniu nie znajdzie się token, od razu przerywamy wykonywanie funkcji zwracając status niepowodzenia _401_ i wiadomość "Access Denied!".

Kolejnym etapem sprawdzania praw dostępu jest weryfikacja tokena. Ponownie korzystamy z bibliotek _jsonwebtoken_. Tym razem metoda _.verify()_, na podstawie stringa z secretem i samego tokena, określi, czy jest to poprawny i prawdziwy token. Gdy metoda się powiedzie, odpala metodę _next()_ składnik _middleware_, który pozwala wykonywać się części kodu za funkcją _verifyToken_, co skutkuje dostępem do możliwości wprowadzania zmian w bazie danych.

Na koniec pozostało tylko zaimportować funkcję _verifyToken_ do pliku serwera _src/routes/api/books.js_ i umieścić ją w wykonaniu endpointów, które chcemy zabezpieczyć.

```js:src/routes/api/book.js
const router = require("express").Router();
const verifyToken = required("../../utils/verifyToken.js");

// GET all books
router.get("/", (req, res) => {
  res.json({
    msg: "GET all books",
  });
});

// GET single book
router.get("/:id", (req, res) => {
  res.json({
    msg: "GET single book",
  });
});

// POST book
router.post("/", verifyToken, (req, res) => {
  res.json({
    msg: "POST book",
  });
});

// PUT (update) book
router.get("/:id", verifyToken, (req, res) => {
  res.json({
    msg: "PUT (update) book",
  });
});

// DELETE book
router.get("/:id", verifyToken, (req, res) => {
  res.json({
    msg: "DELETE book",
  });
});

module.exports = router;
```

## Podsumowanie

Nasze API, nie dość, że posiada podstawową funkcjonalność CRUD aplikacji, to zostało jeszcze wzbogacone o autoryzację opartą o JWT. Jest to bardzo prosty system zabezpieczeń, ale na tyle skuteczny, że bardzo szeroko stosowany, w tego typu aplikacjach.

Kolejnymi etapami naszej pracy będzie zapewne dodanie walidacji wprowadzanych danych za pomocą pakietu npm _@hapi/joi_ oraz na sam koniec zbudowanie klienta _front-endowego_, który obsłuży to wszystko, tak abyśmy nie musieli korzystać z _cURL_.
