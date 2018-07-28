# Expense Manager

## Pre-requisites
Tested with `Node v10.5.0` and `npm v5.6.0`
MySQL Database

## Quickstart

1. Install api server dependencies. On root folder using terminal, run `npm install`;
2. Install react application dependencies. `cd web && npm install`
3. Set the following environment variables OR modify `/config.js` and `/web/src/config.js`
```
######## API SERVER ENV VARS #######

# Standard MySQL connection string to running instance
MYSQL_URL_CONNECTION_STRING=mysql://root:root@127.0.0.1:3306/expense-manager

# API Server Port
PORT=8080

# API Server Host
HOST=127.0.0.1

# API Server HTTP Protocol
HTTP_PROTOCOL=http // or `https`

####### REACT APP ENV VARS #########

# Full path to api
API_URL=http://localhost:8080/api
```

4. Build api-docs: `npm run build:api-doc`
5. Build react app: `cd web && npm run build`
6. Voila! You can now navigate to the app (in our example: `http://127.0.0.1:8080/`)
