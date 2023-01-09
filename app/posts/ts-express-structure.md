---
title: Express + TypeScript - struktura aplikacji
excerpt: Jak ustrukturyzować projektu i czym właściwie jest ten REST. Prezentacja prostej i uniwersalnej REST-owej architektóry aplikacji pisanej w Express i TS.
date: December 22, 2022
tags: [node, express, ts]
cover_img: app-structure.jpg
published: true
---

## Wstęp

<div class="admission">
Artykuły w tym cyklu:

1. [Express + TypeScript - konfiguracja projektu](https://amazed.dev/blog/ts-express-base-config)
2. [Express + TypeScript - ESLint i Prettier](https://amazed.dev/blog/ts-express-linter-prettier)
3. [Express + TypeScript - CRUD boilerplate](https://amazed.dev/blog/ts-express-base-crud)
4. **Express + TypeScript - struktura aplikacji**
5. [Express + TypeScript - konfiguracja MongoDB](https://amazed.dev/blog/ts-express-mongo)
6. [Express + TypeScript - walidacja requestów z biblioteką Joi](https://amazed.dev/blog/ts-express-validation)
7. [Express + TypeScript - middlewares aplikacji](https://amazed.dev/blog/ts-express-middlewares)
</div>

## Po co właściwie sytuktura aplikacji

Podstawowym problemem aplikacji która rośnie, jest to, jak usystematyzować kod, aby był prosty, czytelny i łatwy do rozwijania. Napisanie takiej aplikacji nie jest proste, niezależnie od języka czy frameworku, i zazwyczaj wiąże się ze stosowaniem pewnych sprawdzonych praktych czy wzorców architektonicznych.

Do tego `Express` pozwala pisać aplikacjie w bardzo prosty sposób, nie narzycając poraktycznie żadnych wymogów co do tego jak piszę. Ma to niewątpliwe zalety, mogę budować aplikacje jak tylko chcę, ale z drugiej strony, zapędzenie się w ślepą uliczkę jest bardzo proste i częste u nioedoświadczonych deweloperów.

Aplikacja pisana od początku bez przyłozenia szczególnej uwagi do struktury zaczyna sprawiać coraz większe problemy wraz z rozbudową. Bugi są cięższe do wyłapania, a ich naprawienie zajmuje więcej czasu. Zmiany w jednej części kodu nieżadko powodują problemy w innych miejscach, a każda nawet mała zmiana kosztuje dewelopera nieproporcjonalnie wiele czasu.

Tak więc w tym wpisie skupiam się jak w prosty sposób podzielić i ustrukturyzować aplikacje, żeby późniejszy development był prostszy.

## Aplikacja REST-owa

W tym i innych artykułach serii zajmuję się pisaniem aplikacji opartej o architektórę `REST`. Nie jest to jedyny sposób pisania API (z ang. **A**pplication **P**rogramming **I**nterface czyli interfejs pozwalajacy na komunikację z aplikacją), ale zdecydowanie jeden z prostszych i częściej używanych.

> ### REST API
>
> **REST** (_**R**epresentational **S**tate **T**ransfer_) jest stylem tworzenia oprogramowania, który opiera się o z góry zdefiniowane reguły. Definiuje on zasoby oraz sposób dostawania sie do nich.
>
> **API** (_**A**pplication **P**rogramming **I**nterface_) to zbór reguł komunikacji pomiędzy programami. API, w tym przypadku, można opisać następującymi krokami: _klient wysyła zapytanie na odpowiedni endpoint_ -> _interfejs proceduje zapytanie i zwraca odpowiedź_ -> _klient otrzymuje odpowiedź_.
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

## Zasady dobrej struktury

O ile zasad o które mozemy oprzeć architektóre aplikacji jest bardzo dużo, waro nadmienić dwie podstawowe, które są na tyle uniwersalne, że wcale nie muszą być stosowane tylko do _REST_ _API_. Mianowice:

- podział ze względu na odpowiedzialnosci (_separation of concerns_) - czyli takie rozdzielenie kodu aplikacji, aby jedna jego część wykonywała tylko jedno zadanie, fo którego została stworzona. Takie rozdzielenie warunkuje prostszy i czytelnmiejszy kod, który również łatwiej rozwijać.
- modułowa architektura - podział aplikacji na łatwe do zrozum9ienia i wydzielenia moduły.

## Moduły aplikacji

Moje aplikacje lubie dzielić ze względu na _resources_ dookołoa których są obudowywane. W poprzednim artykule [Express + TypeScript - CRUD boilerplate](https://amazed.dev/blog/ts-express-base-crud) skupiłem się na ksiązkach, więc dookoła tego zasobu będę dalej budował aplikację. Tworząc moduł `books` będę chciał w nim umieścić cały kod powiązany bezpoośrednio z zasobem. Wszystko pozostałe, czyli niezwiązane bezpośrenio lub takie, które moze być dzielone pomiędzy więcej zasóbów, będzie znajdowało się na zewnątrz modułu.

Budowę modułu oczywiście zaczynam od strzenia folderu.

```bash
src
 ├── books
 │    └── ...
 └── index.ts
```

## Three-layer app architecture

Wchodząc głębiej w strukturę modułu warto od razu na początku dokonać rozdzielenia kodu na częsci wykonujące pewne z góry założone zadania. W aplikacjach opartych o `REST` dobrze sprawdza sie rozdzielenie każdego moduły na trzy wartwy:

- **komunikacji _(web layer)_** - odpowiedzialna za otrzymywanie zapytań `HTTP`, walidacje i wysyłanie odpowiedzi. Ściśle związana z _routingiem_ omawianym we wcześniejszym artkule.
- **logiki buznesowej _(service layer)_** - zawiera całą funkcjonalność definiującą logikę biznesową i reguły z nią związane.
- **danych _(data access layer)_** - zwiazana z zapisem i odczytem z bazy danych.

Taki podział bardzo dobrze wpisuje się w zasadę _separation of concerns_, czyli podziału aplikacji (wewnatrz modułu), ze względu na odpowiedzialności.

W poprzednim artykule zakończyłem prace z aplikacją zawierającą cały kod w jednym pliku. Teraz na bazie opisanych wyżej zasad nadam aplikacji prostą i czytleną strukrurę.

### Services

Pracę zacznę od środka, czyli od _services_. Powinny one zawierać logikę biznesową i nie mieć pojęcia czym jest `request` i `respone`. Na podstawie z góry określonych argumentów powinny zwracać określone wyniki.

Dlatego w pliku `/src/books/book.service.ts` wszystko co związane z tworzeniem tworzeniem i zapisywaniem czy usuwaniem elementów listy `books`. Dla uproszczenia połączenie z bazą danych omówione zostanie w kolejnym artykule, więc do wyżej wymuenuinego pliku trafi również sama lista `books` (udajaca bazę danych) i definicje typów danych z nią zwąiązanych.

```ts:src/books/books.service.ts
const randomId = () => Math.random().toString(36).slice(2, 7);

type Book = {
  id: string;
  title: string;
  author: string;
  published: number;
};

type BookInput = Omit<Book, "id">;

let books: Book[] = [
  {
    id: randomId(),
    title: "Lód",
    author: "Dukaj",
    published: 2007,
  },
];

const getAllBooks = (): Book[] => books;

const getBookById = (id: string): Book | undefined =>
  books.find((book) => book.id === id);

const createBook = (input: BookInput): Book => {
  const { title, author, published } = input;
  const newBook = {
    id: randomId(),
    title,
    author,
    published,
  };
  books.push(newBook);
  return newBook;
};

const deleteBookById = (id: string): void => {
  books = books.filter((user) => user.id !== id);
};

const updateBookById = (id: string, input: BookInput): Book => {
  const { title, author, published } = input;
  const existingBook = books.find((book) => book.id === id);

  if (!existingBook) {
    const newBook = {
      id: randomId(),
      title,
      author,
      published,
    };
    books.push(newBook);
    return newBook;
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
  return existingBook;
};

export default {
  getAllBooks,
  getBookById,
  createBook,
  updateBookById,
  deleteBookById,
};
```

Na początek definicja funkcji `randomId()`. Na nią znajdę inne miejsce na końcu tego wpisu. Później typy `Book` i `BookInput`. Ten drugi jest to poprostu wesja, w której nie przekazuję `id` - gdy tworzymy zasób, nie przekazujemy mu identyfikatora, ma zostać nadany przez wartwę zapisu.

W dalszej części zapisałem metody odpowiadające wszystkim podstawowym metodą aplikacji _CRUD_. Każda z metod odzwierciedla logikę powiązaną z prostą akcją.

`createBook` przyjmuje `BookInput` i na podstawie przekazanych wartosci tworzy obieky `Book` oraz zapisuje go do _storage_. Na końcu zwraca stworzony rekord.

```ts:src/books/books.service.ts
const createBook = (input: BookInput): Book => {
  const { title, author, published } = input;
  const newBook = {
    id: randomId(),
    title,
    author,
    published,
  };
  books.push(newBook);
  return newBook;
};
```

`getBookById` może zwrócić resource lub `undefined` jeśli żadna książka nie odpowiada przekazanemu jako argument `id`

```ts:src/books/books.service.ts
const getBookById = (id: string): Book | undefined =>
  books.find((book) => book.id === id);
```

Wszystkie te metody odzwierciedlają logikę zapytań z poprzedniego artykułu. Zostały jedynie wyciągnięte jako nowa warstwa abstrakcji.

### Controllers

Kolejnym plikiem który utworzyłem jest plik `src/books/books.controller.ts`. Jest to już warstwa komunikacji mojej aplikacji. Ogólnie metody kontrolerów można rozumieć jako _handlery_ zapytań _HTTP_. Przyjmują zawsze `(req: Request, res: Response)`, wyciągają z obiektu `req` niezbędne infoemacje i przekazują je do metod serwisu. Na końcu zwracają rezultat pracy serwisu w ustandaryzowanej formie odpowiedzi _HTTP_ (zazwyczaj _JSON_) wraz z statusem opisującym rezultat metody.

```ts:src/books/books.controller.ts
import { Request, Response } from "express";
import bookService from "./book.service";

const getAllBooksHandler = (req: Request, res: Response) => {
  const response = bookService.getAllBooks();
  res.json({
    data: response,
  });
};

const getBookByIdHandler = (req: Request, res: Response) => {
  const { id } = req.params;
  const response = bookService.getBookById(id);

  if (!response) {
    res.status(404).json({ msg: "Book not found" });
  }

  res.json({
    data: response,
  });
};

const createBookHandler = (req: Request, res: Response) => {
  const { title, author, published } = req.body;

  const response = bookService.createBook({ title, author, published });

  res.status(201).json({
    data: response,
  });
};

const updateBookByIdHandler = (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, author, published } = req.body;

  const response = bookService.updateBookById(id, { title, author, published });

  res.status(200).json({
    data: response,
  });
};
const deleteBookByIdHandler = (req: Request, res: Response) => {
  const { id } = req.params;

  bookService.deleteBookById(id);

  res.status(204);
};

export default {
  getAllBooksHandler,
  getBookByIdHandler,
  createBookHandler,
  updateBookByIdHandler,
  deleteBookByIdHandler,
};
```

Wszystkie metody są bardzo przewidywalne, destrukturyzują `req.params` lun `req.body`, przekazują aegumenty do metod `bookService` i zwracają rezultat w poprzez `res.json()`. Jedynie `getBookByIdHandler` różni się nieznacznie, reaguje bowiem na brak wyniku metody `bookService.getBookById(id)` i zwraca informacje o niepowodzeniu wraz ze statusem _404_.

```ts:src/books/books.controller.ts
const getBookByIdHandler = (req: Request, res: Response) => {
  const { id } = req.params;
  const response = bookService.getBookById(id);

  if (!response) {
    res.status(404).json({ msg: "Book not found" });
  }

  res.json({
    data: response,
  });
};
```

`ErrorHandling` będzie opisany szerzej w artykułach o połączeniu z bazą danych i w kolejnym związanym typowo z obsłygą błedów.

### Routes

Ostatnim nowym plikiem będzie `/src/books/books.routes.ts`, zawierający moduł mapującu adresy _URL_ i _metody HTTP_ na handlery importowane z `src/books/books.controller.ts` obsługujące zapytania _HTTP_.

```ts:src/books/books.routes.ts
import { Router } from "express";
import booksController from "./books.controller";

const booksRouter = Router();

//GET all books
booksRouter.get("/", booksController.getAllBooksHandler);

// POST book
booksRouter.post("/", booksController.createBookHandler);

// GET one book by id
booksRouter.get("/:id", booksController.getBookByIdHandler);

// DELETE book by id
booksRouter.delete("/:id", booksController.deleteBookByIdHandler);

// PUT (update) book by id
booksRouter.put("/:id", booksController.updateBookByIdHandler);

export default booksRouter;
```

Na samym początku impoeruje `Router` od `express`, pozwoli on na rejestrowanie handlerów wraz z odpowiadajacymi im _URL=ami_ i mietodami _HTTP_. Taki obiekt `booksRouter` exportuje na końcu aby użyć potem w głównym pliku aplikacji.

Warto zwrócić uwagę na dwie rzeczy. Po pierwsze _URLe_ zostały skrócone do jedynie samego końcowego slasza lub patametru. Zostało tp zrobione, gdyż `express` pozwala nam zarejestrować później taki `router` przekazując mu człon adresu, którym będzie poprzedzone to co zastosowałem tutaj dla każdego _route'a_. Po drógie każdej z metod przekazuję tylko instancje handlera, bez wywołania. Za wywołanie odpowiedzialny będzie mechanizm frameworku, gdy zarejestruje odpowiedni _request_.

### Entry point

Końcowym wlementem przebudowy API jest zadbanie o połączenie wszystkich dodanych elementów. Plik `/src/index.ts` jako główny plik aplikacji (_entry point_) nie będzie teraz znał żadncy definicji zasobów czy logiki biznesowej. Jego jedyną odpowiedzialnością będzie uytrzymanie ciągłego nasłuchu na porcie i kierowanie zapytań do konkretnych modułów.

```ts:src/index.ts
import express from "express";
import booksRouter from "./books/books.routes";

const PORT = process.env.PORT || 5000;

const app = express();
app.use(express.json());

app.use("/api/books", booksRouter);

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});
```

Warto zwrócić uwagę na sposób użycia `booksRouter`. Przekazujemy jedynie aplikacji, że gdy uzyska jakiekolwiek zapytanie (metoda `use()`) na adres `/api/books`, ma przekazać odpowiedzialność za wykonanie tego zapytanie właśnie do `booksRouter`.

Co do użycia zmiennych środowiskowych `const PORT = process.env.PORT || 5000;` odsyłam do jednego z wcześniejszych artykułów: [Zarządzanie lokalnymi zmiennymi środowiskowymi - direnv](https://amazed.dev/blog/dev-env-vars-manage).

## Rozdzielenie modułu aplikacji od servera

Bardzo popularnym zabiegiem podczas tworzenmia aplikacji opartych o `Express` jest rozdzielenie funkcjonalności głównego modułu aplikacji od samego servera.

Jako moduł główny można rozumieć jako fragment kodu, którt importuje i niejako łączy w sobie wszystkie moduły biznesowe wraz z ich funkcjonalnościami, a następnie eksportuje je na zewnątrz w postaci jednego obiektu.

```ts:src/app.ts
import express from "express";
import booksRouter from "./books/books.routes";

const app = express();
app.use(express.json());

app.use("/api/books", booksRouter);

export default app;
```

Server natomiast to część aplikacji, która jest odpalana właśnie jako server. Impoeruje ona moduł główny aplikacji, zapewnia niezbędne do jego pracy konfiguracje (tutaj zmienne środowiskowe) i utrzymuje nasłuch na zapytania do aplikacji.

```ts:src/index.ts
import app from "./app";

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}!`);
});
```

Poza walorami czysto strukturalnymi, takie rozdzielenie ma niewątpliwie jedną ogromną zaletę. Przy testowaniu aplikacji będę mógł testować jej główny moduł bez potrzeby inicjowania servera. O testach więcej w kolejnych artykułach.

## Podsumowanie

`Express` w całej swojej prostocie pozwala na pisanie kodu nieustrukturyzowanego, który wraz z rozwojem aplikacji będzie stawał się coraz trudniejszy w utrzymaniu i rozwoju.

Z tego też powodu stosowanie się do standardów i dobrych praktyk w pisaniu kodu jest niezmiernmie ważne. Kolejne artykyły pokażą, że zastosowanie tylko dwuch prostych zasad: _modular architecture_ i _separation of concerns_ pozwoli dalej w prosty sposób rozwijać tę aplikację. Kod powyższej aplikacji w [repozytorium GitHub](https://github.com/amazeddev/express-ts/tree/structure).
