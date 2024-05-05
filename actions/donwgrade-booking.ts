"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export const downgradeBooking = async (bookingId: string) => {
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
    return { error: "You are not authorized to downgrade this booking!" };
  }

  if (booking.class !== "BUSINESS") {
    return { error: "Booking is already downgraded!" };
  }

  await db.booking.update({
    where: { id: bookingId },
    data: {
      class: "ECONOMY",
      status: "DOWNGRADED",
    },
  });

  return { success: "Booking downgraded successfully!" };
};
