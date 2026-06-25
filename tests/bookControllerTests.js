const should = require('should');
const sinon = require('sinon');
const booksController = require('../controllers/booksController');
const Book = require('../models/bookModel');

describe('Book Controller POST tests', () => {
  let req, res, next;

    beforeEach(() => {
    req = { body: {} };
    res = {
      status: sinon.stub().returnsThis(),
      json: sinon.stub()
    };
    next = sinon.stub();
  });

  afterEach(() => {
    sinon.restore(); 
  });

  it('should not allow an empty title on post', async () => {
    req.body = { title: "someTitle" };
    const saveStub = sinon.stub(Book.prototype, "save").resolves();

    await booksController.post(req, res, next);    

    saveStub.calledOnce.should.be.true();
    res.status.calledWith(201).should.be.true();
    res.json.calledOnce.should.be.true();
    next.notCalled.should.be.true();

    const returnedBook = res.json.firstCall.args[0];
    returnedBook.should.have.property("title", "someTitle");
  });

  it('should return status 400 if the title parameter is missing', async () => {
    req.body = {};

    const saveStub = sinon.stub(Book.prototype, "save").resolves();

    await booksController.post(req, res, next);

    saveStub.notCalled.should.be.true();
    res.status.calledWith(400).should.be.true();
    res.json.firstCall.args[0].should.have.property('error', 'title required');
    next.notCalled.should.be.true();
  });
});