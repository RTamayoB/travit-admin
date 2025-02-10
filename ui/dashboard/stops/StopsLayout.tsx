"use client";

import { Position, Stop } from "@/app/lib/definitions";
import { Button, LinkButton } from "@/ui/components";
import styles from "./stopslayout.module.scss";
import { useState } from "react";
import { Header, SearchBar, Table } from "@/ui/sections";
import dynamic from "next/dynamic";

const StopsMap = dynamic(() => import("@/ui/sections/maps/stopsmap"), {
  ssr: false,
});

interface StopsLayoutProps {
  stops: Stop[];
  searchedStops: Stop[];
}

function StopsLayout({
  stops,
  searchedStops,
}: StopsLayoutProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [selectedStop, setSelectedStop] = useState<Position | null>(null);
  const [locationRequested, setLocationRequested] = useState(false);

  const handleSelectStop = (position: Position | null) => {
    if (position) {
      setSelectedStop(position);
      setLocationRequested((prev) => !prev);
    }
  };

  const handleSetIsFocused = (isFocused: boolean) => {
    setTimeout(() => setIsFocused(isFocused), 100);
  };

  return (
    <div>
      <Header
        breadcrumbList={[{
          id: 1,
          label: "Paradas",
          href: "/dashboard/stops",
          active: true,
        }]}
      />
      <SearchBar
        searchPlaceholder="Buscar Paradas..."
        className={styles.searchbar}
        onFocusChange={handleSetIsFocused}
      />
      {(searchedStops && isFocused) && (
        <StopSearchResults
          searchedStops={searchedStops}
          onItemSelected={handleSelectStop}
        />
      )}
      <div className={styles.content}>
        <StopsMap
          initialStops={stops}
          selectedStop={selectedStop}
          locationRequested={locationRequested}
          onStopSelected={handleSelectStop}
        />
      </div>
    </div>
  );
}

function StopSearchResults({
  searchedStops,
  onItemSelected,
}: {
  searchedStops: Stop[];
  onItemSelected: (position: Position) => void;
}) {
  return (
    <div className={styles.searchResults}>
      {searchedStops.map((stop) => (
        <StopItem
          key={stop.id}
          stop={stop}
          onItemSelected={onItemSelected}
        />
      ))}
    </div>
  );
}

function StopItem({
  stop,
  onItemSelected,
}: {
  stop: Stop;
  onItemSelected: (position: Position) => void;
}) {
  const handleSelect = () => {
    console.log(
      "IN ITEM SELECTED IS " + stop.position.lat + " " + stop.position.lng,
    );
    onItemSelected(stop.position);
  };

  return (
    <button
      className={styles.searchOption}
      onClick={handleSelect}
    >
      {stop.name}
    </button>
  );
}

export default StopsLayout;
