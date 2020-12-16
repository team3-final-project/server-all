const { response } = require("express");
const request = require("supertest");
const app = require("../app");
const { hashPassword } = require("../helpers/bcrypt");
const { signToken } = require("../helpers/jwt");
const { Doctor } = require("../models/index");

let access_token = "";

beforeAll((done) => {

    let doctor = {
        name: `Doctor 5`,
        password: hashPassword(`1234jl`),
        specialist: `Dokter kandungan`
    }

    Doctor.create(doctor)
        .then(result => {
            let { id, name, password, specialist } = result
            access_token = signToken({ id, name, password, specialist })
            done()
        })
})

describe(`Doctor routes`, () => {
  let doctorLogin = {
    name: `Doctor 1`,
    password: `1234`,
  };

  describe(`POST/login`, () => {
    let loginEmpty = {
      name: ``,
      password: ``,
    };

    test("200:OK, return json with login doctor's data", (done) => {
      request(app)
        .post("/doctor")
        .send(doctorLogin)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(200);
          expect(body).toHaveProperty(
            `access_token`,
            expect.stringMatching(/[aiueo]/g)
          );
          done();
        })
        .catch((err) => done(err));
    });

    test("401: other error (invalid email or password), return json with error", (done) => {
      request(app)
        .post("/doctor")
        .send(loginEmpty)
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(401);
          expect(body.msg).toEqual(`Invalid name or password!`);
          done();
        })
        .catch((err) => done(err));
    });

    test("401: wrong input name (invalid email or password), return json with error", (done) => {
      request(app)
        .post("/doctor")
        .send({ name: "Doctors 1", password: "1234" })
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(401);
          expect(body.msg).toEqual(
            expect.stringMatching("Invalid name or password!")
          );
          done();
        })
        .catch((err) => done(err));
    });

    test("401: wrong input name (invalid email or password), return json with error", (done) => {
      request(app)
        .post("/doctor")
        .send({ name: "Doctor 1", password: "2345" })
        .then((response) => {
          const { body, status } = response;
          expect(status).toBe(401);
          expect(body.msg).toEqual(
            expect.stringMatching("Invalid name or password!")
          );
          done();
        })
        .catch((err) => done(err));
    });

    describe(`GET / doctor`, () => {
      test("401: failed to pass auth, return json with error", (done) => {
        request(app)
          .get("/doctor/detail")
          .set("access_token", ``)
          .then((result) => {
            const { status, body } = result;
            expect(status).toBe(401);
            expect(body.msg).toEqual(
              expect.stringContaining(`Authentication failed!`)
            );
            done();
          })
          .catch((err) => done(err));
      });

      test("200:OK, return json with all products data", (done) => {
        request(app)
          .get("/doctor/detail")
          .set(`access_token`, access_token)
          .then((result) => {
            const { status, body } = result;
            expect(status).toBe(200);
            expect(body).toEqual(expect.any(Object));
            done();
          })
          .catch((err) => done(err));
      });
    });

    describe(`GET / doctor / patients`, () => {
      test("401: failed to pass auth, return json with error", (done) => {
        request(app)
          .get("/doctor/patients")
          .set("access_token", ``)
          .then((result) => {
            const { status, body } = result;
            expect(status).toBe(401);
            expect(body.msg).toEqual(
              expect.stringContaining(`Authentication failed!`)
            );
            done();
          })
          .catch((err) => done(err));
      });

      test("200:OK, return json with all products data", (done) => {
        request(app)
          .get("/doctor/patients")
          .set(`access_token`, access_token)
          .then((result) => {
            const { status, body } = result;
            expect(status).toBe(200);
            expect(body).toEqual(expect.any(Array));
            done();
          })
          .catch((err) => done(err));
      });
    });

    // CREATE
    describe("Test Endpoint POST /doctor/patient", () => {
      // SUCCESS
      it("Test Create Patient - Success", (done) => {
        request(app)
          .post("/doctor/patient")
          .set("access_token", access_token)
          .send({
            nik: "552699875",
            name: "Bobby Septianto",
            email: "bobby@mail.com",
            birth_date: "1997-08-09",
            address: "Jl. Gang Gagak, Bekasi Timur",
          })
          .then((res) => {
            const { body, status } = res;
            id = res.body.id;
            expect(status).toBe(201);
            expect(body).toHaveProperty("id", expect.any(Number));
            expect(body).toHaveProperty("nik", "552699875");
            expect(body).toHaveProperty("name", "Bobby Septianto");
            expect(body).toHaveProperty("email", "bobby@mail.com");
            expect(body).toHaveProperty("birth_date", "1997-08-09");
            expect(body).toHaveProperty(
              "address",
              "Jl. Gang Gagak, Bekasi Timur"
            );
            done();
          })
          .catch((err) => {
            console.log(err);
            done(err);
          });
      });

      // FAILED
      it("Test Create Patient - Access Token Not Being Sent", (done) => {
        request(app)
          .post("/doctor/patient")
          .send({
            nik: "552699875",
            name: "Bobby Septianto",
            email: "bobby@mail.com",
            birth_date: "1997-08-09",
            address: "Jl. Gang Gagak, Bekasi Timur",
          })
          .then((res) => {
            const { body, status } = res;
            expect(status).toBe(401);
            expect(body).toHaveProperty("msg", "Authentication failed!");
            done();
          })
          .catch((err) => {
            console.log(err);
            done(err);
          });
      });

      it("Test Create Medical Record - Empty Required Fields", (done) => {
        request(app)
          .post("/doctor/patient")
          .set("access_token", access_token)
          .send({
            nik: "",
            name: "",
            email: "",
            birth_date: "",
            address: "",
          })
          .then((res) => {
            const { body, status } = res;
            expect(status).toBe(400);
            expect(body).toHaveProperty(
              "msg",
              "nik should not be empty, name should not be empty, email should not be empty, Birth date is required!, Wrong date format YYYY-MM-DD!, address should not be empty"
            );
            done();
          })
          .catch((err) => {
            console.log(err);
            done(err);
          });
      });
      
    });
  });
});
