import { Line } from "@/app/lib/definitions";

export const mockupLines: Line[] = [
  {
    id: 1,
    line_number: "C01",
    legacy_line_number: "T-001",
    units: 25,
    agency_id: 1,
    transport_type: "bus",
    line_type: "troncal",
    route_points: [
      {
        order: 1,
        position: { lat: 20.6597, lng: 256.6500 },
        isStop: false,
        busStop: null,
      },
      {
        order: 2,
        position: { lat: 20.6697, lng: 256.6700 },
        isStop: true,
        busStop: null,
      },
    ],
  },
  {
    id: 2,
    line_number: "C02",
    legacy_line_number: "T-002",
    units: 30,
    agency_id: 2,
    transport_type: "bus",
    line_type: "troncal",
    route_points: [
      {
        order: 1,
        position: { lat: 20.6497, lng: 256.6400 },
        isStop: false,
        busStop: null,
      },
      {
        order: 2,
        position: { lat: 20.6397, lng: 256.6300 },
        isStop: true,
        busStop: null,
      },
    ],
  },
];
