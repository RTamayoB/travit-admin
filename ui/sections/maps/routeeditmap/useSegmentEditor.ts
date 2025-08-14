import { Segment, Stop } from "@/app/lib/definitions";
import { LineString, Position } from "geojson";
import { useCallback, useEffect, useState } from "react";

export type AddFirstSegmentParams = {
  startStop: Stop;
}

export type AddSegmentParams = {
  startStop: Stop;
  endStop: Stop;
  geometry?: LineString;
}

export type UpdateLastSegmentParams = {
  endStop: Stop;
  geometry: LineString;
};

export type UpdateSegmentAtIndexParams = {
  selectedIndex: number;
  anchors: Position[];
  geometry: LineString;
};

export type UndoAction = {
  undo: () => void;
}

export function  useSegmentEditor(
  tripBuilderId: string | number | null,
  initialSegments: Segment[],
  initialStops: Stop[],
  onUpdate: (segments: Segment[], stops: Stop[]) => void
) {
  // NOTE: Although we create the route list, for now it will stay here. 
  // In the future, we will use it for the visual stops list. Right 
  // now, the list of stops to save on the DB will be created on the data layer.
  const [segments, setSegments] = useState<Segment[]>(initialSegments);
  const [routeStops, setRouteStops] = useState<Stop[]>(initialStops);
  const [undoStack, setUndoStack] = useState<UndoAction[]>([]);

    // Reset when tripId changes
  useEffect(() => {
    setSegments(initialSegments);
    setRouteStops(initialStops);
    setUndoStack([]); // Discard undo history
  }, [tripBuilderId]);

  const applyUpdate = useCallback((
    newSegments: Segment[], 
    newStops: Stop[], 
    prevSegments: Segment[], 
    prevStops: Stop[]
  ) => {
    setSegments(newSegments);
    setRouteStops(newStops);
    setUndoStack((prev) => [
      ...prev,
      { undo: () => {
        setSegments(prevSegments);
        setRouteStops(prevStops);
        onUpdate(prevSegments, prevStops)
      }},
    ]);
    onUpdate(newSegments, newStops)
  }, [onUpdate]);

  const onUndo = useCallback(() => {
    setUndoStack((prev) => {
      const copy = [...prev];
      const last = copy.pop();
      if (last) last.undo();
      return copy;
    });
  }, [undoStack]);

  const addFirstSegment = useCallback(({ startStop } : AddFirstSegmentParams) => {
    const prevSegments = [...segments];
    const prevStops = [...routeStops];

    const newSegment: Segment = {
      id: segments.length,
      startStop: startStop
    };

    const newSegments = [...segments, newSegment];
    const newStops = [...routeStops, startStop]

    applyUpdate(newSegments, newStops, prevSegments, prevStops);

  }, [segments, routeStops, applyUpdate, onUpdate]);

  const addSegment = useCallback(({ startStop, endStop, geometry = { type: "LineString", coordinates: [] }} : AddSegmentParams) => {
    const prevSegments = [...segments];
    const prevStops = [...routeStops];

    const newSegment: Segment = {
      id: segments.length,
      startStop: startStop,
      endStop: endStop,
      geometry: geometry
    }

    const newSegments = [...segments, newSegment]
    const newStops = [...routeStops, endStop]
    applyUpdate(newSegments, newStops, prevSegments, prevStops)
  }, [segments, routeStops, applyUpdate, onUpdate]);

  const updateLastSegment = useCallback(({ endStop, geometry }: UpdateLastSegmentParams) => {
    const lastSegmentIndex = segments.length - 1;
    if (lastSegmentIndex < 0) return;

    const updatedSegments = segments.map((segment, index) => 
      index === lastSegmentIndex
      ? {
          ...segment,
          endStop: endStop,
          geometry: geometry
        }: segment
      );

    const newStops = [...routeStops, endStop]
    applyUpdate(updatedSegments, newStops, segments, routeStops)
  }, [segments, routeStops, applyUpdate, onUpdate]);

  const updateSegmentAt = useCallback(({ selectedIndex, anchors, geometry } : UpdateSegmentAtIndexParams) => {
    const updatedSegments = segments.map((segment, index) => 
      index === selectedIndex
      ? {
          ...segment,
          anchors: anchors,
          geometry: geometry
        } : segment
      );

    applyUpdate(updatedSegments, routeStops, segments, routeStops)
  }, [segments, routeStops, applyUpdate, onUpdate]);

  return {
    segments,
    routeStops,
    onUndo,
    addFirstSegment,
    addSegment,
    updateLastSegment,
    updateSegmentAt
  };
}