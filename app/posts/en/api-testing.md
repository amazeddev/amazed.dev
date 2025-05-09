---
slug: api-testing
title: API Testing - cURL and REST Client
excerpt: Each API need to be tested during development. This article present easy alternatives for well known Postman.
date: December 17, 2022
tags: [utils, shell]
cover_img: api-testing.jpg
published: true
---

## Applications for API Testing

Everyone probably knows Postman. It's hard to call it just an API testing application now—it's a whole extensive environment that allows for all possible work with APIs: testing, importing/exporting, documentation, automation, etc. There are many articles, tutorials, and YouTube videos about Postman, so I won’t focus on it here. However, I will mention that there is a very interesting and noteworthy open-source alternative for UNIX-based systems, namely the Insomnia project.

I will describe two tools that may not completely replace the aforementioned ones, but in some cases, they can be very useful.

### cURL

_"cURL – a network programming library written in C, operating on the client side, with interfaces for over 30 other languages. It enables sending HTTP requests, including retrieving web pages and files from servers, as well as submitting form data. It facilitates the creation of applications using the HTTP protocol. The cURL library has extensive capabilities, with its primary use being the integration of complex web-based systems."_

Most UNIX-based systems, including macOS, already have this library installed, so generally, there is no need for additional installation.

To use this package, simply enter the package name in the command line, followed by the argument name and its value (there can be multiple arguments, separated by spaces), and the URL to which the request is sent. Basic arguments include:

- X, --request - the type of HTTP method (for GET requests, this parameter can be omitted);
- d, --data - sending data (used in POST requests);
- H, --headers - headers to include in the request;

> For testing, I will use the site https://dummyjson.com/, which provides a simple developer API for testing functionality.

> Various APIs are available that allow all CRUD operations (Create-Read-Update-Delete). Of course, only the responses suggest the success of actions like adding or deleting a record—data in the API itself does not actually change.

A sample request to read Todos, using the endpoint 'https://dummyjson.com/todos?limit=3', looks like this. Since the request uses the GET method, the method type information can be omitted.

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

The limit parameter in the URL tells the API that I only want to receive three records.

To add a Todos record, the request using cURL would look like this:

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

cURL is a very useful tool for testing endpoints, especially when testing needs to be done inside an external server, in a remote environment, or via an automated script. However, when working within a local development environment and testing endpoints under development, using cURL can become cumbersome and slow.

### REST Client for VSCode

A very similar alternative to cURL at first glance is the REST Client extension for VSCode. The main difference is that requests are saved in a file with the .http extension inside the application folder. This allows for documentation-like storage, keeping everything in one place, very close to the code being tested. The extension can be installed from the Visual Studio Code extension panel.

To create a simple GET request, just save the URL in a file with the .http extension, preceded by the HTTP request type. If the extension is correctly installed and the file has the correct extension, a Send Request button will appear above the URL.

```bash:rest-test.http
https://dummyjson.com/todos?limit=3
```

To store multiple requests in the same file, separate them with three hashes (###). If headers need to be included, they are added as additional lines under the URL. The object to be sent as the request body can simply be formatted as a JSON object below.

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

The extension has many other features, such as saving responses, executing GraphQL queries, using different versions of the HTTP protocol, and more. For further details, refer to the GitHub documentation.

### Bonus

REST Client also allows exporting a saved request as a cURL request. Simply right-click on the request in the .http file and select Copy Request as cURL.
