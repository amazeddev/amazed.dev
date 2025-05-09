---
title: SQL Basics with MySQL
excerpt: While most web development tutorials focus on No-SQL databases, this post will cover basic SQL database usage using MySQL as an example.
date: October 27, 2019
tags: [SQL, MySQL]
cover_img: mysql-basics.jpg
published: true
---

## There's More to Web Development Than MongoDB Atlas

Recently, I've noticed that the vast majority of courses on YouTube and other free resources about database configuration in web projects focus on MongoDB or No-SQL databases in general. Many of these materials also discuss cloud-based versions of these technologies. Local database configuration topics are rarely covered. For this reason, I'd like to spend some time exploring databases other than cloud-based MongoDB Atlas. In this and a few upcoming posts, I'll try to cover SQL and No-SQL databases and their most commonly used ORM (Object-Relational Mapping) packages.

## Relational Databases

To start, let's briefly describe what relational databases are and why we need them. These are databases consisting of tables (relations), where each table contains records (tuples) of data, which can be compared to rows in a table. The columns in these tables are attributes that define the values characterizing each record. Each table should have a primary key, which is an identifier used to build relationships with other tables. It's typically defined as the record's id. This allows for more efficient retrieval of specific records from the table. Similar to the primary key is the foreign key. This is an identifier from another table's record that relates to the current record. Using primary and foreign keys, we define relationships between tables. For example, we have users and posts tables. Each user has a unique id. Therefore, we can assign a user to each post by adding an authorId attribute to the posts table containing the creator's id.

The relational database implementation we'll use in this post is MySQL. Server installation is quite straightforward. Since there are many descriptions of how to do this, I won't focus on it here. I'll assume we have MySQL server installed locally and have set a password for root, allowing us to start the server from the console.

```bash:terminal
mysql -u root -p
```

We'll be prompted for a password, and after entering it, the MySQL interactive command line will open. We'll recognize it by the mysql> prompt.

## What is SQL Anyway?

SQL (Structured Query Language) is a query language used to communicate with databases. By communication, we mean retrieving, adding, editing, or deleting data. The connection to the database is made through a database management system, in our case, MySQL. The management system makes changes or returns database elements, but we use SQL to tell it what to do.

### New Database User

It's a good idea to start by adding a new user, so we don't create every subsequent database using root.

```mysql:terminal
CREATE USER 'sebastian'@'localhost' IDENTIFIED BY 'pass123';
```

```mysql
Query OK, 0 rows affected (0.22 sec)
```

We can now check which users MySQL sees.

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

The beginning of this table doesn't interest us as these are server clients. For us, root and our newly created user are important. Now we need to add privileges to the user, as at this moment they can't do much.

```mysql:terminal
GRANT ALL PRIVILEGES ON * . * TO 'sebastian'@'localhost';
```

```mysql:terminal
FLUSH PRIVILEGES;
```

These two commands will give the user 'sebastian' all possible privileges. At the production stage, giving such privileges would be unacceptable, but during learning, it's quite okay.

To exit the MySQL interactive console, simply type the exit command.

```mysql:terminal
exit
```

### First Database and Table

Let's start by logging into MySQL with our newly created account.

```mysql:terminal
mysql -u sebsatian -p
```

Once we have a logged-in user who can communicate with the database (has assigned rights), let's add our first database where all our data in tables will be stored.

```mysql:terminal
CREATE DATABASE sqlbasics;
```

We can now check which databases our logged-in user has.

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

Now, to be able to add tables and records, we need to select which database we want to work with. In our case, it will be the freshly created sqlbasics database. The remaining databases are system creations, so let's leave them alone.

```mysql:terminal
USE sqlbasics;
```

We can now add our first table, which will contain our user records. When creating a table, we immediately declare what the table's arguments will be and what values these arguments can take. This inflexible model is one of the basic features of relational databases. All records must fit into this strictly characterized model to be added to the table.

Record arguments can take many different types, here are the basic ones:

- INT - integer values;
- TINYINT - single-bit INT, typically used for boolean values, as MySQL doesn't have a BOOL type;
- FLOAT - floating-point number, default 4-bit;
- DATE - date (without time), displayed in YYYY-MM-DD format;
- DATETIME - date with time of day displayed in YYYY-MM-DD HH:MM:SS format;
- TIMESTAMP - date and time counted from the beginning of the UNIX epoch, shown as number of seconds;
- CHAR - field with character value of fixed length from 1 to 255 bytes;
- VARCHAR - field with character value of variable length from 1 to 255 bytes;
- TEXT - text field not exceeding 65,535 bytes, for storing long text values.

For each defined table argument, besides defining the type, we must also define the maximum length that can be entered (we specify it in parentheses after the argument type). So our first table will look like this:

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

This notation says that the new table will be named users and will contain arguments: id, name, email, password, and register_date. The AUTO_INCREMENT parameter for the id argument means that each subsequent record will get the next integer id. PRIMARY_KEY(id) assigns the record's id as the identifier on which we can quickly search for records or create relationships with other tables. DEFAULT CURRENT_TIMESTAMP means we give the register_date field a default value.

We can now check if our table is in the database.

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

### Adding Records to the Database

Now that we have a database with a table, it's time to add our first record.

```mysql:terminal
INSERT INTO users (name, email, password, job) VALUES ('Sebastian', 'sebastian@mail.com', 'pass123', 'front-end developer');
```

We add a record using the INSERT INTO method, defining which table we want to add our record to, then in parentheses defining which arguments we'll assign data to. At the end, we must enter the argument values in another parentheses after the VALUES parameter. The order of argument names and their values must match. Since we set register_date with a default, we don't need to provide it.

We can also add several records at once.

```mysql:terminal
INSERT INTO users (name, email, password, job) VALUES ('John', 'john@gmail.com', 'pass123', 'back-end developer'), ('Sam', 'sam@yahoo.com', 'pass123', 'designer');
```

### Reading Records from the Database

The basic way of "reading" from the database is the SELECT method without defining arguments (\*), we only specify which table we're retrieving data from.

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

We can also read only the arguments we're interested in, for example:

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

When we want to narrow down the retrieved records, we can add the WHERE parameter to the query string, and after it define what we want to receive. Besides the equality operator, we can also use, for example, less than and greater than signs for numeric values.

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

Sorting data can also be useful. Let's sort by names in ascending order.

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

We can also search table records based on values in arguments. The LIKE method is used for this, after which we say what we're looking for (syntax similar to regex).

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

This query notation says: return all records from the users table where the job argument contains the value 'end' with any number of characters before and after it.

The last of the basic parameters related to displaying data is IN

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

We declare that SQL should return records where id has a value of 1 or 5.

### Changes to Table Records

We can also make changes to existing records in the table. We do this using the UPDATE method, defining after it which table we want to make changes in and which argument we're changing. To avoid changing all records in the table, we must remember to narrow down the query with the WHERE method.

```mysql:terminal
UPDATE users SET email = 'seba@gmail.com' WHERE id = 1;
```

```mysql
Rows matched: 1 Changed: 1 Warnings: 0
```

We delete records using the DELETE method, here we also need to specify which record we want to delete to avoid accidentally deleting all of them.

```mysql:terminal
DELETE FROM users WHERE id = 3;
```

After our changes, the users table looks like this. Notice that both our earlier methods, UPDATE and DELETE, worked. The record with id=3 was deleted, and the email for the first record changed.

```mysql:terminal
SELECT * FROM users;
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

### Database Relationships

The main advantage of relational databases, besides the predefined data model, is relationships. Using primary keys and foreign keys, we can connect two databases, or more precisely, records from two databases.

First, let's define a new posts table that will contain user_id related to a record from the users table.

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

posts also has a PRIMARY KEY, which is its id. FOREIGN KEY (user_id) REFERENCES user(id) says that the user_id argument corresponds to the id argument in the users table.

Let's add some posts to the posts table.

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

Now that we have two tables, with the posts table having a foreign key referencing the id from the users table, we can combine searches from both tables into one using JOIN. We'll focus on INNER JOIN, for other variants I refer you to the documentation.

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

In the query, we declare what we want to receive. users.name defines that we expect the name argument from the users table. The next two lines say which table to join with which. The ON parameter conditions which argument from the first table refers to the foreign key in the second. The last line ORDER BY, as the name suggests, sorts the results.

## Summary

This description only outlines all the possibilities of the SQL query language, in this case in the MySQL engine variant.
For more examples and more extensive examples, I refer you to [SQL cheat sheet from Brad Traversy](https://gist.github.com/bradtraversy/c831baaad44343cc945e76c2e30927b3). I don't hide that this was an inspiration for creating this post.

In the next post, I'll try to use MySQL in a CRUD application written using Node.js and Express.
