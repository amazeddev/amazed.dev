---
title: Node.JS, Express.JS & MongoDB RESTful starter
excerpt: Bardzo prosty bolierplate do pracy z Node, Express i MongoDB. Aplikacja CRUD, na której podstawie można uczyć się bardziej zaawansowanych rzeczy.
date: October 24, 2019
tags: [node, express, NoSQL, mongo]
cover_img: express-rest-starter-with-mongodb.jpg
published: true
---

## RESTful serwer

Zaczniemy dzisiaj pisać bardzo podobny serwer jak w poprzednim wpisie: [Node.JS & Express.JS CRUD app starter](http://amazeddeveloper.pl/blog/node-express-crud-starter/), z tą jedynie różnicą, że teraz zamiast zahardkodowanych danych o użytkownikach, dodamy _bazę danych_, przetrzymującą nasze rekordy w _chmurze_. Ale zanim o bazie danych, skupmy się na chwilę nad podejściem do projektowania architektury interfejsów, czyli **REST API**.

Wpis ten można traktować jako trzecią część cyklu opisującego tworzenie przeze mnie RESTowego API

1. [Konfiguracja projektu w Node.js](https://amazed.dev/blog/node-base-config/)
2. [Node.JS & Express.JS CRUD app starter](https://amazed.dev/blog/node-express-crud-starter/)
3. _**Node.JS, Express.JS & MongoDB RESTful starter**_
4. [Autentykacja RESTowego API oparta o JWT](https://amazed.dev/blog/restfull-api-jwt-authentication/)

> ### REST API
>
> **REST** (_**R**epresentational **S**tate **T**ransfer_) jest stylem tworzenia oprogramowania, który opiera się o z góry zdefiniowane reguły. Definiuje on zasoby oraz sposób dostawania sie do nich.
>
> **API** (_**A**pplication **P**rogramming **I**nterface_) to zbór reguł komunikacji pomiędzy programami. Api, w naszym przypadku, Można opisać następującymi krokami: _klient wysyła zapytanie na odpowiedni endpoint_ -> _interfejs proceduje zapytanie i zwraca odpowiedź_ -> _klient otrzymuje odpowiedź_.
>
> REST API wykorzystuje metody protokołu HTTP do przesyłania zapytań _klient_ -> _interface_. Podstawowe metody, które w pełni wystarczą do zdefiniowania RESTful API (Api spełniającego reguły REST API, o których za chwilę), to _**GET**, **POST**, **PUT**, **DELETE**_.

> #### Założenia RESTful API (API RESTowe po polsku)
>
> - Client-Server – interfejs użytkownika i aplikacja serwera powinny być całkowicie niezależne od siebie. Każdy z elementów powinien móc być rozwijany osobno.
> - Cache – API powinno dawać możliwość cachowania danych, które się nie zmieniają. Powinniśmy móc określić, czy odpowiedź serwera jest _cacheable_ czy _non-cacheable_
> - Stateless – poszczególne zapytania są od siebie niezależne, a każde kolejne powinno zawierać wszystkie niezbędne informacje, do tego aby się powiodło. Znaczy to również, że serwer nie przechowuje żadnych informacji o sesji klienta.
> - Uniform Interface – _endpointy_, na które kierujemy zapytania, w połączeniu z metodami _HTTP_, powinny w jasny sposób charakteryzować o jaki pytamy.
> - Layered System – dzielnie elementów interfejsu odpowiadających za dostęp do danych, logikę biznesową, zabezpieczenia oraz prezentacje na współdziałające ze sobą oddzielne warstwy.
> - Code on Demand – część kodu wykonywanego prze klienta może zostać przesłana z interfejsu (założenie opcjonalne).
>
> Główną zaletą _**REST API**_ jest _uniwersalność_ - do takiego interfejsu możemy wysyłać zapytania z różnych platform (aplikacje mobilne, desktopowe, strony internetowe). Pisanie takiej aplikacji jest znacznie prostsze, wręcz intuicyjne. Bardzo proste jest też testowanie _endpointów_. Możemy do tego wykorzystać bardzo rozbudowane programy typu [Postman](https://www.getpostman.com) czy [Insomnia](https://insomnia.rest), albo poczciwy, konsolowy [cURL](https://curl.haxx.se/).

Teraz, gdy wiemy już jakiego podejścia będziemy się starać użyć (nie w 100%, bo wpis ten byłby znacznie za długi), możemy zacząć budować nasz interfejs.

## Wejściowy serwer template

Chyba musze napisać jakiś prosty skrypt generujący bardzo podstawowy template dla CRUD aplikacji w _Express_ (dobry pomysł na wpis :D!), bo robię to zdecydowania za często. Ponownie odwołamy się do poprzedniego wpisu [Node.JS & Express.JS CRUD app starter](http://amazeddeveloper.pl/blog/node-express-crud-starter/), który w prosty sposób przeprowadza przez proces tworzenia aplikacji serwerowej. W krótkim skrócie, na początku musimy stworzyć folder projekt, zainicjalizować w nim projekt **Node.JS**, utworzyć wyjściowy plik aplikacji _src/index.js_. Teraz możemy zainstalować wszystkie potrzebne paczki.

```bash:terminal
npm i -D nodemon @babel/node @babel/core @babel/preset-env
```

```bash:terminal
npm i express dotenv mongoose
```

Po krótce, o zainstalowanych pakietach:

- **Express** - najbardziej popularny framework Node.JS. Znacznie ułatwia i przyśpiesza pracę w Node, no bo _"po co wymyślać koło na nowo..."_;
- **mongoose** - JavaScript'owy klient bazy danych no-sql o nazwie MongoDB, w której będziemy zapisywać nasze dane;
- **dotenv** - pozwala na korzystanie ze zmiennych środowiskowych przechowywanych w pliku _.env_ w naszej aplikacji;
- **nodemon** - mała biblioteka pozwalająca na płynniejszą pracę z Expressem, automatycznie przebudowuje i przeładowuje projekt (serwer) przy zapisaniu zmian w projekcie;
- **@babel/...** - pakiety odpowiadające za tłumaczenie najnowszej składni _JavaScript'u (ES6+)_ do starszych wersji, zrozumiałych dla _Node.JS_.

Po wszystkich konfiguracjach _Babel_, dodaniu _Nodemon_ do skryptów _package.json_ i zdefiniowaniu w pliku _.env_ zmiennej środowiskowej _"PORT=4000"_, wygląda na to, że wszystko mamy dograne i gotowe. Możemy więc zacząć pisać serwer.

```js:src/index.js
import express from "express";
import mongoose from "mongoose";
import "dotenv/config";

const app = express();

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
```

## Podłączmy bazę danych

Aby nie robić tego projektu na _"suchych"_ danych, podepniemy bazę danych _MongoDB_, a dokładnie jej cloud'owego klient [Atlas](https://www.mongodb.com/cloud/atlas). Nie będę się tu rozpisywał o samym utworzeniu konta na platformie _Atlas_ i całej reszcie, pewnie powstanie o tym kiedyś wpis ;).

Ze strony https://www.mongodb.com/cloud/atlas po zalogowaniu, założeniu bazy danych klikamy zakładkę connect i kopiujemy string potrzebny do podłączenia. Przyda nam się za chwilę. Aby nas serwer został połączony z DB musimy zaimportować moduł _'mongoose'_ i zainicjalizować połączenie.

```js:src/app.js
const express = require("express");
const mongoose = require("mongoose");
import "dotenv/config";

const app = express();

mongoose.connect(
  "mongodb+srv://<userName>:<password>@cluster0-ympqd.mongodb.net/<collectionName>?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to MongoDB")
);

const port = process.env.PORT || 4000;

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
```

_console.log_ w callback'u powie nam o powodzeniu połączenia z bazą danych. Zobaczymy go w terminalu zaraz pod informacją, że nasz serwer wystartował na porcie 5000. Wewnątrz tego przydługawego stringu w metodzie _mongoose.connect_ odpowiednie miejsca trzeba podmienić swoimi danymi konta na platformie Atlas (_`<userName>`_ i _`<password>`_), oraz wpisać nazwę kolekcji (_`<collectionName>`_).

Możemy teraz rozpocząć pisanie Aplikacji CRUD (Create - Read - Update - Delete), a nasze dane będą zapisywane i odczytywane z bazy danych.

## Niby No-SQL ale Schema potrzebna

Gdy poczytamy o MongoDB, dowiemy się, że baza przyjmie różne struktury danych. Dla nas jednak za duża dowolność może być zgubna, z tego też powodu utworzymy sobie Scheme obiektu bazy danych, czyli tak jakby wzorzec tego co będziemy w niej przetrzymywać.

Warto mieć taką schemę poza głównym plikiem dla łatwiejszego odnajdywania się w kodzie. Plik ze schemą nazwiemy _Books.js_ i umieścimy go w katalogu _src/models_.

```js:src/models/Book.js
const mongoose = require("mongoose");

const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  author: {
    type: String,
    required: true,
  },
  posted: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Book", bookSchema);
```

W pliku wzorca po zaimportowaniu modułu _'mongoose'_ deklarujemy w obiekcie Schemy pola jakie powinien zawierać, ich _type_, oraz ewentualnie defaultową wartość czy wymóg ich podania. Nie chcę za dużo tu o tym pisać, gdyż o walidacji tych danych powstanie niedługo kolejny wpis przy temacie autentykacji. Tak powstały model możemy eksportować.

Importujemy model do naszej aplikacji serwera, aby móc z niego korzystać w poszczególnych requestach.

```js:src/app.js

const express = require("express");
const mongoose = require("mongoose");
import "dotenv/config";

// Book model import
const Book = require("./models/Book");

const app = express();
...
```

## Routing RESTowego api

Zanim zaczniemy zapisywać i odbierać konkretne rekordy z bazy danych powinniśmy zastanowić się chwilę nad samą budowa zapytań. Aby jak najbardziej wpisywać się w zasady _REST_, nasze endpointy powinny być możliwie przejrzyste i w połączeniu z metodami _HTTP_, od razu nasuwać odpowiedź, za co dany endpoint jest odpowiedzialny.

Ważna również w tym momencie jest struktura naszej aplikacji. Dobrym pomysłem jest utworzenie folderu _routes/api/_, w którym umieścimy plik _books.js_ ze zdefiniowanymi endpointami dla modelu _Books_. Taka budowa drzewa folderów i nazewnictwo plików uprości późniejsze odnalezienie się w większym projekcie. Gdy będziemy chcieli dodać endpointy dla kolejnego modelu, np. _Authors_, w katalogu _routes/api/_ umieścimy plik _Authors.js_ itp.

Utwórzmy więc plik _src/routes/api/books.js_.

```js:src/routes/api/book.js
const router = require("express").Router();

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
router.post("/", (req, res) => {
  res.json({
    msg: "POST book",
  });
});

// PUT (update) book
router.get("/:id", (req, res) => {
  res.json({
    msg: "PUT (update) book",
  });
});

// DELETE book
router.get("/:id", (req, res) => {
  res.json({
    msg: "DELETE book",
  });
});

module.exports = router;
```

Teraz w pliku _src/app.js_ możemy zaimportować _router_ i użyć go.

```js:src/app.js
const express = require("express");
const mongoose = require("mongoose");
import "dotenv/config";

// Book router import
const bookRouter = require("./routes/api/book.js");

// Book model import
const Book = require("./models/Book");

const app = express();

mongoose.connect(
  "mongodb+srv://<userName>:<password>@cluster0-ympqd.mongodb.net/<collectionName>?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to MongoDB")
);

// REST router
app.use("/api/books/", bookRouter);

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server started on port ${port}!`);
});
```

Teraz wystarczy użyć zaimportowanego _routera_ w aplikacji. Przypisanie mu ścieżki w metodzie _.use()_ oznacza, że każdy request na url _localhost:4000/api/books/_ będzie rozwiązywany przez enpointy zdefiniowane w obiekcie _bookRouter_.

Dobrą praktyką wydaje się poprzedzanie elementu ścieżki określającego rodzaj zasobu _/books_ elementem _/api_. Pokazuje to od razu, że ten endpoint (cała rodzina), zwraca tylko dane. Gdybyśmy teraz utworzyli więcej modeli danych, np. _authors_, rodzina takich endpointów wychodziła by od _/api/authors_. Według mnie takie podejście gwarantuje czytelność i minimalizuje ryzyko błędu.

Możemy teraz już wysyłać zapytania, na każdy zdefiniowany endpoint. Nic konkretnego jeszcze nie otrzymamy, poza informacją na jaki endpoint wysłaliśmy request. Pora więc uzupełnić wszystkie te endponty prawdziwym, działającym kodem.

## GET all books

Pierwszy endpoint, który musimy rozważyć pobiera wszystkie rekordy z bazy danych.

```js:src/routes/api/book.js
...

// GET all books
router.get("/api/books", async (req, res) => {
  try {
    const response = await Book.find();
    res.json({
      data: response
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});
...
```

W tym projekcie nasze api oparte jest o prawdziwą bazę danych, a zapytania do niej nie dzieją się od razu. Nasz kod musi poczekać na odpowiedź. Stąd właśnie wymusza to na nas asynchroniczne podejście do problemu. _JavaScript'owy_ _async/await_ załatwia tu sprawę. W pierwszej kolejności za pomocą słówka _async_ deklarujemy, że cała metoda _app.get()_ jest metodą asynchroniczną. Następnie poprzedzając wywołanie metody _.find()_ na modelu _Book_ słówkiem _await_, mówimy naszemu programowi, aby zatrzymała się w tym miejscu i poczekał na wynik zwracany przez metodę. Dodatkowo, dla obsługi potencjalnych błędów, zamykamy wszystko w klamry _try/catch_.

Wspomniana wcześniej metoda _.find()_ pakietu _mongoose_ wywołana na obiekcie modelu _Book_, zwraca wszystkie rekordy dla kolekcji _book_. Przypisujemy te rekordy do zmiennej _response_ i zwracamy w formacie _JSON_. Gdy nasze zapytanie do bazy się nie powiedzie i wpadniemy w klamrę _catch_, zwracamy status zapytania _400_ (nie powiodło się, na razie nie skupiamy się, nad tym co dokładnie poszło nie tak) oraz sam error.

## POST book

Poprzedni endpoint nie zwróci nam jeszcze żadnych danych, gdyż nasza kolekcja w bazie danych jest wciąż pust. Aby móc coś do niej dodać potrzebujemy enpointu obsługującego dodawanie rekordów do kolekcji.

```js:src/routes/api/book.js
...

// POST book
router.post("/api/books", async (req, res) => {
  try {
    const response = await Book.create({
      title: req.body.title,
      author: req.body.author
    });
    res.json({
      data: response
    })
  } catch (err) {
    res.status(400).json({ error });
  }
});
...
```

Wszystko tutaj wygląda dość podobnie, metoda musi być asynchroniczna, czekamy na jej rozwiązanie, wstępnie obsługujemy błędy za pomocą _try/catch_. Różnica polega na samej metodzie pakietu _mongoose_, który wykorzystamy. Tym razem będzie to _Book.create()_. Jako parametr przekazujemy obiekt, który chcemy dodać do kolekcji, pamiętajmy, że musi on być zgodny ze _Schemą_.

Aby mieć dostęp do ciała obiektu zapytanie _req.body_ potrzebujemy dodać do naszego skryptu _middleware_ odpowiedzialny za parsowane danych do formatu _JSON_. Można też do innych, ale my będziemy używać tylko _JSON'a_. Tak więc zainicjalizowaniu połączenia z bazą danych, a przed _routingiem_, dodajemy odpowiednią linijkę:

```js:src/app.js
....
// middleware - parse JSON
app.use(express.json());
...
```

Możemy teraz za pomocą konsolowego pakietu _cURL_ wysłać pierwszy rekord do bazy.

```bash:terminal
$ curl -d '{"title":"Lód","author":"Dukaj"}' -H "Content-Type: application/json" -X POST http://localhost:4000/api/books/

{
  "_id":"5db1a8b215c2e74419a784ef",
  "title":"Lód",
  "author":"Dukaj",
  "posted":"2019-10-24T13:35:46.645Z",
  "__v":0
}
```

No to sukces! Dodajmy jeszcze jeden tytuł, do bazy danych i spróbujmy pobrać wszystkie rekordy (_GET all books_).

```bash:terminal
$ curl localhost:4000/api/books

[
  {
    "_id":"5db1a8b215c2e74419a784ef",
    "title":"Lód",
    "author":"Dukaj",
    "posted":"2019-10-24T13:35:46.645Z",
    "__v":0
  },
  {
    "_id":"5db1a96f15c2e74419a784f0",
    "title":"Dzieci Diuny",
    "author":"Herbert",
    "posted":"2019-10-24T13:38:55.790Z",
    "__v":0
  }
]
```

Wszystko działa jak należy! Teraz spróbujmy pobrać konkretny rekord.

## GET single book

Ponownie budowa naszego endpointu będzie bardzo zbliżona do poprzednich.

```js:src/routes/api/book.js
...

// GET single book
router.get("/api/books/:id", async (req, res) => {
  try {
    const response = await Book.findOne({_id: req.params.id});
    res.json({
      data: response
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});
...
```

Endpoint ten, w odróżnieniu od pierwszego, zwracającego wszystkie rekordy, wyszukuje tylko ten jeden, którego \_ _id_ zgadza się z parametrem id obiektu _req_. Aby to osiągnąć zamiast metody _.find()_ używamy metody _.findOne()_. Po więcej informacji i inne możliwe fiksacje tych metod, np. _.findById()_ odsyłam do dokumentacji [mongoose](https://mongoosejs.com).

Możemy więc pobrać pojedynczy rekord.

```bash:terminal
$ curl localhost:4000/api/book/5db1a8b215c2e74419a784ef

{
  "data":{
    "_id":"5db1a8b215c2e74419a784ef",
    "title":"Lód",
    "author":"Dukaj",
    "posted":"2019-10-24T13:35:46.645Z",
    "__v":0
  }
}
```

### PUT (update) book record

Aby zmienić konkretny rekord w bazie danych posłużymy się metodą PUT.

```js:src/routes/api/book.js
...

// PUT (update) book
router.put("/:id", async (req, res) => {
  try {
    const response = await Book.findOneAndUpdate(
      { _id: req.params.id },
      req.body,
      { new: true }
    );
    res.json({
      data: response
    });
  } catch (err) {
    res.status(400).json({ error });
  }
});
...
```

Używamy tu metody _.findOneAndUpdate()_ jako jej parametry przekazujemy (w takiej kolejności) pole, po którym wyszukujemy konkretny rekord, obiekt, którym będziemy go podmieniać oraz dodatkowe parametry. Nie musimy w tym wypadku rozdzielać obiektu _req.body_ na poszczególne jego elementy, metoda poradzi sobie z tym za nas, a do tego nadpisze tylko te elementy, które rzeczywiście się zmienią. Parametr _{ new: true }_ mówi metodzie, aby zwróciła wartość po zmianach.

## DELETE book

Tutaj nie ma już żadnej filozofii. Zmienia się tylko, znów, metoda: _.findOneAndRemove()_ .Tej metodzie nie musimy przekazywać żadnych dodatkowych parametrów poza \_ _id_ rekordu do usunięcia z kolekcji.

```js:src/routes/api/book.js
...

// DELETE book
router.delete("/:id", async (req, res) => {
  try {
    const response = await Book.findOneAndDelete({ _id: req.params.id });
    res.json({
      data: response
    });
  } catch (error) {
    res.status(400).json({ error });
  }
});
...
```

## Podsumowanie

Projekt, który właśnie zrobiliśmy posiada już sporo funkcjonalności, która ma cokolwiek wspólnego z realnymi zastosowaniami tych technologii. Nadal jest on bardzo prosty i niedopracowany, ale miał on tylko pokazywać sposób budowania tego typu aplikacji. W kolejnym kroku należało by popracować nad obsługą błędów, można by przenieś cały _routing_ do oddzielnego pliku, w bardziej wyszukany sposób zwracać dane. Jest dużo możliwości, ale nie mogę tu przesadzać, żeby wpis nie był za długi.
