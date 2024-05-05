"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { getUserById } from "@/data/user";
import { CreateFlightSchema } from "@/schemas/index";

export const createFlight = async (values: z.infer<typeof CreateFlightSchema>) => {
  const validateFields = CreateFlightSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }

  const { userId, departure, arrival, origin, destination, economyPrice, businessPrice, status } =
    validateFields.data;

  // Check if the user is an admin
  const user = await getUserById(userId);

  if (user && user.role !== UserRole.ADMIN) {
    return { error: "Only admins can create flights." };
  }

  // Create a new flight
  const flight = await db.flight.create({
    data: {
      departure,
      arrival,
      origin,
      destination,
      economyPrice,
      businessPrice,
      status,
    },
  });

  return { success: "Flight created successfully!", flight };
};
