export interface Flights {
  id: string;
  departure: Date;
  arrival: Date;
  origin: string;
  destination: string;
  economyPrice: number;
  businessPrice: number;
  status: "CANCELLED" | "DELAYED" | "AVAILABLE";
}

export interface FlightsResponse {
  success: string;
  flights: Flights[];
}
