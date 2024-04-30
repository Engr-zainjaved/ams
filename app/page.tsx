import { LoginButton } from "@/components/auth/login-button";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Poppins } from "next/font/google";

const font = Poppins({
  subsets: ["latin"],
  weight: ["600"],
});

export default async function Home() {
  return (
    <main className="flex h-full flex-col items-center justify-center bg-black">
      <div className="space-y-6 text-center">
        <h1 className={cn("text-3xl font-semibold text-white drop-shadow-md", font.className)}>
          ✈ Airline Management System
        </h1>
        <p className="text-white text-lg drop-shadow-md">A simple database project</p>
        <div>
          <LoginButton mode="modal" asChild>
            <Button variant="secondary" size="lg">
              SignIn
            </Button>
          </LoginButton>
        </div>
      </div>
    </main>
  );
}
