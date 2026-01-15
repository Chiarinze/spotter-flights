import { useMemo } from "react";
import type { Flight, FilterState, PricePoint } from "../types";

export const useFilteredFlights = (
  flights: Flight[] | undefined,
  filters: FilterState
) => {
  return useMemo(() => {
    if (!flights) return { filtered: [], graphData: [] };

    const filtered = flights.filter((flight) => {
      const price = parseFloat(flight.price.total);
      const stops = flight.itineraries[0].segments[0].numberOfStops;
      const airline = flight.validatingAirlineCodes[0];

      const matchesPrice = price <= filters.maxPrice;
      const matchesStops = filters.stops === "all" || stops === filters.stops;
      const matchesAirline =
        filters.airlines.length === 0 || filters.airlines.includes(airline);

      return matchesPrice && matchesStops && matchesAirline;
    });

    // Generate graph data based on filtered results for real-time feedback
    const graphData: PricePoint[] = filtered
      .map((f) => ({
        name: new Date(
          f.itineraries[0].segments[0].departure.at
        ).toLocaleDateString([], { month: "short", day: "numeric" }),
        price: parseFloat(f.price.total),
      }))
      .sort((a, b) => new Date(a.name).getTime() - new Date(b.name).getTime());

    return { filtered, graphData };
  }, [flights, filters]);
};
