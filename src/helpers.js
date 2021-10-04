/**
 * If the birthdate argument contains month or month and day to "00"
 * remove them to match the RNIPP return.
 * @param birthdate A birthdate to format "YYYY-MM-DD" / "YYYY-MM-00" / "YYYY-00-00"
 * @returns A birthdate to format "YYYY-MM-DD" / "YYYY-MM" / "YYYY"
 */
function handlePresumed(birthdate) {
  return birthdate.replace(/-00/g, '');
}

export function formatDate(date) {
  const parts = date.split('');
  parts.splice(4, 0, '-');
  parts.splice(7, 0, '-');

  return handlePresumed(parts.join(''));
}

export function getErrorCode(req, errorList) {
  const { prenoms } = req.query;
  const code = prenoms.split('_').pop();

  if (errorList.indexOf(code) > -1) {
    return code;
  }

  return false;
}

export const logger = console;
