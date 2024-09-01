"use server"
import dbConnection from '@/lib/mongodb';
import User from '@/models/User';
import LightBulb from '@/models/LightBulb';
import { hashPayload } from '@/utils';
import { signIn } from 'next-auth/react';
import { revalidatePath } from 'next/cache';
import { typeToFlattenedError, z } from 'zod'

export type State = {
    success: boolean,
    errors?: Record<any, any> | string,
    message?: string
}

const payloadSchema = z.object({
    username: z.string().min(3).max(20, "Username must be between 3 to 20 characters."),
    password: z.string().min(8, "Password must be at least 8 characters long."),

})

export async function registerUser(prevState: any, formData: FormData) {
    'use server'

    const validateData = payloadSchema.safeParse({
        username: formData.get('username'),
        password: formData.get('password'),
    })


    if (!validateData.success) {
        const state: State = {
            success: false,
            errors: validateData.error.flatten().fieldErrors,
        }

        return state

    }


    try {
        const { username, password } = validateData.data
        await dbConnection()


        const existingUser = await User.findOne({ username });

        if (existingUser) {
            const state: State = {
                success: false,
                message: 'Username taken'
            }
            return state;
        }


        const user = await User.create({
            username,
            password: hashPayload(password),
        });


        await LightBulb.create({
            userId: user._id,
            status: false
        })

        revalidatePath('/')

        const state: State = {
            success: true,
            message: 'Account Created'
        }
        return state;
    } catch (error) {
        return { message: 'Something went wrong' }
    }

}
