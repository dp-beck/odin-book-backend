const router = require("../routes/index");

const request = require("supertest");
const express = require("express");
const app = express();

app.use(express.urlencoded({ extended: false }));
app.use("/", router);

test("index route works", done => {
    request(app)
      .get("/")
      .expect("Content-Type", /json/)
      .expect({ name: "frodo" })
      .expect(200, done);
  });