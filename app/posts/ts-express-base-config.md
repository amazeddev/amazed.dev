---
title: Express + TypeScript - konfiguracja projektu
excerpt: Wpis pokazujący jak prosto skonfigurować projekt w Node.js do późniejszego wykorzystania jako bazę w apkach serwerowych. Projekt wykożystuje TypeScript i Express.JS.
date: December 9, 2022
tags: [node, express, ts]
cover_img: node-base-config.jpg
published: true
---

## Wstęp

<div class="admission">
Artykuły w tym cyklu:

1. **Express + TypeScript - konfiguracja projektu**
2. [Express + TypeScript - CRUD boilerplate](https://amazed.dev/blog/ts-express-base-crud)
3. [Express + TypeScript - struktura aplikacji](https://amazed.dev/blog/ts-express-structure)
4. [Express + TypeScript - konfiguracja MongoDB](https://amazed.dev/blog/ts-express-mongo)
5. [Express + TypeScript - walidacja requestów z biblioteką Joi](https://amazed.dev/blog/ts-express-validation)
6. [Express + TypeScript - middlewares aplikacji](https://amazed.dev/blog/ts-express-middlewares)
</div>

## Właściwie po co?

> ### Express.JS
>
> [Express](https://expressjs.com/) jest to jeden z bardziej popularnych frameworków Node, do pisania aplikacji backendowych. Jest prosty, minimalistyczny i bardzo niewiele narzuca programiście. Struktura aplikacji może być praktycznie dowolna, nie jesteśmy zmuszeni do stosowania żadnego _patternu_, natomias internet pełen jest dobrych praktyk i wzorców pisania aplikacji.
>
> _Express_ świetnie sprawdza się do budowania API typu REST i aplikacji CRUD, oraz adaptowania w aplikacjach róznego rodzaju baz danych. Prosta aplikacja pisana w tym i kolejnych artykułach będzie wykorzystywać prostotę i wielofunkcyjność framewoku oraz bogactwo róznych możliwości rozszerzania aplikacji w nim pisanych.

Zazwyczaj gdy pojawia się hasło _Express.JS_, odrazu nasuwa się na myśl _Rest'owe_ API napisane w _JaVaScript_. Ale co jeśli gdy jesteśmy śiwadomi ograniczeń _JS_ wynikających z braku typowania, a jednak nadal chcemy użyć prostego, dobrze sprawdzajacego się i pozwalającego na dowolną rozbudowę aplikacji frameworka, jakim jest _Express_? Dlaczego by nie spróbować napisać aplikację przy użyciu _TypeScripta_? Jak się niedługo okaże, framework i język współpracują ze sobą świetnie!

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

Obok w ten sposób stworzonego pliku _package.json_, tym samym katalogu zakładamy folder _/src_ a w nim plik _index.js_, który będzie wyjściowym plikiem aplikacji.

W pliku _package.json_ zapisywane są wszystkie paczki, z których korzystamy w projekcie. Poza dependencies zapisane tu są również podstawowe dane o projekcie. Dla nas narazie całkowie nieważne, skupiamy się jedynie na przygotowaniu startera do późniejszego wykorzystania w innych aplikacjach. Na początek musimy tylko zmienić pole _"main"_ z _index.js_ na _src/index.js_ zgodnie z drzewem plików, który utworzyliśmy wyżej.

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

Teraz aby pokazać, że aplikacja w ogóle działa, nie skupiając się jeszcze na tym co oferuje nam _TypeScript_ i _Express_, wypełniam plik _src/index.js_ najprostszym możliwym _"serwerem"_, którego jedynym zadaniem jest nasłuchiwanie na `localhost:5000/` i zwracanie _"Hello World!"_. Warto zauważyć, że pierwsza linijka importuje `express` w nowy sposób, wskazujący na importowanie zależności w oparciu o moduły. Jest to możliwe przez podanie w _package.json_ typu aplikacji jako `"type": "module"`.

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

Aby być w stanie odpalić serwis musimy zainstalować jego dependencje, czyli sam _Express_ framework.

```bash:terminal
npm i express
```

Po instalacji aplikację można wystartować w terminalu, z poziomu katalogu projektu:

```bash:terminal
node src/index.js
```

W terminalu pojawiła się informacja, że aplikacja wystartowałs na porcie 5000, a po wywołaniu w przeglądarce adresu http://localhost:5000 ukaże się tylko _"Hello worls!"_.
Możemy powiedzieć, że jak dotąd, wszytko działa jak należy, ale to dopiero początek.

### Inicjalizacja TypeScript

Aby móc używać w aplikacji _TypeScript_, i dobrodziejstw z niego płynących, zainstaluję go jak _dev-dependency_ wraz bardzo przydatnymi deklaracjami typów dla _Node_ i _Express_. Deklaracje typów to paczki, które możemy zainstalować poprzez _NPM_, rozpoczynające się od nazwy paczki, dla której typów potrzebujemy poprzedzone `@types/...`, predefiniukące typy i kształty obiektów, wykorzystywanych przez daną paczkę. W tym wypadku będzie to `@types/express` i ogólny `@types/node`.

```bash:terminal
npm i -D typescript @types/express @types/node
```

Kolejnym krokiem jest inicjalizacja _TypeScrypt'u_ w projekcjie.

```bash:terminal
npx tsc --init
```

W ten sposób generujemy plik _tsconfig.json_, w którym zapisane są wszystkie parametry, mówiące o tym w jaki sposób _TS_ ma budowac nasz projekt (jako budowanie rozumiem generowanie - kompilacje, plików _JS_, które później będą wykorzystywane do działania aplikacji). Na sam początek dostajem bardzo duży plik z wieloma wykomentowanymi parametrami, można spokojnie wyczyścić wszystko co zakomentowane.

> Najwazniejsze parametry _tsconfig.json_:
>
> - target: do jakiej wersji _JS_ kompilować pliki
> - module: w jaki sposób ma zachowywać się rozwiązywanie modułów w zkompilowanym kodzie
> - strict: czy używać _strict type-checking_
>
> Pozostałe _defaulty_ mogą pozostać bez rozwinięcia.

Dodatkowo, parametrami które warto przekazać w _tsconfig.json_ są `rootDir` i `outDir`, które mówą odpowiednio o tym z jakiego katalogu ma być zaciągany kod _.ts_ i do jakiego ma być zapisywany generowany kod _.js_.

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

Po tak dodanym _TypeScrypt_ do projektu, można zmienić zam plik _src/index.js_ na _src/index.ts_. Również jego zawartość nieznacznie się zmieni, aby wykorzystać zainstalowane wcześniej deklaracje typów.

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

> Tak naprawdę wcale nie trzeba by było zmieniać zawartości pliku _src/index.ts_. Czysty kod _JS_ jest w 100% rozumiany przez _TS_, więc aplikacja działał by tak samo.

Tak przebudowany projekt pisany w _TS_ możemy teraz zkompilować do plików _JS_ jedną komendą terminala: `npx tsc`.

Pliki _.js_ generuja się w katalogu _/dist_, więc aby odpalić aplikację, będziemy wywoływać plik właśnie tam się znajdujący.

```bash:terminal
node dist/index.js
```

### Skrypty w _package.json_

Aby usprawnić pracę kodem można zdefiniować _skrypty_ w _package.json_ odpalajace pod spodem zdefiniowane wcześniej komendy budowania i odpalania aplikacji.

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

Ostatnią godną uwagi rzeczą, jaste automatyczny _rebuild_ i _restart_ aplikacji gdy pliki _.ts_ się zmieniły. Pomogą w tym 2 pakiety, które zainstaluję jak _devDepenencje_.

```bash:terminal
npm i -D nodemon ts-node
```

Można teraz dodać w _package.json_ kolejny _skrypt_, `"start:dev": "nodemon src/index.ts"`, który po odpaleniu będzie _obserwował_ wszystkie pliki _.ts_, gdy któryś się zmieni przebuduje aplikację i ponownie ją odpali, już ze zmienionym kodem.

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

Tak stworzony _boilerplate_ może posłużyć do tworzenia kolejnych, bardziej zaawansowanych projektów przyużyciu frameworku _Express_, a dzieki wsparciu _TypeScript_ kod będzie zawsze czytelny, wolny od oczywistych błędów zwiazanych z typowaniem i optymalnie skompilowany pod produkcję. Cały kod powyższej aplikacji można znaleźć w [repozytorium github](https://github.com/amazeddev/express-ts/tree/boilerplate).
