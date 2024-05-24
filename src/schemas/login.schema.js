import { z } from "zod";

export const loginSchema = z.object({
    email: z.string({required_error: 'Please enter your mail !'}).min(1),
    password: z.string({required_error: 'Please enter your Password !'}).min(1)
})