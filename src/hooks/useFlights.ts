import { useQuery } from '@tanstack/react-query';
import { flightService } from '../api/flightApi';
import type { FlightSearchForm } from '../lib/schema';

export const useFlights = (searchParams: FlightSearchForm | null) => {
  return useQuery({
    queryKey: ['flights', searchParams],
    queryFn: () => flightService.searchFlights(searchParams!),
    enabled: !!searchParams,
    staleTime: 1000 * 60 * 5,
  });
};