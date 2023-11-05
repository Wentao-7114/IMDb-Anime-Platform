// Copyright 2023 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

const express = require('express');
const cors = require("cors");
const createConnectorConnection = require('./connect-connector.js');
const getTediousHelper = require('./tedious-helper.js');

const app = express();

app.set('view engine', 'pug');
app.enable('trust proxy');

// This middleware is available in Express v4.16.0 onwards
// Automatically parse request body as form data.
app.use(cors());
app.use(express.urlencoded({extended: false}));
app.use(express.json());


// Create a Winston logger that streams to Stackdriver Logging.
const winston = require('winston');
const {LoggingWinston} = require('@google-cloud/logging-winston');
const loggingWinston = new LoggingWinston();
const logger = winston.createLogger({
  level: 'info',
  transports: [new winston.transports.Console(), loggingWinston],
});

// Retrieve and return a specified secret from Secret Manager
const {SecretManagerServiceClient} = require('@google-cloud/secret-manager');
const client = new SecretManagerServiceClient();

async function accessSecretVersion(secretName) {
  const [version] = await client.accessSecretVersion({name: secretName});
  return version.payload.data;
}

const createConnection = async () => {
  // Check if a Secret Manager secret version is defined
  // If a version is defined, retrieve the secret from Secret Manager and set as the DB_PASS
  const {CLOUD_SQL_CREDENTIALS_SECRET} = process.env;
  if (CLOUD_SQL_CREDENTIALS_SECRET) {
    const secrets = await accessSecretVersion(CLOUD_SQL_CREDENTIALS_SECRET);
    try {
      process.env.DB_PASS = secrets.toString();
    } catch (err) {
      err.message = `Unable to parse secret from Secret Manager. Make sure that the secret is JSON formatted: \n ${err.message} `;
      throw err;
    }
  }

  return createConnectorConnection();

};

let validSchema = false;
let connection;

const ensureSchema = async () => {
  // Wait for tables to be created (if they don't already exist).
  await connection.query(
    `IF NOT EXISTS (
        SELECT * FROM sysobjects WHERE name='UserInfo' and xtype='U')
      CREATE TABLE UserInfo (
        username VARCHAR(20) NOT NULL,
        password VARCHAR(20) NOT NULL);`
  );
  console.log("Ensured that table 'UserInfo' exists");
  validSchema = true;
};

const connectionPromise = createConnection()
  .then(conn => {
    connection = getTediousHelper(conn);
  })
  .then(() => connection.connect())
  .then(ensureSchema)
  .catch(err => {
    logger.error(err);
    throw err;
  });

app.use(async (req, res, next) => {
  if (validSchema) {
    return next();
  }
  try {
    await connectionPromise;
    next();
  } catch (err) {
    logger.error(err);
    return next(err);
  }
});

// Handle incoming user info and inserting them into the database.
const httpPost = async (req, res) => {
  const { username, password } = req.body;
  try {
    const query = "INSERT INTO UserInfo (username, password) VALUES (@username, @password)";
    // Runs query

    await connection.query(query, [
      ['username', username],
      ['password', password],
    ]);
  } catch (err) {
    // If something goes wrong, handle the error in this section. This might
    // involve retrying or adjusting parameters depending on the situation.
    logger.error(connection.TYPES, err);
    return res
      .status(500)
      .send(
        "Internal Server Error11111"
      )
      .end();
  }

  res.status(201).send("User registered successfully").end();
};

app.post('/api/register', httpPost);

module.exports.app = app;
