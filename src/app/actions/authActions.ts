'use server'

import { ActionResult } from "@/src/types";
import { prisma } from "../lib/prisma";
import { RegisterSchema, registerSchema } from "../lib/schemas/registerSchema"
import bcrypt from 'bcryptjs'
import { User } from "@prisma/client";
import { LoginSchema } from "../lib/schemas/loginSchema";
import { AuthError } from "next-auth";
import { signIn } from "@/auth";

//call these functionns from the client component, but executed on server side, not sent to browser as js then exectued in blrowser

export async function signInUser(data: LoginSchema): Promise<ActionResult<string>>{
    try {
        const result = await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect: false
        });
        console.log(result);

        return {status: 'success', data: "Logged in"}
    } catch (error) {
        console.log(error);
        if(error instanceof AuthError){
            switch (error.type) {
                case 'CredentialsSignin':
                    return {status: 'error', error: 'Invalid credentials'}
                default:
                    return {status: 'error', error: 'Something went wrong'}
            }

        }else{
            return {status: 'error', error: 'Something else went wrong'}
        }
    }
}
//we're not gonna get detailed errors on the client side, but if we look in the terminal we should get more detail. the error details are for developers, not users


export async function registerUser(data: RegisterSchema): Promise<ActionResult<User>>{
    try {
        const validated = registerSchema.safeParse(data);

    if(!validated.success){
        //errors here is an array of zod errors, as opposed to errors that are strings as below
        return {status: 'error', error: validated.error.errors}
    }

    const {name, email, password} = validated.data;

    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await prisma.user.findUnique({
        where: {email}
    })

    if(existingUser){

        // console.log({error: "User already exists."})    
        return {status: 'error', error: "User already exists."}
    }


    //don't need to use await here, b/c it's the return statement for an already async function. if we declared a var, then returned the var, it would have to use await
    const user = await prisma.user.create({
        data: {
            name,
            email,
            passwordHash: hashedPassword
        }
    })

    return {status: 'success', data: user}

    } catch (error) {
        console.log(error)
        return {status: 'error', error: 'Something went wrong'}
    }
    
}

export async function getUserByEmail(email: string){
    return prisma.user.findUnique({where: {email}});
}
export async function getUserById(id: string){
    return prisma.user.findUnique({where: {id}});
}