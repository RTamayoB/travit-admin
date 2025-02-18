import MarkerClusterGroup from "react-leaflet-cluster";
import Map from "../base/map";
import { Position, Stop, StopState } from "@/app/lib/definitions";
import { useMapEvents } from "react-leaflet";
import { useActionState, useEffect, useState } from "react";
import { Icon, LatLng } from "leaflet";
import StopMarker from "../base/markers/markerwithpopup/StopMarker";
import DraggableMarker from "../base/markers/dragglablemarker";
import StopFormDialog from "../../dialogs/stopformdialog";
import ConfirmationDialog from "../../dialogs/confirmationdialog";
import { createStop } from "@/app/dashboard/stops/data/create-stop";
import {
  cancelStopEdit,
  editStopById,
} from "@/app/dashboard/stops/data/edit-stop";
import { deleteStop } from "@/app/dashboard/stops/data/delete-stop";
import styles from "./stopsmap.module.scss";

const stopIcon = new Icon({
  iconUrl: "/images/bus-stop.svg",
  iconSize: [24, 24],
  iconAnchor: [12, 12],
});

interface StopsMapProps {
  initialStops: Stop[];
  selectedStop: Position | null;
  locationRequested: boolean;
  onStopSelected: (position: Position | null) => void;
}

function StopsMap({
  initialStops,
  selectedStop,
  locationRequested,
  onStopSelected
}: StopsMapProps) {
  const [newStopPosition, setNewStopPosition] = useState<LatLng | null>(null);
  const [stopToEdit, setStopToEdit] = useState<Stop | null>(null);
  const [stopToDelete, setStopToDelete] = useState<Stop | null>(null);

  const initialState: StopState = { message: null, errors: {} };
  const [createState, createFormAction] = useActionState(
    createStop,
    initialState,
  );
  const editStop = editStopById.bind(
    null,
    stopToEdit ? stopToEdit.id.toString() : "0",
  );
  const [editState, editFormAction] = useActionState(editStop, initialState);

  //CREATE

  const handleOnCreateStop = async (newStopPosition: LatLng) => {
    await cancelStopEdit();
    setNewStopPosition(newStopPosition);
    setStopToEdit(null);
    setStopToDelete(null);
  };

  const handleOnLocateNewStop = () => {
    if (newStopPosition) {
      onStopSelected(newStopPosition);
    }
  };

  const handleOnConfirmCreate = async (formData: FormData) => {
    if (newStopPosition) {
      createFormAction(formData);
    }
  };

  const handleOnCancelCreate = () => {
    createState.errors = {};
    createState.message = "";
    setNewStopPosition(null);
    setStopToEdit(null);
    setStopToDelete(null);
  };

  //EDIT

  const handleOnEditStop = async (stop: Stop) => {
    await cancelStopEdit();
    setStopToEdit(stop);
    setNewStopPosition(null);
    setStopToDelete(null);
  };

  const handleOnLocateEditedStop = () => {
    if (stopToEdit) {
      onStopSelected(stopToEdit?.position);
    }
  };

  const handleOnMarkerMoved = (stop: Stop) => {
    if (stop.id == stopToEdit?.id) {
      setStopToEdit(stop);
    }
  };

  const handleOnConfirmEdit = async (formData: FormData) => {
    if (stopToEdit) {
      editFormAction(formData);
    }
  };

  const handleOnCancelEdit = async () => {
    editState.errors = {};
    editState.message = "";
    setStopToEdit(null);
    await cancelStopEdit();
  };

  //DELETE

  const handleOnDeleteStop = (stop: Stop) => {
    setStopToDelete(stop);
    setNewStopPosition(null);
    setStopToEdit(null);
  };

  const handleConfirmDelete = async () => {
    if (stopToDelete) {
      await deleteStop(stopToDelete.id.toString());
      setStopToDelete(null);
    }
  };

  const handleCancelDelete = () => {
    setStopToDelete(null);
  };

  useEffect(() => {
    if (
      !createState.errors ||
      (!createState.errors.name?.length &&
        !createState.errors.description?.length)
    ) {
      setNewStopPosition(null);
    }
    if (
      !editState.errors ||
      (!editState.errors.name?.length && !editState.errors.description?.length)
    ) {
      setStopToEdit(null);
    }
  }, [editState, createState]);

  return (
    <div className={styles.mapContainer}>
      <Map>
        <MarkerClusterGroup
          disableClusteringAtZoom={18}
          chunkedLoading
        >
          {initialStops.map((stop) => (
            <StopMarker
              stop={stop}
              key={stop.id}
              initialPosition={stop.position}
              label={stop.name}
              draggable={stopToEdit?.id == stop.id}
              onEditStop={handleOnEditStop}
              onMarkerMoved={handleOnMarkerMoved}
              onDeleteStop={handleOnDeleteStop}
            />
          ))};
        </MarkerClusterGroup>
        {newStopPosition != null && (
          <DraggableMarker
            key={0}
            initialPosition={newStopPosition}
            onDragEnd={handleOnCreateStop}
            icon={stopIcon}
            opacity={0.5}
          />
        )}
        <MapEvents
          selectedStopPosition={selectedStop}
          locationRequested={locationRequested}
          onCreateStop={handleOnCreateStop}
        />
      </Map>
      <div className={styles.dialogContainer}>
        {newStopPosition && (
          <StopFormDialog
            isOpen={newStopPosition != null}
            position={newStopPosition}
            state={createState}
            title="Nueva parada"
            submitButtonText="¿Guardar parada?"
            onLocateStop={handleOnLocateNewStop}
            onClose={handleOnCancelCreate}
            onConfirm={handleOnConfirmCreate}
          />
        )}
        {stopToEdit && (
          <StopFormDialog
            stop={stopToEdit}
            isOpen={stopToEdit != null}
            position={new LatLng(
              stopToEdit.position.lat,
              stopToEdit.position.lng,
            )}
            state={editState}
            title="Editar parada"
            submitButtonText="¿Editar parada?"
            onLocateStop={handleOnLocateEditedStop}
            onClose={handleOnCancelEdit}
            onConfirm={handleOnConfirmEdit}
          />
        )}
        {stopToDelete && (
          <ConfirmationDialog
            isOpen={stopToDelete != null}
            onClose={handleCancelDelete}
            onConfirm={handleConfirmDelete}
            onCloseText="Cancelar"
            onConfirmText="Eliminar"
            title="¿Eliminar Parada?"
            message={`¿Desea eliminar la parada ${stopToDelete.name}? Esta acción no se podrá deshacer y su información se perderá.`}
          />
        )}
      </div>
    </div>
  );
}

function MapEvents({
  selectedStopPosition,
  locationRequested,
  onCreateStop,
}: {
  selectedStopPosition: Position | null;
  locationRequested: boolean;
  onCreateStop: (newStopPosition: LatLng) => void;
}) {
  const map = useMapEvents({
    contextmenu(e) {
      onCreateStop(e.latlng);
    },
  });

  useEffect(() => {
    if (selectedStopPosition) {
      map.setView(selectedStopPosition, 18, {
        animate: true,
        duration: 0.5,
      });
    }
  }, [selectedStopPosition, map, locationRequested]);

  return null;
}

export default StopsMap;
