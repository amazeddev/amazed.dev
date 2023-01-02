---
title: Relacje między tabelami w MongoDB - mongoose virtuals i populating
excerpt: Gdy posiadamy w różnych tabelach powiązane ze sobą dane, dobrym pomysłem jest pokazać te relacje. Nie zawsze jednak chcemy dodawać nowe pola w Schemie. Tu z pomocą przychodzą virtuals (wirtualne pola).
date: "November 8, 2019"
tags: [node, mongo, NoSQL]
cover_img: mongoose-populating-virtual.jpg
published: false
---

## Relacje w nierelacyjnych bazach danych

Rozwinięcie skrótu _No-SQL_ nie oznacza jak wielu myśli, _"Nie-SQL"_, a bardziej _"Not only SQL"_. Nierelacyjne bazy danych, jak je czasem po polsku nazywają, typu _MongoDB_, czy np. _MariaDB_ nie posiadają charakterystycznych dla _SQL_ relacji między tabelami opartych na _primary_key_ i _foreign_key_. Na całe szczęście _ORM_ jakim jest _mongoose_ daje nam możliwość budowanie wirtualnych relacji i populowania danych pomiędzy kolekcjami. Na tym się właśnie postaram skupić w tym wpisie.

Wpis ten będzie jednym z kilku etapów nauki podstaw (podkreślam, że wciąż będą to tylko absolutne podstawy, potrzebne do w miarę płynnego poruszania się po świecie mikroserwisów i _node.js_). W skład wchodzą:

- [Node.JS, Express.JS & MongoDB RESTful starter](https://amazed.dev/blog/express-rest-starter-with-mongodb/)
- **_Relacje między tabelami w MongoDB - mongoose virtuals i populating_**

Ilość wpisów o tej tematyce będzie rosła i będą one uzupełniane na liście powyżej.

## Początkowy szablon projektu

Aby nie powielać treści wcześniejszych wpisów na temat budowy prostych serwerów w _node.JS_ i _express_ oraz podpinania do nich _MongoDB_, etap budowy wyjściowego serwera postaram się skrócić do minimum i maksymalnie uprościć. Projekt ten różnił się będzie od poprzednich praktycznie tylko tym, że będzie zawierał i wykorzystywał dwa oddzielne, w późniejszej części połączone ze sobą, modele danych (kolekcje). Nie będziemy też budować pełnej funkcjonalności _CRUD_ dla obu modeli, w zupełności wystarczą nam ścieżki pozwalające na dodawanie i prezentowanie zasobów (_GET_ i _POST_).

Struktura projektu będzie więc wyglądać następująco.

```bash:terminal
project_folder/
    models/
        Event.js
        Talk.js
    routes/
        events.js
        talks.js
    .env
    package.json
    server.js
```

Standardowo zaczynamy od instalacji pakietów.

```bash:terminal
npm i express dotenv mongoose
```

```bash:terminal
npm i -D nodemon
```

Natomiast podstawowy plik serwera będzie wyglądał następująco.

```js:server.js
const express = require("express");
const mongoose = require("mongoose");
require("dotenv").config();

const PORT = process.env.PORT || 5000;

// connect mongoDB
mongoose.connect(
  process.env.DB_CONNECT,
  { useNewUrlParser: true, useUnifiedTopology: true },
  () => console.log("Connected to mongoDB...")
);

// initialize express app
const app = express();

// middleware
app.use(express.json());

// initialize listener
app.listen(PORT, () => {
  console.log("Server started on port ${PORT}...");
});
```

Oczywiście w pliku _.env_ musimy teraz zapisać nasz bardzo prywatny string, do podłączenia cloudowej wersji _MongoDB_, no i opcjonalnie _PORT_, na którym będziemy nasłuchiwać. Jeżeli coś w tym pliku jak na razie jest nielogiczne, to odsyłam do poprzednich wpisów, gdzie znacznie bardziej szczegółowo opisuje wszystkie te rzeczy. Teraz gdy nasz serwer jest już możliwy do odpalenia, powinniśmy dodać w pliku _package.json_, w elemencie _scripts_ polecenia odpalające go.

```json:package.json
...

"scripts": {
  "start": "node server",
  "dev": "nodemon server"
}
...
```

Dzięki poleceniu _npm run dev_ odpalimy serwer w trybie _watch_, który dzięki pakietowi _Nodemon_ będzie nasłuchiwał na zmiany w plikach i przy ich zaobserwowaniu przeładuje nam aplikacje. Przydatna rzecz.

Teraz nie pozostało nam nic innego jak tylko dodać nasze modele dla dwóch tabeli w bazie danych, odpowiednio _Event.js_ i _Talk.js_.

```js:models/Event.js
const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  description: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Event", eventSchema);
```

```js:models/Talk.js
const mongoose = require("mongoose");

const talkSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  length: {
    type: Number,
    required: true,
  },
  event: {
    type: mongoose.Schema.ObjectId,
    ref: "Event",
    required: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Talk", talkSchema);
```

Są to bardzo proste modele dla dwóch powiązanych ze sobą zbiorów danych. W tym przykładzie każdy obiekt z kolekcji _Talks_ odpowiada któremuś obiektowi z kolekcji _Events_. Każdy _Event_ może mieć wiele _Wykładów_. Pierwszą rzeczą, którą musimy zrobić, aby powiązać dane z tych dwóch kolekcji, to w modelu _Talk_ dodać pole wiążące dany obiekt z obiektem z _Events_. Stąd właśnie pole _event_, którego typ to _ObjectId_. Jest to charakterystyczny typ dla modelów _mongoose_ (_MongoDB_), stąd musimy go wyciągnąć z obiektu _Schema_ pakietu _mongoose_. W tym polu będziemy musieli wprowadzić do obiektu _wykładu_ (talk) _\_id_ skojarzonego z nim _eventu_. W _ref_ przekazujemy, do jakiego zewnętrznego modelu nawiązujemy. Oczywiście, aby każdy wykład był przypisany do jakiegoś eventu, pole to jest wymagane.

Teraz musimy wykorzystać modele do obsługi danych. Stwórzmy do tego, dla zachowania ładu i porządku, dwa oddzielne pliki ze ścieżkami (_routery_), _events.js_ i _talks.js_. Jak wspomniałem na wstępie, nie skupiamy się na pełnej funkcjonalności _CRUD_, ani aby API było _RESTowe_. Pominiemy więc edycję danych, a w routerach będą jedynie metody do dodawania i odczytu danych.

```js:routes/events.js
const router = require("express").Router();

// import model
const Event = require("../models/Event");

// @desc Get all events
// @route GET /api/events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find();

    res.status(200).json({ data: events });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// @desc Create event
// @route POST /api/events
router.post("/", async (req, res) => {
  try {
    const event = await Event.create(req.body);

    res.status(200).json({ data: event });
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
```

```js:routes/talks.js
const router = require("express").Router();

// import model
const Talk = require("../models/Talk");

// @desc Get all talks
// @route GET /api/talks
router.get("/", async (req, res) => {
  try {
    const talks = await Talk.find();

    res.status(200).json({ data: talks });
  } catch (error) {
    res.status(500).json({ error });
  }
});

// @desc Create talk
// @route POST /api/talks
router.post("/", async (req, res) => {
  try {
    const talk = await Talk.create(req.body);

    res.status(200).json({ data: talk });
  } catch (error) {
    res.status(400).json({ error });
  }
});

module.exports = router;
```

Musimy również pamiętać, o zaimportowaniu i wykorzystaniu naszych zbudowanych wyżej _routerów_. Zazwyczaj dla większej przejrzystości kodu i aby wszystko było rozdzielone według zadań, najpierw na górze pliku importujemy routery, a używamy na samym dole przed nasłuchem. Tu jednak, aby aplikacja była prostsza i czytelniejsza postanowiłem użycie i import zmieścić dla każdego routera w jednej linijce. Pomijamy po prostu oddzielne deklarowanie i przypisywanie routerów do zmiennych.

```js:server.js

...

// middleware
app.use(express.json());

// roters
app.use("/api/events", require("./routes/events"));
app.use("/api/talks", require("./routes/talks"));

// initialize listener
app.listen(PORT, () => {
  console.log('Server started on port \${PORT}...');
});

```

Do tej pory nie pojawiło się tutaj kompletnie nic nowego. Standardowe modele, połączenie z _MongoDB_, routing. Wszystko to przewinęło się już we wcześniejszych artykułach.

Pora więc dodać wyczekiwane połączenie dwóch zasobów, tak aby odczytując wszystkie _Eventy_ z bazy danych, dla każdego z nich przypisać (i wyświetlić), powiązane z nim za pomocą _\_id_ wykłady.

## Dane niezbędne do testów

Teraz na potrzeby testów będziemy potrzebowali uzupełnić nasze dwie kolekcje _Events_ i _Talks_. Poniżej przygotowałem gotowe obiekty, które można bezpośrednio dodać do bazy danych. Polecam wykorzystać do tego _cURL_ lub _Postman_. Pamiętajmy tylko, że pola _event_ dla _Talks_ muszą odpowiadać konkretnym eventą, a dokładnie ich _\_id_. Dlatego najpierw dodajmy eventy, a potem talks z podmienionymi polami event.

```json
// examples of Events
[
  {
    "name": "Node Conference",
    "description": "Description of Node Conference.",
    "cost": 100
  },
  {
    "name": "Fron-End Day",
    "description": "Description of Front-End Day.",
    "cost": 200
  }
]
```

```json
// examples of Talks
[
  {
    "title": "Syntax of Node.JS",
    "description": "Description Talk",
    "length": 2,
    "event": "5dc5d9fd51e3704d70860d28"
  },
  {
    "title": "How to use MongoDB",
    "description": "Description of Talk",
    "length": 1,
    "event": "5dc5d9fd51e3704d70860d28"
  },
  {
    "title": "Vue.JS syntax",
    "description": "Description of Talk",
    "length": 2,
    "event": "5dc5da2051e3704d70860d29"
  },
  {
    "title": "Vue.JS vs. React",
    "description": "Description of Talk",
    "length": 1,
    "event": "5dc5da2051e3704d70860d29"
  },
  {
    "title": "How not to commit suicide using Webpack",
    "description": "Description of Talk",
    "length": 3,
    "event": "5dc5da2051e3704d70860d29"
  }
]
```

Spośród pięciu obiektów kolekcji talks, dwa pierwsze powiązane są z eventem "Node Conference", a trzy kolejne do eventu "Front_End Day".
Teraz możemy połączyć nasze dwie kolekcje.

## Wirtualne właściwości

Najprościej mówiąc, wirtualne właściwości (virtual properties), są to pola w modelu, które nie zostają zapisane w bazie danych, ale tylko zwrócone dla wywołania. Mogą one prezentować jakieś dane przeliczane na podstawie innych pól modelu, ale możemy też przypisywać do nich dane z innych kolekcji, w jakiś sposób powiązane z naszym rekordem. Mogą się więc one nam przydać na dwa sposoby.

### Populate Virtuals: virtualne pole _"talks"_ w modelu _Events_

Na początek zajmiemy się przekazaniem _wykładów_ do obiektów _Event_. Każdy z wykładów posiada _\_id_ eventu więc musimy się nim posłużyć.

W pierwszej kolejności musimy dodać do naszego obiektu _Schemy_ dla _Events_ opcje, mówiącą, że Schema może przyjmować virtualne właściwości.

```js:models/Event.js

const eventSchema = new mongoose.Schema(
  {
    ....
  },
  {
    toJSON: {
      virtuals: true
    }
  }
);

module.exports = mongoose.model("Event", eventSchema);
```

Możemy teraz zadeklarować wirtualne pole dla Schemy _Event_. Na końcu pliku, ale przed eksportem, dodajemy blok kodu deklarujący virtual property i do jakich wartości ma się odnosić.

```js:module/event.js
...

eventSchema.virtual("talks", {  // nazwa virtualnego pola
  ref: "Talk",                  // model, którego chcemy użyć
  localField: "\_id",           // znajdź talk gdzie 'localField'
  foreignField: "event",        // jest równe 'foreignField'
  justOne: false                // wartości talks dla eventu może być więcej nize 1
});

module.exports = mongoose.model("Event", eventSchema);
```

W budowaniu tego typu zależności chodzi o to, aby w kolekcji _Talks_ znaleźć wszystkie obiekty, których pole _event_ (_foreignField_ dla obiektu _Event_) miało tę samą wartość co pole _\_id_ kolekcji _Events_ (czyli jej _localField_). Podobieństwo nazw z _privateKey_ i _foreignKey_ z _SQL_ jest nieprzypadkowa. Opcja _justOne: false_ zaznacza, że każdy event, może mieć powiązany więcej niż jeden wykład, a pole _talks_ będzie Arrayem, a nie pojedynczym dokumentem.

Tak zbudowane wirtualne pole możemy teraz wywołać, a dokładniej zpopulować, czyli dodać do wyników zapytania kolekcji _Events_. W tym celu musimy powiedzieć metodzie zwracającej kolekcje, czyli _Event.find()_ w pliku _routes/events.js_, że w wyniku ma również przedstawić pole _talks_. Stąd nasz pierwszy request zmieni się następująco:

```js:routes/events.js
...

// @desc Get all events
// @route GET /api/events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().populate("talks")

    res.status(200).json({ data: events });
  } catch (error) {
    res.status(500).json({ error });
  }
});
...
```

Dzięki temu dla każdego obiektu _eventu_ w odpowiedzi platformy otrzymujemy również powiązane z nim _wykłady_.

```json
{
  "data": [
    {
      "_id": "5dc5d9fd51e3704d70860d28",
      "name": "Node Conference",
      "description": "Description of Node Conference.",
      "cost": 100,
      "createdAt": "2019-11-08T21:11:25.295Z",
      "**v": 0,
      "talks": [
        {
          "_id": "5dc5da5c51e3704d70860d2a",
          "title": "Syntax of Node.JS",
          "description": "Description Talk",
          "length": 2,
          "event": "5dc5d9fd51e3704d70860d28",
          "createdAt": "2019-11-08T21:13:00.699Z",
          "**v": 0
        },
        {
          "_id": "5dc5da7851e3704d70860d2b",
          "title": "How to use MongoDB",
          "description": "Description of Talk",
          "length": 1,
          "event": "5dc5d9fd51e3704d70860d28",
          "createdAt": "2019-11-08T21:13:28.320Z",
          "**v": 0
        }
      ],
      "id": "5dc5d9fd51e3704d70860d28"
    },
    {
      "_id": "5dc5da2051e3704d70860d29",
      "name": "Fron-End Day",
      "description": "Description of Front-End Day.",
      "cost": 200,
      "createdAt": "2019-11-08T21:12:00.343Z",
      "**v": 0,
      "talks": [
        {
          "_id": "5dc5da9f51e3704d70860d2c",
          "title": "Vue.JS syntax",
          "description": "Description of Talk",
          "length": 2,
          "event": "5dc5da2051e3704d70860d29",
          "createdAt": "2019-11-08T21:14:07.080Z",
          "__v": 0
        },
        {
          "_id": "5dc5dab051e3704d70860d2d",
          "title": "Vue.JS vs. React",
          "description": "Description of Talk",
          "length": 1,
          "event": "5dc5da2051e3704d70860d29",
          "createdAt": "2019-11-08T21:14:24.930Z",
          "__v": 0
        },
        {
          "_id": "5dc5dadc51e3704d70860d2e",
          "title": "How not to commit suicide using Webpack",
          "description": "Description of Talk",
          "length": 3,
          "event": "5dc5da2051e3704d70860d29",
          "createdAt": "2019-11-08T21:15:08.043Z",
          "__v": 0
        }
      ],
      "id": "5dc5da2051e3704d70860d29"
    }
  ]
}
```

Możemy również decydować, jakie dokładnie dane z kolekcji _Talks_ zostaną nam zwrócone. W tym celu musimy ponownie nieznacznie przerobić zapytanie, a dokładnie sam argument przekazywany do metody _.populate()_. Zamiast mówić ogólnie, że chcemy zpopulować obiekt do pola _talks_ przekażemy, z jakiego obiektu i dokładnie jakie pola chcemy zobaczyć.

```js:routes/events.js
...

// @desc Get all events
// @route GET /api/events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().populate({
      path: "talks",
      select: "name description"
    })

    res.status(200).json({ data: events });
  } catch (error) {
    res.status(500).json({ error });
  }
});
...
```

Takie wywołanie ograniczy nam zwracane pola do _name_ i _description_ dla każdego obiektu wykładu. _\_id_ przekazywane jest zawsze.

```json
"data": [
  {
    "_id": "5dc5d9fd51e3704d70860d28",
    "name": "Node Conference",
    "description": "Description of Node Conference.",
    "cost": 100,
    "createdAt": "2019-11-08T21:11:25.295Z",
    "__v": 0,
    "talks": [
      {
        "_id": "5dc5da5c51e3704d70860d2a",
        "description": "Description Talk",
        "event": "5dc5d9fd51e3704d70860d28"
      },
      {
        "_id": "5dc5da7851e3704d70860d2b",
        "description": "Description of Talk",
        "event": "5dc5d9fd51e3704d70860d28"
      }
    ],
    "id": "5dc5d9fd51e3704d70860d28"
  }
]
```

### Przekazywanie za pomocą virtuals ilości obiektów

Za pomocą virtuals możemy również przekazać ile mamy w bazie danych wykładów skojarzonych z danym eventem. Zadeklarowanie tego virtual property jest bardzo podobne do poprzedniego, różni się jedynie użyciem opcji _count: true_, która zwraca ilość obiektów, spełniających warunek równości _localField_ i _foreignField_.

```js
eventSchema.virtual("talksCount", {
  ref: "Talk",
  localField: "_id",
  foreignField: "event",
  count: true, // zwraca ilość dokumentów
});
```

Wywołanie w _routerze_ jest identyczne, dodajemy po prostu kolejną metodę _.populate()_. Dzięki temu w obiekcie odpowiedzi otrzymamy, dla każdego eventu dodatkowe pole _"talksCount"_, mówiące, ile każdy event ma wykładów.

```js:routes/events.js
...

// @desc Get all events
// @route GET /api/events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find()
      .populate({
        path: "talks",
        select: "name description"
      });
      .populate("talksCount");

    res.status(200).json({ data: events });
  } catch (error) {
    res.status(500).json({ error });
}
});
```

## Podsumowanie

W tym wpisie chciałem rozpocząć i ukierunkować dalszą pracę związaną z poznawaniem bardziej zaawansowanych metod pracy z danymi w _MongoDB_. W kolejnych wpisach będziemy omawiać statyczne metody modelu, zaawansowane deklarowanie jakie dane i w jakiej formie ma zwrócić serwer w zależności od parametrów requestu. Omówimy np. sortowanie i ograniczanie zwracanych danych itp. Czeka więc nas jeszcze wiele pracy.
