const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models');
const { hashPassword } = require('../helpers/bcrypt');
const { response } = require('express');
const { queryInterface } = sequelize

let access_token = ''

beforeAll((done) => {
    const data = {
        name: "Hospital 1",
        password: hashPassword(`1234`),
        address: "Jl. Tanjung Duren, Jakarta Barat",
        createdAt: new Date(),
        updatedAt: new Date(),
    }

    queryInterface.bulkInsert('HospitalRecords', [data])
        .then(result => {
            request(app)
            .post('/hospital')
            .send({
                name: "Hospital 1",
                password: password
            })
        .then(res => {
            access_token = res.body.access_token
            done()
        })
        .catch(err => {
            console.log(err)
            done()
        })
    })
})


describe('Test endpoint add hospital record', () => {

    it('Test add hospital record success', (done) => {
        request(app)
        .post('/hospital-record')
        .send({
            type_test:'cuci baju',
            file: 'acfasfad',
            date: new Date(),
            PatientId: 1,
            HospitalId: 1
        })
        .set('access_token', access_token)
        .then(response => {
            const { body, status } = response

            expect(status).toEqual(201)
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })

    it('Test add hospital record failed with no header', (done) => {
        request(app)
        .post('/hospital-record')
        .send({
            type_test:'cuci baju',
            file: 'acfasfad',
            date: new Date(),
            PatientId: 1,
            HospitalId: 1
        })
        .then(response => {
            const { body, status } = response

            expect(status).toEqual(401)
            expect(body.msg).toEqual('Authentication Failed')
            done()
        })
    })
    it('Test attribute type_test null', (done) => {
        request(app)
        .post('/hospital-record')
        .send({
            type_test: null,
            file: 'acfasfad',
            date: new Date(),
            PatientId: 1,
            HospitalId: 1
        })
        .set('access_token', access_token)
        .then(response => {
            const { body, status } = response

            expect(status).toEqual(400)
            expect(body.msg).toEqual('type test should not be empty')
            done()
        })
    })

    it('Test attribute file null', (done) => {
        request(app)
        .post('/hospital-record')
        .send({
            type_test: 'dadaf',
            file: null,
            date: new Date(),
            PatientId: 1,
            HospitalId: 1
        })
        .set('access_token', access_token)
        .then(response => {
            const { body, status } = response

            expect(status).toEqual(400)
            expect(body.msg).toEqual('file should not be empty')
            done()
        })
    })
})

describe('Test endpoint delete hospital record', () => {
    it('Test delete successfully', () => {
        request(app)
        .delete('/hospital-record/1')
        .set('access_token', access_token)
        .then(response => {
            const { body, status } = response

            expect(status).toEqual(200)
        })
    })

    it('Test delete failed with no headers', () => {
        request(app)
        .delete('/hospital-record/1')
        .then(response => {
            const { body, status } = response

            expect(status).toEqual(400)
        })
    })
})