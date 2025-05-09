---
slug: api-testing
title: Testowaniew API - cURL i REST Client
excerpt: Każde API podczas dewelopmentu trzeba testować. Artykuł prezentuje proste, szybkie i niezawodne alternatywy dla dobrze znanego Postmana.
date: December 17, 2022
tags: [utils, shell]
cover_img: api-testing.jpg
published: true
---

## Aplikacje do testowania API

Każdy pewnie zna [Postman](https://www.postman.com/). Ciężko już tu mówić o aplikacji do testowania API, jest to całe wielkie środowisko, pozwalające na wszelką możliwą pracę z API. Testowanie, importy/eksporty, dokumentacja, automatyzacja itp. O _Postmanie_ powstało wiele artykułów, tutoriali, filmów na YT, więc nie będę się nad nim skupiał. Nadmienię tylko, że dla systemów UNIX powstała bardzo ciekawa i godna uwagi alternatywa _open-source_, a mianowicie projekt [Insomnia](https://insomnia.rest/).

Opiszę dwa narzędzia, które może nie zastąpią wyżej nadmienionych, ale w niektórych przypadkach mogą być bardzo użyteczne.

### cURL

_"cURL – sieciowa biblioteka programistyczna, napisana w języku C, działająca po stronie klienta, z interfejsami dla ponad 30 innych języków. Umożliwia wysyłanie zapytań HTTP, w tym pobieranie z serwerów stron i plików, a także wysyłanie treści formularzy. Ułatwia tworzenie aplikacji korzystających z protokołu HTTP. Biblioteka cURL ma ogromne możliwości, jej podstawowym zastosowaniem jest tworzenie sprzęgów w złożonych systemach opartych o technologie Webowe."_

cytowane za Wikipedią [https://pl.wikipedia.org/wiki/CURL](https://pl.wikipedia.org/wiki/CURL)

Większość systemów opartych na UNIX, w tym MacOS, ma już zainstalowaną bibliotekę. Na ogół nie trzeba jej więc instalować.

Aby skorzystać z tego pakietu, wystarczy, że w wierszu poleceń po nazwie pakietu wpisze nazwę argumentu oraz jego wartość (argumentów może być kilka, oddzielone spacjami) i URL, pod który wysyłamy request. Podstawowe argumenty:

- _-X, --request_ - typ metody HTTP, przy metodzie _GET_ parametru nie trzeba dodawać;
- _-d, --data_ - wysyłanie danych (w metodzie POST);
- _-H, --headers_ - nagłówki do dołączenia do requestu;

> Do testów wykorzystam stronę [https://dummyjson.com/](https://dummyjson.com/), która udostępnia proste developerskie API do testowania funkcjonalności.
>
> Do dyspozycji mam wiele różnych API pozwalających na wszystkie CRUD-owe operacje (**C**reate-**R**ead-**U**pdate-**D**elete). Oczywiście tylko _responses_ sugerują np. poprawność dodania czy usunięcia rekordu. W rzeczywistości dane w API się nie zmieniają.

Przykładowe zapytanie czytające **Todos**, korzystające z endpointu 'https://dummyjson.com/todos?limit=3' wygląda jak poniżej. Jako że zapytanie ma metodę **GET**, informacja o typie metody może być pominięta.

```bash:terminal
curl https://dummyjson.com/todos?limit=3
```

```bash
{
  "todos":[
    {
      "id":1,
      "todo":"Do something nice for someone I care about",
      "completed":true,
      "userId":26
    },
    {
      "id":2,
      "todo":"Memorize the fifty states and their capitals",
      "completed":false,
      "userId":48
    },
    {
      "id":3,
      "todo":"Watch a classic movie",
      "completed":false,
      "userId":4
    }
  ],
  "total":150,
  "skip":0,
  "limit":3
}
```

Limit jako parametr URL informuje API, że chcę otrzymać tylko 3 rekordy.

Natomiast aby dodać rekord **Todos**, request za pomocą _cURL_ będzie wyglądał następująco:

```bash:terminal
curl -X POST https://dummyjson.com/todos/add -d '{"todo": "Use DummyJSON in the project", "completed": false, "userId": 5}' -H "Content-Type: application/json"
```

```bash
{
  "id":151,
  "todo":"Use DummyJSON in the project",
  "completed":false,
  "userId":5
}
```

**cURL** jest bardzo przydatny jako proste narzędzie do testowania endpointów, przydaje się, zwłaszcza gdy trzeba coś przetestować wewnątrz zewnętrznego serwera, na zdalnym środowisku, lub za pomocą automatycznego skryptu. Gdy jednak mam do dyspozycji moje środowisko deweloperskie i chcę zwyczajnie testować dewelopowane endpointy, używanie go zaczyna być uciążliwe i powolne.

### REST client dla VSCode

Bardzo podobna na pierwszy rzut oka do _cURL_ jest wtyczka _VSCode_, _REST Client_. Jedna główna różnica polega na zapisywaniu requestów w pliku z rozszerzeniem _.http_ w folderze aplikacji. Pozwala to na swego rodzaju dokumentacje i trzymanie wszystkiego w jednym miejscu, bardzo blisko kodu, który testuje. Wtyczkę instaluję z panelu rozszerzeń _Visual Studio Code_.

Do stworzenia prostego _GET requestu_ wystarczy zapisać w pliku z rozszerzeniem _.http_, adres URL poprzedzony typem zapytanie _HTTP_. Jeśli wtyczka jest poprawnie zainstalowana, a sam plik ma poprawne rozszerzenie, nad URL-em będzie widoczny przycisk _**Send request**_.

```bash:rest-test.http
https://dummyjson.com/todos?limit=3
```

Aby zapisać obok siebie w jednym pliku więcej niż jeden request, oddzielam je trzema _hash'ami_. Jeśli potrzebuję przekazać _headery_ dodaje je jako kolejne linijki pod _URL-em_. Obiekt, który chcę przekazać jako _body requestu_, wystarczy dodać poniżej jako zwyczajnie sformatowany obiekt _JSON_.

```bash:rest-test.http
GET https://dummyjson.com/todos?limit=3

###

GET https://dummyjson.com/todos/10

###

POST https://dummyjson.com/todos/add
Content-Type: application/json

{
  "todo": "Use DummyJSON in the project",
  "completed": false,
  "userId": 5
}
```

Wtyczka ma oczywiście bardzo wiele innych funkcji jak, chociażby zapisywanie _response_, wykonywanie zapytań _GraphQL_, używanie różnych wersji protokołu _HTTP_ i wiele innych. Po dokładniejsze dane odsyłam do [dokumentacji na github](https://github.com/Huachao/vscode-restclient).

### Bonus

_REST Client_ pozwala również na wyeksportowanie zapisanego zapytania jako requestu _cURL_. Wystarczy prawym przyciskiem myszy kliknąć obiekt requestu w pliku _.http_ i wybrać _Copy Request as cURL_.
