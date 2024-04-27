import { UserInfo } from "@/components/user-info";
import { currentUser } from "@/lib/auth";

const Page = async () => {
  const user = await currentUser();
  return <UserInfo label="Booked Flights" />;
};

export default Page;
