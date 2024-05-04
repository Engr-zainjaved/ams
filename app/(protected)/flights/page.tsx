import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Payment, columns } from "./columns";
import { DataTable } from "./data-table";

async function getData(): Promise<Payment[]> {
  // Fetch data from your API here.
  return [
    {
      flightId: "728ed52f",
      from: "Karachi",
      to: "Lahore",
      amount: 100,
      class: "economy",
    },
    {
      flightId: "728ed52f",
      from: "Karachi",
      to: "Lahore",
      amount: 100,
      class: "economy",
    },
    // ...
  ];
}

const Page = async () => {
  const data = await getData();
  return (
    <Card className="w-4/5 shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">Book a flight</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <DataTable columns={columns} data={data} />
      </CardContent>
    </Card>
  );
};

export default Page;
