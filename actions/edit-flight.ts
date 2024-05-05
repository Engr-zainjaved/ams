"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { getUserById } from "@/data/user";
import { EditFlightSchema } from "@/schemas";

export const editFlight = async (values: z.infer<typeof EditFlightSchema>) => {
  const validateFields = EditFlightSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }

  const {
    userId,
    flightId,
    departure,
    arrival,
    origin,
    destination,
    economyPrice,
    businessPrice,
    status,
  } = validateFields.data;

  // Check if the user is an admin
  const user = await getUserById(userId);

  if (user && user.role !== UserRole.ADMIN) {
    return { error: "Only admins can edit flights." };
  }

  // Edit the flight
  const flight = await db.flight.update({
    where: { id: flightId },
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

  return { success: "Flight edited successfully!", flight };
};
