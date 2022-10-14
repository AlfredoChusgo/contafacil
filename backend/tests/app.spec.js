const request = require('supertest');

const app = require('../app');

describe('Get /user', ()=>{
    test('should return 200 code when requesting /user',async ()=>{
        const response = await request(app).get("/user").send();
        console.log(response.body);
    });
});

describe('Get /product', ()=>{
    test('should return 200 code when requesting /product',async ()=>{
        const response = await request(app).get("/product").send();
        console.log(response.body);
    });
});

describe('Get /company', ()=>{
    test('should return 200 code when requesting /company',async ()=>{
        const response = await request(app).get("/company").send();
        console.log(response.body);
    });
});

describe('Get /accountingRecord', ()=>{
    test('should return 200 code when requesting /accountingRecord',async ()=>{
        const response = await request(app).get("/accountingRecord").send();
        console.log(response.body);
    });
});