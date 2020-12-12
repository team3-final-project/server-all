const request = require("supertest");
const app = require("../app");
const { sequelize } = require("../models/index");
const { queryInterface } = sequelize;

// Lifecycle
afterAll((done) => {
  queryInterface
    .bulkDelete("MedicalRecords")
    .then((result) => {
      done();
    })
    .catch((err) => {
      done(err);
    });
});

// Butuh Access Token => Generate di beforeAll
let access_token = "";
beforeAll(async (done) => {
  request(app)
    .post("/doctor")
    .send({
      name: "Doctor 1",
      password: "1234",
    })
    .then((res) => {
      access_token = res.body.access_token; // Save the access_token!
      done();
    })
    .catch((err) => {
      console.log(err);
      done(err);
    });
});

let id = "";

// CREATE
describe("Test Endpoint POST /medical-record", () => {
  // SUCCESS
  it("Test Create Medical Record - Success", (done) => {
    request(app)
      .post("/medical-record")
      .set("access_token", access_token)
      .send({
        date: "2020-12-25",
        diagnose: "Demam",
        medicine_name: "Paracetamol",
        dosis: 3,
        jumlah_obat: 10,
        PatientId: 1,
      })
      .then((res) => {
        const { body, status } = res;
        id = res.body.id;
        expect(status).toBe(201);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("diagnose", "Demam");
        expect(body).toHaveProperty("medicine_name", "Paracetamol");
        expect(body).toHaveProperty("dosis", expect.any(Number));
        expect(body).toHaveProperty("jumlah_obat", expect.any(Number));
        expect(body).toHaveProperty("PatientId", expect.any(Number));
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });

  // FAILED
  it("Test Create Medical Record - Access Token Not Being Sent", (done) => {
    request(app)
      .post("/medical-record")
      .send({
        date: "2020-12-25",
        diagnose: "Demam",
        medicine_name: "Paracetamol",
        dosis: 3,
        jumlah_obat: 10,
        PatientId: 1,
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
      .post("/medical-record")
      .set("access_token", access_token)
      .send({
        date: "",
        diagnose: "",
        medicine_name: "",
        dosis: "",
        jumlah_obat: "",
        PatientId: 1,
      })
      .then((res) => {
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty(
          "msg",
          "Date is required!, Wrong date format YYYY-MM-DD!, Date cannot be before today's date!, Diagnose is required!, Medicine name is required!, Dosis is required and must be an integer!, Amount of meds is required and must be an integer!"
        );
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });

  it("Test Create Medical Record - Dosis Negative (Dosis < 0)", (done) => {
    request(app)
      .post("/medical-record")
      .set("access_token", access_token)
      .send({
        date: "2020-12-25",
        diagnose: "Demam",
        medicine_name: "Paracetamol",
        dosis: -3,
        jumlah_obat: 10,
        PatientId: 1,
      })
      .then((res) => {
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty(
          "msg",
          "Dosis must be greater than or equal 0!"
        );
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });

  it("Test Create Medical Record - Jumlah obat negative (Jumlah obat < 0)", (done) => {
    request(app)
      .post("/medical-record")
      .set("access_token", access_token)
      .send({
        date: "2020-12-25",
        diagnose: "Demam",
        medicine_name: "Paracetamol",
        dosis: 3,
        jumlah_obat: -10,
        PatientId: 1,
      })
      .then((res) => {
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty(
          "msg",
          "Amount of meds must be greater than or equal 0!"
        );
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });

  it("Test Create Medical Record - Wrong Data Type", (done) => {
    request(app)
      .post("/medical-record")
      .set("access_token", access_token)
      .send({
        date: "2020-12-25",
        diagnose: "Demam",
        medicine_name: "Paracetamol",
        dosis: "tiga",
        jumlah_obat: "sepuluh",
        PatientId: 1,
      })
      .then((res) => {
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty(
          "msg",
          "Dosis is required and must be an integer!, Amount of meds is required and must be an integer!"
        );
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
});

// GET
describe("Test Endpoint GET /medical-record", () => {
  // SUCCESS
  it("Test Get Medical Record - Success", (done) => {
    request(app)
      .get("/medical-record")
      .set("access_token", access_token)
      .then((res) => {
        const { body, status } = res;
        expect(status).toBe(200);
        expect(body).toEqual(expect.any(Array));
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });

  // FAILED
  it("Test Get Medical Record - Not SEND Acces Token", (done) => {
    request(app)
      .get("/medical-record")
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

  // it("Test Get Medical Record - ID Not Found", (done) => {
  //   request(app)
  //     .get("/medical-record")
  //     .set("access_token", access_token)
  //     .then((res) => {
  //       const { body, status } = res;
  //       expect(status).toBe(404);
  //       expect(body).toHaveProperty("msg", "Error not found!");
  //       done();
  //     })
  //     .catch((err) => {
  //       console.log(err);
  //       done(err);
  //     });
  // });
});

// UPDATE
describe("Test Endpoint PUT /medical-record/:id", () => {
  // SUCCESS
  it("Test Update Medical Record - Success", (done) => {
    request(app)
      .put(`/medical-record/${id}`)
      .set("access_token", access_token)
      .send({
        date: "2020-12-25",
        diagnose: "Demam Tinggi",
        medicine_name: "Paracetamol",
        dosis: 3,
        jumlah_obat: 10,
      })
      .then((res) => {
        const { body, status } = res;
        expect(status).toBe(200);
        expect(body).toHaveProperty("id", expect.any(Number));
        expect(body).toHaveProperty("diagnose", "Demam Tinggi");
        expect(body).toHaveProperty("medicine_name", "Paracetamol");
        expect(body).toHaveProperty("dosis", expect.any(Number));
        expect(body).toHaveProperty("jumlah_obat", expect.any(Number));
        expect(body).toHaveProperty("PatientId", expect.any(Number));
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });

  // FAILED
  it("Test Update Medical Record - Access Token Not Being Sent", (done) => {
    request(app)
      .put(`/medical-record/${id}`)
      .send({
        date: "2020-12-25",
        diagnose: "Demam Tinggi",
        medicine_name: "Paracetamol",
        dosis: 3,
        jumlah_obat: 10,
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

  it("Test Update Medical Record - Empty Required Fields", (done) => {
    request(app)
      .put(`/medical-record/${id}`)
      .set("access_token", access_token)
      .send({
        date: "",
        diagnose: "",
        medicine_name: "",
        dosis: "",
        jumlah_obat: "",
      })
      .then((res) => {
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty(
          "msg",
          "Date is required!, Wrong date format YYYY-MM-DD!, Date cannot be before today's date!, Diagnose is required!, Medicine name is required!, Dosis is required and must be an integer!, Amount of meds is required and must be an integer!"
        );
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });

  it("Test Update Medical Record - Wrong Data Type", (done) => {
    request(app)
      .put(`/medical-record/${id}`)
      .set("access_token", access_token)
      .send({
        date: "2020-12-25",
        diagnose: "Demam Berdarah",
        medicine_name: "Paracetamol",
        dosis: "tiga",
        jumlah_obat: "sepuluh",
      })
      .then((res) => {
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty(
          "msg",
          "Dosis is required and must be an integer!, Amount of meds is required and must be an integer!"
        );
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });

  it("Test Update Medical Record - Negative Dosis and Jumlah Obat", (done) => {
    request(app)
      .put(`/medical-record/${id}`)
      .set("access_token", access_token)
      .send({
        date: "2020-12-25",
        diagnose: "Demam Berdarah",
        medicine_name: "Paracetamol",
        dosis: -3,
        jumlah_obat: -10,
      })
      .then((res) => {
        const { body, status } = res;
        expect(status).toBe(400);
        expect(body).toHaveProperty(
          "msg",
          "Dosis must be greater than or equal 0!, Amount of meds must be greater than or equal 0!"
        );
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });

  it("Test Update Medical Record - ID Not Found", (done) => {
    request(app)
      .put(`/medical-record/1000`)
      .set("access_token", access_token)
      .send({
        date: "2020-12-25",
        diagnose: "Demam Tinggi",
        medicine_name: "Paracetamol",
        dosis: 3,
        jumlah_obat: 10,
      })
      .then((res) => {
        const { body, status } = res;
        expect(status).toBe(404);
        expect(body).toHaveProperty("msg", "Error not found!");
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
});

// DELETE
describe("Test Endpoint DELETE /medical-record/:id", () => {
  // SUCCESS
  it("Test Delete Medical Record - Success", (done) => {
    request(app)
      .delete(`/medical-record/${id}`) // ID -> Lihat DB
      .set("access_token", access_token)
      .then((res) => {
        const { body, status } = res;
        expect(status).toBe(200);
        expect(body).toHaveProperty(
          "msg",
          "Successfully delete a medical record!"
        );
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });

  // FAILED
  it("Test Delete Medical Record - Access Token Not Being Sent", (done) => {
    request(app)
      .delete(`/medical-record/${id}`) // ID -> Lihat DB
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

  it("Test Delete Medical Record - Not Found", (done) => {
    request(app)
      .delete(`/medical-record/1000`)
      .set("access_token", access_token)
      .then((res) => {
        const { body, status } = res;
        expect(status).toBe(404);
        expect(body).toHaveProperty("msg", "Error not found!");
        done();
      })
      .catch((err) => {
        console.log(err);
        done(err);
      });
  });
});
