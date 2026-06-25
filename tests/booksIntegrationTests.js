require("should");

const request = require("supertest");
const mongoose = require("mongoose");

process.env.NODE_ENV = "test";

const app = require("../app");
const Book = require("../models/bookModel");
const agent = request.agent(app);

describe("Book CRUD Test", () => {
  afterEach(async () => {
    await Book.deleteMany({});
  });

  it("should allow a book to be posted and return read and _id", async () => {
    const bookPost = {
      title: "someTitle",
      author: "someAuthor",
      genre: "someGenre",
    };
    const results = await agent
        .post('/api/books')
        .send(bookPost)
        .expect(201);
    
    results.body.should.have.property('read', false);
    results.body.should.have.property('_id');
    results.body.should.have.property('title', 'someTitle');
    results.body.should.have.property('author', 'someAuthor');
    results.body.should.have.property('genre', 'someGenre');
  });

  after( async () => {
    mongoose.connection.close();
    app.server.close();
  });
});
