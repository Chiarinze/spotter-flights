import { z } from "zod";

export const flightSearchSchema = z
  .object({
    origin: z.string().min(3, "Enter origin"),
    destination: z.string().min(3, "Enter destination"),
    tripType: z.enum(["one-way", "round-trip"]).default("one-way"),
    departureDate: z
      .string()
      .refine(
        (date) => new Date(date) >= new Date(new Date().setHours(0, 0, 0, 0)),
        {
          message: "Date cannot be in the past",
        }
      ),
    returnDate: z.string().optional(),
    adults: z.number().min(1).max(9).default(1),
    children: z.number().min(0).max(9).default(0),
    travelClass: z
      .enum(["ECONOMY", "PREMIUM_ECONOMY", "BUSINESS", "FIRST"])
      .default("ECONOMY"),
  })
  .refine(
    (data) => {
      if (data.tripType === "round-trip" && !data.returnDate) return false;
      return true;
    },
    {
      message: "Return date is required for round trips",
      path: ["returnDate"],
    }
  );

export type FlightSearchForm = z.infer<typeof flightSearchSchema>;
