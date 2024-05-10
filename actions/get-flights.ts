"use server";

import { db } from "@/lib/db";

export const getFlights = async () => {
  const flights = await db.flight.findMany();

  const trimmedFlights = flights.map((flight) => ({
    ...flight,
    id: flight.id.substring(4, 8),
  }));

  return { success: "Flights fetched successfully!", flights: trimmedFlights };
};
