---
title: Express + TypeScript - konfiguracja MongoDB
excerpt: Kolejny etap pracy z Express i TypeScript. Tym razem skupiam się na podłączeniu i zaadaptowaniu w aplikacji bazy MongoDB.
date: December 27, 2022
tags: [node, express, ts, mongo]
cover_img: express-rest-starter-with-mongodb.jpg
published: true
---

## Wstęp

<div class="admission">
Artykuły w tym cyklu:

1. [Express + TypeScript - konfiguracja projektu](https://amazed.dev/blog/ts-express-base-config)
2. [Express + TypeScript - CRUD boilerplate](https://amazed.dev/blog/ts-express-base-crud)
3. [Express + TypeScript - struktura aplikacji](https://amazed.dev/blog/ts-express-structure)
4. **Express + TypeScript - konfiguracja MongoDB**
5. [Express + TypeScript - walidacja requestów z biblioteką Joi](https://amazed.dev/blog/ts-express-validation)
6. [Express + TypeScript - middlewares aplikacji](https://amazed.dev/blog/ts-express-middlewares)
</div>

## Instancja bazy danych

Aby nie robić budować aplikacji na _"mockowanych"_ danych w postaci nietrwałej listy elementów, kolejnym krokiem jest podpięcie bazy danych _MongoDB_.
W warunkach prostego developmentu wykonać to można na przynajmniej dwa sposoby. Pierwszy z nich to wykorzystanie cloud'owego klient _MongoDB_ czyli [Mongo Atlas](https://www.mongodb.com/cloud/atlas). Drugi natomiast, to użycie dokera i, na czas developmentu, postawienie lokalnie kontenera z lokalną bazą _Mongo_.

Skożystam z drugiego rozwiązania. Wszystkie niezbędne informacje potrzebne do uruchomienia kontenerea znalazłem na strnie [oficjalnego image mongo](https://hub.docker.com/_/mongo). Wystarczy odpalić w terminalu poniższą komendę i cieszyć się kontenerem.

```bash:terminal
docker run -d -p 27017:27017 --name mongo-books \
  -e MONGO_INITDB_ROOT_USERNAME=user \
  -e MONGO_INITDB_ROOT_PASSWORD=password \
  mongo
```

Podczas tworzenia przekazuje kontenerowi trzy zmienne środowiskowe, które będą miały wpływ później na to jak podłączam się wewnątrz kodu do kontenera. `MONGO_INITDB_ROOT_USERNAME` i `MONGO_INITDB_ROOT_PASSWORD` warunkują login i hasło, które będzie trzeba przekazać aby połączyć się z instancją _mongo_ w kontenerze.

Po stworzeniu instancji w kontenerze powstaje defaultowa baza `test`, w niej będą zapisywane moje kolekcje. Można zmieniić to zachowanie, ale wykracza to poza zakres tego prostego przykładu.

## Połączenie z bazą

Gdy instancja bazy danych jest już uruchomiona, kolejnym krokiem jest zainstalowanie paczki `Mongoose`, która jest _ODM-em_ dla _Mongo_ (**O**bject **D**ata **M**odeling), czyli pakietem ułatwiającym pracę z Mongo dla aplikacji pisanych w _Node_. O `mongoose` można myślec jak o ORM-ach dla baz danych _SQL_. Pomaga budować _scheme_ dokumentów i ułatwia validacię danych.

```bash:terminal
npm i mongoose
```

Mogę teraz ustanowić podstawowe połączeni do bazy danych dodają metodę `connect()` pakietu `mongoose` do pliku `src/index.ts`. Metoda `connect` przyjmuje _connection string_, oraz opcjonalnie obiekt ustawień połączenia i _callback_, który odpali się po nawiązaniu połącznia. Ja pomijam obiekt ustawień, gdyż `mongoose` ma bardzo dobre i w zupełności wystarczające w takiej szkoleniowej aplikacji _defaulty_.

```ts:src/index.ts
import { connect } from "mongoose";
import app from "./app";

const PORT = process.env.PORT || 5000;

// mongodb://<userName>:<password>@localhost:27017
connect("mongodb://user:password@localhost:27017", () =>
  console.log("Connected to MongoDB")
);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});
```

_console.log_ w callback'u powie nam o powodzeniu połączenia z bazą danych. Zobaczymy go w terminalu zaraz pod informacją, że nasz serwer wystartował na porcie 5000. Wewnątrz _connection string_ w metodzie `connect()` odpowiednie miejsca trzeba podmienić swoimi danymi przekazanymi kontenerowi _dockera_ .

## Schema i Model danych

Podstawową cechą odrózniającą MongoDB, od baz _SQL_ jest to, że baza przyjmie różne struktury danych. Dla developera jednak, za duża dowolność może być zgubna, z tego też powodu używam `mongoose`, który pozwala budować _scheme_ obiektu danych, czyli taki jakby wzorzec tego co będzie w niej przetrzymywane.

Na potrzeby samej _schemy_ i modelu danych, który zostanie na jej podstawie zbudowany tworzę nowy plik `src/books/books.model.ts`. W nim powstaje interfejs `IBook` opisujący typ obiektu danych, który będzie przechowywany w bazie. Na jego podstawie tworzę _schemę_ obiektu, w której zaznaczam między innymi typ danych (musi odpowiadać temu z interfejsu, ale przekazany w postaci konstruktorów), oraz czy pole jest wymagane. W _schemie_ można również przkazać parametry walidacyjne czy np. zawrzeć _defaultowe_ wartości.

Na koniec eksportuję zbudowany na podstawie interfejsu i _schemy_ `mongoose` model, który zaimportowany w innych plikach pozwoli na zapisy i odczyty danych w nim zdefiniowanych.

Do modelu danych opisywanego w poprzednich artykułach dodałem jeszcze `enum bookCover`. W _schemie_ podaję, że jest on `type: String`, ale również, że ma przyjmować wartość _enuma_.

```ts:src/books/books.model.ts
import { Schema, model } from "mongoose";

export enum bookCover {
  paperback = "paperback",
  hardcover = "hardcover",
}

interface IBook {
  title: string;
  author: string;
  published: number;
  cover: bookCover;
}

export type CreateBookInput = IBook;
export type UpdateBookInput = Partial<IBook>;

const bookSchema = new Schema<IBook>({
  title: { type: String, required: true },
  author: { type: String, required: true },
  published: Number,
  cover: { type: String, enum: bookCover, required: true },
});

export const Book = model<IBook>("Book", bookSchema);
```

Z pliku `src/books/books.model.ts` eksportuję również dwa typy `CreateBookInput` i `UpdateBookInput`. Będą one typami, ltóre oczekuje, ze otrzymam w `req.body` _requestów_ do tworzenie i updatowania rekordów. Dzięki dziedziczeniu po tym samym interfejsie co _schema_ zachowuję bardzo czytelną spójność danych.

> ### TypeScript utility types
>
> Globalne typy pomocnicze typescript ułatwiają najczęstsze transformacje typów. Majczęściej używane preze mnie to:
>
> - `Partial<Type>` - tworzy typ, dla którego wszystkie pola typu transformowanego `Type` stają się opcjonalne;
>
> - `Pick<Type, Keys>` - tworzy typ zbudowany na bazie transformowanego typu `Type`, lecz wybiera tylko jego pola przekazane w drugim argumencie. Gdy pól jest więcej niż jednio, należy je przekazać jako _stringi_ oddzielone znakiem | (pionow kreska), np. `Pick<Todo, "title" | "completed">`;
>
> - `Omit<Type, Keys>` - podobnt do `Pick`, lecz buerze wszystie pola typu `Type`, poza tymi przekazanymi w drugim argumencie.

## Wykorzystanie modelu

Gdy model jest już gotowy, pora wykorzystać go w _serwisach_. W bardziej rozbudowanych systemach zazwyczaj wydziela się dodatkową warstwę aplikacji, mianowicie _repozytorim_ opisujące typowo metody do zapisu i odczytu danych. Ja dla uproszczenia pomijam tutaj ten krok i operacje na modelu `Book` będą wykonywane w `src/books/books.service.ts`.

```ts:src/books/books.service.ts
import { Book, CreateBookInput, UpdateBookInput } from "./books.model";

const getAllBooks = async () => await Book.find({});

const getBookById = async (id: string) => await Book.findById(id);

const createBook = async (input: CreateBookInput) => {
  const { title, author, published, cover } = input;
  return await Book.create({ title, author, published, cover });
};

const deleteBookById = async (id: string) => {
  await Book.findByIdAndDelete(id);
};

const updateBookById = async (id: string, input: UpdateBookInput) => {
  const { title, author, published, cover } = input;
  return await Book.findByIdAndUpdate(
    id,
    { title, author, published, cover },
    { new: true }
  );
};

export default {
  getAllBooks,
  getBookById,
  createBook,
  updateBookById,
  deleteBookById,
};

```

Nie potrzebuję już teraz listy `const books: Book[] = []`, która służyła jako _storage_, oraz metody `randomId`. Jedyne co jest potrzebne poza samymi metodami to import modelu `Book` (oraz typu `BookInput` do przekazywania danych metodom je wprowadzajacym).

### GET all books

Metoda `.find({})` modelu `Book` zwraca wszystkie rekordy znalezione w kolekcji. W przypadku potrzeby ograniczenia ilości pobieranych danych lub jakiejś filtracji, metodzie `.find()` można przekazać dodatkowe parametry. Tak wywołana metoda modelu zwraca wszystkie znalezione rekordy jako listę.

```ts:src/books/books.service.ts
const getAllBooks = async () => await Book.find({});
```

Metodę `getAllBooks()` servisu wywołuję w kontrolerze `getAllBooksHandler()`, a jej _response_ zwracam w postaci _JSON_ standardowym `res.json()`, które było używane dotąd.

Główna różnica w `src/books/books.controller.ts` polega na tym, że obie metody: `getAllBooks()` serwisu oraz `getAllBooksHandler()` kontrolera, są teraz metodami asynchronicznymi. Z tego powodu, aby zapobiec błędom całej aplikacji przy problemach z pobieraniem danych, kod związany z użyciem serwisu zamykam w `try/catch`. Wtedy w przypadku błędu zwracam jego treść oraz _HTTP status_ **500 - Internal Server Error**, świadczący o problemie aplikacji.

```ts:src/books/books.controller.ts
const getAllBooksHandler = async (req: Request, res: Response) => {
  try {
    const response = await bookService.getAllBooks()
    res.json({ data: response });
  } catch (error) {
    res.status(500).json({ error });
  }
};
```

W kolejnych wpisach opiszę bardziej generyczne i poprawne sposoby _error handlingu_.

### POST book

Aby dodać rekord do kolekcji będę używał metody _Book.create()_. Jako parametry przekazujemy argumenty zgodne ze _schema_. Metoda `create()` tworzy obiekt `Book` i zapisuje go w bazie, zwracając nowozapisany obiekt.

```ts:src/books/books.service.ts
const createBook = async (input: CreateBookInput) => {
  const { title, author, published, cover } = input;
  return await Book.create({ title, author, published, cover });
};
```

Funkcja `createBook()` serwisu zwracanowozapisany obiekt, więc w kontrolerze zwracam go w przypadku powodzenia akcji. Dodatkowo ustawiam _HTTP status_ na **201 - Created**, mówiący o powodzeniu akcji dodania zasobu.

```ts:src/books/books.controller.ts
const createBookHandler = async (req: Request, res: Response) => {
  const { title, author, published, cover } = req.body;
  try {
    const response = await bookService.createBook({ title, author, published, cover });
    res.status(201).json({ data: response });
  } catch (error) {
    res.status(500).json({ error });
  }
};
```

Podobnie jak we wcześniejszej metodzie, w razie niepowodzenia zwracamy _error_ i _HTTP status_ **500 - Internal Server Error**

Możemy teraz za pomocą konsolowego pakietu _cURL_ wysłać pierwszy rekord do bazy.

```bash:terminal
curl -X POST 'localhost:5000/api/books' -H 'Content-Type: application/json' \
-d '{
  "title": "Lód",
  "author": "Dukaj",
  "published": 2001,
  "cover": "hardcover"
}'
```

```bash
{
  "data": {
    "title": "Lód",
    "author": "Dukaj",
    "published": 2001,
    "cover": "hardcover"
    "_id": "63ac4658f8e95c6765f38fbe",
    "__v": 0
  }
}
```

No to sukces! Dodam jeszcze jeden rekord, do bazy danych i pobiorę wszystkie rekordy (_GET all books_).

```bash:terminal
curl 'localhost:5000/api/books'
```

```bash
{
  "data": [
    {
      "_id": "63ac4658f8e95c6765f38fbe",
      "title": "Lód",
      "author": "Dukaj",
      "published": 2001,
      "cover": "hardcover"
      "__v": 0
    },
    {
      "_id": "63ac46ee80982730241acf60",
      "title": "Dzieci Diuny",
      "author": "Dukaj",
      "published": 2003,
      "cover": "hardcover"
      "__v": 0
    }
  ]
}
```

### GET single book

Ponownie budowa metod w serwisie i kontrolerze będzie bardzo zbliżona do poprzednich.

```ts:src/books/books.service.ts
const getBookById = async (id: string) => await Book.findById(id);
```

W serwisie używamy `Book.findById(id)`, która zwraca rekord zgodny z przekazanym `id`, lub **null**, gdy nic nie znajdzie. Praktycznie tak samo działało by wywołanie `findOne({ _id: id })`, dokumentacja jednak zaleca, by wyszukując po **id**, używać bezpośrednio przeznaczonej do tego metody.

Z poziomu kontrolera, różnica pomiędzy `getBookByIdHandler()` a `getAllBooksHandler()` polega jedynie na obsłudze przypadku, gdy _service_ nie znalazł rekordu z podanym `id`. Muszę wtedy zwrócić informacje o tym wraz z _HTTP status_ **404 - Not Found**. Ważny jest `return` przed tą odpowiedzią, aby metoda zakończyła się w tym miejscu i nie starała się zrobić nic po `if`.

```ts:src/books/books.controller.ts
const getBookByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const response = await bookService.getBookById(id);
    if (!response) {
      return res.status(404).json({ error: "Book not found" });
    }
    res.json({ data: response });
  } catch (error) {
    res.status(500).json({ error });
  }
};
```

Mogę przetestować pobranie pojedyńczego rekordu.

```bash:terminal
curl localhost:5000/api/books/63ac4658f8e95c6765f38fbe
```

```bash
{
  "data": {
    "_id": "63ac4658f8e95c6765f38fbe",
    "title": "Lód",
    "author": "Dukaj",
    "published": 2001,
    "cover": "hardcover"
    "__v": 0
  }
}
```

### PUT (update) book record

Aby znaleźć i zmienić rekord w bazie tym razem skorzystam z metody `Book.findByIdAndUpdate()`, która jako argumenty przyjmuje `id` rekordu, który chcę zmienić oraz zmieniane pola.

Jako zmieniane pola przekazuję wszystkie, które mogę zmienić. Nic nie stoi na przeszkodzie aby w _requeście_ przekazać tylko wybrane. Spowoduje to, że podmienione zostaną tylko te przekazane.

```ts:src/books/books.service.ts
const updateBookById = async (id: string, input: UpdateBookInput) => {
  const { title, author, published, cover } = input;
  return await Book.findByIdAndUpdate(
    id,
    { title, author, published, cover },
    { new: true }
  );
};
```

Ważne też aby jako opcje metody (trzeci parametr) przekazać `{ new: true }` co spowoduje, że rekord zwrócony po poprawnym wykonaniu się metody, będzie rekordem zupdatowanym. Defaoultowo był by to rekord przed _updatem_.

```ts:src/books/books.controller.ts
const updateBookByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author, published, cover } = req.body;
  try {
    const response = await bookService.updateBookById(id, { title, author, published, cover });
    res.status(200).json({ data: response });
  } catch (error) {
    res.status(500).json({ error });
  }
};
```

Po poprawnym wykonaniu operacji zwracam _HTTP status_ na **200 - OK**, oraz zmieniony rekord, a przy niepowodzeniu standardowo _error_ i _HTTP status_ **500 - Internal Server Error**

### DELETE book

Tutaj nie ma już żadnej filozofii. Metoda _service_ bardzo podobane do tej pobierajacej pojedynczy rekord, tym razem jednak wywołuję metodę `Book.findByIdAndDelete()` przekazując `id` rekordu, który chcę usunąć.

```ts:src/books/books.service.ts
const deleteBookById = async (id: string) => {
  await Book.findByIdAndDelete(id);
};
```

Metoda nie zwraca nic, więc w kontrolerze również nic nie przechwytuję, zwracam jedynie _HTTP status_ **204 - No Content**. Mówi on o powodzeniu operacji, przy czym nie ma żadnych danych do przekazania.

```ts:src/books/books.controller.ts
const deleteBookByIdHandler = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await bookService.deleteBookById(id);
    res.status(204);
  } catch (error) {
    res.status(500).json({ error });
  }
};
```

## Lepszy connect

Ostatnim krokiem będzie zadbanie o wydzielenie kodu odpowiedzialnego za połączenie z bazą do oddzielnego pliku, oraz zadbanie o poprawne zarządzanie połączeniem. W pliku `src/config/dbConnection.ts` umieszczam wcześniej używaną metodę `connect()` tym jednak razem dochodzi kilka elementów.

```ts:src/config/dbConnection.ts
import { connect, connection } from "mongoose";

const DB_USER = process.env.DB_USER;
const DB_PASS = process.env.DB_PASS;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = process.env.DB_PORT;

export const conncetDB = () => {
  connect(`mongodb://${DB_USER}:${DB_PASS}@${DB_HOST}:${DB_PORT}`);
};

connection.on("connecting", () =>
  console.log("connecting to mongoDB...")
);
connection.on("connected", () =>
  console.log("succesfully connected to mongoDB!")
);
connection.on("disconnected", () => {
  console.log("disconnected from mongoDB!");
  setTimeout(conncetDB, 1000);
});
connection.on("error", () =>
  console.log("could not connect to mongoDB!")
);
```

Po pierwsze, wszystkie elementy _connecton string_ powinny zostać załadowane jako zmienne środowiskowe! Jest to dobra praktyka, która pozwala na pracę w lokalnym środowisku bez zmian w kodzie. Wystarczy wtedy w pliku `.env` zawrzeć niezbędne zmienne.

```:.env
PORT=5000
DB_USER=user
DB_PASS=password
DB_HOST=localhost
DB_PORT=27017
```

Drógim elementem, na który warto zwrócić uwagę, to _nasłuch_ na zdarzenia, powiązane z połączeniem do bazy danych. Pozwala nam na to dodanie _callbacków_ do tych zdarzeń. W tym przypadku są to proste `console.log()` z informacją. Jedynie w przypadku _eventu_ `"disconnected"` próbuję po sekundzie ponownie się połączyć.

`mongoose` obsługuje wiele _eventów_ związanych z połączeniem z bazą danych, podstawowe z nich to:

- _connecting_ - rozpoczyna połączeni;
- _connected_ - połączony;
- _disconnected_ - rozłączony (również w przypadku błędu);
- _reconnecting_ - ponawia próbę połączenia;
- _close_ - poprawnie zakończone połączenie;
- _error_ - błąd połączenia;
- _all_ - wszystkie eventy

Teraz tylko importuję i odpalam funkcję `connectDB()` w `src/index.ts` i wszystko działa tak samo jak przed zmianami, a połączenie z bazą jest oddzielone od kodu samego servera.

```ts:src/index.ts
import app from "./app";
import { conncetDB } from "./config/dbConnection";

const PORT = process.env.PORT || 5000;

conncetDB();

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});
```

## Podsumowanie

Podłączenie bazy danych, w tym wypadku _MongoDB_ było kolejnym krokiem w budowaniu _boilerplate_ REST-owej aplikacji pisanej przy użyciu frameworku _Express_ i _TypeScript_.

Kompletny kod aplikacji z powyższego artykułu można znaleźć w [repozytorium github](https://github.com/amazeddev/express-ts/tree/mongo).
