const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models');
const { queryInterface } = sequelize

let access_token = '';


beforeAll((done) => {
    const data = {
        nik: "123456789",
        name: "Patient 1",
        email: "patient@mail.com",
        birth_date: "25-09-1996",
        address: "Jl. Tanjung Duren, Jakarta Barat",
        createdAt: new Date(),
        updatedAt: new Date()
    }

    queryInterface.bulkInsert('Patients', [data])
        .then(result => {
            request(app)
            .post('/patient')
            .send({
                nik: '123456789',
                name: 'Patient 1'
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

// MEMULAI TEST SIGNIN
describe('Test endpoint POST login', () => {
    it('Test login success', (done) => {
        request(app)
        .post('/patient')
        .send({
            nik: '123456789',
            name: 'Patient 1'
        })
        .then(response => {
            const { body, status } = response

            expect(status).toEqual(200);
            expect(body).toHaveProperty('access_token', expect.any(String));
            done()
        })
        .catch(err => {
            console.log(err)
        })
    });
    
    it('Wrong nik inserted', (done) => {
        request(app)
        .post('/patient')
        .send({
            nik: '1234567',
            name: 'Patient 1'
        })
        .then(response => {
            const { body, status } = response

            expect(status).toEqual(401)
            expect(body.msg).toEqual('Check again your identification data')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    
    it('Wrong name inserted', (done) => {
        request(app)
        .post('/patient')
        .send({
            nik: '123456789',
            name: 'Pat'
        })
        .then(response => {
            const { body, status } = response

            expect(status).toEqual(401)
            expect(body.msg).toEqual('Check again your identification data')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    
    it('No nik inserted', (done) => {
        request(app)
        .post('/patient')
        .send({
            nik: null,
            name: 'Pat'
        })
        .then(response => {
            const { body, status } = response

            expect(status).toEqual(401)
            expect(body.msg).toEqual('nik should not bet empty')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
    
    it('no name inserted', (done) => {
        request(app)
        .post('/patient')
        .send({
            nik: '123456789',
            name: null
        })
        .then(response => {
            const { body, status } = response

            expect(status).toEqual(401)
            expect(body.msg).toEqual('name should not bet empty')
            done()
        })
        .catch(err => {
            console.log(err)
        })
    })
})


describe('Test endpoint GET patient data', () => {
    it('Test Get Data success', () => {
        request(app)
        .get('/patient')
        .set('access_token', access_token)
        .then(response => {
            const { body, status } = response

            expect(status).toEqual(200);
            expect(body.patientData).toHaveProperty("address", expect.any(String));
            done()
        })
        .catch(err => {
            console.log(err)
        })
    });
    
    it('Test Get Data failed with no headers', (done) => {
        request(app)
        .get('/patient')
        .set('access_token', access_token)
        .then(response => {
            const { body, status } = response

            expect(status).toEqual(401)
            expect(body).toEqual('Authentication failed')
        })
        .catch(err => {
            console.log(err)
        })
    })
})
