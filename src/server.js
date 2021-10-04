import path from 'path';
import express from 'express';
import * as controllers from './controllers';
import { logger } from './helpers';

const app = express();
const port = process.env.PORT;

// Basic logging middleware
app.use((req, res, next) => {
  logger.log(`${req.method} ${req.url}`);
  next();
});

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, '/responses'));

// Routes
app.get('/Brpp2IdentificationComplet/individus', controllers.chooseController);

app.get('*', controllers.defaultController);


// Start the server
app.listen(port, () => logger.log(`RNIPP Mock listening on port ${port}!`));
