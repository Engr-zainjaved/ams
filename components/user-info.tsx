"use client";

import React, { useState } from "react";
import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { cancelBooking } from "@/actions/cancel-booking";
import { downgradeBooking } from "@/actions/donwgrade-booking";
import { upgradeBooking } from "@/actions/upgrade-booking";
import { Button } from "./ui/button";
import { FormSuccess } from "@/components/form-success";
import { FormError } from "@/components/form-error";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { deleteFlight } from "@/actions/delete-flight";
import { editFlight } from "@/actions/edit-flight";

interface UserInfoProps {
  user?: ExtendedUser;
  label: string;
  bookings: any;
  bookedFlights: any;
}

export const UserInfo = ({ user, label, bookings, bookedFlights }: UserInfoProps) => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const { update } = useSession();

  const handleCancel = async (bookingId: any) => {
    const response = await cancelBooking(bookingId);
    if (response.success) {
      update();
      setSuccess(response.success);
    }

    if (response.error) {
      setError(response.error);
    }
  };

  const handleDowngrade = async (bookingId: any) => {
    const response = await downgradeBooking(bookingId);
    if (response.success) {
      update();
      setSuccess(response.success);
    }

    if (response.error) {
      setError(response.error);
    }
  };

  const handleUpgrade = async (bookingId: any) => {
    const response = await upgradeBooking(bookingId);
    if (response.success) {
      update();
      setSuccess(response.success);
    }

    if (response.error) {
      setError(response.error);
    }
  };

  const handleEditFlight = async (flightId: string) => {
    if (user && user.id) {
      const response = await editFlight({ userId: user.id, flightId });
      if (response.success) {
        update();
        setSuccess(response.success);
      }

      if (response.error) {
        setError(response.error);
      }
    }
  };

  const handleDeleteFlight = async (flightId: string) => {
    if (user && user.id) {
      const response = await deleteFlight({ userId: user.id, flightId });
      if (response.success) {
        update();
        setSuccess(response.success);
      }

      if (response.error) {
        setError(response.error);
      }
    }
  };

  if (bookedFlights.error) {
    return <FormError message={bookedFlights.error} />;
  }

  return (
    <>
      <Card className="w-4/5 shadow-md">
        <CardHeader>
          <p className="text-2xl font-semibold text-center">{label}</p>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className=" flex justify-center">
            <FormSuccess message={success} />
            <FormError message={error} />
          </div>
          {bookings.map((booking: any) => (
            <div key={booking.id} className="rounded-lg border p-3 shadow-sm">
              <div className="flex justify-between">
                <div>
                  <p className="text-sm font-light">Flight Id</p>
                  <p className="text-sm font-medium">{booking.flightId}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-light">Status</p>
                  <Badge
                    variant={
                      booking.status === "CONFIRMED" || booking.status === "UPGRADED"
                        ? "success"
                        : "destructive"
                    }
                  >
                    {booking.status}
                  </Badge>
                </div>
              </div>
              <Separator className="my-4" />
              <div className="flex justify-between">
                <div className="flex justify-around w-1/2">
                  <div>
                    <p className="text-sm font-light">From</p>
                    <p className="text-sm font-medium">{booking.flight.origin}</p>
                  </div>
                  <div>
                    <p className="text-sm font-light">to</p>
                    <p className="text-sm font-medium">{booking.flight.destination}</p>
                  </div>
                  <Separator orientation="vertical" />
                </div>
                <div className="flex justify-around w-1/2">
                  <div>
                    <p className="text-sm font-light">Departure</p>
                    <p className="text-sm font-medium">
                      {booking.flight.departure.toLocaleTimeString()}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-light">Arrival</p>
                    <p className="text-sm font-medium">
                      {booking.flight.arrival.toLocaleTimeString()}
                    </p>
                  </div>
                </div>
              </div>

              <Separator className="my-4" />
              <div className="flex justify-between">
                <div className="flex justify-end space-x-2">
                  {(booking.status === "CONFIRMED" ||
                    booking.status === "DOWNGRADED" ||
                    booking.status === "UPGRADED") && (
                    <>
                      <Button variant="outline" onClick={() => handleCancel(booking.id)}>
                        Cancel
                      </Button>
                      {booking.class === "BUSINESS" && (
                        <Button onClick={() => handleDowngrade(booking.id)}>Downgrade</Button>
                      )}
                      {booking.class === "ECONOMY" && (
                        <Button onClick={() => handleUpgrade(booking.id)}>Upgrade</Button>
                      )}
                    </>
                  )}
                </div>
                <div className="flex justify-start space-x-2">
                  {user && user.role === "ADMIN" && (
                    <>
                      {/* <Button
                        variant="outline"
                        onClick={async () => handleEditFlight(booking.flightId)}
                      >
                        Edit Flight
                      </Button> */}

                      <Button
                        variant="destructive"
                        onClick={async () => await handleDeleteFlight(booking.flightId)}
                      >
                        Delete Flight
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  );
};
