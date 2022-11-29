import dayjs from "dayjs";

export const weekDaydateFormat = date =>
  dayjs(date).format("dddd, MMMM, DD, YYYY, hh:mmA");

export const calculateCreatedAgo = date => dayjs(date).fromNow();

export const formatDateAndTime = dateTime =>
  dayjs(dateTime).format("h:mm A, DD/MM/YYYY");
