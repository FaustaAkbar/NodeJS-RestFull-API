import supertest from "supertest";
import { web } from "../src/application/web";
import { prismaClient } from "../src/application/database";
import { logger } from "../src/application/logging";

describe('POST /api/users', function(){

    afterEach(async ()=>{
        await prismaClient.user.deleteMany({
            where:{
                username: "fausta"
            }
        })
    })

    it('should can register new user', async ()=>{
        const result = supertest(web).post('/api/users').send({
            username : "fausta",
            password : "rahasia",
            name : "fausta akbar"
        });

        expect((await result).status).toBe(200);
        expect((await result).body.data.username).toBe("fausta");
        expect((await result).body.data.name).toBe("fausta akbar");
        expect((await result).body.data.password).toBeUndefined();
    });

    it('should reject if request is invalid', async ()=>{
        const result = supertest(web).post('/api/users').send({
            username : "",
            password : "",
            name : ""
        });
        logger.info((await result).body);
        expect((await result).status).toBe(400);
        expect((await result).body.errors).toBeDefined();
        
    });

    it('should reject if username already registered', async ()=>{
        let result = supertest(web).post('/api/users').send({
            username : "fausta",
            password : "rahasia",
            name : "fausta akbar"
        });

        logger.info((await result).body);
        expect((await result).status).toBe(200);
        expect((await result).body.data.username).toBe("fausta");
        expect((await result).body.data.name).toBe("fausta akbar");
        expect((await result).body.data.password).toBeUndefined();

        result = supertest(web).post('/api/users').send({
            username : "fausta",
            password : "rahasia",
            name : "fausta akbar"
        });

        logger.info((await result).body);
        expect((await result).status).toBe(400);
        expect((await result).body.errors).toBeDefined();
    });
})