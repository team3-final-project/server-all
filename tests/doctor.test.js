const { response } = require('express')
const request = require('supertest')
const app = require('../app')

describe(`Doctor routes`, () => {

    let doctorLogin = {
        name: `Doctor 1`,
        password: `1234`
    }

    describe(`POST/login`, () => {
        let loginEmpty = {
            name: ``,
            password: ``
        }

        test("200:OK, return json with login doctor's data", (done) => {
            request(app)
                .post('/doctor')
                .send(doctorLogin)
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(200)
                    expect(body).toHaveProperty(`access_token`, expect.stringMatching(/[aiueo]/g))
                    done()
                })
                .catch(err => done(err))
        })

        test("401: other error (invalid email or password), return json with error", (done) => {
            request(app)
                .post('/doctor')
                .send(loginEmpty)
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(401)
                    expect(body.msg).toEqual(`Invalid name or password!`)
                    done()
                })
                .catch(err => done(err))
        })

        test("401: wrong input name (invalid email or password), return json with error", (done) => {
            request(app)
                .post('/doctor')
                .send({ name: 'Doctors 1', password: '1234' })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(401)
                    expect(body.msg).toEqual(expect.stringMatching('Invalid name or password!'))
                    done()
                })
                .catch(err => done(err))
        })

        test("401: wrong input password (invalid email or password), return json with error", (done) => {
            request(app)
                .post('/doctor')
                .send({ name: 'Doctor 1', password: '1234klm' })
                .then(response => {
                    const { body, status } = response
                    expect(status).toBe(401)
                    expect(body.msg).toEqual(expect.stringMatching('Invalid name or password!'))
                    done()
                })
                .catch(err => done(err))
        })
    })

})