'use server'

import { prisma } from "../lib/prisma";
import { RegisterSchema, registerSchema } from "../lib/schemas/registerSchema"
import bcrypt from 'bcryptjs'

//call these functionns from the client component, but executed on server side, not sent to browser as js then exectued in blrowser

export async function registerUser(data: RegisterSchema){
    const validated = registerSchema.safeParse(data);

    if(!validated.success){
        return {error: validated.error.errors}
    }

    const {name, email, password} = validated.data;

    const hashedPassword = await bcrypt.hash(password, 10)

    const existingUser = await prisma.user.findUnique({
        where: {email}
    })

    if(existingUser){

        console.log({error: "User already exists."})    
        // return {error: "User already exists."}
    }


    //don't need to use await here, b/c it's the return statement for an already async function. if we declared a var, then returned the var, it would have to use await
    return prisma.user.create({
        data: {
            name,
            email,
            passwordHash: hashedPassword
        }
    })
}