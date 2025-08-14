import { Agency, Line, Route, Stop } from "@/app/lib/definitions";

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

export const mockupRoutes: Route[] = [
  {
    id: 1,
    short_name: "Route 1",
    long_name: "Route 1",
    agency_id: 1,
    description: "Mockup Route #1",
    type: "bus",
    trips: [
      {
        id: 1,
        headsign: "Head 1",
        short_name: "Short 1",
        direction: "inbound",
        polyline: {
          type: "LineString",
          coordinates: [
            [20.6797, 256.6700],
            [20.6397, 256.6300],
          ],
        },
        trip_builder: [],
      },
    ],
  },
  {
    id: 2,
    short_name: "Route 2",
    long_name: "Route 2",
    agency_id: 1,
    description: "Mockup Route #2",
    type: "bus",
    trips: [
      {
        id: 2,
        headsign: "Head 2",
        short_name: "Short 2",
        direction: "outbound",
        polyline: {
          type: "LineString",
          coordinates: [
            [20.6397, 256.6300],
            [20.6797, 256.6700],
          ],
        },
        trip_builder: [],
      },
    ],
  },
  {
    id: 3,
    short_name: "Route 3",
    long_name: "Route 3",
    agency_id: 1,
    description: "Mockup Route #3",
    type: "bus",
    trips: [
      {
        id: 3,
        headsign: "Head 3",
        short_name: "Short 3",
        direction: "inbound",
        polyline: {
          type: "LineString",
          coordinates: [
            [20.6397, 256.6300],
            [20.6797, 256.6700],
          ],
        },
        trip_builder: [],
      },
    ],
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
    route: {
      type: "FeatureCollection",
      features: []
    }
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
    route: {
      type: "FeatureCollection",
      features: []
    }
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
