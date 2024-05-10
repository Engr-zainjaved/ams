"use server";

import { db } from "@/lib/db";
import { FlightClass } from "@prisma/client";

interface bookFlightProps {
  userId: string;
  flightId: string;
  flightClass: FlightClass;
}

export async function bookFlight({ userId, flightId, flightClass }: bookFlightProps) {
  if (!userId || !flightId || !flightClass) {
    throw new Error("Missing required parameters");
  }

  try {
    const flight = await db.flight.findUnique({
      where: { id: flightId },
      include: { bookings: true },
    });

    if (!flight || flight.status !== "AVAILABLE") {
      throw new Error("Flight not available");
    }

    const newBooking = await db.booking.create({
      data: {
        userId,
        flightId,
        class: flightClass,
        status: "CONFIRMED",
      },
    });

    return { success: "Flight booked successfully!", newBooking };
  } catch (error) {
    console.error("Booking Error:", error);
    throw new Error("Error booking the flight");
  }
}
