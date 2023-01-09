---
title: Express + TypeScript - konfiguracja projektu
excerpt: Wpis pokazujący jak prosto skonfigurować projekt w Node.js do późniejszego wykorzystania jako bazę w aplikacjach serwerowych. Projekt wykorzystuje TypeScript i Express.JS.
date: December 9, 2022
tags: [node, express, ts]
cover_img: node-base-config.jpg
published: true
---

## Wstęp

<div class="admission">
Artykuły w tym cyklu:

1. **Express + TypeScript - konfiguracja projektu**
2. [Express + TypeScript - ESLint i Prettier](https://amazed.dev/blog/ts-express-linter-prettier)
3. [Express + TypeScript - CRUD boilerplate](https://amazed.dev/blog/ts-express-base-crud)
4. [Express + TypeScript - struktura aplikacji](https://amazed.dev/blog/ts-express-structure)
5. [Express + TypeScript - konfiguracja MongoDB](https://amazed.dev/blog/ts-express-mongo)
6. [Express + TypeScript - walidacja requestów z biblioteką Joi](https://amazed.dev/blog/ts-express-validation)
7. [Express + TypeScript - middlewares aplikacji](https://amazed.dev/blog/ts-express-middlewares)
</div>

## Właściwie po co?

> ### Express.JS
>
> [Express](https://expressjs.com/) jest to jeden z bardziej popularnych frameworków Node, służący do pisania aplikacji backendowych. Jest prosty, minimalistyczny i bardzo niewiele narzuca programiście. Struktura aplikacji może być praktycznie dowolna, a framework nie zmusza do stosowania żadnego _patternu_, internet natomiast pełen jest dobrych praktyk i wzorców pisania aplikacji.
>
> _Express_ świetnie sprawdza się do budowania API typu REST i aplikacji CRUD, oraz adaptowania w aplikacjach różnego rodzaju baz danych. Prosta aplikacja pisana w tym i kolejnych artykułach będzie wykorzystywać prostotę i wielofunkcyjność framewoku oraz bogactwo różnych możliwości rozszerzania aplikacji w nim pisanych.

Zazwyczaj, gdy pojawia się hasło _Express.JS_, od razu nasuwa się na myśl _Rest'owe_ API napisane w _JaVaScript_. Będąc świadomym ograniczeń _JS_ wynikających z braku typowania, ale nadal chcąc użyć prostego, dobrze sprawdzającego się i pozwalającego na dowolną rozbudowę aplikacji frameworka, jakim jest _Express_? Postanowiłem napisać aplikację przy użyciu _TypeScripta_? Jak się niedługo okaże, framework i język współpracują ze sobą świetnie!

## Początek

Pierwszym krokiem powinno być sprawdzenie, że posiadam zainstalowane na komputerze _Node_ i _NPM_.

```bash:terminal
node -v
npm -v
```

Później standardowo przenoszę się do miejsca, w którym chcę rozpocząć projekt. W wybranym katalogu, jak w przypadku każdego projektu w _Node_, rozpoczynam od inicjalizacji projektu. Flaga `-y` pomija wszystkie pytania, które zadaje nam _CLI_ i uzupełnia je defaultami.

```bash:terminal
npm init -y
```

Obok, w ten sposób stworzonego pliku _package.json_, tym samym katalogu zakładam folder `/src` a w nim plik `index.js`, który będzie wyjściowym plikiem aplikacji.

W pliku _package.json_ zapisywane są wszystkie paczki, z których korzystam w projekcie. Poza _dependencjami_, zapisane tu są również podstawowe dane o projekcie. Skupiam się tu jedynie na przygotowaniu startera do późniejszego wykorzystania w innych aplikacjach. Na początek trzeba tylko zmienić pole _"main"_ z `index.js` na `src/index.js` zgodnie z drzewem plików, który utworzyłem wyżej.

```json:package.json
{
  "name": "express-ts",
  "version": "1.0.0",
  "description": "",
  "main": "src/index.js",
  "type": "module",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Teraz, aby pokazać, że aplikacja w ogóle działa, nie skupiając się jeszcze na tym, co oferuje _TypeScript_ i _Express_, wypełniam plik _src/index.js_ najprostszym możliwym _"serwerem"_, którego jedynym zadaniem jest nasłuchiwanie na `localhost:5000/` i zwracanie _"Hello World!"_. Warto zauważyć, że pierwsza linijka importuje `express` w nowy sposób, wskazujący na importowanie zależności na podstawie modułów. Jest to możliwe przez podanie w _package.json_ typu aplikacji jako `"type": "module"`.

```js:src/app.js
import express from "express";

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(5000, () => {
  console.log("Server started on port 5000!");
});
```

Aby być w stanie odpalić serwis, muszę zainstalować jego dependencje, czyli sam _Express_ framework.

```bash:terminal
npm i express
```

Po instalacji aplikację można wystartować w terminalu, z poziomu katalogu projektu:

```bash:terminal
node src/index.js
```

W terminalu pojawiła się informacja, że aplikacja wystartowała na porcie 5000, a po wywołaniu w przeglądarce adresu `http://localhost:5000` ukaże się tylko _"Hello world!"_.

### Inicjalizacja TypeScript

Aby móc używać w aplikacji _TypeScript_ i dobrodziejstw z niego płynących, zainstaluję go jak _dev-dependency_ wraz bardzo przydatnymi deklaracjami typów dla _Node_ i _Express_. Deklaracje typów to paczki, które można zainstalować poprzez _NPM_, zawierające nazwę paczki, dla której typów potrzebuję, poprzedzone `@types/...`, predefiniujące typy i kształty obiektów, wykorzystywanych przez daną paczkę. W tym wypadku będzie to `@types/express` i ogólny `@types/node`.

```bash:terminal
npm i -D typescript @types/express @types/node
```

Kolejnym krokiem jest inicjalizacja _TypeScrypt'u_ w projekcie.

```bash:terminal
npx tsc --init
```

W ten sposób generuję plik `tsconfig.json`, w którym zapisane są wszystkie parametry, mówiące o tym w jaki sposób _TS_ ma budować projekt (jako budowanie rozumiem generowanie - kompilacje, plików _JS_, które później będą wykorzystywane do działania aplikacji). Na sam początek dostajem bardzo duży plik z wieloma wykomentowanymi parametrami, można spokojnie usunąć wszystko, co wykomentowane.

> Najważniejsze parametry _tsconfig.json_:
>
> - target: do jakiej wersji _JS_ kompilowane będą pliki
> - module: w jaki sposób ma zachowywać się rozwiązywanie modułów w skompilowanym kodzie
> - strict: czy używać _strict type-checking_
>
> Pozostałe _defaulty_ mogą pozostać bez rozwinięcia.

Dodatkowo parametrami, które warto przekazać w `tsconfig.json` są `rootDir` i `outDir`, które mówią odpowiednio o tym, z jakiego katalogu ma być zaciągany kod `.ts` i do jakiego ma być zapisywany generowany kod `.js`.

```json:tsconfig.json
{
  "compilerOptions": {
    "rootDir": "./src",
    "outDir": "./dist",
    "target": "es2020",
    "module": "commonjs",
    "esModuleInterop": true,
    "forceConsistentCasingInFileNames": true,
    "strict": true,
    "skipLibCheck": true
  }
}
```

Po tak dodanym kodzie _TypeScrypt_ do projektu można zmienić sam plik `src/index.js` na `src/index.ts`. Również jego zawartość nieznacznie się zmieni, aby wykorzystać zainstalowane wcześniej deklaracje typów.

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

> Tak naprawdę wcale nie trzeba by było zmieniać zawartości pliku `src/index.ts`. Czysty kod _JS_ jest w 100% rozumiany przez _TS_, więc aplikacja działałaby tak samo.

Tak przebudowany projekt pisany w _TS_ możena teraz zkompilować do plików _JS_ jedną komendą terminala: `npx tsc`.

Pliki `.js` generują się w katalogu `/dist`, więc aby odpalić aplikację, będę wywoływać plik właśnie tam się znajdujący.

```bash:terminal
node dist/index.js
```

### Skrypty w _package.json_

Aby usprawnić pracę kodem, defininiuję _skrypty_ w `package.json` odpalające pod spodem zdefiniowane wcześniej komendy budowania i odpalania aplikacji.

```json:package.json
{
  "name": "express-ts",
  "version": "1.0.0",
  "main": "src/index.js",
  "scripts": {
    "build": "npx tsc",
    "start": "node dist/index.js"
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
    "typescript": "^4.9.4"
  }
}
```

#### _rebuild_ & _restart_ on file change

Ostatnią godną uwagi rzeczą, jest automatyczny _rebuild_ i _restart_ aplikacji, gdy pliki `.ts` się zmieniły. Pomogą w tym dwa pakiety, które zainstaluję jak _devDepenencje_.

```bash:terminal
npm i -D nodemon ts-node
```

Można teraz dodać w `package.json` kolejny _skrypt_, `"start:dev": "nodemon src/index.ts"`, który po odpaleniu będzie _obserwował_ wszystkie pliki `.ts`, gdy któryś się zmieni, przebuduje aplikację i ponownie ją odpali, już ze zmienionym kodem.

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

### Podsumowanie

Tak stworzony _boilerplate_ może posłużyć do tworzenia kolejnych, bardziej zaawansowanych projektów przy użyciu frameworku _Express_, a dzięki wsparciu _TypeScript_ kod będzie zawsze czytelny, wolny od oczywistych błędów związanych z typowaniem i optymalnie skompilowany pod produkcję. Cały kod powyższej aplikacji można znaleźć w [repozytorium github](https://github.com/amazeddev/express-ts/tree/boilerplate).
