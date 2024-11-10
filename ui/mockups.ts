import { Agency, Line, Stop } from "@/app/lib/definitions";

export const mockupStops: Stop[] = [
  {
    id: 1,
    name: "Stop 1",
    description: "Mockup Stop #1",
    position: { lat: 20.6797, lng: 256.6700 },
  },
  {
    id: 2,
    name: "Stop 2",
    description: "Mockup Stop #2",
    position: { lat: 20.6397, lng: 256.6300 },
  },
  {
    id: 3,
    name: "Stop 3",
    description: "Mockup Stop #3",
    position: { lat: 20.6397, lng: 256.6700 },
  },
];

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

export const mockupAgencies: Agency[] = [
  {
    id: 1,
    name: "Agency 1",
  },
  {
    id: 2,
    name: "Agency 2",
  },
  {
    id: 3,
    name: "Agency 3",
  },
  {
    id: 4,
    name: "Agency 4",
  },
  {
    id: 5,
    name: "Agency 5",
  },
];
