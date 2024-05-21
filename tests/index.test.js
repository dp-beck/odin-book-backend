const router = require("../routes/index");

const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", router);

test("users route calls controller function", done => {
  request(app)
    .get('/users')
    .expect("Content-Type", "text/html; charset=utf-8")
    .expect("NOT IMPLEMENTED: USER LIST")
    .expect(200, done);
});

test("route for individual detail calls controller function", done => {
  request(app)
    .get('/users/123')
    .expect("Content-Type", "text/html; charset=utf-8")
    .expect("NOT IMPLEMENTED: User Details: 123")
    .expect(200, done);
});

/*
test("route for user signup calls controller function", done => {
  request(app)
    .post('/users/signup')
    .type("form")
    .send("signup")
    .expect("Content-Type", "text/html; charset=utf-8")
    .expect("NOT IMPLEMENTED: User Signup")
    .expect(200, done);
});
*/