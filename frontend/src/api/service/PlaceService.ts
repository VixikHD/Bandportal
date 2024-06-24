import axios, { AxiosError } from "axios";
import { SERVER_URL } from "../DataServerConfig";
import { ErrorResponse } from "../ErrorResponse";

export class PlaceRequest {
  placeName: string;
  placeWebsite: string | null;
}

export class PlaceResponse {
  placeId: number;
  placeName: string | null;
  placeWebsite: string | null;
}

export const createPlace = (
  request: PlaceRequest,
  handler: () => void,
  errorHandler: (response: ErrorResponse) => void,
): void => {
  axios
    .post(SERVER_URL + "place", request)
    .then(() => {
      handler();
    })
    .catch((e: AxiosError) => {
      errorHandler({
        message: e.message,
        status: e.request.status,
      });
    });
};

export const readAllPlaces = (
  handler: (places: PlaceResponse[]) => void,
  errorHandler: (response: ErrorResponse) => void,
): void => {
  axios
    .get(SERVER_URL + "place")
    .then((r) => {
      let placeResponse: PlaceResponse[] = r.data;
      handler(placeResponse);
    })
    .catch((e: AxiosError) => {
      errorHandler({
        message: e.message,
        status: e.request.status,
      });
    });
};

export const readPlace = (
  placeId: number,
  handler: (place: PlaceResponse) => void,
  errorHandler: (response: ErrorResponse) => void,
): void => {
  axios
    .get(SERVER_URL + "place/" + placeId)
    .then((r) => {
      let placeResponse: PlaceResponse = r.data;
      handler(placeResponse);
    })
    .catch((e: AxiosError) => {
      errorHandler({
        message: e.message,
        status: e.request.status,
      });
    });
};

export const updatePlace = (
  placeId: number,
  request: PlaceRequest,
  handler: () => void,
  errorHandler: (response: ErrorResponse) => void,
): void => {
  axios
    .put(SERVER_URL + "place/" + placeId, request)
    .then(() => {
      handler();
    })
    .catch((e: AxiosError) => {
      errorHandler({
        message: e.message,
        status: e.request.status,
      });
    });
};

export const deletePlace = (
  placeId: number,
  handler: () => void,
  errorHandler: (response: ErrorResponse) => void,
): void => {
  axios
    .delete(SERVER_URL + "place/" + placeId)
    .then(() => {
      handler();
    })
    .catch((e: AxiosError) => {
      console.log(e);
      errorHandler({
        message: e.message,
        status: e.request.status,
      });
    });
};
