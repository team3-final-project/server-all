const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models');
const { hashPassword } = require('../helpers/bcrypt');
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

    queryInterface.bulkInsert('Hospitals', [data])
        .then(result => {
            request(app)
            .post('/hospital/login')
            .send({
                name: "Hospital 1",
                password: '1234'
            })
        .then(res => {
            access_token = res.body.access_token
            done()
        })
        .catch(err => {
            console.log(err)
            done(err)
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
            const attribute = body.result

            expect(status).toEqual(201)
            expect(attribute).toHaveProperty("id", expect.any(Number))
            expect(attribute).toHaveProperty("PatientId", expect.any(Number));
            expect(attribute).toHaveProperty("HospitalId", expect.any(Number));
            done()
        })
        .catch(err => {
            console.log(err)
            done(err)
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
            expect(body).toEqual('Authentication failed!')
            done()
        })
        .catch(err => {
            console.log(err)
            done(err)
        })
    })
    
    it('Test attribute type_test empty', (done) => {
        request(app)
        .post('/hospital-record')
        .send({
            type_test: '',
            file: 'acfasfad',
            date: new Date(),
            PatientId: 1,
            HospitalId: 1
        })
        .set('access_token', access_token)
        .then(response => {
            const { body, status } = response
            console.log(body)

            expect(status).toEqual(400)
            expect(body).toEqual('Type test is required!')
            done()
        })
        .catch(err => {
            console.log(err)
            done(err)
        })
    })
    
    it('Test attribute file empty', (done) => {
        request(app)
        .post('/hospital-record')
        .send({
            type_test: 'dadaf',
            file: '',
            date: new Date(),
            PatientId: 1,
            HospitalId: 1
        })
        .set('access_token', access_token)
        .then(response => {
            const { body, status } = response

            expect(status).toEqual(400)
            expect(body).toEqual('File is required!')
            done()
        })
    })
    
})

describe('Test endpoint delete hospital record', () => {
    it('Test delete successfully', (done) => {
        request(app)
        .delete('/hospital-record/1')
        .set('access_token', access_token)
        .then(response => {
            const { body, status } = response

            expect(status).toEqual(200)
            done()
        })
        .catch(err => {
            console.log(err)
            done(err)
        })
    })

    it('Test delete failed with no headers', (done) => {
        request(app)
        .delete('/hospital-record/1')
        .then(response => {
            const { body, status } = response

            expect(status).toEqual(401)
            expect(body).toHaveProperty("msg", expect.any(String));
            done()
        })
        .catch(err => {
            console.log(err)
            done(err)
        })
    })
})
