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
}

function StopsLayout({
  stops,
}: StopsLayoutProps) {
  //VIEW
  const [selectedStop, setSelectedStop] = useState<Position | null>(null);

  const handleSelectStop = (stop: Stop) => {
    setSelectedStop(stop.position);
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
      />
      <div className={styles.content}>
        <Table
          data={stops}
          keysToIgnore={["position"]}
          actions={(stop) => (
            <div className={styles.actions}>
              <Button
                primary={false}
                onClick={() => handleSelectStop(stop)}
                leadIconUrl="/images/map-pin.svg"
              />
              <LinkButton
                href={`/dashboard/stops/${stop.id}/edit`}
                primary={false}
                leadIconUrl="/icons/edit.svg"
              />
              <Button
                primary={false}
                leadIconUrl="/icons/delete.svg"
              />
            </div>
          )}
        />
        <StopsMap
          initialStops={stops}
          selectedStop={selectedStop}
        />
      </div>
    </div>
  );
}

export default StopsLayout;
