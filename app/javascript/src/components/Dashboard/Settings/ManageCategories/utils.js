import dayjs from "dayjs";

export const weekDaydateFormat = date => dayjs(date).format("dddd, hh:mmA");

export const calculateCreatedAgo = date => dayjs(date).fromNow();
