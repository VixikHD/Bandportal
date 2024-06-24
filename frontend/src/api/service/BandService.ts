import axios from "axios";
import { SERVER_URL } from "../DataServerConfig";
import { ErrorResponse } from "../ErrorResponse";

export class BandRequest {
  bandName: string;
  bandWebsite: string | null;
}

export class BandResponse {
  bandId: number;
  bandName: string | null;
  bandWebsite: string | null;
}

export const createBand = (
  request: BandRequest,
  handler: () => void,
  errorHandler: (response: ErrorResponse) => void,
): void => {
  axios.post(SERVER_URL + "band", request).then(() => {
    handler();
  });
};

export const readAllBands = (
  handler: (bands: BandResponse[]) => void,
  errorHandler: (response: ErrorResponse) => void,
): void => {
  axios.get(SERVER_URL + "band").then((r) => {
    let bandResponse: BandResponse[] = r.data;
    handler(bandResponse);
  });
};

export const readBand = (
  bandId: number,
  handler: (band: BandResponse) => void,
  errorHandler: (response: ErrorResponse) => void,
): void => {
  axios.get(SERVER_URL + "band/" + bandId).then((r) => {
    let bandResponse: BandResponse = r.data;
    handler(bandResponse);
  });
};

export const updateBand = (
  bandId: number,
  request: BandRequest,
  handler: () => void,
  errorHandler: (response: ErrorResponse) => void,
): void => {
  axios.put(SERVER_URL + "band/" + bandId, request).then(() => {
    handler();
  });
};

export const deleteBand = (
  bandId: number,
  handler: () => void,
  errorHandler: (response: ErrorResponse) => void,
): void => {
  axios.delete(SERVER_URL + "band/" + bandId).then(() => {
    handler();
  });
};
