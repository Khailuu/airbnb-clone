import { z } from "zod";

export const registerSchema = z.object({
    name: z.string({required_error: "Please enter your full name !"}).min(2),
    email: z.string({required_error: "Please enter your email !"}).min(1),
    password: z.string({required_error: "Please enter password to 1 from 10 character!"}).min(1).max(10),
    phone: z.string({required_error: "Please enter your phone number"}).min(10).max(10),
    birthday: z.string({required_error: "Please select your birthday !"})

})

// {
//     "id": 0,
//     "name": "string",
//     "email": "string",
//     "password": "string",
//     "phone": "string",
//     "birthday": "string",
//     "gender": true,
//     "role": "string"
//   }