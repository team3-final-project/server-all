const request = require('supertest')
const app = require('../app')
const { sequelize } = require('../models/index');
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
            done(err)
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
            done(err)
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
            expect(body).toEqual('Check again your identification data')
            done()
        })
        .catch(err => {
            console.log(err);
            done(err);
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
            expect(body).toEqual('Check again your identification data')
            done()
        })
        .catch(err => {
            console.log(err);
            done(err);
        })
    })
    
    it('No nik and name inserted', (done) => {
        request(app)
        .post('/patient')
        .send({
            nik: '',
            name: ''
        })
        .then(response => {
            const { body, status } = response

            expect(status).toBe(401);
            expect(body).toEqual('Check again your identification data')
            done()
        })
        .catch(err => {
            console.log(err);
            done(err)
        })
    })
})


describe('Test endpoint GET patient data', () => {
    it('Test Get Data success', (done) => {
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
            done(err)
        })
    });
    
    it('Test Get Data failed with no headers', (done) => {
        request(app)
        .get('/patient')
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
})
