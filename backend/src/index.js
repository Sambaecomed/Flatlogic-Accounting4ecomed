const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const db = require('./db/models');
const config = require('./config');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');

const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/file');
const searchRoutes = require('./routes/search');

const openaiRoutes = require('./routes/openai');

const usersRoutes = require('./routes/users');

const accountsRoutes = require('./routes/accounts');

const organizationsRoutes = require('./routes/organizations');

const transactionsRoutes = require('./routes/transactions');

const rolesRoutes = require('./routes/roles');

const permissionsRoutes = require('./routes/permissions');

const reference_transaction_typesRoutes = require('./routes/reference_transaction_types');

const reference_party_typesRoutes = require('./routes/reference_party_types');

const accountgroupRoutes = require('./routes/accountgroup');

const general_ledgerRoutes = require('./routes/general_ledger');

const journalsRoutes = require('./routes/journals');

const parties_in_transactionsRoutes = require('./routes/parties_in_transactions');

const accounts_in_transactionsRoutes = require('./routes/accounts_in_transactions');

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Accounting4ecomed',
      description:
        'Accounting4ecomed Online REST API for Testing and Prototyping application. You can perform all major operations with your entities - create, delete and etc.',
    },
    servers: [
      {
        url: config.swaggerUrl,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsDoc(options);
app.use(
  '/api-docs',
  function (req, res, next) {
    swaggerUI.host = req.get('host');
    next();
  },
  swaggerUI.serve,
  swaggerUI.setup(specs),
);

app.use(cors({ origin: true }));
require('./auth/auth');

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/file', fileRoutes);
app.enable('trust proxy');

app.use(
  '/api/users',
  passport.authenticate('jwt', { session: false }),
  usersRoutes,
);

app.use(
  '/api/accounts',
  passport.authenticate('jwt', { session: false }),
  accountsRoutes,
);

app.use(
  '/api/organizations',
  passport.authenticate('jwt', { session: false }),
  organizationsRoutes,
);

app.use(
  '/api/transactions',
  passport.authenticate('jwt', { session: false }),
  transactionsRoutes,
);

app.use(
  '/api/roles',
  passport.authenticate('jwt', { session: false }),
  rolesRoutes,
);

app.use(
  '/api/permissions',
  passport.authenticate('jwt', { session: false }),
  permissionsRoutes,
);

app.use(
  '/api/reference_transaction_types',
  passport.authenticate('jwt', { session: false }),
  reference_transaction_typesRoutes,
);

app.use(
  '/api/reference_party_types',
  passport.authenticate('jwt', { session: false }),
  reference_party_typesRoutes,
);

app.use(
  '/api/accountgroup',
  passport.authenticate('jwt', { session: false }),
  accountgroupRoutes,
);

app.use(
  '/api/general_ledger',
  passport.authenticate('jwt', { session: false }),
  general_ledgerRoutes,
);

app.use(
  '/api/journals',
  passport.authenticate('jwt', { session: false }),
  journalsRoutes,
);

app.use(
  '/api/parties_in_transactions',
  passport.authenticate('jwt', { session: false }),
  parties_in_transactionsRoutes,
);

app.use(
  '/api/accounts_in_transactions',
  passport.authenticate('jwt', { session: false }),
  accounts_in_transactionsRoutes,
);

app.use(
  '/api/openai',
  passport.authenticate('jwt', { session: false }),
  openaiRoutes,
);

app.use(
  '/api/search',
  passport.authenticate('jwt', { session: false }),
  searchRoutes,
);

const publicDir = path.join(__dirname, '../public');

if (fs.existsSync(publicDir)) {
  app.use('/', express.static(publicDir));

  app.get('*', function (request, response) {
    response.sendFile(path.resolve(publicDir, 'index.html'));
  });
}

const PORT = process.env.PORT || 8080;

db.sequelize.sync().then(function () {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

module.exports = app;
