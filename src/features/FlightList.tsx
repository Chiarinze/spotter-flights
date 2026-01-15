import { AnimatePresence } from "framer-motion";
import { FlightCard } from "./FlightCard";
import type { Flight } from "../types";
import type { FlightSearchForm } from "../lib/schema";
import { Calendar, MapPin, Search } from "lucide-react";

interface Props {
  flights: Flight[];
  isLoading: boolean;
  hasSearched: boolean;
  searchParams: FlightSearchForm | null;
}

export const FlightList = ({
  flights,
  isLoading,
  hasSearched,
  searchParams,
}: Props) => {
  if (isLoading) {
    return (
      <div className="space-y-4">
        {[1, 2, 3].map((n) => (
          <div
            key={n}
            className="h-32 bg-brand-card animate-pulse rounded-2xl border border-brand-border"
          />
        ))}
      </div>
    );
  }

  if (!hasSearched) {
    return (
      <div className="text-center py-20 bg-brand-card rounded-2xl border border-brand-border">
        <div className="w-16 h-16 bg-brand-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
          <Search className="text-brand-accent w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold mb-2">Ready to fly?</h2>
        <p className="text-brand-muted max-w-xs mx-auto">
          Enter your origin, destination, and dates to find the best flight
          deals.
        </p>
      </div>
    );
  }

  if (flights.length > 0) {
    return (
      <div className="space-y-4">
        <AnimatePresence mode="popLayout">
          {flights.map((flight) => (
            <FlightCard key={flight.id} flight={flight} />
          ))}
        </AnimatePresence>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="text-center py-12 bg-brand-card rounded-2xl border border-dashed border-brand-border">
        <p className="text-brand-muted mb-6">
          No flights found matching your specific criteria.
        </p>

        <div className="bg-brand-bg/50 p-6 rounded-xl max-w-md mx-auto text-left border border-brand-border">
          <h4 className="text-sm font-bold uppercase tracking-wider text-brand-accent mb-4">
            Try these adjustments:
          </h4>
          <ul className="space-y-4">
            <li className="flex gap-3 items-start">
              <div className="mt-1 p-1 bg-brand-accent/20 rounded-md">
                <Calendar size={14} className="text-brand-accent" />
              </div>
              <div>
                <p className="text-sm font-medium">Flexible Dates</p>
                <p className="text-xs text-brand-muted">
                  Try searching 2-3 days before or after{" "}
                  <strong>{searchParams?.departureDate}</strong>.
                </p>
              </div>
            </li>
            <li className="flex gap-3 items-start">
              <div className="mt-1 p-1 bg-brand-accent/20 rounded-md">
                <MapPin size={14} className="text-brand-accent" />
              </div>
              <div>
                <p className="text-sm font-medium">Alternative Airports</p>
                <p className="text-xs text-brand-muted">
                  Check nearby hubs instead of{" "}
                  <strong>{searchParams?.origin}</strong> or{" "}
                  <strong>{searchParams?.destination}</strong>.
                </p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};
