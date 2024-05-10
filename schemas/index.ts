import { newPassword } from "@/actions/new-password";
import { UserRole, FlightStatus } from "@prisma/client";
import * as z from "zod";

export const SettingsSchema = z
  .object({
    name: z.optional(
      z.string().min(1, {
        message: "Minimum 1 character required",
      })
    ),
    isTwoFactorEnabled: z.optional(z.boolean()),
    role: z.enum([UserRole.ADMIN, UserRole.USER]),
    email: z.optional(z.string().email()),
    password: z.optional(z.string().min(6)),
    newPassword: z.optional(z.string().min(6)),
  })
  .refine(
    (data) => {
      if (data.password && !data.newPassword) {
        return false;
      }
      return true;
    },
    {
      message: "New password is required!",
      path: ["newPassword"],
    }
  )
  .refine(
    (data) => {
      if (data.newPassword && !data.password) {
        return false;
      }
      return true;
    },
    {
      message: "Password is required!",
      path: ["password"],
    }
  );

export const NewPasswordSchema = z.object({
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
});

export const ResetSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
});

export const LoginSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(1, {
    message: "Password is required",
  }),
  code: z.optional(z.string()),
});

export const RegisterSchema = z.object({
  email: z.string().email({
    message: "Email is required",
  }),
  password: z.string().min(6, {
    message: "Minimum 6 characters required",
  }),
  name: z.string().min(1, {
    message: "Name is required",
  }),
});

export const CreateFlightSchema = z
  .object({
    origin: z.string().min(1, "Origin is required."),
    destination: z.string().min(1, "Destination is required."),
    departure: z
      .string()
      .min(1, "Departure date and time are required.")
      .refine(
        (value) => {
          const departureDate = new Date(value);
          const now = new Date();
          return departureDate >= now;
        },
        {
          message: "Departure date and time must be in the future.",
        }
      ),
    arrival: z.string().min(1, "Arrival date and time are required."),
    economyPrice: z
      .number()
      .refine((value) => value >= 0, { message: "Economy price must be a non-negative number." }),
    businessPrice: z
      .number()
      .refine((value) => value >= 0, { message: "Business price must be a non-negative number." }),
    status: z.nativeEnum(FlightStatus),
  })
  .refine(
    (data) => {
      const departureDate = new Date(data.departure);
      const arrivalDate = new Date(data.arrival);
      return arrivalDate.getTime() > departureDate.getTime();
    },
    { message: "Departure date and time must be earlier than the arrival date and time." }
  );

export const EditFlightSchema = z.object({
  userId: z.string(),
  flightId: z.string(),
  departure: z.date().optional(),
  arrival: z.date().optional(),
  origin: z.string().optional(),
  destination: z.string().optional(),
  economyPrice: z.number().optional(),
  businessPrice: z.number().optional(),
  status: z.nativeEnum(FlightStatus).optional(),
});

export const DeleteFlightSchema = z.object({
  userId: z.string(),
  flightId: z.string(),
});
