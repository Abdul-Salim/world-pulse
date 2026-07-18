import WorldPulse from "@/components/world/WorldPulse";
import FlightProvider from "@/features/flights/providers/FlightProvider";

export default function Home() {
  return (
    <FlightProvider>
      <WorldPulse />;
    </FlightProvider>
  )
}