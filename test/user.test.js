import supertest from "supertest";
import { web } from "../src/application/web";
import { logger } from "../src/application/logging";
import { createTestUser, getTestUser, removeTestUser } from "./test-util";
import bcrypt from "bcrypt";


describe('POST /api/users', function(){

    afterEach(async ()=>{
        await removeTestUser();
    })

    it('should can register new user', async ()=>{
        const result = await supertest(web).post('/api/users').send({
            username : "test",
            password : "rahasia",
            name : "test"
        });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");
        expect(result.body.data.password).toBeUndefined();
    });

    it('should reject if request is invalid', async ()=>{
        const result = await supertest(web).post('/api/users').send({
            username : "",
            password : "",
            name : ""
        });
        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
        
    });

    it('should reject if username already registered', async ()=>{
        let result = await supertest(web).post('/api/users').send({
            username : "test",
            password : "rahasia",
            name : "test"
        });

        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");
        expect(result.body.data.password).toBeUndefined();

        result = await supertest(web).post('/api/users').send({
            username : "test",
            password : "rahasia",
            name : "test"
        });

        logger.info( result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });
});

describe('POST /api/users/login', function (){
    beforeEach(async ()=>{
        await createTestUser();
    });
    afterEach(async ()=>{
        await removeTestUser();
    });

    it(`should can login`, async ()=>{
        const result = await supertest(web).post('/api/users/login').send({
            username: "test",
            password: "rahasia"
        });

        logger.info(result.body);
        expect(result.status).toBe(200);
        expect(result.body.data.token).toBeDefined();
        expect(result.body.data.token).not.toBe("test");
    });

    it(`should reject login if invalid request`, async ()=>{
        const result = await supertest(web).post('/api/users/login').send({
            username: "",
            password: ""
        });

        logger.info(result.body);
        expect(result.status).toBe(400);
        expect(result.body.errors).toBeDefined();
    });

    it(`should reject login if password wrong`, async ()=>{
        const result = await supertest(web).post('/api/users/login').send({
            username: "test",
            password: "salah"
        });

        logger.info(result.body);
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });

    it(`should reject login if username wrong`, async ()=>{
        const result = await supertest(web).post('/api/users/login').send({
            username: "salah",
            password: "rahasia"
        });

        logger.info(result.body);
        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();
    });
});

describe('GET /api/users/current',function (){
    beforeEach(async ()=>{
        await createTestUser();
    });
    afterEach(async ()=>{
        await removeTestUser();
    });

    it('should can get current user', async ()=>{
        const result = await supertest(web).get('/api/users/current').set('Authorization', 'test');

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe('test');
        expect(result.body.data.name).toBe('test');
    });

    it('should reject is token invalid', async ()=>{
        const result = await supertest(web).get('/api/users/current').set('Authorization', 'salah');

        expect(result.status).toBe(401);
        expect(result.body.errors).toBeDefined();

    });
});

describe('PATCH /api/users/current', function (){
    beforeEach(async ()=>{
        await createTestUser();
    });
    afterEach(async ()=>{
        await removeTestUser();
    });

    it('should can update user', async ()=>{
        const result = await supertest(web).patch('/api/users/current').set('Authorization', 'test').send({
            name: "Fausta",
            password: "hayooo"
        });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("Fausta");

        const user = await getTestUser();
        expect(await bcrypt.compare("hayooo",user.password)).toBe(true);
    });

    it('should can update username', async ()=>{
        const result = await supertest(web).patch('/api/users/current').set('Authorization', 'test').send({
            name: "Fausta",
        });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("Fausta");
    });

    it('should can update password', async ()=>{
        const result = await supertest(web).patch('/api/users/current').set('Authorization', 'test').send({
            password: "hayooo"
        });

        expect(result.status).toBe(200);
        expect(result.body.data.username).toBe("test");
        expect(result.body.data.name).toBe("test");

        const user = await getTestUser();
        expect(await bcrypt.compare("hayooo",user.password)).toBe(true);
    });

    it('should reject if request not valid', async ()=>{
        const result = await supertest(web).patch('/api/users/current').set('Authorization', 'salah').send({});

        expect(result.status).toBe(401);
    });
});