---
title: Express + TypeScript - ESLint i Prettier
excerpt: Każdy projekt powinien trzymać się z góry założonych norm stylistycznych. Adaptacja w projekcie ESLint i Prettier pozwoli nie tylko na utrzymanie czystości kodu, ale również pomoże wyłapać część błędów.
date: January 9, 2023
tags: [node, express, ts]
cover_img: style.jpg
published: true
---

## Wstęp

Każdy projekt powinien trzymać się z góry założonych norm stylistycznych. Adaptacja w projekcie ESLint i Prettier pozwoli nie tylko na utrzymanie czystości kodu, ale również pomoże wyłapać część błędów. W obecnych czasach niemal każdy projekt korzysta z omawianych tutaj bądź bliźniaczych narzędzi, a im bardziej rozwinięty i skomplikowany jest projekt, tym bardziej stają się one nieodzowne.

Wpis ten jest kontynuacją artykułu [Express + TypeScript - konfiguracja projektu](https://amazed.dev/blog/ts-express-base-config), z którym to zalecam się zapoznać w pierwszej kolejności. Opisywane tu zagadnienia można również stosować dla dowolnego projektu pisanego w `Node` i `TypeScript`, gdyż są dosyć uniwersalne. Kod omawiany w artykule można znaleźć w [repozytorium github](https://github.com/amazeddev/express-ts/tree/eslint-prettier).

<div class="admission">
Artykuły w tym cyklu:

1. [Express + TypeScript - konfiguracja projektu](https://amazed.dev/blog/ts-express-base-config)
2. **Express + TypeScript - ESLint i Prettier**
3. [Express + TypeScript - CRUD boilerplate](https://amazed.dev/blog/ts-express-base-crud)
4. [Express + TypeScript - struktura aplikacji](https://amazed.dev/blog/ts-express-structure)
5. [Express + TypeScript - konfiguracja MongoDB](https://amazed.dev/blog/ts-express-mongo)
6. [Express + TypeScript - walidacja requestów z biblioteką Joi](https://amazed.dev/blog/ts-express-validation)
7. [Express + TypeScript - middlewares aplikacji](https://amazed.dev/blog/ts-express-middlewares)
</div>

## ESLint

> Linter jak np. ESLint, to narzędzie skanujące i sprawdzające kod aplikacji w celu wyszukiwania błędów składniowych, stylistycznych oraz fragmentów kodu o wątpliwej jakości.
>
> ESLint do linter dla szeroko pojętego ECMAScript, może być wykorzystywany zarówno w projektach JavaScript jak i TypeSctipt.

Inicjalizacja ESLint w projekcie polega na dodaniu w głównym katalogu aplikacji pliku `.eslintrc.json` (plik ten może mieć różne rozszerzenia), zawierającego konfigurację lintera. Nie ma jednak sensu robić ręcznie, wystarczy wywołać metodę, która zainicjalizuje linter w projekcie.

```bash:terminal
npx eslint --init
```

`npx` instaluje niezbędne paczki lokalnie, ale po zakończeniu wywoływania komendy usuwa je. W ten sposób nie zanieczyszczamy systemu sporadycznie używanymi pakietami.

Po wywołaniu powyższej komendy dostaję kilka pytań. Na podstawie odpowiedzi na nie, paczka wytworzy konfigurację lintera, która zostanie zapisana w pliku `.eslintrc.json`.
Pierwsze pytania dotyczą zgody na zainstalowanie paczek, tutaj oczywiście zgadzam się na wszystko. Kolejne pytania są bardziej konkretne.

```bash
? How would you like to use ESLint? …
  To check syntax only
  To check syntax and find problems
▸ To check syntax, find problems, and enforce code style

? What type of modules does your project use? …
▸ JavaScript modules (import/export)
  CommonJS (require/exports)
  None of these

? Which framework does your project use? …
  React
  Vue.js
▸ None of these

? Does your project use TypeScript?
  No
‣ Yes

? Where does your code run? …
  Browser
✔ Node

? How would you like to define a style for your project? …
▸ Use a popular style guide
  Answer questions about your style

? Which style guide do you want to follow? …
▸ Standard: https://github.com/standard/eslint-config-standard-with-typescript
  XO: https://github.com/xojs/eslint-config-xo-typescript

? What format do you want your config file to be in? …
  JavaScript
  YAML
▸ JSON
```

Po inicjalizacji lintera mój plik wygląda jak poniżej. Jedyna rzecz, którą zmieniłem to `"parserOptions.project": "./tsconfig.json"`, czyli przekazanie względnej ścieżki do pliku `tsconfig.json`. Jest to wymagane, jeśli chcę, aby ESLint współpracował z `TypeScript`. Bez tej opcji nie ma wsparcia dla reguł związanych z typami itp.

```json:.eslintrc.json
{
  "env": {
    "es2021": true,
    "node": true
  },
  "extends": "standard-with-typescript",
  "overrides": [],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "rules": {}
}
```

## Prettier

Prettier jest narzędziem do formatowania kodu, które wspiera bardzo wiele języków programowania. Wystarczy zainstalować go w projekcie.

```bash:termional
npm i -D prettier
```

Teraz tworzę nowy plik `.prettierrc.json`, w którym zapisuje reguły, którymi chciałbym, aby posługiwał się edytor przy formatowaniu mojego kodu.

```json:.prettierrc.json
{
  "singleQuote": true,
  "arrowParens": "avoid",
  "printWidth": 100,
  "tabWidth": 2
}
```

> Zdecydowana większość edytorów kodu ma wsparcie zarówno dla ESLint jak pakietu Prettier, stąd np. w VSC wystarczy zainstalować wtyczki o tych samych nazwach.
> Jeśli chcę, aby kod był formatowany automatycznie, wystarczy utworzyć nowy plik `.vscode` i uzupełnić go kodem poniżej. Powie to edytorowi, że ma automatycznie formatować kod przy każdym zapisie pliku. Ustawienie to można również dodać globalnie do ustawień edytora.
>
> ```json:.vscode
> {
>   "editor.formatOnSave": true,
> }
> ```

## Prettier razem z ESLint

`Prettier` może w bardzo sprawny sposób pracować razem z linterem, jakim jest `ESLint`. Dzięki temu uniknę konfliktów formatowania, to znaczy: czasem prettier autoformatuje fragmenty kodu, które linter następnie podkreśla jako błędne. Gdy połączę ich działanie `ESLint` nie będzie zaznaczał elementów, na które wpływ ma `Prettier`. Aby to zrobić, muszę doinstalować kilka pakietów:

```bash:termional
npm i -D eslint-config-prettier eslint-plugin-prettier
```

Teraz tylko w pliku `.eslintrc.json` rozszerzam pole `extends` o dwa nowe elementy: `eslint-config-prettier` i `prettier` (teraz jest to lista, jako że są trzy elementy). Do listy `plugins` natomiast dodaję `eslint-plugin-prettier`.

> - `eslint-config-prettier` - wyłącza wszystkie reguły ESLint, które mogłyby kolidować z Prettier
> - `eslint-plugin-prettier` - dodaje reguły Prettier do ESLint

Na koniec pozostaje tylko dodać nową regułę `"prettier/prettier": "error"` mówiącą o tym, że linter będzie zaznaczał jako błędy składnie sprzeczne z regułami formatowania.

```json:.eslintrc.json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": ["standard-with-typescript", "eslint-config-prettier", "prettier"],
  "plugins": ["eslint-plugin-prettier"],
  "overrides": [],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "rules": {
    "prettier/prettier": "error"
  }
}
```

Gdy wszystkie reguły ESLint i Prettier są już poprawnie zainstalowane i skonfigurowane, ostatnią rzeczą jest dodać możliwość sprawdzania i formatowania kodu. Wyżej wspominałem, że edytory kodu mają wbudowane (w postaci rozszerzeń) wsparcie dla linterów i formaterów, ale jednak są takie przypadki, gdy będę chciał odpalać sprawdzanie składni czy formatowanie _ręcznie_. Przykładami mogą być tzw. `pre-commit hooks` czyli polecenia odpalające w jak nazwa wskazuje podczas commitowania kodu. Może to też być jeden z etapów `CI/CD` pipelinu.

Z powyższych powodów dodam do `package.json` dwa skrypty.

```json: package.json
{
  "name": "express-ts",
  "version": "1.0.0",
  "main": "src/index.js",
  "scripts": {
    "build": "npx tsc",
    "start": "node dist/index.js",
    "start:dev": "nodemon src/index.ts",
    "lint": "eslint . --ext .ts",
    "lint:fix": "eslint . --ext .ts --fix"
  },
  ...
}
```

`lint` po odpaleniu sprawdza kod według reguł zawartych w konfiguracji `eslint`, natomiast `lint:fix` robi to samo, przy czym stara się naprawić te błędy i ostrzeżenia, które jest w stanie.

### Wykluczanie plików

Jeśli nie chcę, aby jakieś pliki czy foldery były brane pod uwagę w procesie formatowania, czy lintowania, mogę dodać je odpowiednio do plików `.prettierignore` i `.eslintignore`. Pliki te działają w ten sam sposób co `.gitignore` dla `git`. Warto dodać, że folder `node_modules` jest automatycznie wyłączony z bycia branym pod uwagę, więc nie muszę go dodawać.

```:.prettierignore
dist
```

```:.eslintignore
dist
```

Nie ma sensu w aplikacji sprawdzać pod względem składni i formatowania wygenerowanego za pomocą skryptu `npm run build` kodu `JavaScript`.

## Podsumowanie

Proces formatowania kodu i automatycznego wyszukiwania błędów stylistycznych i składniowych znacznie ułatwia dewelopment aplikacji i przyśpiesza proces tworzenia oprogramowania. Unikamy bardzo wiele błędów podczas budowania aplikacji, które zostają wyłapane już na etapie pisania kodu. W przyszłości omawiał będę `CI/CD pipelines`, wtedy ustawienie powyższych narzędzi w projekcie będzie wręcz wymagane do poprawnego działania procesów automatyzacyjnych. Kod z artykułu można znaleźć w [repozytorium github](https://github.com/amazeddev/express-ts/tree/eslint-prettier).
