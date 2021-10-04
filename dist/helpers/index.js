"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.formatDate = formatDate;
exports.getErrorCode = getErrorCode;

function formatDate(date) {
  var parts = date.split('');
  parts.splice(4, 0, '-');
  parts.splice(7, 0, '-');
  return parts.join('');
}

function getErrorCode(req, errorList) {
  var prenoms = req.query.prenoms;
  var code = prenoms.split('_').pop();

  if (errorList.indexOf(code) > -1) {
    return code;
  }

  return false;
}