import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";

// Define a type for props if you're using TypeScript
interface PanelLinkProps {
  href: string;
  title: string;
  description: string;
}

// Extract a subcomponent for the link cards
const PanelLink = ({ href, title, description }: PanelLinkProps) => {
  return (
    <Link href={href} passHref>
      <Card className="w-full max-w-md p-4 hover:cursor-pointer hover:bg-slate-50 h-full flex flex-col justify-between">
        <CardHeader className="text-xl font-semibold text-center">
          <p>{title}</p>
        </CardHeader>
        <CardContent className="text-center text-sm">{description}</CardContent>
      </Card>
    </Link>
  );
};

export default PanelLink;
