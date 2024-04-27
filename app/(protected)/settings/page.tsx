import { auth, signOut } from "@/auth";

const Page = async () => {
  const session = await auth();
  return (
    <div className="bg-black text-white p-10 rounded-xl">
      <p>Settings Page</p>
    </div>
  );
};

export default Page;
