---
title: Express + TypeScript - CRUD boilerplate
excerpt: Wstęp do tworzenia CTUD-owej aplikacji w Express wraz z TS. Wytłumaczenie routingu i sposobów wykorzystania danych wyciąganych z requestów.
date: December 16, 2022
tags: [node, express, ts]
cover_img: node_express_CRUD_starter.jpg
published: true
---

## Wstęp

<div class="admission">
Artykuły w tym cyklu:

1. [Express + TypeScript - konfiguracja projektu](http://localhost:3333/blog/ts-express-base-config)
2. **Express + TypeScript - CRUD boilerplate**
3. [Express + TypeScript - struktura aplikacji](http://localhost:3333/blog/ts-express-structure)
4. [Express + TypeScript - konfiguracja MongoDB](http://localhost:3333/blog/ts-express-mongo)
5. [Express + TypeScript - walidacja requestów z biblioteką Joi](http://localhost:3333/blog/ts-express-validation)
6. [Express + TypeScript - middlewares aplikacji](http://localhost:3333/blog/ts-express-middlewares)
</div>

## Pierwszy server

Konfiguracje projektu _Express_ + _TypeScript_ opisywałem w poprzednim wpise seri: [Express + TypeScript - konfiguracja projektu](http://localhost:3333/blog/ts-express-base-config). Z racji tego można od razu przejść do kontynuacji i rozszerzyć tę najprostszą możliwą aplikacje o funkcjonalność CRUD.

> ### Aplikacja CRUD
>
> CRUD jest to skrót od **C**reate - **R**ead - **U**pdate - **D**elete, opisujący sposób pisania prostych aplikacji (serwisów) operujących na pewnej, dowolnej encji danych. Aplikacja ma pozwalać na tworzenie, pobierania, zmienianie i usówanie tych danych.

Sam plik `src/index.ts`, który powstał w linkowanym powyżej artykule jest bardzo prosty i nie muszę go szczegółowo omawiać. Importuje niezbędne elementy z frameworku `express`, inincjalizuje aplikację, rejestruję prosty handler requestu _HTTP_ i na koću pozostawiam nasłuch aplikacji na porcie _:5000_.

```ts:src/index.ts
import express, { Request, Response } from "express";

const app = express();

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(5000, () => {
  console.log("Server started on port 5000!");
});
```

W `package.json` również nie ma żadnych skomplikowanych rzeczy, dependencjami mojej aplikacji jest tylko `express` natomiast jako _devDependencies_ zainstalowane mam rzeczy związane z wsparciem _TypeScript_ oraz _autoreloadem_ aplikacji nasłuchującym na zmiany w plikach.

```json:package.json
{
  "name": "express-ts",
  "version": "1.0.0",
  "main": "src/index.js",
  "scripts": {
    "build": "npx tsc",
    "start": "node dist/index.js",
    "start:dev": "nodemon src/index.ts"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "express": "^4.18.2"
  },
  "devDependencies": {
    "@types/express": "^4.17.14",
    "@types/node": "^18.11.13",
    "nodemon": "^2.0.20",
    "ts-node": "^10.9.1",
    "typescript": "^4.9.4"
  }
}
```

Skrypty pozwalaja odpowiednio na zbudowanie, wystartowanie zbudowanej oraz włączenie ciągłego nasłuchu na zmiany w plikach w celu odświeżania aplikacji. Zdecydowanie najczęściej będę korzystał z ostatniej opcji, czyli `npm run start:dev`.

## Routing

Rozszerzanie aplikacji rozpoczynam od dopisania prostego obiektu do przechowywania danych, który będzie symulował bazę danych (o podłączeniu i używaniu baz danych w kolejnych wpisach). Będzie on w formie prostej listy zawierającej obiekty o zdefiniowanym `type Book` , odzwierciedlajacym prostą encję książki. Cała service ma symulować uproszczoną aplikację biblioteczną, do której stopniowo będę dodawał funkcjonalności.

```ts:src/index.ts
import express, { Request, Response } from "express";

const app = express();

const randomId = () => Math.random().toString(36).slice(2, 7);

type Book = {
  id: string;
  title: string;
  author: string;
  published: number;
}

let books: Book[] = [
  {
    id: randomId(),
    title: "Lód",
    author: "Dukaj",
    published: 2007
  }
];

// Routing

// GET all books

// GET single book

// POST new book

// PUT (update) book

// DELETE book

app.listen(5000, () => {
  console.log("Server started on port 5000!");
});
```

Poniżej listy `books` znajduje się wykomentowany, zaproponowany _routing_ aplikacji, czyli pięc podstawowych adresów url wraz z metodami HTTP, na które aplikacja będzie nasłuchiwała, i dla których będzie wykonywała określone akcje. Tak chyba najprościej można opisać routing serwera, czyli zdefiniowane możliwych zapytań i odpowiedzi na nie.

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

### GET all books

Zacznę od _endpointu_ do pobrania wszystkich książek. Wykorzystamy do tego metodę **GET** protokołu HTTP. `Express` umożliwia korzystanie z metod HTTP w bardzo prosty sposób, posiada on tak samo nazywające się metody, w których pierwszy paramet definiuje ścieżkę (URL). Dla zapytania pobierającego dane będzie to `app.get("/", ...)`.

Kolejnym parametrem metody get jest funckja _handler_ odpowiadajaca za obsługę zapytanie, które przyszło na dany _URL_, która ma trzy parametry (req, res i next), są to odpowiednio obiekt żądania (req - request), obiekt odpowiedzi (res - response), oraz funkcję przekazującą wywołanie do kolejnego _handlera_. Za ich pomocą jesteśmy w stanie odbierać, jak i przekazywać informacje do metody 'GET' protokołu _HTTP_. Na temat funkcji `next()` więcej napiszę w kolejnych artykułach.

Za pomocą metody `res.send()` obiektu `Response` mogę wysyłać proste informacje, np. stringi lub tagi html. W tym projekcie zdecydowanie częściej będę wysyłać obiekty w formacie _JSON_ metodą `res.json()`. Wysłanie bardzo prostego _JSON'a_ wygląda tak:

```ts:src/index.ts
app.get("/", (req: Request, res: Response) => {
  res.json({
    title: "Lód",
    author: "Dukaj",
    published: 2007
  });
});
```

Gdy teraz w przeglądarce odpalimy `http://localhost:5000/` otrzymamy obiekt JSON, zawierający przykładowy obiekt `Book`.
Założeniem aplikacji jest jednak aby kożystała ona z zaproponowanego uproszczonego _storage_ książek. Podstawowym _endpointem_, jet ten zwracajacy wszystkie ksiązki przechowywane w liście `books`. Do tego dobrą praktyką aplikacji opartych o architektórę rest jest również, grupowanie powiązanych ze sobą _resources_ poprzez wspólne _URL'e_. Z tego powodu dodam do _URL'a_ człon mówiący, że jest to _api_, oraz _resource_ `books`.

```ts:src/index.ts
// GET all books
app.get("/api/books", (req: Request, res: Response) => {
  res.json({
    data: books
  });
});
```

Wykonując request na adres `localhost:5000/api/books` otrzymam zawartość obiektu `books` z jedną książką.

### POST book

Kolejnym krokiem będzie dodanie metody pozwalającej na dodawanie nowych książek, korzystającej z metody _POST_. Przeglądarka nie pozwala na wykonanie takich zapytań (tylko _GET_). Można się w tym wypadku posłużyć np. aplikacją Postman, lub opisanymi w [innym wpisie](localhost:3333/blog/api-testing) biblioteką _cURL_ czy wtyczką _REST Client_ do _VSCode_

Zanim jednak dodam pierwszą książkę, muszę zadbać o poprawne _parsowanie_ danych przesyłanych do aplikacji. Wykonane to zostanie za pomocą funkcji `middleware`, czyli pewnego rodzaju funkcji, która zostaje wywołana dla każdego zapytania do mojej aplikacji, niezależnie od _URL'a_ i _handlera_, który obsługuje _request_. O funkcjach _middleware_ mowa będzie szerzej w kolejnych artykułach. Sam _Express_ ułatwia nam bardzo to zadanie, definiując konkretne metody do parsowania danych. W przypadku tej aplikacji, format danych, którego się będę spodziewał jako _body_ requestu, fo _JSON_, stąd też wywołam _middleware_ `app.use(express.json());`, linijkę tę wystarczy dodać przed _routingiem_ aplikacji.

Kod pozwalajacy na obsłużenie dodania nowej książki do zasobu wygląda następująco:

```ts:src/index.ts
// POST book
app.post("/api/books/", (req: Request, res: Response) => {
  const {title, author, published} = req.body;
  const newBook: Book = {
    id: randomId(),
    title,
    author,
    published,
  };
  books.push(newBook);
  res.status(201).json({
    data: newBook,
  });
});
```

Na początku za pomocą destrukturyzacji obiektu `req.body` zawierajacego przekazane w _requeście_ dane tworzę nowe zmienne, odpowiadajace polą omiektu `Book`. Na ich podstawie tworzę obiekt `newBook: Book`. Jedynie _id_ tworzone jest automatycznie prze funkcję `randomId` - w późniejszych artykułach okaże się, żę tworzenie randomowego identyfikatora leży w gest używanej przeze mnie bazy danych. Gdy mam już nową książkę dołączam ją do tablicy `books` i zwracam użytkownikowi wraz ze statusem **201** informującym o powodzeniu akcji dodania zasobu.

```bash:terminal
$ curl -X POST http://localhost:5000/api/books/ -d '{"title": "Katedra","author": "Dukaj","published": 2000}' -H "Content-Type: application/json"

{
  "data":{
    "id":"ktllz",
    "title":"Katedra",
    "author":"Dukaj",
    "published":2000
  }
}
```

Zapytanie zwróciło nową ksiązkę wraz z informacjami przekazanymi w requeście, oraz unikalnym _id_. Teraz tylko sprawdzenie, czy książka została poprawnie dodana do _storage_.

```bash:terminal
$ curl localhost:5000/api/books/

{
  "data":[
    {
      "id":"pyozt",
      "title":"Lód",
      "author":"Dukaj",
      "published":2007
    },
    {
      "id":"ktllz",
      "title":"Katedra",
      "author":"Dukaj",
      "published":2000
    }
  ]
}
```

## GET single book

Teraz sprawa dość prosta, mam znaleźć konkretny rekord ze _storage_ i go zwrócić. Żeby to zrobić, muszę określić, o który dokładnie rekord mi chodzi. Z tego właśnie powodu, zapewniłem każdemu z obiektowi listy `books` unikalny _id_, mogę teraz go przekazać w _URL_ a w samej metodzie wyciągnąć z parametrów _requestu_ `req.params`.

```ts:src/index.ts
// GET one book
app.get("/api/books/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const book = books.find((item) => item.id === id);
  res.json({
    data: book,
  });
});
```

`:id` w _URLu_ określa, że z tego miejsca będzie pobierany parametr zapytania o nazwie _id_. Następnie za pomocą metody `books.find()` przeszukuję tablicę `books` i zwracam tylko ten element, który ma `id` zgodne z `:id` w przekazanym w adresie zapytania.

```bash:terminal
$ curl localhost:5000/api/books/ktllz

{
  "data": {
    "id":"pyozt",
    "title":"Lód",
    "author":"Dukaj",
    "published":2007
  }
}
```

## DELETE book

Gdy już potrafę specyfikować, o który rekord dokładnie nam chodzi za pomocą `req.params` i `id`, dodam metodę pozwalającą na usunięcie konkretnego rekordu.

```ts:src/index.ts
// DELETE book by id
app.delete("/api/books/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  books = books.filter((user) => user.id !== id);
  res.status(204);
});
```

Od poprzedniej metody różni się tylko tym, że teraz filtrujemy tablicę, biorąc tylko rekordy różniące się pod względem _id_ od _id_ z _URL'a_ i nadpisujemy tak przefiltrowaną tablicą oryginalny _storage_. Jako _response_ nie wysyłam żadnych danych, bo jeśli metoda się powiodła to nie ma sensu - i tak zostały one już usunięte. Wysyłam jedynie status **204 - No Content**, co jest bardzo powszechne, przy aksjach usuwania zasobu.

### PUT (update) user

Tutaj będzie trochę trudniej, muszę określić dokładnie który element chcemy zmienić wuciągają z requestu jego `id` ale również muszę przypisać mu nowe wartości dla sprecyzowanych pól.

```ts:src/index.ts
// PUT (update) book by id
app.put("/api/books/:id", (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author, published } = req.body;
  const existingBook = books.find((item) => item.id === id);

  if (!existingBook) {
    const newBook = {
      id: randomId(),
      title,
      author,
      published,
    };
    books.push(newBook);
    return res.status(201).json({
      data: newBook,
    });
  }

  const updatedBook: Book = {
    id,
    title: title ? title : existingBook?.title,
    author: author ? author : existingBook?.author,
    published: published ? published : existingBook?.published,
  };

  books = books.map((book) => {
    if (book.id === id) {
      return updatedBook;
    } else {
      return book;
    }
  });

  res.json({
    data: updatedBook,
  });
});
```

Na początku wyciągam z parametrów _requestu_ `id` poszykiwanej ksiązki oraz dane które chce zupdatować z _body_. Następnie staram sie za pomocą metody `books.find()` znaleźć rekord do zmiany. Tutaj, jako dodatek, w zwiazku z tym, że używam metody **PUT**, gdy w _storage_ nie występuje rekord z danym _id_, pozwalam na jego dodanie (utorzenie nowego rekordu jak przy metodzie **POST**) zwracając nowy rekord wraz ze statusem **201** i kończę wywołanie handlera za pomocą `return`.

Gdy rekord jednak istnieje, updatuje pola, które zostały wysłane w _body_ requestu. Żeby _endpoint_ był bardziej uniwersalny, zmieniam tylko te pola, które rzeczywiście zostały przekazane. Tak zmienionym rekordem nadpisuje obiekt w _storage_ i zwracam informacje o powidzeniu wraz z samym zmienionym rekorderm jako _response_.

```bash:terminal
$ curl -X PUT http://localhost:5007/api/books/ktllz -d '{"title": "Wroniec","published": 2009}' -H "Content-Type: application/json"

{
  "data":{
    "id":"ktllz",
    "title":"Wroniec",
    "author":"Dukaj",
    "published":2009
  }
}
```

## Podsumowanie

Jak widać, trochę tego tekstu i kodu powstało, a nadal jest to _jedno-plikowa_ aplikacja. Z drugiej strony, właśnie powstała prosta aplikacja **CRUD** dająca dobry start do dalszego rozwoju i omawiania kolejnych etapów dewelopmentu. Kod powstałej tu aplikacji dostępny w [repozytorium](https://github.com/amazeddev/express-ts/tree/base-crud).
W najbliższym czasie, na bazie tej aplikacji, dodam kolejne wpisy opisujące między innymi integracje z bazami danych, rozszerzenie funkcjonalności o poprawny _error-handling_, omówienie i wykorzystanie _middlewares_ do poprawy _flow_ aplikacji i nie tylko.
