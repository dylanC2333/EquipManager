"use strict";
const formatReadableDate = (date) => {
  return `${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日`;
};
const readableToFormat = (date) => {
  return date.replace(/年/g, "-").replace(/月/g, "-").replace(/日/g, " ") + "00:00:00";
};
exports.formatReadableDate = formatReadableDate;
exports.readableToFormat = readableToFormat;
