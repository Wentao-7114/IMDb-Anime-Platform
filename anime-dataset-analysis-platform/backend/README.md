# Cloud SQL - SqlServer
We connect to the Cloud Server using [The Cloud SQL Node.js Connector](https://github.com/GoogleCloudPlatform/cloud-sql-nodejs-connector).

Check this [Github](https://github.com/GoogleCloudPlatform/nodejs-docs-samples/tree/5ae41d635ea99d0c2d101c365aa5c3f1d8fd1f5c/cloud-sql/sqlserver/tedious) to see the official example.

## You might need to set up default credentials first
https://cloud.google.com/docs/authentication/provide-credentials-adc

For local development environment,
1. Install and initialize the gcloud CLI
2. Create your credentail file:
   ```
   gcloud auth application-default login
   ```


## Running locally

To run the server locally using the Cloud SQL Node.js Connector, set
environment variables and install dependencies as shown below.

Note: The `INSTANCE_CONNECTION_NAME` for your instance can be found on the
**Overview** page for your instance in the
[Google Cloud console](https://console.cloud.google.com/sql) or by running
the following command:

```sh
gcloud sql instances describe <INSTANCE_NAME> --format='value(connectionName)'
```

### Linux / Mac OS

Use these terminal commands to initialize environment variables:

```bash
export INSTANCE_CONNECTION_NAME='<INSTANCE_CONNECTION_NAME>'
export DB_USER='<DB_USER_NAME>'
export DB_PASS='<DB_PASSWORD>'
export DB_NAME='<DB_NAME>'
```

### Windows/PowerShell

Use these PowerShell commands to initialize environment variables:

```powershell
$env:INSTANCE_CONNECTION_NAME="<INSTANCE_CONNECTION_NAME>"
$env:DB_USER="<DB_USER_NAME>"
$env:DB_PASS="<DB_PASSWORD>"
$env:DB_NAME="<DB_NAME>"
```

## Testing the server

1. Next, install the Node.js packages necessary to run the server locally by
   running the following command:

    ```sh
    npm install
    ```

2. Run the server locally with the following command:

    ```sh
    npm start
    ```

3. Open another powershell/terminal to run the app: [See Details](https://github.com/CS222-UIUC-FA23/group-project-team73/tree/main/anime-dataset-analysis-platform)
