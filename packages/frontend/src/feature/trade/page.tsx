import { useEffect, useRef, useState } from "react";

import { useGetFacetedValuesQuery } from "@/services/marketAnalysisAPI";

interface TradeManagerProps {
  instrumentGroup: string;
}

export function TradeManager({ instrumentGroup }: TradeManagerProps) {
  // TODO: Replace with get all counter party Query
  const {
    data: counterParties,
    isLoading,
    isError,
  } = useGetFacetedValuesQuery("instrument_group");
  const connection = useRef<WebSocket | null>(null);
  const [liveData, setLiveData] = useState(new Map<string, number>());

  useEffect(() => {
    const socket = new WebSocket("ws://localhost:8000/ws");

    // Connection opened
    socket.addEventListener("open", (event) => {
      socket.send("Connection established");
    });

    // Listen for messages
    socket.addEventListener("message", (event) => {
      const data = JSON.parse(event.data);
      const counterPartyEvent = data.counterParty;
      const instrumentEvent = data.instrument;
      if (instrumentGroup !== instrumentEvent) {
        console.log("Instrument Group does not match");
        return;
      }
      if (!counterParties.includes(counterPartyEvent)) {
        console.log("Counter Party does not exist");
        return;
      }
      setLiveData((prevState) => {
        const newMap = new Map(prevState);
        newMap.set(counterPartyEvent, data.price);
        return newMap;
      });
    });

    connection.current = socket;

    return () => socket.close();
  }, [instrumentGroups]);
  if (isLoading) {
    return <div>Loading...</div>;
  }
  if (isError) {
    return <div>Loading...</div>;
  }

  return <div> Hi Taz</div>;
}
