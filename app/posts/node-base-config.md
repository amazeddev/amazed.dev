---
title: Konfiguracja projektu w Node.js
excerpt: Wpis pokazujący jak prosto skonfigurować projekt w Node.js do późniejszego wykorzystania w apkach serwerowych. Jak podpiąć Babel, nodemon i obsługę zmiennych środowiskowych.
date: October 21, 2019
tags: [node, express]
cover_img: node-base-config.jpg
published: true
---

## Proste projekty w Node.JS nie takie straszne

Aby zacząć pisać aplikację, w pierwszej kolejności należy się upewnić, że posiadamy zainstalowane na komputerze Node.JS i npm:

```bash:terminal
node -v
npm -v
```

Jeśli otrzymamy wersję tych pakietów to wszystko ok. Dalej przenosimy się do miejsca, w którym chcemy rozpocząć nasz projekt. Aby rozpocząć, jak w przypadku każdego projektu w Node.JS rozpoczynamy od inicjalizacji projektu.

```bash:terminal
npm init -y
```

Komenda ta tworzy prosty plik package.json, który definiuje nasze zależności. W tym samym katalogu zakładamy folder src a w nim plik _index.js_, który będzie naszym wyjściowym plikiem aplikacji.

```bash:terminal
mkdir src && touch src/index.js
```

W pliku _package.json_ zapisywane są wszystkie paczki, z których korzystamy w projekcie. Poza dependencies zapisane tu są również podstawowe dane o projekcie. Dla nas narazie całkowie nieważne, skupiamy się jedynie na przygotowaniu startera do późniejszego wykorzystania w innych aplikacjach. Na początek musimy tylko zmienić pole _"main"_ z _index.js_ na _src/index.js_ zgodnie z drzewem plików, który utworzyliśmy wyżej.

```json:package.json
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "src/index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC"
}
```

Teraz aby pokazać, że Node.js w ogóle działa a niw skupiać się jeszcze w tym poście na tym jak on działa, wkleję tu bardzo prosty _"server"_ napisany w Node.JS i Express (framework ułatwiający pracę w Node).

```js:src/app.js
const express = required("express");

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(5000, () => {
  console.log("Server started on port 5000!");
});
```

Aby wszystko działało jak należy, musimy zainstalować sam _Express_.

```bash:terminal
npm i express
```

Po instalacji server można odpalić w konsoli, z wewnątrz naszego projektu wpisując:

```bash:terminal
node index.js
```

Zobaczymy wtedy w konsoli, że nasz server wystartował na porcie 5000, a po odpaleniu w przeglądarce url'a http://localhost:5000 zobaczymy tylko _"Hello worls!"_.
Czyli możemy powiedzieć, ze wszytko działa jak należy. Ten prosty serwer będzie naszym kodem wyjściowym dla przedstawienia trzech ciekawych pakietów ułatwiających pracę no Node.js.

### Skrypty w _package.json_

Zanim jeszcze przejdziemy do pakietów, ważną rzeczą jest możliwość wywoływania customowych komend zdefiniowanych w pliko _package.json_. Definiujemy je jako komendy bash'owe i zapisujemy w obiekcie _"scripts"_ pliku _package.json_. Możemy tam zapisać komendę, którą wykonywaliśmy kilka linijek wyżej, odpalającą aplikację serwera.

```json:package.json
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1"
  }
}
```

Dobrą praktyką jest nazywanie skryptu odpalającego serwer _"start"_. Teraz nasz serwer z poziomu konsoli odpalali będziemy przez wywołanie komendy:

```bash:terminal
npm run start
```

Nie jest to zapis w żaden sposób krótszy, czy prostszy, ale gdy nasza aplikacja zyska na funkcjonalności, a ilość skryptów wzrośnie, docenimy to podejście.
Odpalanie skryptów zawsze jest takie samo, najpierw człon _"npm run"_ do odpalania skryptu, a potem jego nazwa.

### Nodemon

Pierwszym pakietem bardzo przydatnym dla wszystkich aplikacji backendowych jest [Nodemon](https://www.npmjs.com/package/nodemon). Podejście przedstawione w poprzednim akapicie ma jeden zasadniczy minus. Każda zmiana w kodzie, nawet mała, wymusza na nas manualne restartowanie serwera. Najpierw trzeba go zatrzymać, komendą _"Ctrl + C"_ w konsoli, a następnie ponownie wystartować. Jest to bardzo uciążliwe na dłuższą metę.

Tu z pomocą przychodzi nam pakiet nodemon. Instalujemy go standardowo, z tą jedynie różnicą, że nie będzie on w _"dependencies"_ a w _"devDependencies"_ (development dependencies). Jest to część pliku _package.json_ na pakiety potrzebne jedynie w czasie developmentu aplikacji.

```bash:terminal
npm i -D nodemon
```

Teraz musimy dodać skrypt odpowiedzialny za odpalanie serwera przy pomocy _nodemon_. Jest on wybitnie nieskomplikowany. Po wszystkim nasz _package.json_ wygląda tak:

```json:package.json
{
  "name": "test",
  "version": "1.0.0",
  "description": "",
  "main": "src/index.js",
  "scripts": {
    "start": "node src/index.js",
    "serve": "nodemon src/index.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "express": "^4.17.1"
  },
  "devDependencies": {
    "nodemon": "^1.19.4"
  }
}
```

Teraz odpalając aplikację za pomocą komendy "npm run serve" odpali się ona w trybie _watch_ dzięki czemu po każdej zmianie w kodzie i zapisie zobaczymy automatyczne przeładowanie serwera.

### Babel

Kolejnym przydatnym pakietem jest [Babel](https://babeljs.io/), który pozwala pisać w naszych aplikacjach, używając najnowszych składni języka _JavaScript_. Docelowo chciałbym korzystać ze składni importu pakietów wprowadzonego w _ES6_ a niedostęopnego w _Node.JS_. Aby zainstalować _babel_ musimy zainstalować kilka paczek, sam babel dla node'a _@babel/node_, core całej aplikacji, czyli _@babel/core_ i preset czyli coś w rodzaju pakietu tłumaczeń _@babel/preset-env_.

```bash:terminal
npm i -D @babel/core @babel/node @babel/preset-env
```

Teraz tworzymy plik z konfiguracją pakietu _Babel_, to stąd nasza aplikacja będzie brała wytyczne, do jakiej nowej wersji JavaScript tłumaczyć kod. Znajduje się w nim informacja o presecie.

```bash:terminal
touch .babelrc
```

```js:.babelrc

{
  "presets": [
    "@babel/preset-env"
  ]
}
```

Teraz, aby móc korzystać z dobrodziejstw nowych składni JS musimy zmodyfikować skrypty w _package.json_

```js:package.json
{
  ...
  "main": "src/index.js",
  "scripts": {
    "start": "node --exec babel-node src/index.js",
    "serve": "nodemon --exec babel-node src/index.js"
  }
  ...
}
```

Dzięki _babelowi_ możemy w zmienić nieznacznie składnie kodu naszego serwera i zaimportować _Express_ w sposób przedstawiony w _ES6_.

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

### DOTENV

Ostatnim pakietem omawianym tu jest [dotenv](https://www.npmjs.com/package/dotenv). Pakiet pozwalający wykorzystywać zmienne środowiskowe w naszej aplikacji. Dzięki temu będziemy mogli ukryć niektóre drażliwe informacje przed gitem, takie jak hasła do baz danych itp., lub zdefiniować zmienne dostępne dla całej aplikacji.

Dla przykładu my zdefiniujemy zmienną PORT mówiącą, na jakim porcie będzie nasłuchiwać nasza aplikacja. Jest to wymagane, gdy chcemy aplikację zdeployować na serwer zewnętrzny, gdyż takie serwery z góry narzucają aplikacji port a jego wartość przetrzymują właśnie ze zmiennych środowiskowych. Zainstalujmy więc pakiet i go skonfigurujmy.

```bash:terminal
touch .env && npm i dotenv
```

Po instalacji, w świeżo stworzonym pliku umieśćmy naszą zmienną, pamiętając, aby nazwa zmiennej była drukowanymi literami bez spacji i znaków szczególnych, a nazwę i wartość oddzielał "=".

```js:.env
PORT = 5000;
```

Teraz wystarczy zaimportować pakiet do naszego serwera i możemy już używać go aplikacji.

```js:src/app.js
import express from "express";
import dotenv from "dotenv";

dotenv.config();

const app = express();

app.get("/", (req, res) => {
  res.send("Hello World!");
});

const port = process.env.PORT || "5000";

app.listen(port, () => {
  console.log(`Server started on port ${process.env.PORT}!`);
});
```

Składnia ta mówi aplikacji, aby wzieła wartość portu ze zmiennej środowiskowej PORT, a gdy jej nie ma, wpisała po prostu "5000".

### Podsumowanie

Myślę, że to by było na tyle, jeśli chodzi o prostą konfigurację aplikacji Node.js. W najbliższych dniach pojawią się kolejne wpisy na temat budowania prostych CRUD-owych aplikacji w Node.js oraz serwerów w standardzie REST na mockowych danych, jak i z podpięciem bazy danych (MongoDB). Pewnie będzie też coś o prostej autentykacji za pomocą tokenów JWT.
