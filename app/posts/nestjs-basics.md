---
title: Podstawy NestJS
excerpt: Wpis pokazujący jak prosto rozpocząć pracę w NestJS. Skonfigurujemy pierwszy projekt i omówimy podstawowe funkcjonalności framework'a.
date: November 29, 2022
tags: [node, nestjs, ts]
cover_img: nestjs-basics.jpg
published: true
---

## Inicjalizacja projektu

Pracę z Nestem zaczynamy od zainstalowania globalnie **Nest cli** przygotowanego przez twórców frameworku.

```bash:terminal
npm i -g @nestjs/cli
```

Gdy **cli** jest już zainstalowane, możemy zainicjalizować za jego pomocą utworzenie boilerplate naszego projektu.

```bash:terminal
nest new project-name
```

W tym wypadku _project-name_ będzie nazwą utworzonego na potrzeby projektu folderu oraz nazwą samego projektu, widoczną między innymi w _package.json_.

> Jeśli do stworzenia projektu chcemy wykorzystać już istniejący folder, możemy to uzyskać, zastępując w powyższej komendzie kropką nazwę projektu. Zostanie on wtedy utworzony w projekcie, w którym się znajdujemy.
>
> ```bash
> nest new .
> ```

Gdy nasz projekt zainicjalizował się poprawnie, możemy odpalić go pierwszy raz w trybie developerskim. Służy do tego komenda:

```bash:terminal
npm run start:dev
```

Zobaczymy wtedy kilka linijek logów, z ostatnim mówiącym o poprawnym wystartowaniu aplikacji. Możemy teraz odwiedzić w przeglądarce _**localhost:3000**_ , aby zobaczyć _Hello World!_.

> Tryb developerski oznacza nic innego jak przebudowywanie i auto-odświeżanie projektu po zarejestrowaniu zmian w kodzie. W przyszłości, na cele produkcyjne, będziemy korzystać z tej samej komendy, pozbawionej jedynie sufixu _:dev_.

## Struktura projektu

Każdy nowo zainicjalizowany projekt ma taką samą strukturę plików, pokazującą niejako sposób pisania kodu, jaki framework chce nam zaproponować, mianowicie podział na _controllers_ przyjmujące zewnętrzne zapytania (w tym momencie załóżmy zapytanie HTTP, ale mogą być również inne), oraz _services_ obsługujące te zapytania. _modules_ spinają w całość te struktury, umożliwiając wykorzystanie _dependency injection_, na którym bazuje cały framework. Pliki _spec_ zawierają testy aplikacji. Sposoby testowania Nest'owych aplikacji zostaną omówione w kolejnych artykułach.

Struktura plików, w której bezpośrednio w folderze _src_ znajduje się _controller_ i _service_ aplikacji jest bardzo uproszczona. W większości projektów wykorzystuje się nazwy folderów oparte o biznesowe domeny i w tych folderach zawiera się logikę aplikacji, np. folder _users_ gdy aplikacja operuje na użytkownikach, lub _books_ gdy na książkach. Tak również zrobimy tutaj. W roocie naszej aplikacji odpalimy kolejno 3 komendy **cli**

```bash:terminal
nest g module users && nest g controller users && nest g service users
```

W taki sposób aplikacja stworzy dla nas w folderze _src_ nowy folder _users_, który zawiera 5 plików odpowiadających domenie użytkowników. Aby uprościć nasz kod, możemy usunąć wszystkie pliki z rozszerzeniem _\*.spec.ts_ oraz pliki _app.controller.ts_ i _app.service.ts_ z folderu _src_. Dla ostatnich dwóch plików musimy również usunąć ich importy i wykorzystanie w module w pliku _src/app.module.ts_. Nasze drzewo folderów wygląda teraz następująco:

```bash
src
  ├── users
  │    ├── users.controller.ts
  │    ├── users.module.ts
  │    └── users.service.ts
  ├── app.module.ts
  └── main.ts
```

### main.ts

_main.ts_ jest to miejsce, gdzie startuje Nest'owa aplikacja, zawiera on funkcje _bootstrap()_, która wykorzystując statyczną metodę 'creatre()' klasy 'NestFactory' tworzy instancję aplikacji, a w kolejnej linijce rozpoczyna nasłuch na zapytania HTTP na porcie 3000.

```ts:src/main.ts
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

Plik _main.ts_ będziemy rozszerzać i modyfikować w kolejnych artykułach, gdy już lepiej poznamy framework i np. będziemy wprowadzać ogólno-aplikacyje walidacje czy konfiguracje projektu.

### Controllers

Kontrolery Nest'owej aplikacji zbudowane są jako klasy _TS_ posiadające dekorator _@Controller()_ Odpowiadają za odbieranie zapytań (_requests_) z zewnątrz, kierowanie ich za pomocą routingu do odpowiednich metod, które zwracają użytkownikowi odpowiedź. Routing odbywa się również przy pomocy dekoratorów, które warunkują między innymi konkretny URL lub jaka metoda HTTP powinna kierować do danej metody. Zmieńmy plik _src/app.controller.ts_ w następujący sposób:

```ts:src/users/users.controller.ts
import { Controller, Get } from '@nestjs/common';

@Controller('users')
export class UsersController {

  @Get()
  getUsers(): string {
    return 'get all users';
  }
}
```

Zacznijmy od dekoratora '@Controller('users')', który nie tylko mówi, że klasa ta ma być traktowana jak kontroler, ale również nadaje bazowy prefix, dzięki któremu wszystkie metody (pojedyncze _routy_), zawierające się w kontrolerze będą zgrupowane. W tym wypadku, aby wykonać zapytanie do metody 'getUsers()' musimy wysłać _request_ na adres 'localhost:3000/users'.

Dekorator '@Get()' nad metodą 'getUsers()' mówi o tym, że zapytanie powinno mieć metodę HTTP - GET, analogicznie, gdy chcemy przesłać w naszym requeście jakieś informacje za pomocą metody POST, wykorzystamy do tego dekorator '@Post()'.

```ts:src/users/users.controller.ts
import { Body, Controller, Get, Post } from '@nestjs/common';

@Controller('users')
export class UsersController {
  @Get()
  getUsers(): string {
    return 'get all users';
  }

  @Post()
  createUser(@Body() body: { name: string }): string {
    return 'create user ${body.name}';
  }
}
```

Jak widać w metodzie 'createUser()', korzystamy z dodatkowego dekoratora przekazywanego jako parametr, mianowicie '@Body()', pozwala on na odczytanie przekazanych w requeście danych, oraz mapowanie ich na obiekt o znanym typie, który możemy później wykorzystać. Mówimy w tym wypadku, że spodziewamy się obiektu, któremu nadajemy nazwę 'body' i definiujemy jego oczekiwany typ jako '{ name: string }'. W kolejnych artykułach omówimy sposoby na walidację, czy rzeczywiście w requescie przekazano obiekt, którego się spodziewamy.

Aby przetestować nowo dodaną metodę, nie wystarczy przeglądarka, musimy użyć np. _curl'a_

```bash:terminal
curl -X POST localhost:3000/users -d '{"name": "Bob"}' -H "Content-Type: application/json"
```

Jak już wcześniej pisałem, dekorator warunkujący metodę HTTP, na którą słucha routing, może również zawężać ilość kierowanych requestów, dodając kolejne wymagane sufixy do adresu URL endpointu. Możemy to wykorzystać do przekazania metodzie konkretnego ID naszego _users_ resource, w celu zwrócenia tylko jednego konkretnego użytkownika. Dodajmy trzecią metodę na naszego 'UsersController'.

```ts:src/users/users.controller.ts
@Get(':id')
getUserById(@Param('id') id: string): string {
  return 'get single user with id: ${id}';
}
```

W dekoratorze '@Get(':id')' zawieramy informacje, że oczekujemy metody HTTP GET, a endpoint ma kończyć się dodatkowym sufixem. Dwukropek oznacza, że sufix jest dynamiczny. Spodziewamy się więc reguestu np. na adres: 'localhost:3000/users/1'. Aby przechwycić ten dynamiczny parametr, użyjemy kolejnego dekoratora przekazanego jako atrybut metody 'getUserById()'. Dekorator '@Param()' przyjmuje jako arkument nazwę parametru (musi być zgodna z sufixem po dwukropku z dekoratora '@Get()'), a następnie pozwala na mapowanie go na zmienną, która może być użyta dalej wewnątrz metody.

> Wcale nie musimy w dekoratorze '@Param()' przekazywać, jaki dokładnie parametr nas interesuje. Możemy równie dobrze nie przekazać nic, co pozwoli nam na mapowanie i użycie obiektu 'params' w naszym kodzie.
>
> ```ts:src/users/users.controller.ts
> @Get(':id')
> getUserById(@Param() params): string {
>   return 'get single user with id: ${params.id}';
> }
> ```

## Services

Aby zapewnić rozdział obowiązków pomiędzy przeznaczone do tego struktury (_separation of concerns_), logika biznesowa aplikacji powinna być wydzielona z kontrolera do oddzielnego pliku, którego metody kontroler używa. Dzięki temu kontroler odpowiada za poprawne rozdzielenie requestów - _routing_ i delegowanie pracy do nowej struktury, jaką są _services_, w przypadku _Nest'a_ nazywane _providers_. Gdy tworzyliśmy katalog _users_ z jego plikami utworzyliśmy również _service_ ('nest g service users'), plik ten jest teraz praktycznie pusty, więc przenieśmy do niego logikę, którą mamy w kontrolerze.

```ts:src/users/user.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
export class UsersService {
  getAll(): string {
    return 'get all users';
  }

  create(body: { name: string }): string {
    return 'create user ${body.name}';
  }

  getById(id: string): string {
    return 'get single user with id: ${id}';
  }
}
```

'UsersService' jest klasą, która posiada metody zawierające logikę biznesową aplikacji. Dekorator '@Injectable()' pozwala, aby klasa została _'wstrzyknięta'_ wewnątrz innej klasy, dołączając do niej niezbędne metadane. Proces _wstrzykiwania_ 'UsersService' wygląda następująco:

```ts:src/users/users.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
  export class UsersController {
  public constructor(private usersService: UsersService) {}

  @Get()
  getUsers(): string {
    return this.usersService.getAll();
  }

  @Post()
  createUser(@Body() body: { name: string }): string {
    return this.usersService.create(body);
  }

  @Get(':id')
  getUserById(@Param('id') id: string): string {
    return this.usersService.getById(id);
  }
}
```

Klasa 'UsersService' przekazywana jest do konstruktora 'UsersController'. Wbudowane w framework wsparcie dla _depenency injections_ powoduje, że nie musimy tworzyć instancji klasy, aby jej używać. Framework przekazuje ją za nas niejawnie, gdy tylko przekażemy ją konstruktorowi. Uproszczenie to znacznie ułatwia pracę z modułami i narzuca sposób pracy z dependencjami w projekcie.

Z tak zbudowanymi _controller_ i _service_ aplikacja działa tak samo, jak przedtem (wszystkie _curl'e_ wykonywane wyżej, powinny zwracać to samo co przedtem), z tym że rozdzieliliśmy kod pod względem odpowiedzialności. W dalszej części artykułu dodamy trochę logiki, dzięki czemu to rozdzielenie zacznie nabierać sensu.

### Modules

Ostatnimi z podstawowych, a zarazem najważniejszymi, częścią _Nest'owej_ aplikacji są moduły. Moduły grupują fragmenty aplikacji w logiczne kawałki i umożliwiają zapanowanie w prosty i usystematyzowany sposób nad przekazywanymi wewnątrz nich dependencjami. Wewnątrz folderu _users_ znajduje się moduł _users.module.ts_, powstał on dzięki wywołaniu 'nest g module users' we wcześniejszej części artykułu.

```ts:src/users/users.module.ts
import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';

@Module({
  providers: [UsersService],
  controllers: [UsersController]
})
export class UsersModule {}
```

Nest **CLI** w poprawny zaimportował i przypisał dependencje w momencie ich tworzenia za nas. Dekorator '@Module()' przekazuje metadane, które są potrzebne, aby _Nest_ w poprawny sposób przekazał dependencje między plikami wewnątrz modułu. Nasz domenowy moduł 'UsersModule' przyjmuje 'UsersController' jako kontroler i 'UsersService' jako _providera_ (element, który może być wstrzyknięty - wykorzystany, w innych elementach modułu). Aby cała aplikacja była świadoma modułu 'UsersModule' i była w stanie używać elementów nim zawartych, musi on zostać zaimportowany w głównym module aplikacji.

```ts:src/app.module.ts
import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';

@Module({
  imports: [UsersModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
```

Moduł 'AppModule' na to jest wykorzystywany do zbudowania i zainicjalizowania aplikacji w głównym jej pliku, czyli _main.ts_.

```ts:src/main.ts
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(3000);
}
bootstrap();
```

Tak zbudowana aplikacja posiada wszystkie elementy niezbędne do podstawowej pracy.

### DTOs i Entities

Rozszerzenie skrótu _DTO_, to z angielskiego _document-transfer-object_. Są to nieodłączne części każdej większej aplikacji, będące wyciągniętym, do zewnętrznych plików, typami obiektów, które przyjmują lub przekazują metody aplikacji. Nie jest to wymagane, aczkolwiek uważane za dobrą praktykę, a wraz z rozrostem aplikacji, coraz bardziej nieodzowne podejście. _Entities_ natomiast, to definicje obiektów, na których bazuje domena, w kolejnych artykułach zobaczymy, że są one bardzo blisko powiązane z definicjami obiektów w bazie danych, na których będziemy pracować.

Zacznijmy od przebudowania 'UsersService()' aby wykorzystanie _dtos_ i _entities_ mało w ogóle sens.

```ts:src/users/users.service.ts
import { Injectable } from '@nestjs/common';

@Injectable()
  export class UsersService {
  private users: any = [{ id: 0, name: 'Brad' }];

  getAll(): any {
    return this.users;
  }

  create(body: { name: string }): any {
    const newUser = { id: Date.now(), name: body.name };
    this.users.push(newUser);
    return newUser;
  }

  getById(id: number): any {
    return this.users.find((user) => user.id === id);
  }
}
```

W bardzo prosty sposób symulujemy bazę danych za pomocą listy obiektów, do której dopisują lub, z której czytają metody 'UsersService'. Jedyną rzeczą, na którą warto zwrócić uwagę, to każdy obiekt z listy 'users' będzie miał _id_ o typie 'number', taki też parametr przyjmie teraz metoda 'getById', a co za tym idzie, musimy mapować _id_, które wyciągamy z _URL-u_ (w postaci _stringa_) na typ 'number'.

```ts:src/users/users.controller.ts
@Get(':id')
getUserById(@Param('id') id: string): string {
  return this.usersService.getById(Number(id));
}
```

Można teraz już dodać dwa nowe katalogi i dwa pliki w nich się znajdujące.

```bash
src
  ├── users
  │     ├── dtos
  │     │     └── create-user.dto.ts
  │     ├── entities
  │     │     └── user.entity.ts
  │     ├── users.controller.ts
  │     ├── users.module.ts
  │     └── users.service.ts
  ├── app.module.ts
  └── main.ts
```

Zaczniemy od pliku _users/entities/user.entity.ts_, będzie on zawierał definicję obiektu 'User', którym będziemy się posługiwali dalej. Klasa 'User' posiada 2 pola - _id_ i _name_ które opisują tę prostą strukturę.

```ts:src/users/entities/user.entity.ts
export class User {
  public id: number;
  public name: string;
}
```

Plik _users/dtos/create-user.dto.ts_ będzie zawierał obiekt, który będziemy spodziewali się, że zostanie przekazany metodzie 'createUser()' kontrolera 'UsersController()', aby utworzyć nowego użytkownika.

```ts:src/users/dtos/create-user.dto.ts
export class CreateUserDto {
  name: string;
}
```

Po dodaniu powyższych obiektów możemy zacząć ich używać. W pierwszej kolejności poprawmy 'UsersService':

```ts:src/users/users.service.ts
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
private users: User[] = [{ id: 0, name: 'Brad' }];

  getAll(): User[] {
    return this.users;
  }

  create(body: CreateUserDto): User {
    const newUser = { id: Date.now(), name: body.name };
    this.users.push(newUser);
    return newUser;
  }

  getById(id: number): User {
    return this.users.find((user) => user.id === id);
  }
}
```

Jak widzimy, możemy teraz nie tylko opisać jakiego typu są elementy listy 'users: User[]' ale również zasygnalizować co każda z metod zwraca. Do tego metoda 'create(body: CreateUserDto)' wprost opisuje, jaki typ parametru oczekuje. Takie podejście, z wykorzystaniem typów, znacznie ułatwia pisanie kodu, gdyż _autocomplete_ odwala za nas bardzo dużą część pracy.

Również w _src/users/users.controller.ts_ możemy wprowadzić zmiany wynikające z dodanych obiektów _dto_ i _entity_.

```ts:src/users/users.controller.ts
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';

@Controller('users')
  export class UsersController {
  public constructor(private usersService: UsersService) {}

  @Get()
  getUsers() {
    return this.usersService.getAll();
  }

  @Post()
  createUser(@Body() body: CreateUserDto) {
    return this.usersService.create(body);
  }

  @Get(':id')
  getUserById(@Param('id') id: string) {
    return this.usersService.getById(Number(id));
  }
}

```

Tutaj zmian jest mniej. Przekazujemy metodzie 'createUser(@Body() body: CreateUserDto)' dokładnie jakiego 'body' się spodziewamy oraz możemy pominąć informacje o typach zwracanych przez metody, gdyż są one poprawnie mapowane z wywoływanych metod 'UsersService' (po najechaniu na metodę, zobaczymy, że edytor wie jaki typ zostanie zwrócony - magia _TS'a_).

## Podsumowanie

Tak napisany projekt w bardzo przystępny sposób proponuje strukturę plików dobrze wpisującą się w idee framewok'a i jest świetnym punktem wyjścia do dalszego rozwoju aplikacji. Poruszyliśmy tutaj tylko wierzchołek z wszystkich zagadnień związanych z _NestJS_. W kolejnych artykułach zaczniemy zagłębiać się nieco dalej, poznając kolejne elementy framework'a oraz gotowe techniki jego wykorzystania jak np. integracje baz danych, kolejek itp.
