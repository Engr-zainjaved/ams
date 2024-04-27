import { auth, signOut } from "@/auth";

const Page = async () => {
  const session = await auth();
  return (
    <div className="bg-black text-white p-10 rounded-xl">
      <button type="submit">Sign Out</button>
    </div>
  );
};

export default Page;
