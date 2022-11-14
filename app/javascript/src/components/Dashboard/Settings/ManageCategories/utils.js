import dayjs from "dayjs";

export const weekDaydateFormat = date =>
  dayjs(date).format("dddd, MMMM, DD, YYYY, hh:mmA");

export const calculateCreatedAgo = date => dayjs(date).fromNow();
