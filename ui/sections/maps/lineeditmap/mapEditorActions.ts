import { LineSection } from "@/app/lib/definitions";
import { Feature, FeatureCollection, LineString } from "geojson";

export interface MapAction {
  undo: () => void;
  execute: () => void;
}

export class AddStopAction implements MapAction {
  constructor(
    private featureCollection: FeatureCollection<LineString, LineSection>,
    private setFeatureCollection: (collection: FeatureCollection<LineString, LineSection>) => void
  ) {}

  execute() {
    this.setFeatureCollection(this.featureCollection);
  }

  undo() {
    const newCollection = {
      ...this.featureCollection,
      features: this.featureCollection.features.filter((_, index) => index !== this.featureCollection.features.length - 1)
    }
    this.setFeatureCollection(newCollection);
  }
}

export class AddAnchorAction implements MapAction {
  constructor(
    private featureIndex: number,
    private previousFeature: Feature<LineString, LineSection>,
    private featureCollection: FeatureCollection<LineString, LineSection>,
    private setFeatureCollection: (collection: FeatureCollection<LineString, LineSection>) => void
  ) {}

  execute() {
    this.setFeatureCollection(this.featureCollection)
  }

  undo() {
    const newCollection = {
      ...this.featureCollection,
      features: this.featureCollection.features.map((feature, index) => 
        index === this.featureIndex ? this.previousFeature : feature
      )
    }
    this.setFeatureCollection(newCollection)
  }
}
