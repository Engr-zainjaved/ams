import { getBookedFlights } from "@/actions/get-booked-flights";
import { UserInfo } from "@/components/user-info";
import { currentUser } from "@/lib/auth";

const Page = async () => {
  const user = await currentUser();
  const bookedFlights = await getBookedFlights(user?.email as string);
  const bookings = bookedFlights.bookedFlights;
  console.log("TCL: Page -> bookings", bookings);

  return <UserInfo user={user} label="Booked Flights" bookings={bookings} />;
};

export default Page;
