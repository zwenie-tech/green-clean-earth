"use client";
import Loading from "@/components/loading";
import dynamic from "next/dynamic";
import { useState, useEffect } from "react";
import "./car.css";

let loadedCallback: any = null;
let loaded = false;

const Odometer = dynamic(
  async () => {
    const mod = await import("react-odometerjs");
    loaded = true;
    if (loadedCallback != null) {
      loadedCallback();
    }
    return mod;
  },
  {
    ssr: false,
    loading: () => <Loading />,
  }
);

export default function Home({ value }: { value: number | null }) {
  const [odometerLoaded, setOdometerLoaded] = useState(loaded);
  const [odometerValue, setOdometerValue] = useState(0);

  loadedCallback = () => {
    setOdometerLoaded(true);
  };

  useEffect(() => {
    if (odometerLoaded) {
      setOdometerValue(0);
    }
  }, [odometerLoaded]);

  useEffect(() => {
    setOdometerValue(value || 0);
  }, [value]);

  return (
    <Odometer
      value={odometerValue}
      format="(,ddd)"
      theme="car"
      style={{ transform: "scale(2)" }}
    />
  );
}
