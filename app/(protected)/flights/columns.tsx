"use client";

import { ColumnDef } from "@tanstack/react-table";
import { MixerHorizontalIcon } from "@radix-ui/react-icons";

export type Payment = {
  flightId: string;
  from: string;
  to: string;
  amount: number;
  class: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "from",
    header: "From",
  },
  {
    accessorKey: "to",
    header: "To",
  },
  {
    accessorKey: "class",
    header: "Class",
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return (
        <div className="text-right font-medium">
          {formatted}
          <MixerHorizontalIcon />
        </div>
      );
    },
  },
];
