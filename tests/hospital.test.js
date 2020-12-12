const request = require('supertest');
const app = require('../app');

let access_token;

beforeAll((done) => {
  request(app)
    .post("/hospital/login")
    .send({ name: 'Hospital 1', password: '1234' })
    .then(res => {
      access_token = res.body.access_token;
      done();
    })
})

describe("test Endpoint Hospital Login", () => {
  it("test Login Success", (done) => {
    request(app)
      .post("/hospital/login")
      .send({ name: 'Hospital 1', password: '1234' })
      .then(response => {
        const { body, status } = response;

        expect(status).toEqual(200);
        expect(body).toEqual(expect.any(Object));
        done();
      })
      .catch(err => {
        done(err);
      })
  })

  it("test login failed (wrong Password)", (done) => {
    request(app)
      .post("/hospital/login")
      .send({ name: 'Hospital 1', password: '12345' })
      .then(response => {
        const { body, status } = response;

        expect(status).toEqual(401);
        expect(body).toEqual(expect.any(Object));
        done();
      })
      .catch(err => {
        done(err);
      })
  })

  it("test login failed (data not found)", (done) => {
    request(app)
      .post("/hospital/login")
      .send({ name: 'Hospital', password: '1234' })
      .then(response => {
        const { body, status } = response;

        expect(status).toEqual(401);
        expect(body).toEqual(expect.any(Object));
        done();
      })
      .catch(err => {
        done(err);
      })
  })
})

describe("test EndPoint Hospital Profile", () => {
  it("test endpoint get profile", (done) => {
    request(app)
      .get('/hospital')
      .set('access_token', access_token)
      .then(response => {
        const { body, status } = response;

        expect(status).toEqual(200);
        expect(body).toEqual(expect.any(Object));
        done();
      })
      .catch(err => done(err))
  })

  it("test endpoint get profile failed (not authorized)", (done) => {
    request(app)
      .get('/hospital')
      // .set('access_token', access_token)
      .then(response => {
        const { body, status } = response;

        expect(status).toEqual(401);
        expect(body).toEqual(expect.any(Object));
        done();
      })
      .catch(err => done(err))
  })
})