import { z } from "zod";

export const registerSchema = z.object({
    fullName : z.string({required_error: 'Please enter your name !'}).min(1),
    email: z.string({required_error: 'Please enter your mail !'}).min(1),
    password: z.string({required_error: 'Please enter your Password !'}).min(1),
    phone: z.string({required_error: 'Please enter your Phone !'}).min(1),
    birthday : z.string({required_error: 'Please enter your birthday !'}).min(1),
})