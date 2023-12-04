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
const registerPost = async (req, res) => {
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

app.post('/api/register', registerPost);



const getAnimeTitles = async (req, res) => {
  try {
    const query = "SELECT  top 10 id, title, (JSON_VALUE(replace(main_picture, '''', '\"'), '$.medium')) as url  FROM animeinfo_2000;  ";
    const result = await connection.query(query);
    res.status(200).json(result);
  } catch (err) {
    logger.error(err);
    res.status(500).send("Internal Server Error").end(); 
  }
};

app.get('/api/getAnimeInfo', getAnimeTitles);



const loginPost = async (req, res) => {
  const { username, password } = req.body;

  try {
      // Query to check if a user with the provided username and password exists
      const query = "SELECT * FROM UserInfo WHERE username = @username AND password = @password";

      const result = await connection.query(query, [
          ['username', username],
          ['password', password]
      ]);

      // Check if user exists
      if (result.length > 0) {
          // User found with matching username and password
          res.status(200).send("Login successful").end();
      } else {
          // User not found or password incorrect
          res.status(401).send("Invalid credentials").end();
      }
  } catch (err) {
      // Handle any errors that occur during the query
      logger.error(connection.TYPES, err);
      res.status(500).send("Internal Server Error").end();
  }
};

app.post('/api/login', loginPost);


const addToFavorites = async (req, res) => {
  const { userId, animeId } = req.body;
  try {
    // Ensure that userId is an integer
    const userIdInt = parseInt(userId, 10);
    if (isNaN(userIdInt)) {
      return res.status(400).send("Invalid userId");
    } 
    const query = "INSERT INTO FavoriteList (UserId, AnimeId) VALUES ("+ userId +", "+ animeId +")";
    await connection.query(query );
    res.status(201).send("Anime added to favorites successfully").end();
  } catch (err) {
    logger.error(err);
    res.status(500).send("Internal Server Error").end(); 
  }
};

app.post('/api/addToFavorites', addToFavorites);




const deleteFromFavorites = async (req, res) => {
  const { userId, animeId } = req.body;
  try {
    // Ensure that userId is an integer
    const userIdInt = parseInt(userId, 10);
    if (isNaN(userIdInt)) {
      return res.status(400).send("Invalid userId");
    } 
    const query = "Delete From FavoriteList where UserId = "+ userId + "  And AnimeId = "+ animeId ; 
    await connection.query(query );
    res.status(201).send("Anime deleted from favorites successfully").end();
  } catch (err) {
    logger.error(err);
    res.status(500).send("Internal Server Error").end(); 
  }
};

app.post('/api/deleteFromFavorites', deleteFromFavorites);





app.post('/api/getUserId', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Add logic to hash the password and compare with the hashed password in the database
    // For simplicity, using plaintext comparison (not recommended for production)
    const query = "SELECT userId FROM UserInfo WHERE UserName = @username AND Password = @password";
    
    const result = await connection.query(query, [
      ['username', username],
      ['password', password]
  ]);
 
   
  
    if (result.length > 0) {
      res.json({ userId: result[0].userId.value });
     
    } else {
      res.status(401).send("Invalid credentials");
    }
  } catch (err) {
    // console.error(err);
    // res.status(500).send("Internal Server Error");
  }
});

const getFavoriteAnime = async (req, res) => {
  try {
    const userId = req.params.userId;
    console.log("UserId received: ", userId);

    const query = `
      SELECT distinct  id, title, JSON_VALUE(replace(main_picture, '''', '"'), '$.medium') as url
      FROM FavoriteList f
      LEFT OUTER JOIN animeinfo_2000 a ON f.AnimeId = a.id
      WHERE f.userid =  ` + userId;

     
 

    const result = await connection.query(query);

     
    res.status(200).json(result);
  } catch (err) {
    console.error("Error in getFavoriteAnime: ", err);
    res.status(500).send("Internal Server Error").end();
  }
};



// Register the route
app.get('/api/getFavoriteAnime/:userId', getFavoriteAnime);


module.exports.app = app;
