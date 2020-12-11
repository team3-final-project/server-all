const request = require('supertest');
const { response } = require('../app');
const app = require('../app');

describe("test Endpoint Hospital", () => {
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
        console.log(err);
      })
  })

  it("test login failed", (done) => {
    request(app)
      .post("/hospital/login")
      .send({ name: 'Hospital 1', password: '12345' })
      .then(response => {
        const { body, status } = response;

        expect(status).toEqual(401);
        expect(body).toEqual('Invalid name or password!');
        done();
      })
      .catch(err => {
        console.log(err);
      })
  })

  it.only("test endpoind get profile", (done) => {
    request(app)
      .get('/hospital')
      .then(response => {
        const { body, status } = response;

        expect(status).toEqual(200);
        // expect(body). 
        done();
      })
      .catch(err => console.log(err))
  })
})