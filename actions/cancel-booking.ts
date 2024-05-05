"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export const cancelBooking = async (bookingId: string) => {
  const user = await currentUser();

  if (!user) {
    return { error: "Unauthorized" };
  }

  const booking = await db.booking.findUnique({
    where: { id: bookingId },
  });

  if (!booking) {
    return { error: "Booking not found!" };
  }

  if (booking.userId !== user.id) {
    return { error: "You are not authorized to cancel this booking!" };
  }

  await db.booking.update({
    where: { id: bookingId },
    data: {
      status: "CANCELLED",
    },
  });

  return { success: "Booking cancelled successfully!" };
};
