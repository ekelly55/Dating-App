'use server'

import { ActionResult } from "@/src/types";
import { prisma } from "../lib/prisma";
import { RegisterSchema, registerSchema } from "../lib/schemas/registerSchema"
import bcrypt from 'bcryptjs'
import { User } from "@prisma/client";

//call these functionns from the client component, but executed on server side, not sent to browser as js then exectued in blrowser

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