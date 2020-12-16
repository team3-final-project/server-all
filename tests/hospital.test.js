const { response } = require("express");
const request = require("supertest");
const app = require("../app");

let access_token;

beforeAll((done) => {
  request(app)
    .post("/hospital/login")
    .send({ name: "Hospital 1", password: "1234" })
    .then((res) => {
      access_token = res.body.access_token;
      done();
    });
});

describe("test Endpoint Hospital Login", () => {
  it("test Login Success", (done) => {
    request(app)
      .post("/hospital/login")
      .send({ name: "Hospital 1", password: "1234" })
      .then((response) => {
        const { body, status } = response;

        expect(status).toEqual(200);
        expect(body).toEqual(expect.any(Object));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("test login failed (wrong Password)", (done) => {
    request(app)
      .post("/hospital/login")
      .send({ name: "Hospital 1", password: "12345" })
      .then((response) => {
        const { body, status } = response;

        expect(status).toEqual(401);
        expect(body).toEqual(expect.any(Object));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });

  it("test login failed (data not found)", (done) => {
    request(app)
      .post("/hospital/login")
      .send({ name: "Hospital", password: "1234" })
      .then((response) => {
        const { body, status } = response;

        expect(status).toEqual(401);
        expect(body).toEqual(expect.any(Object));
        done();
      })
      .catch((err) => {
        done(err);
      });
  });


  it ("test login failed (empty send data)", (done) => { 
    request(app)
      .post("/hospital/login")
      .send({name : '',  password : ''})
      .then((response) => { 
        const {body, status} = response
        expect(status).toEqual(401)
        expect(body).toEqual(expect.any(Object))
        done()
      })
      .catch((err) => { 
        done(err)
      })
  })

});

describe("test EndPoint Hospital Profile", () => {
  it("test endpoint get profile", (done) => {
    request(app)
      .get("/hospital")
      .set("access_token", access_token)
      .then((response) => {
        const { body, status } = response;

        expect(status).toEqual(200);
        expect(body).toEqual(expect.any(Object));
        done();
      })
      .catch((err) => done(err));
  });

  it("test endpoint get profile failed (not authorized)", (done) => {
    request(app)
      .get("/hospital")
      .set('access_token', ``)
      .then((response) => {
        const { body, status } = response;

        expect(status).toEqual(401);
        expect(body).toHaveProperty("msg", "Authentication failed!");
        done();
      })
      .catch((err) => done(err));
  });
});

describe("test EndPoint Hospital Profile", () => {
  it("test endpoint get patients", (done) => {
    request(app)
      .get("/hospital/patients")
      .set("access_token", access_token)
      .then((response) => {
        const { body, status } = response;

        expect(status).toEqual(200);
        expect(body).toEqual(expect.any(Array));
        done();
      })
      .catch((err) => done(err));
  });

  it("test endpoint get patients failed (not authorized)", (done) => {
    request(app)
      .get("/hospital/patients")
      .then((response) => {
        const { body, status } = response;

        expect(status).toBe(401);
        expect(body).toHaveProperty("msg", "Authentication failed!");
        done();
      })
      .catch((err) => done(err));
  });
});

    // CREATE
    describe("Test Endpoint POST /hospital/add", () => {
      // SUCCESS
      it("Test Create Patient - Success", (done) => {
        request(app)
          .post("/hospital/add")
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
          .post("/hospital/add")
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
          .post("/hospital/add")
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
