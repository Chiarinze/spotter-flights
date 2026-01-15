import { motion } from "framer-motion";
import type { Flight } from "../types";
import { Plane, Clock } from "lucide-react";

export const FlightCard = ({ flight }: { flight: Flight }) => {
  const itinerary = flight.itineraries[0];
  const segment = itinerary.segments[0];
  const stops = segment.numberOfStops;

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0 }}
      className="bg-brand-card border border-brand-border p-5 rounded-2xl flex flex-col md:flex-row justify-between items-center gap-6"
    >
      <div className="flex items-center gap-4 w-full md:w-1/4">
        <div className="w-10 h-10 bg-brand-accent/10 rounded-full flex items-center justify-center">
          <Plane className="text-brand-accent w-5 h-5" />
        </div>
        <div>
          <p className="font-bold text-sm leading-tight">
            {flight.validatingAirlineCodes[0]}
          </p>
          <p className="text-[10px] text-brand-muted uppercase tracking-tighter">
            Verified Carrier
          </p>
        </div>
      </div>

      <div className="flex-1 flex justify-between items-center w-full px-4">
        <div className="text-center">
          <p className="text-xl font-bold">{segment.departure.iataCode}</p>
          <p className="text-xs text-brand-muted">
            {new Date(segment.departure.at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>

        <div className="flex-1 flex flex-col items-center px-8">
          <p className="text-[10px] text-brand-accent uppercase font-bold tracking-widest mb-1">
            {stops === 0 ? "Direct" : `${stops} Stop${stops > 1 ? "s" : ""}`}
          </p>
          <div className="relative w-full h-[1px] bg-brand-border flex items-center">
            <div className="absolute w-1.5 h-1.5 rounded-full bg-brand-accent left-0" />
            <div className="absolute w-1.5 h-1.5 rounded-full bg-brand-accent right-0" />
          </div>
          <div className="flex items-center gap-1 mt-1 text-brand-muted">
            <Clock size={10} />
            <span className="text-[10px]">{itinerary.duration}</span>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xl font-bold">{segment.arrival.iataCode}</p>
          <p className="text-xs text-brand-muted">
            {new Date(segment.arrival.at).toLocaleTimeString([], {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </p>
        </div>
      </div>

      <div className="w-full md:w-1/4 flex flex-col items-end">
        <p className="text-2xl font-black text-white">
          ${parseFloat(flight.price.total).toLocaleString()}
        </p>
        <p className="text-[10px] text-brand-muted mb-2">incl. taxes & fees</p>
        {/* <button className="w-full md:w-auto px-6 py-2 bg-brand-accent text-brand-bg font-bold rounded-lg transition-transform hover:scale-105 active:scale-95 text-xs">
          View Deal
        </button> */}
      </div>
    </motion.div>
  );
};
