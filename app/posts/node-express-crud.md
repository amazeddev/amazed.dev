---
title: Node.JS & Express.JS CRUD app starter
excerpt: Wpis pokazujący wstępną konfigurację prostej aplikacji CRUD (Create - Read - Update - Delete) w Express'ie przy użyciu mockowych hardcoded data. Na Bazy danych przyjdzie czas. ;)
date: October 23, 2019
tags: [node, express]
cover_img: node_express_CRUD_starter.jpg
published: true
---

## Wstępna konfiguracja

Pierwszy etap budowy aplikacji opartej o Node.JS wraz z instalacją i konfiguracją kilku przydatnych dodatków został już opisany w poprzednim wpisie. Po szczegóły odsyłam tutaj:

[Konfiguracja projektu w Node.js](https://amazed.dev/blog/node-base-config/)

Z tego względu nie będę się tutaj dokładnie rozpisywał, co robię krok po kroku, a tylko szybko zaznaczę kolejne kroki.

Zaczniemy oczywiście od utworzenia katalogu projektu i zainicjalizowania w nim projektu _node.js_ za pomocą komendy _npm i -y_. W nim tworzymy katalog _/src_ i plik _/src/index.js_. Z takim wyjściowym drzewem plików możemy zainstalować potrzebne pakiety.

Dependencies:

```bash:terminal
npm i express dotenv
```

DevDependencies:

```bash:terminal
npm i -D nodemon @babel/node @babel/core @babel/preset-env
```

Teraz wystarczy utworzyć pliki _.babelrc_ i _.env_, w których będziemy trzymać odpowiednio konfigurację pakietu _babel_ i zmiennych środowiskowych projektu. Plik ze zmiennymi na razie pozostanie pusty, za to _.babelrc_ wygląda następująco:

```js:.babelrc
{
  "presets": [
    "@babel/preset-env"
  ]
}
```

## Pierwszy server

> ### Express.JS
>
> Server będziemy pisać za pomocą pakietu [Express](https://expressjs.com/). Prostego, minimalistycznego frameworku dla Node.JS, który bardzo niewiele narzuca programiście. Struktura aplikacji może być praktycznie dowolna, do niczego konkretnego nie jesteśmy zmuszeni. Nie jest to za dobre na samym początku przygody, więc będziemy trzymać się dobrych praktyk budowania przejrzystej aplikacji.
> _Express_ świetnie sprawdza się do budowania API typu REST i aplikacji CRUD. Jest jednocześnie najbardziej popularnym frameworkiem _Node.js_, który dodatkowo posiada bardzo niski próg wejścia. Wybrałem go również ze względu na to, że jest z nim najwięcej tutoriali w internecie! :D

Gdy wstępną konfigurację mamy już za sobą pora zacząć pisać właściwą aplikację, na razie prostą, jedno-plikową, ale to do czasu. W pliku _index.js_ musimy zaimportować framework _Express.JS_ i zacząć go używać.

```js:src/index.js
import express from "express";

const app = express();

app.listen(5000, () => {
  console.log("Server started on port 5000!");
});
```

Tak właśnie wygląda najprostsza instancja serwera, nie robi ona jeszcze nic poza nasłuchiwaniem na porcie 5000. Nasłuchiwaniem na nic, bo nie zdefiniowaliśmy żadnych ścieżek.

Aby uruchomić taką aplikację ,dodajmy do pliku _package.json_ skrypty pozwalające na jej odpalenie przez _Nodemon_ i przez standardowy _node.JS_. Nie zapomnijmy o dodaniu fragmentu mówiącego, aby odpalanie aplikacji odbywało się przy pomocy _Babel'a_: _"--exec @babel/node"_.

```json:package.json
{
  "name": "express_CRUD",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "node --exec babel-node src/index.js",
    "serve": "nodemon --exec babel-node src/index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "devDependencies": {
    "@babel/core": "^7.6.4",
    "@babel/node": "^7.6.3",
    "@babel/preset-env": "^7.6.3",
    "nodemon": "^1.19.4"
  },
  "dependencies": {
    "curl": "^0.1.4",
    "dotenv": "^8.2.0",
    "express": "^4.17.1"
  }
}
```

Komenda _"npm run serve"_ odpali naszą aplikację, w trybie nasłuchu na zmiany, przy pomocy pakietu _Nodemon_, a w konsoli zobaczymy wypisane _"Server started on port 5000!"_ Wszystko jak na razie działa wspaniale.

## Routing

Gdy serwer już działa pora, aby zaczął coś odpowiadać, gdy zadamy pu _"pytanie"_. Tak właśnie najprościej możemy opisać routing serwera, czyli zdefiniowane odpowiedzi na konkretne zapytania. W tym przypadku zapytaniem do serwera jest _request_ na konkretny URL, który serwer obsługuje. Poza samym URLem ważna jest również metoda HTTP skojarzona z danym requestem. Mówi ona, co chcemy zrobić.

> ### Protokół HTTP
>
> HTTP (skrót od Hypertext Transfer Protocol) jest najczęściej, w tym momencie, wykorzystywanym protokołem w przeglądarkach. Jest to protokół bezstanowy, czyli ani serwer, ani klient (aplikacja "rozmawiająca" z serwerem) nie przechowuje informacji o zapytaniach. Z punktu widzenia połączenia, każde kolejne zapytanie jest traktowane jak całkowicie nowe. Zapytanie HTTP składa się z _head_ i _body_. Head definiuje mi. metodę HTTP czy nagłówki przekazane w zapytaniu, a body to nic innego jak dane, które przekazujemy serwerowi.
>
> Podstawowe **metody HTTP**:
>
> - **_GET_** - pobieranie danych;
> - **_POST_** - przesyłanie danych w formacie klucz - wartość;
> - **_PUT_** - również przesyłanie pakietu danych, zwykle używana do updatowania konkretnego elementu zasobu;
> - **_DELETE_** - usuwanie danych.
>
> **Nagłówki HTTP** są opcjonalnymi metadanymi wymienianymi między sobą przez przeglądarkę i serwer, w celu przekazania informacji tj. np. rodzaj przesyłanych treści, lub jakiej odpowiedzi oczekuje druga strona. Przyjmują one postać klucz: wartość. Jedynym obecnie dla nas przydatnym nagłówkiem jest _"Content-type"_, określający typ przesyłanych danych.
>
> **Statusy HTTP** są to trzycyfrowe, numeryczne kody dołączone do odpowiedzi na zapytanie HTTP, sygnalizują jej status (powodzenie, niepowodzenie, jego przyczynę). Zasadniczo statusy HTTP można podzielić na 5 grup, związanych z pierwszą cyfrą kodu:
>
> - 1xx — rzadko spotykane, informacyjne, mówiące bardziej 0 środowisku;
> - 2xx — powodzenie (np. _200_ - OK, _201_ - utworzono zasób);
> - 3xx — przekierowanie;
> - 4xx — błąd po stronie użytkownika (np. _404_ — nie znaleziono, _403_ — brak dostępu lub _400_ — niepoprawne zapytanie);
> - 5xx — błąd po stronie serwera.

Aplikacja CRUD (Create - Read - Update - Delete), powinna móc wyświetlać dane (wszystkie, jak i pojedyncze rekordy), dodawać nowe dane, zmieniać dane istniejące i ostatecznie usuwać dane. Pokrycie wszystkich tych metod uzyskamy właśnie za pomocą kombinacji metod HTTP i odpowiednio dobranych URLi.

Wcześniej jeszcze musimy zadbać o dane, na których będziemy operować, jako że w tym wpisie nie skupiamy się na bazach danych itp., nasze dane będą prostą tablicą zawierającą _"zahardcodowanych"_ _userów_. Aby móc rozróżnić poszczególne rekordy nadamy im numery identyfikacyjne (id). Żeby mieć pewność, że są one unikatowe, skorzystamy z pakietu _uuid_, generującego je za nas.

```bash:terminal
npm i uuid
```

```js:src/index.js
import express from "express";
import uuid from "uuid/v4";

const app = express();

let users = [
  {
    id: uuid(),
    name: "John",
    age: 38,
  },
  {
    id: uuid(),
    name: "Will",
    age: 29,
  },
  {
    id: uuid(),
    name: "Jack",
    age: 28,
  },
];

// Routing

// GET all users

// GET single user

// POST new user

// PUT (update) user

// DELETE user

app.listen(5000, () => {
  console.log("Server started on port 5000!");
});
```

### GET all users

Zaczniemy od pobrania wszystkich użytkowników, wykorzystamy do tego metodę **GET** protokołu HTTP. Framework _Express_ umożliwia nam korzystanie z metod HTTP w bardzo prosty sposób, posiada on tak samo nazywające się metody, w których parametrach definiujemy ścieżki. Dla zapytania pobierającego dane będzie to _app.get(...)_. W parametrach metody podajemy ścieżkę, pod którą będziemy wysyłać request.

Kolejnym parametrem metody get jest callback, który ma swoje parametry (req i res), są to odpowiednio obiekt żądania (req - request) i obiekt odpowiedzi (res - response), za ich pomocą jesteśmy w stanie odbierać, jak i przekazywać informacje do metody 'GET' protokołu http.

Za pomocą metody res.send możemy wysyłać proste informacje, np. stringi lub tagi html. W tym projekcie zdecydowanie częściej będziemy wysyłać obiekty formatu JSON metodą res.json(). Wyślijmy więc prosty obiekt.

```js:src/index.js

...

app.get("/", (req, res) => {
  res.json({
    name: "Sebastian",
    age: 28
  });
});

...
```

Gdy teraz w przeglądarce odpalimy http://localhost:5000/ otrzymamy obiekt JSON, zawierający moje imie i wiek.
Wracając do naszych użytkowników, chcemy w tym momencie zwrócić wszystkie rekordy z naszej tablicy _users_.
Dla zachowania dobrych praktyk nie będziemy wysyłać zapytań na http://localhost:5000, bo w późniejszym czasie mogłoby to prowadzić do bałaganu. Dobrym pomysłem będzie ustawienie naszego bazowego url np. na http://localhost:5000/api/users. Wpisuje się to w standardy _REST_, o którym bliżej opowiem w przyszłości.

```js:src/index.js

...
// GET all users
app.get("/api/users", (req, res) => {
  res.json({
    data: users
  });
});

...
```

Teraz, odwiedzając podany wyżej url, naszym oczom ukaże się cała tablica _users_.

### POST user

Kolejnym krokiem będzie dodanie metody pozwalającej na dodawanie nowych użytkowników. Aby jednak móc dodawać takowych potrzebujemy narzędzia do obsługi zapytań HTTP, gdyż przeglądarka jest w stanie tylko odebrać dane (GET).

> ### cURL
>
> _"cURL – sieciowa biblioteka programistyczna, napisana w języku C, działająca po stronie klienta, z interfejsami dla ponad 30 innych języków. Umożliwia wysyłanie zapytań HTTP, w tym pobieranie z serwerów stron i plików, a także wysyłanie treści formularzy. Ułatwia tworzenie aplikacji korzystających z protokołu HTTP. Biblioteka cURL ma ogromne możliwości, jej podstawowym zastosowaniem jest tworzenie sprzęgów w złożonych systemach opartych o technologie Webowe."_
>
> cytowane za Wikipedią [https://pl.wikipedia.org/wiki/CURL](https://pl.wikipedia.org/wiki/CURL)
>
> Instalujemy bibliotekę globalnie za pomocą _npm_
>
> ```bash:terminal
> npm i -G curl
> ```
>
> Aby skorzystać z tego pakietu wystarczy, że w wierszu poleceń po nazwie pakietu wpiszemy oznaczenie opcji pakietu wraz z wartością opcji (może być kilka, oddzielone spacjami) i url, pod który wysyłamy request. Podstawowe opcje:
>
> - _-X, --request_ - typ metody HTTP, przy metodzie _GET_ parametru nie trzeba dodawać;
> - _-d, --data_ - wysyłanie danych (w metodzie POST);
> - _-H, --headers_ - nagłówki do dołączenia do requestu;
>
> ```bash:terminal
> $ curl http://localhost:5000/api/users
>
> {
>   "data":[
>     {
>       "id":"a2abd927-3411-43dc-9bd6-58d98f399c72",
>       "name":"John Doe",
>       "age":34
>     },
>     {
>       "id":"18d9a738-8313-4ec4-ac33-24debf1d3a3a",
>       "name":"Sam Smith",
>       "age":26
>     },
>     {
>       "id":"11b1a110-a486-484a-bd40-0220472f9663",
>       "name":"Sarah Wiliams",
>       "age":19
>      }
>     }
>   ]
> }
>
> ```

Zanim jednak dodamy pierwszego użytkownika, musimy określić, jak serwer ma _parsować_ wysyłane do niego dane. Zrobimy to za pomocą _middleware_, metody, która będzie odpalana przez serwer przy każdym przychodzącym requeście. Sam framework _Express_ ułatwia nam bardzo to zadanie, definiując konkretne metody do parsowania danych.

```js:src/index.js

...
app.use(express.json());

// Routing

// GET all users
app.get("/api/users", (req, res) => {
...

```

Jako że dane, które będziemy wysyłać do serwera, będą w formacie _JSON_, takiej też metody middleware użyjemy. Middleware od routingu różni się tylko tym, że metody _app.use()_ są odpalane przy każdym requescie, a np. metoda _app.get()_ tylko dla zapytań _GET_. Jako middleware możemy również umieścić nasze własne funkcje, powiemy o tym więcej przy temacie autentykacji JWT.

No to, w końcu, pozwólmy serwerowi odbierać dane i dodawać do zasobu!

```js:src/index.js
// POST user
app.post("/api/users/", (req, res) => {
  const newUser = {
    id: uuid(),
    name: req.body.name,
    age: req.body.age,
  };
  data = [...data, newUser];
  res.json({
    data: newUser,
  });
});
```

Na początku tworzymy nowy obiekt, który odpowiada budową pojedynczemu rekordowi naszych danych. Każdemu jego polu przypisujemy wartość, _id_ jest generowane przez bibliotekę _uuid_ a _name_ i _age_ pobierane z body requestu. Dzięki middleware pozwalającemu parsować dane _JSON_ będziemy mogli odczytać te dane z zapytania, gdy zostaną wysłane w takim formacie. Gdy mamy już nowego usera dołączamy go do tablicy userów, przydatne tu są metody _ES6+_. Na końcu zwracamy, w formacie _JSON_ nowego usera.

Dodajmy więc usera i sprawdźmy, co otrzymamy.

```bash:terminal
$ curl -d '{"name":"Sam","age":15}' -H "Content-Type: application/json" -X POST http://localhost:5000/api/users/

{
  "data":{
    "id":"ddcc62ce-5148-4564-a1ac-92e263ac7fba",
    "name":"Sam",
    "age":15
  }
}

```

Zapytanie rzeczywiście zwróciło nam nowego usera, z informacjami przekazanymi przez nas, jak i wygenerowanym unikalnym _id_. Teraz tylko zobaczmy, czy user jest w naszej _"bazie danych"_.

```bash:terminal
$ curl localhost:5000/api/users/

{
  "data":[
    {
      "id":"a2abd927-3411-43dc-9bd6-58d98f399c72",
      "name":"John Doe",
      "age":34
    },
    {
      "id":"18d9a738-8313-4ec4-ac33-24debf1d3a3a",
      "name":"Sam Smith",
      "age":26
    },
    {
      "id":"11b1a110-a486-484a-bd40-0220472f9663",
      "name":"Sarah Wiliams",
      "age":19
    },
    {
      "id":"ddcc62ce-5148-4564-a1ac-92e263ac7fba",
      "name":"Sam",
      "age":15
    }
  ]
}
```

Jak widzimy, wszystko się powiodło. Oczywiście odpowiedź metody curl nie jest tak ładnie przeformatowana, jak ja to tu przedstawiłem. Jest to zwykły ciąg znaków, ale aby lepiej pokazać co otrzymaliśmy, pozwoliłem sobie dodać trochę formatowania.

## GET single user

Teraz sprawa dość prosta, mamy znaleźć konkretny rekord i tylko jego pokazać. Żeby to zrobić, musimy określić, o który dokładnie rekord nam chodzi. Z tego właśnie powodu, zapewniliśmy każdemu z naszych rekordów unikalny _id_, możemy teraz go przekazać w naszym URLu a w samej metodzie odebrać pa pomocą _req.params_.

```js:src/index.js

...
// GET one user
app.get("/api/users/:id", (req, res) => {
  const user = data.filter(item => item.id === req.params.id);
  res.json({
    data: user
  });
});
...
```

_:id_ w URLu określa, że z tego miejsca będzie pobierany parametr zapytania o nazwie id. Następnie za pomocą metody _.filter()_ przeszukujemy tablicę użytkowników i zwracamy tylko tego, który ma id zgodne z id w przekazanym w URLu.

```bash:terminal
$ curl localhost:5000/api/users/a2abd927-3411-43dc-9bd6-58d98f399c72

{
  "data":[
    {
      "id":"a2abd927-3411-43dc-9bd6-58d98f399c72",
      "name":"John Doe",
      "age":34
    }
  ]
}
```

Wszystko działa świetnie!

## DELETE user

Gdy już potrafimy specyfikować, o który rekord dokładnie nam chodzi za pomocą _req.params_, usuńmy jeden rekord.

```js:src/index.js
...

// DELETE user
app.delete("/api/users/:id", (req, res) => {
  data = data.filter(user => user.id !== req.params.id);
  res.json({
    data: data
  });
});

...
```

Od poprzedniej metody różni się tylko tym, że teraz filtrujemy tablicę, biorąc tylko rekordy różniące się po _id_ od naszego _id_ z URLa i nadpisujemy tak przefiltrowaną tablicą naszą tablicę danych. Prosto, szybko, skutecznie!

### PUT (update) user

Tutaj będzie trochę trudniej, również musimy określić dokładnie który element chcemy zmienić. Musimy się również zabezpieczyć przed nadpisaniem danego pola w rekordzie, np. _name_ pustym stringiem, gdybyśmy nie wysłali dla niego wartości w zapytaniu.

```js:src/index.js
...

// PUT (update) user
app.put("/api/users/:id", (req, res) => {
  const oldUser = data.filter(item => item.id === req.params.id);
  let newUser;

  data = data.map(user => {
    if (user.id === req.params.id) {
      (user.name = req.body.name ? req.body.name : oldUser.name),
      (user.age = req.body.age ? req.body.age : oldUser.age);

      newUser = user;
    }
    return user;
  });
  res.json({
    data: newUser
  });
});
...
```

Na początku musimy pobrać usera, któremu chcemy zmienić dane. Następnie za pomocą metody tablicowej _.map()_, przechodzimy po wszystkich rekordach, jeśli trafimy na zgodne _id_ to po kolei sprawdzamy, czy w body naszego requestu jest pole _name_, jeśli tak to przypisujemy je do _name_ tego rekordu, jeśli nie ma, przypisujemy starą wartość. To samo robimy z _age_. Przypisanie tak podmienionego usera do zmiennej _newUser_ pozwoli nam na końcu zwrócić tylko jego, jako potwierdzenie pozytywnie wykonanej operacji.

```bash:terminal
$ curl -d '{"name":"John","age":56}' -H "Content-Type: application/json" -X PUT localhost:5000/api/users/e6c8797c-7f89-469d-8431-8ca0365d11cd

{
  "data":
  {
    "id":"e6c8797c-7f89-469d-8431-8ca0365d11cd",
    "name":"John",
    "age":56
  }
}
```

## Podsumowanie

Jak widzimy, trochę tego tekstu i kodu jest. Z drugiej strony, właśnie napisaliśmy pierwszą w pełni funkcjonalną aplikację _CRUD_, która całkiem nieźle wpisuje się w standard _REST_.
W najbliższym czasie, na bazie tej aplikacji dodamy obsługę bazy danych i pewnie prostą autentykację.
