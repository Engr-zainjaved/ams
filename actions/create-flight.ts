"use server";

import * as z from "zod";
import { db } from "@/lib/db";
import { UserRole } from "@prisma/client";
import { CreateFlightSchema } from "@/schemas/index";
import { currentRole } from "@/lib/auth";
import { toUTCDate } from "@/lib/utils";

export const createFlight = async (values: z.infer<typeof CreateFlightSchema>) => {
  const role = await currentRole();
  const validateFields = CreateFlightSchema.safeParse(values);
  console.log("TCL: createFlight -> validateFields", validateFields);

  if (!validateFields.success) {
    return { error: "Invalid fields!" };
  }

  const { departure, arrival, origin, destination, economyPrice, businessPrice, status } =
    validateFields.data;

  if (role !== UserRole.ADMIN) {
    return { error: "Only admins can create flights." };
  }

  const utcDeparture = toUTCDate(departure);
  const utcArrival = toUTCDate(arrival);

  // Create a new flight
  const flight = await db.flight.create({
    data: {
      departure: utcDeparture,
      arrival: utcArrival,
      origin,
      destination,
      economyPrice,
      businessPrice,
      status,
    },
  });

  return { success: "Flight created successfully!", flight };
};
