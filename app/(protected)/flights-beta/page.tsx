import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";

import { DataTable } from "@/components/data-table";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { getFlights } from "@/actions/get-flights";
import { Flights } from "@/interfaces/interfaces";
import { useSession } from "next-auth/react";
import { auth } from "@/auth";

const data: Payment[] = [
  {
    id: "m5gr84i9",
    amount: 316,
    status: "success",
    email: "ken99@yahoo.com",
  },
  {
    id: "3u1reuv4",
    amount: 242,
    status: "success",
    email: "Abe45@gmail.com",
  },
  {
    id: "derv1ws0",
    amount: 837,
    status: "processing",
    email: "Monserrat44@gmail.com",
  },
  {
    id: "5kma53ae",
    amount: 874,
    status: "success",
    email: "Silas22@gmail.com",
  },
  {
    id: "bhqecj4p",
    amount: 721,
    status: "failed",
    email: "carmella@hotmail.com",
  },
];

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export default async function MainDataTable() {
  const response = await getFlights();
  const data: Flights[] = response.flights;
  let userSessionId: string;

  const session = await auth();
  userSessionId = session?.user.id as string;

  return (
    <>
      <Card className="w-4/5 shadow-md">
        <CardHeader>
          <p className="text-2xl font-semibold text-center">Book your flights</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <DataTable data={data} userSessionId={userSessionId} />
        </CardContent>
      </Card>
    </>
  );
}
