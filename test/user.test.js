import supertest from "supertest";
import { web } from "../src/application/web";
import { prismaClient } from "../src/application/database";

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
    })
})