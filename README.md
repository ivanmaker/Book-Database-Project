# Express Mongo Book API

A REST-style book API built with Node.js, Express, MongoDB, and Mongoose. The project includes CRUD routes, controller/model separation, query filtering, generated response links, and automated tests with Mocha, Should, Sinon, and Supertest.

## Project Status

This project was built as part of my JavaScript bootcamp work and is being prepared as a standalone backend/API portfolio project.

## Tech Stack

- Node.js
- Express
- MongoDB
- Mongoose
- Body Parser
- Nodemon
- Mocha
- Should
- Sinon
- Supertest
- ESLint

## Features

- Create new books
- Read all books
- Read one book by ID
- Update books with PUT
- Partially update books with PATCH
- Delete books
- Query/filter books by title, author, genre, and read status
- Mongoose model with default `read: false`
- Controller and router separation
- HATEOAS-style links in API responses
- Unit and integration tests

## API Routes

Base route:

```txt
/api
```

| Method | Route | Description |
| --- | --- | --- |
| GET | `/api/books` | Get all books |
| GET | `/api/books?genre=<genre>` | Filter books by genre |
| GET | `/api/books?title=<title>` | Filter books by title |
| GET | `/api/books?author=<author>` | Filter books by author |
| GET | `/api/books?read=<true-or-false>` | Filter books by read status |
| POST | `/api/books` | Create a new book |
| GET | `/api/books/:bookId` | Get one book by ID |
| PUT | `/api/books/:bookId` | Replace/update a book |
| PATCH | `/api/books/:bookId` | Partially update a book |
| DELETE | `/api/books/:bookId` | Delete a book |

## Example Book Object

```json
{
  "title": "Example Title",
  "author": "Example Author",
  "genre": "Fantasy",
  "read": false
}
```

## What I Learned

This project helped me understand how backend applications are organized beyond a single Express file. I practiced separating routes, controllers, and models, using middleware to load a resource by ID, validating required request data, returning proper status codes, and testing API behavior.

The testing portion was especially useful because it forced me to think about the controller behavior in isolation, then verify the full route/database flow with integration tests.

## Future Improvements

- Move the MongoDB connection string into environment variables
- Add stronger error-handling middleware
- Add API documentation examples with sample responses
- Add request validation for all editable fields

## Notes

This project is a good backend companion to my frontend/full-stack work because it shows Express routing, MongoDB persistence, API design, and testing rather than only UI implementation.
