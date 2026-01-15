import { useState } from "react";
import { SearchForm } from "./features/SearchForm";
import { FlightList } from "./features/FlightList";
import { PriceGraph } from "./features/PriceGraph";
import { SidebarFilters } from "./features/SidebarFilters";
import { useFlights } from "./hooks/useFlights";
import { useFilteredFlights } from "./hooks/useFilteredFlights";
import type { FlightSearchForm } from "./lib/schema";
import type { FilterState } from "./types";

export default function App() {
  const [searchParams, setSearchParams] = useState<FlightSearchForm | null>(
    null
  );
  const [filters, setFilters] = useState<FilterState>({
    maxPrice: 2000,
    stops: "all",
    airlines: [],
  });

  const { data: rawFlights, isLoading } = useFlights(searchParams);
  const { filtered, graphData } = useFilteredFlights(rawFlights, filters);

  return (
    <div className="min-h-screen bg-brand-bg text-white p-4 md:p-8">
      <header className="max-w-7xl mx-auto mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tighter">
          SPOTTER <span className="text-brand-accent">Flights</span>
        </h1>
      </header>

      <main className="max-w-7xl mx-auto space-y-6">
        <SearchForm onSearch={setSearchParams} />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <aside className="lg:col-span-3">
            <SidebarFilters filters={filters} setFilters={setFilters} />
          </aside>

          <div className="lg:col-span-9 space-y-6">
            <section className="h-64 bg-brand-card rounded-2xl border border-brand-border p-4">
              <h3 className="text-sm font-semibold mb-4 text-brand-muted uppercase">
                Live Price Trends
              </h3>
              <PriceGraph data={graphData} />
            </section>

            <section>
              <FlightList
                flights={filtered}
                isLoading={isLoading}
                hasSearched={!!searchParams}
                searchParams={searchParams}
              />
            </section>
          </div>
        </div>
      </main>
    </div>
  );
}
