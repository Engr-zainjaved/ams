"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { getUserById } from "@/data/user";
import { DeleteFlightSchema } from "@/schemas";

export const deleteFlight = async (values: z.infer<typeof DeleteFlightSchema>) => {
  const validateFields = DeleteFlightSchema.safeParse(values);

  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }

  const { userId, flightId } = validateFields.data;

  // Check if the user is an admin
  const user = await getUserById(userId);

  if (user && user.role !== UserRole.ADMIN) {
    return { error: "Only admins can delete flights." };
  }

  // Delete the flight
  const flight = await db.flight.delete({
    where: { id: flightId },
  });

  return { success: "Flight deleted successfully!", flight };
};
