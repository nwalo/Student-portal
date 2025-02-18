import { z } from "zod";

const emptyMessage = "This field can not be empty";

export const addStudentSchema = z.object({
  name: z.string().trim().min(1, "Name is required"),
  email: z.string().trim().email("Invalid email"),
  dateOfBirth: z.preprocess(
    (val) => (typeof val === "string" ? new Date(val) : val),
    z.date().optional()
  ),
  address: z.string().trim().min(1, "Address is required"),
  phoneNumber: z.string().trim().min(10, "Invalid phone number"),
  major: z.string().trim().min(1, "Major is required"),
});
