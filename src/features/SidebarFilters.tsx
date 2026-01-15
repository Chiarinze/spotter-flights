import { motion } from "framer-motion";
import type { FilterState } from "../types";

interface FilterProps {
  filters: FilterState;
  setFilters: React.Dispatch<React.SetStateAction<FilterState>>;
}

export const SidebarFilters = ({ filters, setFilters }: FilterProps) => {
  const stopOptions: (number | "all")[] = ["all", 0, 1];

  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      className="bg-brand-card p-6 rounded-2xl border border-brand-border space-y-8 h-fit"
    >
      <div>
        <h3 className="text-sm font-bold uppercase tracking-widest text-brand-muted mb-4">
          Stops
        </h3>
        <div className="space-y-3">
          {stopOptions.map((stop) => (
            <label
              key={stop}
              className="flex items-center gap-3 cursor-pointer group"
            >
              <input
                type="radio"
                name="stops"
                checked={filters.stops === stop}
                onChange={() => setFilters({ ...filters, stops: stop })}
                className="w-4 h-4 accent-brand-accent"
              />
              <span className="text-sm group-hover:text-brand-accent transition-colors">
                {stop === "all"
                  ? "All Flights"
                  : stop === 0
                  ? "Non-stop"
                  : "1 Stop"}
              </span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <div className="flex justify-between mb-4">
          <h3 className="text-sm font-bold uppercase tracking-widest text-brand-muted">
            Max Price
          </h3>
          <span className="text-brand-accent font-mono">
            ${filters.maxPrice}
          </span>
        </div>
        <input
          type="range"
          min="100"
          max="3000"
          step="50"
          value={filters.maxPrice}
          onChange={(e) =>
            setFilters({ ...filters, maxPrice: parseInt(e.target.value) })
          }
          className="w-full h-1 bg-brand-bg rounded-lg appearance-none cursor-pointer accent-brand-accent"
        />
      </div>

      <button
        onClick={() =>
          setFilters({ maxPrice: 3000, stops: "all", airlines: [] })
        }
        className="w-full py-2 text-xs text-brand-muted hover:text-white transition-colors underline underline-offset-4"
      >
        Clear all filters
      </button>
    </motion.div>
  );
};
