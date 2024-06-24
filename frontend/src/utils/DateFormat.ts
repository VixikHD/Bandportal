import moment from "moment";

export const dateToString = (dateString: string): string => {
  return moment(new Date(dateString)).format("DD.MM.YYYY HH:mm");
};
