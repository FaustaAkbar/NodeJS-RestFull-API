import { request } from "express";
import { prismaClient } from "../application/database.js";
import { ResponseError } from "../error/response-error.js";
import { loginUserValidation, registerUserValidation } from "../validation/user-validation.js"
import { validate } from "../validation/validation.js"
import bcrypt from "bcrypt";

const register = async (request) =>{
   const user = validate(registerUserValidation,request);

   const countUser = await prismaClient.user.count({
    where: {
        username: user.username
    }
   });

   if(countUser ===1){
    throw new ResponseError(400,"Username already exixts");
   }
   
   user.password = await bcrypt.hash(user.password,10);
   return await prismaClient.user.create({
    data : user,
    select:{
        username : true,
        name : true
    }
   })
   
}

const login = async (request) =>{
    const loginRequest = validate(loginUserValidation,request);

    const user = await prismaClient.user.findUnique({
        where:{
            username: loginRequest.username
        },
        select:{
            username: true,
            password: true
        }
    });
    if(!user){
        throw new ResponseError(401, "Username or password wrong");
    }
}


export default {register};