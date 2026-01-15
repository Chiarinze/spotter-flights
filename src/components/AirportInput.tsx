import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { flightService } from "../api/flightApi";
import { useDebounce } from "../hooks/useDebounce";
import type { AirportLocation } from "../types";

interface Props {
  label: string;
  onSelect: (code: string) => void;
  error?: string;
}

export const AirportInput = ({ label, onSelect, error }: Props) => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const debouncedQuery = useDebounce(query, 300);

  const { data: suggestions = [], isFetching } = useQuery<AirportLocation[]>({
    queryKey: ["airports", debouncedQuery],
    queryFn: () => flightService.getAirports(debouncedQuery),
    enabled: debouncedQuery.length > 2,
    staleTime: 1000 * 60 * 60,
  });

  const handleSelect = (loc: AirportLocation) => {
    onSelect(loc.iataCode);
    setQuery(`${loc.name} (${loc.iataCode})`);
    setShowSuggestions(false);
  };

  return (
    <div className="relative flex flex-col gap-1 w-full">
      <label className="text-xs text-brand-muted font-medium uppercase">
        {label}
      </label>

      <div className="relative">
        <input
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setShowSuggestions(true);
          }}
          onFocus={() => setShowSuggestions(true)}
          placeholder="Search City..."
          className="bg-brand-bg border border-brand-border rounded-lg p-3 focus:border-brand-accent outline-none w-full text-white transition-all"
        />

        {isFetching && (
          <div className="absolute right-3 top-1/2 -translate-y-1/2">
            <div className="w-4 h-4 border-2 border-brand-accent border-t-transparent rounded-full animate-spin" />
          </div>
        )}
      </div>

      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute top-full left-0 right-0 z-50 mt-2 bg-brand-card border border-brand-border rounded-xl shadow-2xl max-h-60 overflow-y-auto">
          {suggestions.map((loc) => (
            <li
              key={loc.id}
              onClick={() => handleSelect(loc)}
              className="p-3 hover:bg-brand-accent/10 cursor-pointer flex justify-between items-center border-b border-brand-border last:border-0 transition-colors"
            >
              <div className="flex flex-col">
                <span className="text-sm font-medium text-white">
                  {loc.name}
                </span>
                <span className="text-[10px] text-brand-muted uppercase tracking-wider">
                  Airport / City
                </span>
              </div>
              <span className="text-xs bg-brand-bg px-2 py-1 rounded text-brand-accent font-mono border border-brand-border">
                {loc.iataCode}
              </span>
            </li>
          ))}
        </ul>
      )}

      {error && <span className="text-red-400 text-xs mt-1">{error}</span>}
    </div>
  );
};
