"use client";

import {
  Agency,
  Stop,
  TripBuilder,
} from "@/app/lib/definitions";
import { Button, LinkButton, Typography } from "@/ui/components";
import styles from "../../../../ui/sections/forms/form.module.scss";
import { DropdownOption } from "@/ui/components/dropdown";
import { createRoute } from "./create-route";
import { useForm, SubmitHandler, useFieldArray, useWatch } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { RouteSchema } from "@/app/lib/schemas";
import { useEffect, useRef, useState } from "react";
import NewRouteEditMap from "@/ui/sections/maps/routeeditmap/RouteEditMap";

interface RouteFormProps {
  stops: Stop[];
  agencies: Agency[];
  submitButtonText: string;
}

type RouteFormData = z.infer<typeof RouteSchema>

function RouteForm({
  stops,
  agencies,
  submitButtonText,
}: RouteFormProps) {

  const {
    register,
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    watch
  } = useForm<RouteFormData>({
    resolver: zodResolver(RouteSchema)
  });

  const tripsWatch = useWatch({ control, name: "trips" })

  const { fields, update, append, remove } = useFieldArray({
    control,
    name: "trips"
  })

  console.log("Trips changed", watch("trips"))

  const tripBuildersFromForm = (tripsWatch ?? []).reduce((acc, t) => {
    acc[t.formId] = t.trip_builder ?? [];
    return acc;
  }, {} as Record<number, TripBuilder>);

  const onSubmit: SubmitHandler<RouteFormData> = async data => {
    await createRoute(data);
  }

  const formIdCounter = useRef(0)
  const [focusedTripId, setFocusedTripId] = useState<number | null>(null);
  const [tripBuilders, setTripBuilders] = useState<Record<number, TripBuilder>>({});
  const [undoHistory, setUndoHistory] = useState<Record<number, TripBuilder[]>>({});

  // TC: We will use the useEffect to kbnow when the state changes, 
  // mostly for testing, won't affect things as long as we send the prop to the map.
  useEffect(() => {
  console.log("TripBuilders:", tripBuilders);
  console.log("UndoHistory:", undoHistory);
  }, [tripBuilders, undoHistory]);

  const onEditTrip = (id: number) => {
    setFocusedTripId(id)
  }

  const onDeleteTrip = (formId: number) => {
    const index = fields.findIndex(f => f.formId === formId);
    if (index === -1) return
    remove(index)
    setFocusedTripId(null)

    setTripBuilders(prev => {
      const { [formId]: _, ...rest } = prev;
      return rest;
    })

    setUndoHistory(prev => {
      const { [formId]: _, ...rest } = prev;
      return rest;
    })
  }

  const onAddTrip = () => {
    const formId = formIdCounter.current++;
    append({ formId: formId, short_name: "", headsign: "", direction: "inbound", trip_builder: [] })
    setTripBuilders(prev => ({
      ...prev,
      [formId]: []
    }))
    setFocusedTripId(formId)
  }

  const handleBuilderChange = (newBuilder: TripBuilder, formId: number) => {

    const idx = fields.findIndex(f => f.formId === formId);
    if (idx === -1) return;
    setValue(`trips.${idx}.trip_builder`, newBuilder, {
      shouldDirty: true,
      shouldValidate: true,
    });

    setTripBuilders(prev => ({
      ...prev,
      [formId]: newBuilder
    }));

    setUndoHistory(prev => ({
      ...prev,
      [formId]: [...(prev[formId] ?? []), tripBuilders[formId] ?? []]
    }));
  }

  const agencyOptions: DropdownOption<number>[] = agencies.map((agency) => ({
    value: agency.name,
    key: agency.id,
  }));

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.fieldsContainer}>
        <input placeholder="Short Name" {...register("short_name")}/>
        {errors.short_name?.message && (
          <Typography  variant="bodySmall" color="red">
            {errors.short_name.message}
          </Typography>
        )}

        <input placeholder="Long Name" {...register("long_name")}/>
        {errors.long_name?.message && (
          <Typography  variant="bodySmall" color="red">
            {errors.long_name.message}
          </Typography>
        )}

        <input placeholder="Description" {...register("description")}/>
        {errors.description?.message && (
          <Typography  variant="bodySmall" color="red">
            {errors.description.message}
          </Typography>
        )}

        <select {...register("agency_id")}>
          <option value={10}>Uno</option>
        </select>
        {errors.agency_id?.message && (
          <Typography variant="bodySmall" color="red">
            {errors.agency_id.message}
          </Typography>
        )}

        <select {...register("transport_type")}>
          <option value={"bus"}>Bus</option>
          <option value={"tram"}>Tram</option>
          <option value={"streetcar"}>Streetcar</option>
          <option value={"light_rail"}>Light rail</option>
          <option value={"subway"}>Subway</option>
          <option value={"metro"}>Metro</option>
          <option value={"rail"}>Rail</option>
          <option value={"ferry"}>Ferry</option>
          <option value={"cable_tram"}>Cable tram</option>
          <option value={"aerial_lift"}>Aerial lift</option>
          <option value={"funicular"}>Funicular</option>
          <option value={"trolleybus"}>Trolleybus</option>
          <option value={"monorail"}>Monorail</option>
        </select>
        {errors.transport_type?.message && (
          <Typography  variant="bodySmall" color="red">
            {errors.transport_type.message}
          </Typography>
        )}


        <select {...register("route_type")}>
          <option value={"trunk"}>Troncal</option>
          <option value={"complementary"}>Complementaria</option>
          <option value={"feeder_line"}>Alimentadora</option>
        </select>
        {errors.route_type?.message && (
          <Typography  variant="bodySmall" color="red">
            {errors.route_type.message}
          </Typography>
        )}

        <Typography variant="h6">
          Viajes
        </Typography>

        {fields.map((field, index) => (
          <div className={styles.horizontalFieldsContainer} key={field.formId}>
            <input placeholder="Headsign" {...register(`trips.${index}.headsign`)} disabled={focusedTripId !== field.formId}/>
            <input placeholder="Short Name" {...register(`trips.${index}.short_name`)} disabled={focusedTripId !== field.formId}/>
            <select id="direction" {...register(`trips.${index}.direction`)} disabled={focusedTripId !== field.formId}>
              <option value={"inbound"}>Ida</option>
              <option value={"outbound"}>Vuelta</option>
            </select>
            <button type="button" onClick={() => onEditTrip(field.formId)}>Edit trip</button>
            <button type="button" onClick={() => onDeleteTrip(field.formId)}>Delete trip</button>
          </div>
        ))}
        <button type="button" onClick={onAddTrip}>Add Trip</button>
        <div>
          <NewRouteEditMap
            stops={stops}
            focusedTripId={focusedTripId}
            tripBuilders={tripBuildersFromForm}
            onBuilderUpdate={handleBuilderChange}
          />
          <Typography variant={"note"}>
            Da click en una parada para comenzar el recorrido. Si se tiene mas de una parada señalada, dar click añade una nueva seccion a la linea.
          </Typography>
          <Typography variant={"note"}>
            Puedes seleccionar cualquier seccion entre 2 paradas para jalar y agregar un anclaje a la linea.
          </Typography>
          <Typography variant={"note"}>
            Para mover un anclaje, solo arrastralo a una nueva posicion. Has doble click en un anclaje para eliminarlo de la ruta.
          </Typography>
          <Typography variant={"note"}>
            Presiona Shift+D para deshacer la ultima accion realizada.
          </Typography>
        </div>
      </div>
      <div aria-live="polite" aria-atomic="true">
        {errors && (
            <Typography variant="bodyMedium" color="red">
              {errors.root?.message}
            </Typography>
        )}
      </div>
      <div className={styles.actions}>
        <LinkButton
          href={"/dashboard/lines"}
          primary={false}
          label="Cancelar"
        />
        <Button
          label={submitButtonText}
          type="submit"
        />
      </div>
    </form>
  );
}

export default RouteForm;