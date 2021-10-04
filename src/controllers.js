import { formatDate, getErrorCode, logger } from './helpers';

const errorList = [
  'E010004',
  'E010006',
  'E010007',
  'E010008',
  'E010009',
  'E010011',
  'E010012',
  'E010013',
  'E010014',
  'E010015',
  'E010016',
];


export function defaultController(req, res) {
  res.status(404);
  res.send('Go to /Brpp2IdentificationComplet/individus');
}

export function erroneousController(req, res) {
  res.sendFile(`${req.errorCode}.xml`, { root: './responses' });
}

export function successfulController(req, res) {
  const variables = {
    ...req.query,
    status: req.status,
    dateNaissance: formatDate(req.query.dateNaissance),
  };

  res.setHeader('content-type', 'text/xml');
  res.render('OK', variables);
}

export function chooseController(req, res, next) {
  const errorCode = getErrorCode(req, errorList);
  logger.log(`[INFO] Found errorCode ${errorCode}`);

  switch (errorCode) {
    case false:
      // No error code found we passthru input data
      req.status = 2;
      return successfulController(req, res);

    case 'E010007':
      // Passthru input data but provide a "7" status code
      req.status = 7;
      return successfulController(req, res);

    case 'E010011':
      // We want to trigger a timeout error on FC (6 seconds)
      return setTimeout(next, 7000);

    default:
      // Any other reconized code has a matching XML file
      req.errorCode = errorCode;
      return erroneousController(req, res);
  }
}
