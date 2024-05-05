"use server";

import { db } from "@/lib/db";
import { currentUser } from "@/lib/auth";

export const upgradeBooking = async (bookingId: string) => {
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
    return { error: "You are not authorized to upgrade this booking!" };
  }

  if (booking.class !== "ECONOMY") {
    return { error: "Booking is already upgraded!" };
  }

  await db.booking.update({
    where: { id: bookingId },
    data: {
      class: "BUSINESS",
      status: "UPGRADED",
    },
  });

  return { success: "Booking upgraded successfully!" };
};
