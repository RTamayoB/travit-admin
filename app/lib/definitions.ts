import { FeatureCollection, Position  as GeoJsonPosition, LineString} from 'geojson';

export type Agency = {
  id: number;
  name: string;
};

export interface Stop {
  id: number;
  name: string;
  description: string;
  position: Position;
}

export interface UserInfo {
  id: number;
  full_name: string;
  username: string;
  role: string;
}

export interface Position {
  lat: number;
  lng: number;
}

export type LineSection = {
  startStop?: Stop,
  endStop?: Stop,
  anchors?: GeoJsonPosition[]
}

export interface RoutePoint {
  order: number;
  position: Position;
  isStop: boolean;
  busStop: Stop | null;
}

export interface Line {
  id: number;
  line_number: string;
  legacy_line_number: string;
  units: number;
  agency_id: number;
  transport_type: string;
  line_type: string;
  route_points: RoutePoint[] | [];
  route: FeatureCollection<LineString, LineSection>
}

export interface LineHistory {
  id: number;
  created_at: string;
  line_id: number;
  action: string;
  old_data: Line;
  new_data: Line;
}

export enum Action {
  INSERT = "I",
  UPDATE = "U",
  DELETE = "D",
}

export enum RequestStatus {
  PENDING = "pending",
  APPROVED = "approved",
  REJECTED = "rejected",
}

export interface LineChangeRequest {
  id: number;
  created_at: string;
  line_id: number | null;
  data: string;
  requester_name: string;
  action: Action;
  status: RequestStatus;
  notes: string;
}

export type LineState = {
  errors?: {
    line_number?: string[];
    legacy_line_number?: string[];
    units?: string[];
    agency_id?: string[];
    transport_type?: string[];
    line_type?: string[];
  };
  message?: string | null;
};

export type AgencyState = {
  errors?: {
    name?: string[];
  };
  message?: string | null;
};

export type StopState = {
  errors?: {
    name?: string[];
    description?: string[];
  };
  message?: string | null;
};
