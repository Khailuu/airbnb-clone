import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().nonempty("Full Name is required"),
  email: z.string().email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .regex(
      /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
      "Password must include uppercase, lowercase, number, and special character"
    ),
  phone: z.string().regex(/^\d{10,11}$/, "Invalid phone number"),
});
