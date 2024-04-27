import { UserInfo } from "@/components/user-info";
import { currentUser } from "@/lib/auth";

const Page = async () => {
  const user = await currentUser();
  return <UserInfo user={user} label="Booked Flights" />;
};

export default Page;
