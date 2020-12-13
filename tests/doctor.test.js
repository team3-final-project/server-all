const { response } = require("express");
const request = require("supertest");
const { report } = require("../app");
const app = require("../app");
const { signToken } = require("../helpers/jwt");
const { Doctor } = require("../models/index");

let access_token = "";

beforeAll((done) => {

    let doctor = {
        name: `Doctor 5`,
        password: `1234jl`,
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

        // describe(`GET / doctor`, () => {
        //     test("401: failed to pass auth, return json with error", (done) => {
        //         request(app)
        //             .get('/doctor/detail')
        //             .set('access_token', ``)
        //             .then(result => {
        //                 const { status, body } = result
        //                 expect(status).toBe(401)
        //                 expect(body.msg).toEqual(expect.stringContaining(`Authentication failed!`))
        //                 done()
        //             })
        //             .catch(err => done(err))
        //     })

        //     test("200:OK, return json with all products data", (done) => {
        //         request(app)
        //             .get('/doctor/detail')
        //             .set(`access_token`, access_token)
        //             .then(result => {
        //                 const { status, body } = result
        //                 expect(status).toBe(200)
        //                 expect(body).toEqual(expect.any(Array))
        //                 done()
        //             })
        //             .catch(err => done(err))
        //     })
        // })
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
  });
});
