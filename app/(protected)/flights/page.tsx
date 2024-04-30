import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

const Page = () => {
  return (
    <Card className="w-3/5 shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center">{"Flights"}</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Flight Id</p>
          <p className="truncate text-xs max-w-48 font-mono p-1 bg-slate-100 rounded-md">1d2457</p>
        </div>
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
          <p className="text-sm font-medium">Flight Id</p>
          <p className="truncate text-xs max-w-48 font-mono p-1 bg-slate-100 rounded-md">454878</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default Page;
