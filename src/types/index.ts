export interface Flight {
  id: string;
  itineraries: {
    duration: string;
    segments: FlightSegment[];
  }[];
  price: {
    currency: string;
    total: string;
    base: string;
  };
  validatingAirlineCodes: string[];
}

export interface FlightSegment {
  departure: { iataCode: string; at: string };
  arrival: { iataCode: string; at: string };
  carrierCode: string;
  numberOfStops: number;
}

export interface AirportLocation {
  id: string;
  name: string;
  iataCode: string;
}

export interface FilterState {
  maxPrice: number;
  stops: number | 'all';
  airlines: string[];
}

export interface PricePoint {
  name: string;
  price: number;
}

export interface SkyScrapperAirport {
  entityId: string;
  skyId: string;
  presentation: {
    title: string;
  };
}

export interface SkyScrapperItinerary {
  id: string;
  price: {
    raw: number;
  };
  legs: {
    durationInMinutes: number;
    stopCount: number;
    carriers: {
      marketing: { name: string }[];
    };
    segments: {
      origin: { displayCode: string };
      destination: { displayCode: string };
      departure: string;
      arrival: string;
      marketingCarrier: { name: string };
    }[];
  }[];
}

export interface SkyScrapperPriceDay {
  day: string;
  price: number;
}