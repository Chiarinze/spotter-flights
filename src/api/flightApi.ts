import axios from "axios";
import type { FlightSearchForm } from "../lib/schema";
import type {
  Flight,
  AirportLocation,
  PricePoint,
  SkyScrapperAirport,
  SkyScrapperItinerary,
  SkyScrapperPriceDay,
} from "../types";
import { MOCK_FLIGHTS } from "./mockData";

const client = axios.create({
  baseURL: "https://sky-scrapper.p.rapidapi.com/api/v1/flights",
  headers: {
    "X-RapidAPI-Key": import.meta.env.VITE_RAPIDAPI_KEY,
    "X-RapidAPI-Host": import.meta.env.VITE_RAPIDAPI_HOST,
  },
});

export const flightService = {
  async getAirports(keyword: string): Promise<AirportLocation[]> {
    if (!keyword || keyword.length < 2) return [];

    try {
      const { data } = await client.get("/searchAirport", {
        params: { query: keyword },
      });

      return data.data.map((item: SkyScrapperAirport) => ({
        id: item.entityId,
        name: item.presentation.title,
        iataCode: item.skyId,
      }));
    } catch (error) {
      console.warn(
        "Airport API unavailable, using fallback suggestions",
        error
      );
      const fallbacks = [
        { id: "95673320", name: "London Heathrow", iataCode: "LHR" },
        { id: "95673347", name: "New York JFK", iataCode: "JFK" },
        { id: "95673511", name: "Lagos Murtala Muhammed", iataCode: "LOS" },
        { id: "95673336", name: "Madrid Barajas", iataCode: "MAD" },
      ];
      return fallbacks.filter(
        (f) =>
          f.name.toLowerCase().includes(keyword.toLowerCase()) ||
          f.iataCode.toLowerCase().includes(keyword.toLowerCase())
      );
    }
  },

  async searchFlights(params: FlightSearchForm): Promise<Flight[]> {
    try {
      const originRes = await this.getAirports(params.origin);
      const destRes = await this.getAirports(params.destination);

      if (!originRes.length || !destRes.length) return MOCK_FLIGHTS;

      const { data } = await client.get("/searchFlights", {
        params: {
          originSkyId: originRes[0].iataCode,
          destinationSkyId: destRes[0].iataCode,
          originEntityId: originRes[0].id,
          destinationEntityId: destRes[0].id,
          date: params.departureDate,
          returnDate:
            params.tripType === "round-trip" ? params.returnDate : undefined,
          adults: params.adults,
          children: params.children,
          currency: "USD",
        },
      });

      return data.data.itineraries.map((it: SkyScrapperItinerary) => ({
        id: it.id,
        validatingAirlineCodes: [it.legs[0].carriers.marketing[0].name],
        price: {
          total: it.price.raw.toString(),
          currency: "USD",
          base: (it.price.raw * 0.9).toFixed(2),
        },
        itineraries: [
          {
            duration: `${it.legs[0].durationInMinutes}m`,
            segments: it.legs[0].segments.map((seg) => ({
              departure: {
                iataCode: seg.origin.displayCode,
                at: seg.departure,
              },
              arrival: {
                iataCode: seg.destination.displayCode,
                at: seg.arrival,
              },
              carrierCode: seg.marketingCarrier.name,
              numberOfStops: it.legs[0].stopCount,
            })),
          },
        ],
      }));
    } catch (error) {
      console.error(
        "Flight Search Error/Limit. Falling back to Mock Data",
        error
      );

      const classMultiplier =
        params.travelClass === "FIRST"
          ? 4
          : params.travelClass === "BUSINESS"
          ? 2.5
          : params.travelClass === "PREMIUM_ECONOMY"
          ? 1.5
          : 1;

      return MOCK_FLIGHTS.map((flight) => ({
        ...flight,
        price: {
          ...flight.price,
          total: (parseFloat(flight.price.total) * classMultiplier).toFixed(2),
        },
      }));
    }
  },

  async getPriceTrends(
    origin: string,
    destination: string
  ): Promise<PricePoint[]> {
    try {
      const { data } = await client.get("/getPriceCalendar", {
        params: { originSkyId: origin, destinationSkyId: destination },
      });

      return data.data.flights.days.map((day: SkyScrapperPriceDay) => ({
        name: day.day,
        price: day.price,
      }));
    } catch (error) {
      console.warn(
        "Trend API Limit: Generating trend from current flights",
        error
      );
      // Use price points from mock data to keep the graph alive
      return MOCK_FLIGHTS.map((f) => ({
        name: f.itineraries[0].segments[0].departure.at.split("T")[0],
        price: parseFloat(f.price.total),
      })).sort((a, b) => a.price - b.price);
    }
  },
};
