import axios from "axios";
import { SERVER_URL } from "../DataServerConfig";
import { PlaceResponse } from "./PlaceService";
import { BandResponse } from "./BandService";
import { ErrorResponse } from "../ErrorResponse";

export class EventRequest {
  eventName: string;
  eventStart: string;
  eventEnd: string | null;
  eventWebsite: string | null;

  placeId: number;
  bands: number[];
}

export class EventResponse {
  eventId: number;
  eventName: string;
  eventStart: string;
  eventEnd: string | null;
  eventWebsite: string | null;

  place: PlaceResponse;
  ticketId: null; // TODO - Ticket Response
  bands: BandResponse[];
}

export const createEvent = (
  request: EventRequest,
  handler: () => void,
  errorHandler: (response: ErrorResponse) => void,
): void => {
  axios.post<EventResponse[]>(SERVER_URL + "event", request).then(() => {
    handler();
  });
};

export const readAllEvents = (
  handler: (events: EventResponse[]) => void,
  errorHandler: (response: ErrorResponse) => void,
): void => {
  axios.get<EventResponse[]>(SERVER_URL + "event").then((r) => {
    let eventResponse: EventResponse[] = r.data;
    handler(eventResponse);
  });
};

export const readUpcomingEvents = (
  handler: (events: EventResponse[]) => void,
  errorHandler: (response: ErrorResponse) => void,
): void => {
  axios.get<EventResponse[]>(SERVER_URL + "event/upcoming").then((r) => {
    let eventResponse: EventResponse[] = r.data;
    handler(eventResponse);
  });
};

export const readEvent = (
  eventId: number,
  handler: (event: EventResponse) => void,
  errorHandler: (response: ErrorResponse) => void,
): void => {
  axios.get<EventResponse>(SERVER_URL + "event/" + eventId).then((r) => {
    let eventResponse: EventResponse = r.data;
    handler(eventResponse);
  });
};

export const updateEvent = (
  eventId: number,
  request: EventRequest,
  handler: () => void,
  errorHandler: (response: ErrorResponse) => void,
): void => {
  axios.put(SERVER_URL + "event/" + eventId, request).then(() => {
    handler();
  });
};

export const deleteEvent = (
  eventId: number,
  handler: () => void,
  errorHandler: (response: ErrorResponse) => void,
): void => {
  axios.delete(SERVER_URL + "event/" + eventId).then(() => {
    handler();
  });
};
