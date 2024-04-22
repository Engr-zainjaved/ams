import { auth, signOut } from "@/auth";

const Page = async () => {
  const session = await auth();
  return (
    <div className="text-3xl font-bold">
      {JSON.stringify(session)}
      <form
        action={async () => {
          "use server";
          await signOut();
        }}
      >
        <button type="submit">Sign Out</button>
      </form>
    </div>
  );
};

export default Page;