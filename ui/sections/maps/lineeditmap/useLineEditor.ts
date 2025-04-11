import { LineSection, Stop } from "@/app/lib/definitions";
import { Feature, FeatureCollection, LineString, Position } from "geojson";
import { useCallback, useEffect, useRef, useState } from "react";

type AddFeatureParams = {
  startStop: Stop;
  endStop?: Stop;
  geometry?: LineString;
};

type UpdateLastFeatureParams = {
  endStop: Stop;
  geometry: LineString;
};

type UpdateFeatureAtIndexParams = {
  selectedIndex: number;
  anchors: Position[];
  geometry: LineString;
};

type UndoAction = {
  undo: () => void;
}

export function useLineEditor(
  initial: FeatureCollection<LineString, LineSection>,
  onUpdate: (fc: FeatureCollection<LineString, LineSection>) => void
) {
  const [undoStack, setUndoStack] = useState<UndoAction[]>([])
  const [featureCollection, setFeatureCollection] = useState(initial)

  const onUndo = useCallback(() => {
    setUndoStack((prev) => {
      const copy = [...prev];
      const last = copy.pop();
      if (last) last.undo();
      return copy;
    });
  }, [undoStack])

  const applyUpdate = useCallback((
    newCollection: FeatureCollection<LineString, LineSection>, 
    previousCollection: FeatureCollection<LineString, LineSection>
  ) => {
    setFeatureCollection(newCollection)
    setUndoStack((prev) => [
      ...prev,
      { undo: () => setFeatureCollection(previousCollection) }
    ]);
    onUpdate(newCollection)
  }, [onUpdate])

  const addFeature = useCallback(({ startStop, endStop, geometry = { type: "LineString", coordinates: [] } }: AddFeatureParams) => {
    const newFeature: Feature<LineString, LineSection> = {
      type: "Feature",
      id: featureCollection.features.length,
      properties: { startStop, ...(endStop && { endStop }) },
      geometry
    };

    const newCollection: FeatureCollection<LineString, LineSection> = {
      ...featureCollection,
      features: [...featureCollection.features, newFeature]
    };

    applyUpdate(newCollection, featureCollection);
  }, [featureCollection, applyUpdate, onUpdate]);

  const updateLastFeature = useCallback(({
    endStop,
    geometry
  }: UpdateLastFeatureParams) => {
    const lastIndex = featureCollection.features.length - 1;
    if (lastIndex < 0) return;

    const updatedFeatures = featureCollection.features.map((feature, index) => 
      index === lastIndex
        ? {
            ...feature,
            properties: { ...feature.properties, endStop },
            geometry
          }
        : feature
      );

    const newCollection = { ...featureCollection, features: updatedFeatures };
    applyUpdate(newCollection, featureCollection);
  }, [featureCollection, applyUpdate, onUpdate]);

  const updateFeatureAtIndex = useCallback(({ selectedIndex, anchors, geometry }: UpdateFeatureAtIndexParams) => {
    const updatedFeatures = featureCollection.features.map((feature, index) =>
      index === selectedIndex
        ? {
            ...feature,
            properties: { ...feature.properties, anchors },
            geometry
          }
        : feature
    );

    const newCollection = { ...featureCollection, features: updatedFeatures };
    applyUpdate(newCollection, featureCollection);
  }, [featureCollection, applyUpdate, onUpdate]);

  return {
    featureCollection,
    onUndo,
    addFeature,
    updateLastFeature,
    updateFeatureAtIndex
  };
}
