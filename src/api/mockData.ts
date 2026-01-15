import type { Flight } from "../types";

export const MOCK_FLIGHTS: Flight[] = [
  {
    id: "demo-1",
    validatingAirlineCodes: ["Virgin Atlantic"],
    price: { total: "450.00", currency: "USD", base: "400.00" },
    itineraries: [
      {
        duration: "450m",
        segments: [
          {
            departure: { iataCode: "LHR", at: "2026-02-01T10:00:00" },
            arrival: { iataCode: "JFK", at: "2026-02-01T13:30:00" },
            carrierCode: "Virgin Atlantic",
            numberOfStops: 0,
          },
        ],
      },
    ],
  },
  {
    id: "demo-2",
    validatingAirlineCodes: ["British Airways"],
    price: { total: "520.00", currency: "USD", base: "480.00" },
    itineraries: [
      {
        duration: "460m",
        segments: [
          {
            departure: { iataCode: "LHR", at: "2026-02-01T14:00:00" },
            arrival: { iataCode: "JFK", at: "2026-02-01T17:40:00" },
            carrierCode: "British Airways",
            numberOfStops: 0,
          },
        ],
      },
    ],
  },
  {
    id: "demo-3",
    validatingAirlineCodes: ["Air France"],
    price: { total: "380.00", currency: "USD", base: "310.00" },
    itineraries: [
      {
        duration: "620m",
        segments: [
          {
            departure: { iataCode: "LHR", at: "2026-02-01T08:00:00" },
            arrival: { iataCode: "JFK", at: "2026-02-01T15:20:00" },
            carrierCode: "Air France",
            numberOfStops: 1,
          },
        ],
      },
    ],
  },
  {
    id: "demo-4",
    validatingAirlineCodes: ["Delta Airlines"],
    price: { total: "980.00", currency: "USD", base: "900.00" },
    itineraries: [
      {
        duration: "445m",
        segments: [
          {
            departure: { iataCode: "LHR", at: "2026-02-01T11:30:00" },
            arrival: { iataCode: "JFK", at: "2026-02-01T14:55:00" },
            carrierCode: "Delta Airlines",
            numberOfStops: 0,
          },
        ],
      },
    ],
  },
  {
    id: "demo-5",
    validatingAirlineCodes: ["Lufthansa"],
    price: { total: "410.00", currency: "USD", base: "350.00" },
    itineraries: [
      {
        duration: "580m",
        segments: [
          {
            departure: { iataCode: "LHR", at: "2026-02-01T06:45:00" },
            arrival: { iataCode: "JFK", at: "2026-02-01T13:25:00" },
            carrierCode: "Lufthansa",
            numberOfStops: 1,
          },
        ],
      },
    ],
  },
  {
    id: "demo-6",
    validatingAirlineCodes: ["United Airlines"],
    price: { total: "1200.00", currency: "USD", base: "1100.00" },
    itineraries: [
      {
        duration: "470m",
        segments: [
          {
            departure: { iataCode: "LHR", at: "2026-02-01T16:20:00" },
            arrival: { iataCode: "JFK", at: "2026-02-01T20:10:00" },
            carrierCode: "United Airlines",
            numberOfStops: 0,
          },
        ],
      },
    ],
  },
  {
    id: "demo-7",
    validatingAirlineCodes: ["KLM"],
    price: { total: "320.00", currency: "USD", base: "280.00" },
    itineraries: [
      {
        duration: "710m",
        segments: [
          {
            departure: { iataCode: "LHR", at: "2026-02-01T09:15:00" },
            arrival: { iataCode: "JFK", at: "2026-02-01T18:05:00" },
            carrierCode: "KLM",
            numberOfStops: 1,
          },
        ],
      },
    ],
  },
  {
    id: "demo-8",
    validatingAirlineCodes: ["American Airlines"],
    price: { total: "650.00", currency: "USD", base: "600.00" },
    itineraries: [
      {
        duration: "455m",
        segments: [
          {
            departure: { iataCode: "LHR", at: "2026-02-01T12:00:00" },
            arrival: { iataCode: "JFK", at: "2026-02-01T15:35:00" },
            carrierCode: "American Airlines",
            numberOfStops: 0,
          },
        ],
      },
    ],
  },
  {
    id: "demo-9",
    validatingAirlineCodes: ["Swiss Air"],
    price: { total: "890.00", currency: "USD", base: "820.00" },
    itineraries: [
      {
        duration: "600m",
        segments: [
          {
            departure: { iataCode: "LHR", at: "2026-02-01T07:30:00" },
            arrival: { iataCode: "JFK", at: "2026-02-01T14:30:00" },
            carrierCode: "Swiss Air",
            numberOfStops: 1,
          },
        ],
      },
    ],
  },
  {
    id: "demo-10",
    validatingAirlineCodes: ["Iberia"],
    price: { total: "495.00", currency: "USD", base: "440.00" },
    itineraries: [
      {
        duration: "640m",
        segments: [
          {
            departure: { iataCode: "LHR", at: "2026-02-01T10:45:00" },
            arrival: { iataCode: "JFK", at: "2026-02-01T18:25:00" },
            carrierCode: "Iberia",
            numberOfStops: 1,
          },
        ],
      },
    ],
  },
];
