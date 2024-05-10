"use client";

import { createFlight } from "@/actions/create-flight";
import { FormError } from "@/components/form-error";
import { FormSuccess } from "@/components/form-success";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateFlightSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { FlightStatus } from "@prisma/client";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import * as z from "zod";

const Page = () => {
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<z.infer<typeof CreateFlightSchema>>({
    resolver: zodResolver(CreateFlightSchema),
    defaultValues: {
      origin: "",
      destination: "",
      departure: "",
      arrival: "",
      economyPrice: 0,
      businessPrice: 0,
      status: FlightStatus.AVAILABLE,
    },
  });

  const onSubmit = (values: z.infer<typeof CreateFlightSchema>) => {
    startTransition(() => {
      createFlight(values)
        .then((data) => {
          if (data.success) {
            setSuccess(data.success);
            form.reset();
          }

          if (data.error) {
            setError(data.error);
          }
        })
        .catch((error) => {
          console.log("TCL: onSubmit -> error", error);
          setError("Something went wrong!");
        });
    });
  };

  const handleError = (errors: any) => {
    console.error("Form errors:", errors);
  };

  return (
    <Card className="w-4/5">
      <CardHeader className="text-2xl font-semibold text-center">
        <p>Create Flight</p>
      </CardHeader>
      <CardContent className="space-y-4">
        <Form {...form}>
          <form className="space-y-6" onSubmit={form.handleSubmit(onSubmit, handleError)}>
            <div className="space-y-4">
              <FormField
                control={form.control}
                name="origin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Origin</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="origin" disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="destination"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Destination</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="destination" disabled={isPending} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="departure"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Departure DateTime</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="datetime-local"
                        placeholder="arrival"
                        disabled={isPending}
                        value={field.value}
                        onChange={(e) => {
                          const adjustedValue = `${e.target.value}:00`;
                          field.onChange(adjustedValue);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="arrival"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Arrival DateTime</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        type="datetime-local"
                        placeholder="arrival"
                        disabled={isPending}
                        value={field.value}
                        onChange={(e) => {
                          const adjustedValue = `${e.target.value}:00`;
                          field.onChange(adjustedValue);
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="economyPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Economy ticket price</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value}
                        onChange={(e) =>
                          field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                        }
                        placeholder="Economy Class Price"
                        type="number"
                        min="0"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="businessPrice"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Business ticket price</FormLabel>
                    <FormControl>
                      <Input
                        {...field}
                        value={field.value}
                        onChange={(e) =>
                          field.onChange(e.target.value ? parseFloat(e.target.value) : "")
                        }
                        placeholder="Business Class Price"
                        type="number"
                        min="0"
                        disabled={isPending}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Flight Status</FormLabel>
                    <Select
                      disabled={isPending}
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a flight status" />
                        </SelectTrigger>
                      </FormControl>
                      <FormMessage />
                      <SelectContent>
                        <SelectItem value={FlightStatus.AVAILABLE}>Available</SelectItem>
                        <SelectItem value={FlightStatus.DELAYED}>Delayed</SelectItem>
                        <SelectItem value={FlightStatus.CANCELLED}>Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormItem>
                )}
              />

              <FormSuccess message={success} />
              <FormError message={error} />
              <Button disabled={isPending} type="submit">
                Save
              </Button>
            </div>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default Page;
