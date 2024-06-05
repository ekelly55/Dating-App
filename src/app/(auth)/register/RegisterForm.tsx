'use client'
//useform is a client side hook

import { Button, Card, CardBody, CardHeader, Input } from '@nextui-org/react'
import React from 'react'
import { GiPadlock } from 'react-icons/gi'
import {useForm} from 'react-hook-form'
import { RegisterSchema, registerSchema } from '../../lib/schemas/registerSchema'
import { zodResolver } from '@hookform/resolvers/zod'



export default function RegisterForm() {

    const {register, handleSubmit, formState: {errors, isValid}} = useForm<RegisterSchema>({
        resolver: zodResolver(registerSchema),
        //mode uontouched: as soon as you click into a field it's watching for a valid email.  if you click out of the field, you'll get an invalid email alert
        mode: 'onTouched'
    });

    const onSubmit = (data: RegisterSchema) => {
        console.log(data)
    }

  return (
    <Card className='w-2/5 mx-auto'>
        <CardHeader className='flex flex-col items-center justify-center'>
            <div className='flex flex-col gap-2 items-center text-secondary'>
                <div className='flex flex-row items-center gap-3'>

                <GiPadlock size={30}/>
                <h1>Register</h1>
                </div>
                <p className='text-neutral-500'>Welcome to NextMatch</p>
            </div>
        </CardHeader>
        <CardBody>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='space-y-4'>
                    <Input 
                        defaultValue=''
                        label="Name"
                        variant='bordered'
                        {...register('name')}
                        // the double ! turns an object into effectively a boolean (but why different from !). so this means if there's an error on the email field, then isInvalid is true and the input will tell us what's wrong?
                        isInvalid={!!errors.name}
                        errorMessage={errors.name?.message}
                    />
                    <Input 
                        defaultValue=''
                        label="Email"
                        variant='bordered'
                        {...register('email')}
                        // the double ! turns an object into effectively a boolean (but why different from !). so this means if there's an error on the email field, then isInvalid is true and the input will tell us what's wrong?
                        isInvalid={!!errors.email}
                        errorMessage={errors.email?.message}
                    />
                    <Input 
                        defaultValue=''
                        label="Password"
                        variant='bordered'
                        type='password'
                        {...register('password')}
                        isInvalid={!!errors.password}
                        errorMessage={errors.password?.message}
                    />
                    <Button isDisabled={!isValid} fullWidth color='secondary' type='submit'>
                        Register
                    </Button>
                </div>
            </form>
        </CardBody>
    </Card>
  )
}
