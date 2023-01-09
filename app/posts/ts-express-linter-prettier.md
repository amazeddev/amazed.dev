---
title: Express + TypeScript - ESLint i Prettier
excerpt: Każdy projekt powinien trzymać się z góry założonych norm stylistycznych. Adaptacja w projekcie ESLint i Prettier pozwoli nie tylko na utrzymanie czystości kodu, ale również pomoże wyłapać część błędów.
date: January 9, 2023
tags: [node, express, ts]
cover_img: style.jpg
published: true
---

## Wstęp

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

> Linter jak np. ESLint, to narzędzie skanujące i sprawdzające kod aplikacji w celu wyszukiwania błędów składniowych, stylistycznych oraz fragmentów kodu o wątpliwej składni.
>
> ESLint do linter dla szeroko pojętego ECMAScript, może być wykorzystywany zarówno w projektach JavaScript i TypeSctipt.

Inicjalizacja `ESLint` w projekcie polega na dodaniu w głównym katalogu aplikacji pliku `.eslintrc.json` (plik ten może mieć różne rozszerzenia), zawierającego konfigurację lintera. Nie ma jednak sensu robić ręcznie, wystarczy wywołać metodę, która zainicjalizuje linter w projekcie.

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

Po inicjalizacji lintera mój plik wygląda jak poniżej. Jedyna rzecz, którą zmieniłem to `"parserOptions.project": "./tsconfig.json"`, czyli przekazanie względnej ścieżki do pliku `tsconfig.json`. Jest to wymagane, jeśli chcę, aby `ESLint` współpracował z `TypeScript`. Bez tej opcji nie ma wsparcia dla reguł związanych z typami itp.

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

Zdecydowana większość edytorów kodu ma wsparcie dla tego pakietu, stąd np. w VSC wystarczy zainstalować wtyczkę o tej samej nazwie. W tym też edytorze, jeśli chcę, aby kod był formatowany automatycznie, wystarczy utworzyć nowy plik `.vscode` i uzupełnić go kodem poniżej. Powie to edytorowi, że ma automatycznie formatować kod przy każdym zapisie pliku. Ustawienie to można również dodać globalnie do ustawień edytora.

```json:.vscode
{
  "editor.formatOnSave": true,
}
```

## Prettier razem z ESLint

`Prettier` może w bardzo sprawny sposób pracować razem z linterem, jakim jest `ESLint`. Dzięki temu uniknę konfliktów formatowania, to znaczy: czasem prettier autoformatuje fragmenty kodu, które linter następnie podkreśla jako błędne. Gdy połączę ich działanie `ESLint` nie będzie zaznaczał elementów, na które wpływ ma `Prettier`. Aby to zrobić, muszę doinstalować kilka pakietów:

```bash:termional
npm i -D eslint-config-prettier eslint-plugin-prettier
```

Teraz tylko do pliku `.eslintrc.json` dodam `prettier` do konfiguracji, które mój config ma extendować (teraz jest to lista, jako że są dwa elementy), również `prettier` do pluginów, których ma używać i jako ostatnie nową regułę `"prettier/prettier": "error"` mówiącą o tym, że linter będzie zaznaczał jako błędy składnie sprzeczne z regułami formatowania.

```json:.eslintrc.json
{
  "env": {
    "browser": true,
    "es2021": true
  },
  "extends": ["prettier", "standard-with-typescript"],
  "plugins": ["prettier"],
  "overrides": [],
  "parserOptions": {
    "ecmaVersion": "latest",
    "sourceType": "module",
    "project": "./tsconfig.json"
  },
  "rules": {
    "prettier/prettier": "error",
  }
}
```

Jedyną rzeczą, którą chciałbym dodać do tej konfiguracji, jest reguła `"@typescript-eslint/semi": "off"`, niektórzy uznają ją za zbędną i może niepoprawna. Powoduje ona, że `ESLint` nie podkreśla średników na końcu linii czy wyrażeń. Ja je lubię!

### Wykluczanie plików

Jeśli nie chcę, aby jakieś pliki czy foldery były brane pod uwagę w procesie formatowania, czy lintowania, mogę dodać je odpowiednio do plików `.prettierignore` i `.eslintignore`. Pliki te działają w ten sam sposób co `.gitignore` dla `git`. Warto dodać, że folder `node_modules` jest automatycznie wyłączony z bycia branym pod uwagę, więc nie muszę go dodawać.

```:.prettierignore
dist
```

```:.eslintignore
dist
```

## Podsumowanie

Proces formatowania kodu i automatycznego wyszukiwania błędów stylistycznych i składniowych znacznie ułatwia dewelopment aplikacji i przyśpiesza proces tworzenia oprogramowania. Unikamy bardzo wiele błędów podczas budowania aplikacji, które zostają wyłapane już na etapie pisania kodu. W przyszłości omawiał będę `CI/CD pipelines`, wtedy ustawienie powyższych narzędzi w projekcie będzie wręcz wymagane do poprawnego działania procesów automatyzacyjnych. Kod z artykuły można znaleźć w [repozytorium github](https://github.com/amazeddev/express-ts/tree/eslint-prettier).
