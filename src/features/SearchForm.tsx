import { useForm, useWatch, type Resolver } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { flightSearchSchema, type FlightSearchForm } from "../lib/schema";
import { motion } from "framer-motion";
import { AirportInput } from "../components/AirportInput";
import { ArrowRight, User, Baby, Briefcase } from "lucide-react";

export const SearchForm = ({
  onSearch,
}: {
  onSearch: (data: FlightSearchForm) => void;
}) => {
  const {
    register,
    handleSubmit,
    setValue,
    control,
    formState: { errors },
  } = useForm<FlightSearchForm>({
    resolver: zodResolver(
      flightSearchSchema
    ) as unknown as Resolver<FlightSearchForm>,
    defaultValues: {
      adults: 1,
      children: 0,
      tripType: "one-way",
      travelClass: "ECONOMY",
    },
  });

  const tripType = useWatch<FlightSearchForm>({ control, name: "tripType" });

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-brand-card p-6 rounded-2xl border border-brand-border shadow-2xl"
    >
      <form onSubmit={handleSubmit(onSearch)} className="space-y-6">
        <div className="flex flex-wrap gap-6 items-center border-b border-brand-border pb-4">
          {/* Trip Type Toggle */}
          <div className="flex bg-brand-bg p-1 rounded-lg border border-brand-border">
            {(["one-way", "round-trip"] as const).map((type) => (
              <button
                key={type}
                type="button"
                onClick={() => setValue("tripType", type)}
                className={`px-4 py-1.5 rounded-md text-[10px] uppercase font-bold transition-all ${
                  tripType === type
                    ? "bg-brand-accent text-brand-bg"
                    : "text-brand-muted hover:text-white"
                }`}
              >
                {type.replace("-", " ")}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-brand-muted px-4 border-l border-brand-border">
            <div className="flex items-center gap-2 group cursor-pointer">
              <User
                size={14}
                className="text-brand-muted group-hover:text-brand-accent transition-colors"
              />
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-brand-muted font-bold uppercase leading-none">
                  Adults
                </span>
                <input
                  type="number"
                  {...register("adults", { valueAsNumber: true })}
                  className="w-12 bg-transparent text-brand-accent font-bold outline-none"
                />
              </div>
            </div>

            <div className="flex items-center gap-2 group cursor-pointer">
              <Baby
                size={14}
                className="text-brand-muted group-hover:text-brand-accent transition-colors"
              />
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-brand-muted font-bold uppercase leading-none">
                  Children
                </span>
                <input
                  type="number"
                  {...register("children", { valueAsNumber: true })}
                  className="w-12 bg-transparent text-brand-accent font-bold outline-none"
                />
              </div>
            </div>
          </div>

          {/* Travel Class Dropdown */}
          <div className="flex items-center gap-2 border-l border-brand-border pl-6 group">
            <Briefcase
              size={14}
              className="text-brand-muted group-hover:text-brand-accent"
            />
            <select
              {...register("travelClass")}
              className="bg-transparent text-xs font-bold text-white outline-none cursor-pointer hover:text-brand-accent transition-colors uppercase tracking-wider"
            >
              <option value="ECONOMY" className="bg-brand-card">
                Economy
              </option>
              <option value="PREMIUM_ECONOMY" className="bg-brand-card">
                Premium
              </option>
              <option value="BUSINESS" className="bg-brand-card">
                Business
              </option>
              <option value="FIRST" className="bg-brand-card">
                First Class
              </option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-4">
          <div className="md:col-span-3">
            <AirportInput
              label="Origin"
              onSelect={(code) => setValue("origin", code)}
              error={errors.origin?.message}
            />
          </div>

          <div className="md:col-span-3">
            <AirportInput
              label="Destination"
              onSelect={(code) => setValue("destination", code)}
              error={errors.destination?.message}
            />
          </div>

          <div className="md:col-span-2 flex flex-col gap-1">
            <label className="text-xs text-brand-muted font-medium uppercase">
              Departure
            </label>
            <input
              type="date"
              {...register("departureDate")}
              className="bg-brand-bg border border-brand-border rounded-lg p-3 text-white outline-none focus:border-brand-accent transition-all text-sm"
            />
          </div>

          {tripType === "round-trip" && (
            <div className="md:col-span-2 flex flex-col gap-1">
              <label className="text-xs text-brand-muted font-medium uppercase">
                Return
              </label>
              <input
                type="date"
                {...register("returnDate")}
                className="bg-brand-bg border border-brand-border rounded-lg p-3 text-white outline-none focus:border-brand-accent transition-all text-sm"
              />
            </div>
          )}

          <div
            className={`flex items-end ${
              tripType === "round-trip" ? "md:col-span-2" : "md:col-span-4"
            }`}
          >
            <button
              type="submit"
              className="w-full bg-brand-accent hover:brightness-110 text-brand-bg font-bold py-3 rounded-lg transition-all flex items-center justify-center gap-2 shadow-lg shadow-brand-accent/20"
            >
              SEARCH <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </form>
    </motion.div>
  );
};
