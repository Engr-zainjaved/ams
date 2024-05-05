"use server";

import { db } from "@/lib/db";
import { getUserByEmail } from "@/data/user";

export const getBookedFlights = async (email: string) => {
  // Validate email
  if (!email) {
    return { error: "Invalid email!" };
  }

  // Check if user exists
  const user = await getUserByEmail(email);
  if (!user) {
    return { error: "User not found!" };
  }

  // Fetch user's booked flights
  const bookedFlights = await db.booking.findMany({
    where: {
      userId: user.id,
    },
    include: {
      flight: true,
    },
  });

  // If no booked flights found
  if (bookedFlights.length === 0) {
    return { error: "No booked flights found for this user!" };
  }

  // Return booked flights
  return { bookedFlights };
};
