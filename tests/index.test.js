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

// POST ROUTES TESTS //
test("posts route returns 200 response code ", done => {
  request(app)
    .get('/posts')
    .expect(200, done);
});

test("post details route returns 200 response code ", done => {
  request(app)
    .get('/posts/123')
    .expect(200, done);
});

test("route for post creation returns 200 response code", done => {
  request(app)
    .post('/posts/create')
    .expect(200, done);
});

test("route for post update returns 200 response code", done => {
  request(app)
    .post('/posts/123/update')
    .expect(200, done);
});

test("route for post delete returns 200 response code", done => {
  request(app)
    .delete('/posts/123/delete')
    .expect(200, done);
});

// COMMENT ROUTES TESTS //
test("comments route returns 200 response code ", done => {
  request(app)
    .get('/comments')
    .expect(200, done);
});

test("comments details route returns 200 response code ", done => {
  request(app)
    .get('/comments/123')
    .expect(200, done);
});

test("route for comment creation returns 200 response code", done => {
  request(app)
    .post('/comments/create')
    .expect(200, done);
});

test("route for post update returns 200 response code", done => {
  request(app)
    .post('/comments/123/update')
    .expect(200, done);
});

test("route for post delete returns 200 response code", done => {
  request(app)
    .delete('/comments/123/delete')
    .expect(200, done);
});