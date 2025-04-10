import { Coordinates } from "@mapbox/mapbox-sdk/lib/classes/mapi-request";
import { Position as GeoJsonPosition } from "geojson";
import { Position } from "./definitions";

export const ITEMS_PER_PAGE = 6;

export const generatePagination = (currentPage: number, totalPages: number) => {
  // If the total number of pages is 7 or less,
  // display all pages without any ellipsis.
  if (totalPages <= 7) {
    return Array.from({ length: totalPages }, (_, i) => i + 1);
  }

  // If the current page is among the first 3 pages,
  // show the first 3, an ellipsis, and the last 2 pages.
  if (currentPage <= 3) {
    return [1, 2, 3, "...", totalPages - 1, totalPages];
  }

  // If the current page is among the last 3 pages,
  // show the first 2, an ellipsis, and the last 3 pages.
  if (currentPage >= totalPages - 2) {
    return [1, 2, "...", totalPages - 2, totalPages - 1, totalPages];
  }

  // If the current page is somewhere in the middle,
  // show the first page, an ellipsis, the current page and its neighbors,
  // another ellipsis, and the last page.
  return [
    1,
    "...",
    currentPage - 1,
    currentPage,
    currentPage + 1,
    "...",
    totalPages,
  ];
};

export const formatDateToLocal = (
  dateStr: string,
  locale: string = "en-US",
) => {
  const date = new Date(dateStr);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "short",
    year: "numeric",
  };
  const formatter = new Intl.DateTimeFormat(locale, options);
  return formatter.format(date);
};

export const normalizeLongitude = (lng: number): number => {
  return ((lng + 180) % 360 + 360) % 360 - 180;
};

export const positionToGeoPosition = (pos?: Position): GeoJsonPosition => {
  if (!pos) return [0, 0];

  const lng = parseFloat(normalizeLongitude(pos.lng).toFixed(6));
  const lat = parseFloat(pos.lat.toFixed(6));
  return [lng, lat];
}
