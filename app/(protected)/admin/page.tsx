import { Card, CardContent, CardHeader } from "@/components/ui/card";
import PanelLink from "../_components/panelLink";

const Page = () => {
  return (
    <Card className="w-4/5 mx-auto">
      <CardHeader className="text-2xl font-semibold text-center">Admin Panel</CardHeader>
      <CardContent className="space-y-4">
        <div className="flex justify-around items-stretch w-full">
          <PanelLink
            href="/admin/create-flight"
            title="Create Flight"
            description="Enter details to create a flight"
          />
          <PanelLink
            href="/admin/edit-flight"
            title="Edit/Delete Flight"
            description="Edit details or delete existing flight"
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default Page;
