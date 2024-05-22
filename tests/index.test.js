const router = require("../routes/index");

const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", router);

// USER ROUTES TESTS //
test("users route returns 200 response code ", done => {
  request(app)
    .get('/users')
    .expect(200, done);
});

test("route for individual detail returns 200 response code", done => {
  request(app)
    .get('/users/123')
    .expect(200, done);
});

test("route for user signup returns 200 response code", done => {
  request(app)
    .post('/users/signup')
    .expect(200, done);
});

test("route for user delete returns 200 response code", done => {
  request(app)
    .delete('/users/delete')
    .expect(200, done);
});

test("route for user update returns 200 response code", done => {
  request(app)
    .post('/users/123/update')
    .expect(200, done);
});

test("route for user friend request returns 200 response code", done => {
  request(app)
    .post('/users/123/request_friend')
    .expect(200, done);
});

test("route for user friend request returns 200 response code", done => {
  request(app)
    .post('/users/123/accept_friend_request')
    .expect(200, done);
});

test("route for user login returns 200 response code", done => {
  request(app)
    .post('/users/123/login')
    .expect(200, done);
});