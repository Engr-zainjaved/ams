"use server";

import { db } from "@/lib/db";

export const getFlights = async () => {
  const flights = await db.flight.findMany();

  return { success: "Flights fetched successfully!", flights };
};
