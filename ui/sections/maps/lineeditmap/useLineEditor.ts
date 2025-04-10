import { LineSection, Stop } from "@/app/lib/definitions";
import { Feature, FeatureCollection, LineString, Position } from "geojson";
import { useCallback, useState } from "react";
import { AddAnchorAction, AddStopAction, MapAction } from "./mapEditorActions";

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

export function useLineEditor(
  initial: FeatureCollection<LineString, LineSection>,
  onUpdate: (fc: FeatureCollection<LineString, LineSection>) => void
) {
  const [undoStack, setUndoStack] = useState<MapAction[]>([])
  const [featureCollection, setFeatureCollection] = useState(initial)

  const onUndo = useCallback(() => {
    if (undoStack.length > 0) {
      const lastAction = undoStack.pop();
      if (lastAction) {
        lastAction.undo();
        setUndoStack([...undoStack])
      }
    }
  }, [undoStack])

  const applyUpdate = useCallback((
    newCollection: FeatureCollection<LineString, LineSection>, 
    action: MapAction
  ) => {
    setFeatureCollection(newCollection)
    setUndoStack((prev) => [...prev, action])
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

    applyUpdate(newCollection, new AddStopAction(newCollection, onUpdate));
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
    applyUpdate(newCollection, new AddStopAction(newCollection, onUpdate));
  }, [featureCollection, applyUpdate, onUpdate]);

  const updateFeatureAtIndex = useCallback(({ selectedIndex, anchors, geometry }: UpdateFeatureAtIndexParams) => {
    const previousFeature = featureCollection.features[selectedIndex];

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
    applyUpdate(newCollection, new AddAnchorAction(selectedIndex, previousFeature, newCollection, onUpdate));
  }, [featureCollection, applyUpdate, onUpdate]);

  return {
    featureCollection,
    onUndo,
    addFeature,
    updateLastFeature,
    updateFeatureAtIndex
  };
}
