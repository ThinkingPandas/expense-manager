# Expense Manager

## Relevant Links
[Demo](https://expense-manager.thinkingpandas.com/)
[API Doc](https://expense-manager.thinkingpandas.com/api-doc)
[REST Endpoint](https://expense-manager.thinkingpandas.com/api)

## Description

A simple expense manager application where you can add, update, delete categories and expenses. Also has a report page to visualize the previous 30 days of expenses.

This project is composed of 2 parts:
  1. API Server
        - based on Express.js
        - uses MySQL for database and sequelize for the ORM
        - automatically generates defaul test data on empty db on first run
        - also houses an OpenAPI (previously Swagger) based api documention. accessible through api-doc

  2. React Application
        - based on the React.js frameowkr
        - uses MobX for state management - instead of Redux.
            - in our opinion, MobX state management is far superior to Redux. Less boilerplate code is written and state is easily managed and shared only to necessary components.

For simplicity, we combined both projects into a single repository. For the same reason, the React application would also be served using the same web server instance of the API Server.

We also took the liberty of adding in a GitLab CI file (.gitlab-ci.yml). Any changes made is automatically built, pushed and deployed to our servers.

## API SERVER - Project Structure
  .
  ├── api-doc                     # html/css files of the api-document. hosted on /api-doc
  ├── controllers                 # API Server Controllers
  ├── models                      # API Server Models (Sequelize)
  ├── scripts                     # Custom scripts
        ├── buildSwaggerJSON.js   # script to build and compile swagger documention
  ├── web                       # create-react-app project for the frontend. standalone nodejs sub-project
        ├── ...(CHECK BELOW)
  ├── .env                      # overrides environment variables
  ├── .eslintrc.yml                      # eslint rules
  ├── .gitlab-ci.yml                      # used by Gitlab CI system for CI/CD integration.
  ├── .config.js                      # used by Gitlab CI system for CI/CD integration.
  ├── .globals.js                      # application-wide variables
  ├── .fixtures.js                      # initial data
  ├── .routes.js                      # api routes
  ├── .server.js                      # api server entry point
  ├── .db.sql                      # intial data. NOT NEEDED -- on run, application automatically generates test data through fixtures.js
  └── README.md                 # this file

## REACT APP - Project Structure
  /web
  ├── src
      ├── components                 # React resuable components
      ├── models                      # otherwise known as pages
      ├── stores                     # Mobx based stores / state
  ├── App.scss                     # Application-wide stylesheet
  ├── config.js                     # config file for react app
  ├── routes.js                     # react application routes


## Pre-requisites
  Tested with `Node v10.5.0` and `npm v5.6.0`
  Running and Accessible MySQL Database Instance

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
REACT_APP_API_URL=http://localhost:8080/api
```

4. Build api-docs: `npm run build:api-doc`
5. Build react app: `cd web && npm run build`
6. Voila! You can now navigate to the app (in our example: `http://127.0.0.1:8080/`)


## How to accomodate high traffic (100,000++ concurrent users)

First of all, we would split the two sub-projects (API Server and React App) into 2 separate repositories. Each of them would have its own CI/CD setup to different dedicated servers. Next, we would spin up several instances of both (exact number depends on the load) and we would place load balancers in front of these instances (number of lb also depends on load).

For the database, we would setup proper indexes first to optimize queries. Then we'd setup a multi-node cluster of MySQL instances -- adding in instances as the load increases. If at all necessary, we'd also implement redis or memcache for caching repeatable queries.


## How to accomodate multiple users in the app

We'd add a new modal called Users with the standard username and password fields and setup user authentication protocols and middlewares in the api server -- maybe JWT token based authentication. We would also need to migrate the existing database to add in a new foreign relation to both Category and Expense models. Finally, we'd update the endpoints to only return the data of the currently requesting user.

