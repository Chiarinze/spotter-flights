# Spotter Flights ✈️

A high-performance, responsive flight search engine built with React, TypeScript, and Tailwind CSS. This project demonstrates a production-ready approach to handling third-party travel APIs, complex state management, and UI resilience.

## 🚀 Live Demo

https://www.google.com/travel/flights

## ✨ Key Features

- **Proactive Data Layer**: Integrated with the Sky-Scrapper (Skyscanner) API to provide real-time flight data, airport searches, and price trends.
- **Resilience Layer (Circuit Breaker)**: Implemented a custom fallback mechanism. If the third-party API hits rate limits or is unavailable, the system gracefully switches to a dynamic mock dataset to maintain a seamless user experience.
- **Dynamic Data Visualization**: Real-time price trend graphs using Recharts that respond instantly to user filters (price range, stops, travel class).
- **Advanced UX Patterns**:
  - Multi-stage "Empty States" with contextual search suggestions.
  - Complex form validation using React Hook Form and Zod (e.g., enforcing return dates for round-trips).
  - Responsive design optimized for mobile, tablet, and desktop.
- **Smart Mocking**: Mock data logic that dynamically scales prices based on passenger count (adults/children) and travel class (Business/First) to reflect realistic pricing scenarios.

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Tailwind CSS
- **State & Logic**: React Hook Form, Zod (Validation), Framer Motion (Animations)
- **Data Fetching**: Axios, TanStack Query
- **Charts**: Recharts
- **Icons**: Lucide React

## 🧠 Engineering Challenges & Solutions

### 1. The API Pivot

Initially, I integrated the Amadeus Self-Service API. However, due to instability in their test environment gateway, I proactively migrated the engine to the Sky-Scrapper API. This pivot ensured project stability and allowed for a richer set of global flight data.

### 2. Handling API Rate Limits

To ensure the application never feels "broken" to a recruiter or user, I implemented a Circuit Breaker pattern in the `flightService`.

```typescript
try {
  // Attempt real-time API call
} catch (error) {
  // Gracefully fall back to dynamic Mock Data
  // Adjust prices based on user's passenger count and travel class
}
```

This ensures that core features like the Price Graph and Filters remain 100% interactive even when the API is at capacity.

### 3. User Experience (UX) Detail

I addressed the "black date icon" visibility issue across browsers using CSS filters and improved accessibility by associating labels with passenger inputs, ensuring the app is usable for everyone.

## 🏁 Getting Started

### Prerequisites

- Node.js (v18+)
- A RapidAPI Key for Sky-Scrapper API

### Installation

1. Clone the repository:

```bash
git clone https://github.com/Chiarinze/spotter-flights.git
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory:

```
VITE_RAPIDAPI_KEY=your_key_here
VITE_RAPIDAPI_HOST=sky-scrapper.p.rapidapi.com
```

4. Start the development server:

```bash
npm run dev
```

## 📜 License

Distributed under the MIT License.
