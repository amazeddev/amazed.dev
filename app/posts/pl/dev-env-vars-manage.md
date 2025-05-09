---
slug: dev-env-vars-manage
title: Zarządzanie lokalnymi zmiennymi środowiskowymi - direnv
excerpt: direnv jako prosty sposób zarządzania zmiennymi środowiskowymi podczas developmentu.
date: December 12, 2022
tags: [utils, shell]
cover_img: env-manage.jpg
published: true
---

# Problem

W trakcie dewelopmentu ładowanie i czytanie lokalnych zmiennych środowiskowych może przysporzyć wielu problemów. Jeśli nie używam _docker'a_ i nie ładuje zmiennych za jego pomocą, dodawanie ich w standardowy _linux'owy_ sposób 'export NAME=VALUE' w terminalu jest bardzo uciążliwe.

Zazwyczaj z pomocą przychodzą pakiety pozwalające automatycznie ładować zmienne z pliku, np. _.env_. Dla _Node_ będzie to dobrze znany [_dotenv_](https://www.npmjs.com/package/dotenv). Użycie jest bardzo proste, tworzymy plik _.env_ i dodajemy do niego wszystkie zmienne środowiskowe, których chcemy użyć w trakcie dewelopmentu.

```:.env
PORT=5000
```

Na przykładzie aplikacji z poprzedniego artykułu, pakietu _dotenv_ można by użyć w następujący sposób:

```ts:src/index.ts
import express, { Request, Response } from "express";
import * as dotenv from 'dotenv' // import paczki
dotenv.config() // załadowanie zmiennych do process.env

const app = express();
const PORT = process.env.PORT;

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log('Server started on port ${PORT}!');
});
```

Teraz wystarczy zainstalować pakiet jako _dev dependency_.

```bash:terminal
npm i -D dotenv
```

Dzięki paczce mam dostęp do wszystkich zmiennych środowiskowych. Co więcej, jeśli 'dotenv.config()' zostanie wywołany w głównym pliku aplikacji (_app entry point_), również we wszystkich importowanych modułach mam dostęp do zmiennych poprzez obiekt 'process.env'.

Sposób rozwiązania problemu sam w sobie nie jest zły. Wszystko działa poprawnie, lecz problemem zaczyna być dodatkowa dependencja, która służy tylko do dewelopmentu. Również te dwie dodatkowe linijki kodu nie robią wielkiej różnicy, ale po co je dodawać, gdy nie są wymagane.

## direnv

_direnv_ nie jest dependencją _Node_, a rozszerzeniem powłoki terminala. Pozwala na automatyczne ładowanie zmiennych środowiskowych w zależności od katalogu, w którym się znajduje. Wystarczy, aby w katalogu znajdował się plik '.envrc' precyzujący jak mają być załadowane zmienne i na jego podstawie ładuje zmienne do sub-powłoki terminala.

### Instalacja

Większość dystrybucji linuxa oraz MacOS ma już zainstalowany ten program.

Aby działał on poprawnie z powłoką terminala, trzeba _przypiąć_ jego wywołanie w pliku konfiguracyjnym powłoki:

- dla **BASH**, zmiana w _~/.bashrc_: 'eval "$(direnv hook bash)"'
- dla **ZSH**, zmiana w _~/.zshrc_: 'eval "$(direnv hook zsh)"'

Po więcej spieranych powłok odsyłam do dokumentacji.

### Proste użycie

Teraz, aby móc używać zmiennych środowiskowych tak jak dotąd, to znaczy ładować je z pliku _.env_, wystarczy dodać kolejny plik _.envrc_. Teraz wystarczy odpalić komendę 'direnv allow .', która pozwoli paczce _direnv_ na automatyczne ładowanie zmiennych środowiskowych.

Aby dalej móc ładować zmienne z pliku _.env_ możemy przekazać pakietowi, aby załadował zmienne właśnie z tego pliku dzięki poleceniu 'direnv dotenv [shell] [path_to_.env_file]', w naszym wypadku będzie to:

```bash:terminal
direnv dotenv zsh ./.env
```

Teraz gdy w tym samym katalogu wystartujemy aplikacje, będzie ona miała załadowane wszystkie zmienne sprecyzowane w pliku.

Aby uprościć cały flow, możemy w pliku _.envrc_ podać bezpośrednio komendę 'dotenv'.

```:.envrc
dotenv
```

W takim wypadku, o ile _.env_ i _.envrc_ znajdują się w tym samym katalogu, pakiet _direnv_ będzie zawsze automatycznie ładował zmienne w tym katalogu. Można wtedy oczywiście wyrzucić dependencje na _dotenv_ oraz wszystkie fragmenty kodu z nim związane. Rozwiązanie działa również niezależnie od języka programowanie aplikacji!
