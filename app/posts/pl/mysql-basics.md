---
title: Podstawy SQL na przykładzie MySQL
excerpt: Zdecydowana większość tutoraiali w sieci opisująca bazy danych do zastosowań web developmentu skupia się na no-SQL. W tym wpisie opowiem trochę o prostym zastosowaniu bazy SQL na przykładzie MySQL.
date: October 27, 2019
tags: [SQL, MySQL]
cover_img: mysql-basics.jpg
published: true
---

## Nie tylko MongoDB Atlas istnieje w web developmencie

Ostatnio zauważyłem, że znaczna większość kursów na _youtube_ czy w innych darmowych miejscach, mówiących o konfiguracji bazy danych w webowym projekcie, opisuje zastosowanie _MongoDB_, lub ogólnie baz danych _No-SQL_. Bardzo wiele z tych materiałów mówi też, przy okazji, o zastosowaniach tych technologii w wersji _chmurowej_. Rzadko poruszane są tematy konfiguracji _baz danych_ lokalnie. Z tego też względu chciałbym poświęcić trochę czasu na zaznajomienie się z bazami danych w wersji innej niż np. wersja _MongoDB_ w chmurze: _Atlas_. Postaram się w tym i w paru kolejnych wpisach przyswoić (i oczywiście omówić tu w prosty sposób) bazy danych typu _SQL_ i _No-SQL_ oraz ich najczęściej używane pakiety _ORM_ (Objecr-Relational Mapping).

## Relacyjne bazy danych

Na wstępie wypadałoby w skrócie opisać, czym są i po co nam te relacyjne bazy danych. Są to bazy danych składające się z tabel (relacji), każda tabela składa się z rekordów (krotek) danych, które można przyrównać do wierszy w tabeli. Kolumny w tej tabeli to atrybuty, określające wartości, jakimi charakteryzuje się rekord tabeli. Każda tabela powinna posiadać tzw. _primary key_, czyli identyfikator, na podstawie którego będziemy budować relacje z innymi tabelami. Zazwyczaj określamy go jako _id_ rekordu. Pozwala on też na wydajniejsze pobieranie konkretnych rekordów z tabeli. Podobny do _primary key_ jest _foreign key_. Jest to identyfikator rekordu innej tabeli będący w relacji z danym rekordem. Na podstawie _primary_ i _foreign keys_ definiujemy relacje między tabelami. Dla przykładu posiadamy tabele _users_ i tabele _posts_. Każdy user ma swoje unikalne _id_. Z tego względu, każdemu postowi możemy przypisać użytkownika, który go dodał, dodając do tabeli _posts_ atrybut np. _authorId_, zawierający _id_ twórcy.

Implementacją relacyjnej bazy danych, z jakiej będziemy korzystać w tym wpisie, jest _**MySQL**_. Instalacja serwera jest dość prosta. Ze względu na to, że powstało wiele opisów jak to zrobić, nie będę się tu nad tym skupiał. Zakładam, że mamy zainstalowany serwer MySQL lokalnie na komputerze oraz nadaliśmy hasło zabezpieczające dla _root'a_ i możemy odpalić serwer z poziomu konsoli.

```bash:terminal
mysql -u root -p
```

Zostaniemy zapytani o hasło, a po wpisaniu hasła otworzy nam się interaktywny wiersz poleceń _MySQL_. Rozpoznamy go po prompcie _mysql>_.

## Co to jest właściwie ten SQL

SQL (Structured Query Language) jest językiem zapytań, służącym do komunikacji z bazą danych. Jako komunikację rozumiemy pobieranie, dodawanie, edycję, czy też usuwanie danych. Połączenie z bacą danych dokonywane jest przy pomocy systemu zarządzania bazą danych, w naszym wypadku będzie to _MySQL_. To System zarządzania dokonuje zmian albo zwraca elementy bazy, ale my za pomocą języka SQL przekazujemy mu, komendy co ma zrobić.

### Nowy użytkownik bazy danych

Dobrym pomysłem na początek jest dodanie nowego użytkownika, aby nie tworzyć każdej kolejnej bazy danych za pomocą _root'a_.

```mysql:terminal
CREATE USER 'sebastian'@'localhost' IDENTIFIED BY 'pass123';
```

```mysql
Query OK, 0 rows affected (0.22 sec)
```

Możemy teraz sprawdzić jakich użytkowników widzi _MySQL_.

```mysql:terminal
SELECT User, Host FROM mysql.user;
```

```mysql
+------------------+-----------+
| User             | Host      |
+------------------+-----------+
| mysql.infoschema | localhost |
| mysql.session    | localhost |
| mysql.sys        | localhost |
| root             | localhost |
| sebstian         | localhost |
+------------------+-----------+
6 rows in set (0.05 sec)
```

Początek tej tabeli nas nie interesuje, gdyż są to klienci serwera. Dla nas ważne są _root_ i nasz świeżo utworzony użytkownik. Teraz musimy dodać użytkownikowi uprawnienie, gdyż w tym momencie nie może on praktycznie nic jeszcze robić.

```mysql:terminal
GRANT ALL PRIVILEGES ON * . * TO 'sebastian'@'localhost';
```

```mysql:terminal
FLUSH PRIVILEGES;
```

Te dwie komendy nadadzą użytkownikowi _sebastian_ wszystkie możliwe uprawnienia. Na etapie produkcji rozdawanie tak uprawnień będzie niedopuszczalne, ale podczas nauki jest całkiem _ok_.

Aby wyjść z interaktywnej konsoli _MySQL_ wystarczy wpisać komendę _exit_.

```mysql:terminal
exit
```

### Pierwsza baza danych i tabela

Zacznijmy od zalogowanie się do _MySQL_ na nowo utworzone konto.

```mysql:terminal
mysql -u sebsatian -p
```

Gdy mamy już zalogowanego użytkownika i możemy przy jego pomocy komunikować się z bazą danych (ma nadane prawa), dodajmy pierwszą bazę danych, w której będą przechowywane wszystkie nasze dane w tabelach.

```mysql:terminal
CREATE DATABASE sqlbasics;
```

Możemy teraz sprawdzić, jakie posiada bazy danych nasz zalogowany użytkownik.

```mysql:terminal
SHOW DATABASES;
```

```mysql
+--------------------+
| Database           |
+--------------------+
| information_schema |
| mysql              |
| nodemysql          |
| performance_schema |
| sqlbasics          |
| sys                |
+--------------------+
6 rows in set (0.00 sec)
```

Teraz, aby móc dodawać tabele i rekordy, musimy wybrać, z którą bazą danych chcemy pracować. W naszym wypadku będzie to oczywiście świeżo utworzona baza _sqlbasics_. Pozostałe bazy danych są to systemowe twory, zostawmy je więc w spokoju.

```mysql:terminal
USE sqlbasics;
```

Możemy teraz dodać pierwszą tabelę, w której będą znajdować się rekordy naszych użytkowników. Tworząc tabelę, od razu na sztywno deklarujemy, jakie będą argumenty tabeli i jakie wartości te argumenty będą mogły przyjmować. Tak nieelastyczny model jest jedna z podstawowych cech relacyjnych baz danych. Wszystkie rekordy muszą wpisywać się w ten ściśle scharakteryzowany model, aby zostać dodane do tabeli.

Argumenty rekordu mogą przyjmować bardzo wiele różnych typów, oto podstawowe:

- _INT_ - wartości liczbowe całkowite;
- _TINYINT_ - jednobitowy _INT_, zazwyczaj do określania wartości _boolean_, jako ze w _MySQL_ nie ma typu _BOOL_;
- _FLOAT_ - liczba zmiennoprzecinkowa, defaultowo 4-bitowa;
- _DATE_ - data (bez czasu), wyświetlana w formacie RRRR-MM-DD;
- _DATETIME_ - data z czasem dnia wyświetlane według formatu RRRR-MM-DD GG:MM:SS;
- _TIMESTAMP_ - data i czas liczony od początku epoki systemu UNIX, pokazywana jako liczba sekund;
- _CHAR_ - pole z wartością znakową o stałej długości z zakresu od 1 do 255 bajtów;
- _VARCHAR_ - pole z wartością znakową o zmiennej długości z zakresu od 1 do 255 bajtów;
- _TEXT_ - pole tekstowe o rozmiarze nieprzekraczającym 65 535 bajtów, do przechowywania długich wartości tekstowych.

Dla każdego definiowanego argumentu tabeli oprócz definiowania typu musimy zdefiniować również maksymalną długość, jaka może zostać wprowadzona (określamy ją w nawiasie, za typem argumentu). Tak więc nasza pierwsza tabela będzie wyglądała w następujący sposób.

```mysql:terminal
CREATE TABLE users(
    -> id INT AUTO_INCREMENT,
    -> name VARCHAR(50),
    -> email VARCHAR(50),
    -> password VARCHAR(100),
    -> job VARCHAR(50),
    -> register_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    -> PRIMARY KEY(id)
    -> );
```

Ten zapis mówi, że nowa tabela będzie miała nazwę _users_ i będzie zawierała argumenty: _id_, _name_, _email_, _password_ i _register_date_. Parametr _AUTO_INCREMENT_ dla argumentu _id_ oznacza, że każdy kolejny rekord będzie dostawał kolejne całkowite _id_. Za to _PRIMART_KEY(id)_ przypisuje _id_ rekordu jako identyfikator, na podstawie którego będziemy mogli szybko wyszukiwać rekordy lub tworzyć relacje z innymi tabelami. _DEFAULT CURENT_TIMESTAMP_ oznacza, że polu _register_date_ dajemy defaultową wartość.

Możemy teraz sprawdzić, czy nasz tabela znajduje się w bazie danych.

```mysql:terminal
SHOW TABLES;
```

```mysql
+---------------------+
| Tables_in_sqlbasics |
+---------------------+
| users               |
+---------------------+
1 row in set (0.02 sec)
```

### Dodawanie rekordów do bazy danych

Gdy posiadamy już bazę danych a w niej tabelę pora na dodanie pierwszego rekordu.

```mysql:terminal
INSERT INTO users (name, email, password, job) VALUES ('Sebastian', 'sebastian@mail.com', 'pass123', 'front-end developer');
```

Rekord dodajemy przy pomocy metody _INSERT INTO_, definiując, do jakiej tabeli chcemy dodać nasz rekord, następnie w nawiasie definiujemy, do jakich argumentów będziemy przypisywać dane. Na końcu musimy w kolejnym nawiasie po parametrze _VELUES_ wpisać wartości argumentów. Kolejność nazw argumentów i ich wartości musi się zgadzać. Jako że _register_date_ ustawiamy z defaultu, nie musimy go podawać.

Możemy też dodawać po kilka rekordów jednocześnie.

```mysql:terminal
INSERT INTO users (name, email, password, job) VALUES ('John', 'john@gmail.com', 'pass123', 'back-end developer'), ('Sam', 'sam@yahoo.com', 'pass123', 'designer');
```

### Odczytywanie rekordów z bazy danych

Podstawowym sposobem _czytania_ z bazy danych jest metoda _SELECT_ bez definiowania argumentów (\*), podajemy tylko z jakiej tabeli pobieramy dane.

```mysql:terminal
SELECT * FROM users;
```

```mysql
+----+-----------+--------------------+----------+---------------------+---------------------+
| id | name      | email              | password | job                 | register_date       |
+----+-----------+--------------------+----------+---------------------+---------------------+
| 1  | Sebastian | sebastian@mail.com | pass123  | front-end developer | 2019-10-27 13:55:19 |
| 2  | John      | john@gmail.com     | pass123  | back-end developer  | 2019-10-27 14:17:34 |
| 3  | Sam       | sam@yahoo.com      | pass123  | designer            | 2019-10-27 14:17:34 |
+----+-----------+--------------------+----------+---------------------+---------------------+
3 rows in set (0.00 sec)
```

Możemy też odczytać tylko interesujące nas argumenty, np.:

```mysql:terminal
SELECT name, job FROM users;
```

```mysql
+-----------+---------------------+
| name      | job                 |
+-----------+---------------------+
| Sebastian | front-end developer |
| John      | back-end developer  |
| Sam       | designer            |
+-----------+---------------------+
3 rows in set (0.00 sec)
```

Gdy chcemy zawęzić pobierane rekordy, możemy dodać parametr _WHERE_ do query stringu, a po nim zdefiniować do chcemy otrzymać. Poza operatorem przyrównania możemy również używać np. znaków mniejszości i większości dla wartości numerycznych.

```mysql:terminal
SELECT * FROM users WHERE job='designer';
```

```mysql
+----+------+---------------+----------+----------+---------------------+
| id | name | email         | password | job      | register_date       |
+----+------+---------------+----------+----------+---------------------+
| 3  | Sam  | sam@yahoo.com | pass123  | designer | 2019-10-27 14:17:34 |
+----+------+---------------+----------+----------+---------------------+
1 row in set (0.01 sec)
```

Przydatne może być też sortowanie danych. Posortujmy np. po imionach w kolejności rosnącej.

```mysql:terminal
SELECT * FROM users ORDER BY name ASC;
```

```mysql
+----+-----------+----------------+----------+---------------------+---------------------+
| id | name      | email          | password | job                 | register_date       |
+----+-----------+----------------+----------+---------------------+---------------------+
| 2  | John      | john@gmail.com | pass123  | back-end developer  | 2019-10-27 14:17:34 |
| 5  | Sam       | sam@yahoo.com  | pass123  | designer            | 2019-10-27 14:52:52 |
| 1  | Sebastian | seba@gmail.com | pass123  | front-end developer | 2019-10-27 13:55:19 |
+----+-----------+----------------+----------+---------------------+---------------------+
3 rows in set (0.01 sec)
```

Możemy również przeszukiwać rekordy tabeli na podstawie wartości w argumentach. Służy do tego metoda _LIKE_, po niej mówimy, czego szukamy (składnia zbliżona do regex).

```mysql:terminal
SELECT * FROM users WHERE job LIKE '%end%';
```

```mysql
+----+-----------+----------------+----------+---------------------+---------------------+
| id | name      | email          | password | job                 | register_date       |
+----+-----------+----------------+----------+---------------------+---------------------+
| 1  | Sebastian | seba@gmail.com | pass123  | front-end developer | 2019-10-27 13:55:19 |
| 2  | John      | john@gmail.com | pass123  | back-end developer  | 2019-10-27 14:17:34 |
+----+-----------+----------------+----------+---------------------+---------------------+
2 rows in set (0.00 sec)
```

Taki zapis zapytania mówi: zwróć wszystkie rekordy tabeli _users_, gdzie w argumencie _job_ występuje wartość _'end'_ przed którą i za którą może występować dowolna ilość znaków.

Ostatnim z podstawowych parametrów związanym z pokazywaniem danych jest _IN_

```mysql:terminal
SELECT * FROM users WHERE id IN (1, 5)
```

```mysql
+----+-----------+----------------+----------+---------------------+---------------------+
| id | name      | email          | password | job                 | register_date       |
+----+-----------+----------------+----------+---------------------+---------------------+
| 1  | Sebastian | seba@gmail.com | pass123  | front-end developer | 2019-10-27 13:55:19 |
| 5  | Sam       | sam@yahoo.com  | pass123  | designer            | 2019-10-27 14:52:52 |
+----+-----------+----------------+----------+---------------------+---------------------+
```

Deklarujemy w ten sposób, że _SQL_ ma nam zwrócić rekordy, gdzie _id_ ma wartość _1_ lub _5_.

### Zmiany w rekordach tabeli

W tabeli możemy również dokonywać zmian już istniejących rekordów. Robimy to za pomocą metody _UPDATE_, definiujemy po niej, w której tabeli chcemy robić zmiany i jaki argument zmieniamy. Aby nie zmienić wszystkich rekordów w tabeli, musimy pamiętać, aby zawęzić _query_ metodą _WHERE_.

```mysql:terminal
UPDATE users SET email = 'seba@gmail.com' WHERE id = 1;
```

```mysql
Rows matched: 1 Changed: 1 Warnings: 0
```

Rekordy usuwamy za pomocą metody _DELETE_, tu również musimy określić, który rekord chcemy usunąć, aby przez przypadek nie usunąć wszystkich.

DELETE FROM users WHERE id = 3;

````

Po naszych zmianach tabele _users_ wygląda następująco. Zauważmy, że obie nasze wcześniejsze metody, _UPDATE_ i _DELETE_ zadziałały. Rekord o _id=3_ został usunięty, a _mail_ dla pierwszego rekordu się zmienił.

```mysql:terminal
SELECT * FROM users;
````

```mysql
+----+-----------+----------------+----------+---------------------+---------------------+
| id | name      | email          | password | job                 | register_date       |
+----+-----------+----------------+----------+---------------------+---------------------+
| 1  | Sebastian | seba@gmail.com | pass123  | front-end developer | 2019-10-27 13:55:19 |
| 2  | John      | john@gmail.com | pass123  | back-end developer  | 2019-10-27 14:17:34 |
+----+-----------+----------------+----------+---------------------+---------------------+
2 rows in set (0.00 sec)
```

### Relacje między bazami danych

Główną zaletą baz relacyjnych baz danych, poza z góry zdefiniowanym modelem danych, są właśnie relacje. Za pomocą _primary key_ i _foreign key_ możemy połączyć dwie bazy danych, a dokładnie rekordy z dwóch baz danych.

W pierwszej kolejności zdefiniujmy nową tabelę _posts_, która będzie zawierała _user_id_ powiązane z rekordem tabeli _users_.

```mysql:terminal
CREATE TABLE posts(
    -> id INT AUTO_INCREMENT,
    -> user_id INT,
    -> title VARCHAR(100),
    -> body TEXT,
    -> publish_date DATETIME DEFAULT CURRENT_TIMESTAMP,
    -> PRIMARY KEY(id),
    -> FOREIGN KEY (user_id) REFERENCES users(id)
    -> );
```

_posts_ również posiada _PRIMARY KEY_, którym jest jego _id_. _FOREIGN KEY (user_id) REFERENCES user(id)_ mówi o tym, że argument _user_id_ odpowiada argumentowi _id_ tabeli _users_.

Dodajmy więc kilka postów do tabeli _posts_.

```mysql:terminal
INSERT INTO posts(user_id, title, body) VALUES (1, 'Post One', 'This is post one'),(5, 'Post Two', 'This is post two'),(5, 'Post Three', 'This is post three'),(5, 'Post Four', 'This is post four'),(2, 'Post Five', 'This is post five'),(1, 'Post Six', 'This is post six'),(2, 'Post Seven', 'This is post seven'),(1, 'Post Eight', 'This is post eight'),(5, 'Post Nine', 'This is post none');
```

```mysql
Records: 9 Duplicates: 0 Warnings: 0
```

```mysql:terminal
SELECT * FROM posts;
```

```mysql
+----+---------+------------+--------------------+---------------------+
| id | user_id | title      | body               | publish_date        |
+----+---------+------------+--------------------+---------------------+
| 1  | 1       | Post One   | This is post one   | 2019-10-27 15:32:34 |
| 2  | 5       | Post Two   | This is post two   | 2019-10-27 15:32:34 |
| 3  | 5       | Post Three | This is post three | 2019-10-27 15:32:34 |
| 4  | 5       | Post Four  | This is post four  | 2019-10-27 15:32:34 |
| 5  | 2       | Post Five  | This is post five  | 2019-10-27 15:32:34 |
| 6  | 1       | Post Six   | This is post six   | 2019-10-27 15:32:34 |
| 7  | 2       | Post Seven | This is post seven | 2019-10-27 15:32:34 |
| 8  | 1       | Post Eight | This is post eight | 2019-10-27 15:32:34 |
| 9  | 5       | Post Nine  | This is post none  | 2019-10-27 15:32:34 |
+----+---------+------------+--------------------+---------------------+
```

Gdy posiadamy już dwie tabele, z czego w tabeli _posts_ mamy _foreign key_ odwołujący się do _id_ z tabeli _users_, możemy powiązać wyszukiwania z dwóch tabel w jedno za pomocą _JOIN_. Skupimy się na _INNER JOIN_, po pozostałe warianty odsyłam do dokumentacji.

```mysql:terminal
SELECT users.name, posts.title, posts.body, posts.publish_date
    -> FROM users
    -> INNER JOIN posts
    -> ON users.id = posts.user_id
    -> ORDER BY posts.publish_date;
```

```mysql
+-----------+------------+--------------------+---------------------+
| name      | title      | body               | publish_date        |
+-----------+------------+--------------------+---------------------+
| Sam       | Post Two   | This is post two   | 2019-10-27 15:32:34 |
| Sam       | Post Three | This is post three | 2019-10-27 15:32:34 |
| Sam       | Post Four  | This is post four  | 2019-10-27 15:32:34 |
| Sebastian | Post One   | This is post one   | 2019-10-27 15:32:34 |
| Sam       | Post Nine  | This is post none  | 2019-10-27 15:32:34 |
| Sebastian | Post Six   | This is post six   | 2019-10-27 15:32:34 |
| Sebastian | Post Eight | This is post eight | 2019-10-27 15:32:34 |
| John      | Post Five  | This is post five  | 2019-10-27 15:32:34 |
| John      | Post Seven | This is post seven | 2019-10-27 15:32:34 |
+-----------+------------+--------------------+---------------------+
```

W zapytaniu deklarujemy, co chcemy otrzymać. _users.name_ definiuje, że oczekujemy argumentu _name_ z tabeli _users_. Następne dwa wiersze mówią, którą tabelę połączyć z którą. Parametr _ON_ warunkuje, który argument z pierwszej tabeli odwołuje się do _foreign key_ w drugiej. Ostatnia linia _ORDER BY_, jak sama nazwa wskazuje, sortuje wyniki.

## Podsumowanie

Opis ten tylko zarysowuje wszystkie możliwości języka zapytań _SQL_, w tym wypadku w wariancie silnika _MySQL_.
Po więcej przykładów i bardziej rozbudowane przykłady odsyłam do [SQL cheet sheet from Brad Traversy](https://gist.github.com/bradtraversy/c831baaad44343cc945e76c2e30927b3). Nie ukrywam, że było to dla mnie inspiracją do stworzenia tego wpisu.

W następnym wpisie będę starał się wykorzystać _MySQL_ w aplikacji _CRUD_ napisanej przy pomocy _Node.js_ i _Express_.
