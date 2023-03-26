# Decenternet Book Recorder

This system is Developed with following technology..

**MongoDB (Cluster), 
**ExpressJS, 
**ReactJS, 
**NodeJS

## Visit apps
- Frontend https://front-test-gilt.vercel.app
- Backend  https://backend-test.herokuapp.com

## Process to install the System 

# For Backend App: 
- Creating a repository in Github or Gitlab etc.
- Initialize the app using `npm init`
- Installe all necessary packages like express, bcryptjs, body-parser, cors, mongoose, Validator etc and utility library like underscore
- Created a cluster on mongoDB cluster 
- Configure and Design the database 
- Configured .env file with the respected values which is give in .env.example file
- Configured ` server.js` & `app.js` file
- Installed `nodemon` as watcher for the local development
- Then worked on the main task. 


# For Client Server:
- Installed ReactJs by `create-react-app`
- Installed necessary packages like react-hook-form, axios, @mui/material, react-query, etc.
- Configured .env file with the respected values which is give in .env.example file-
- Then worked on the main task. 

## Usage of Linter
- Installed eslint by the command `npm i -D eslint`
- Initializing configuration by the command `npx eslint init`
- Extends recommended configuration form `eslint:recommended `
- Configured `server.js & app.js` file

## Installation

This app requires [Node.js](https://nodejs.org/) v10+ to run.

##### Backend:

- Clone or download compressed file from https://github.com/zahidhasanemran/test-backend.git
- Upzip folder if you download the compressed file
- configure .env file. (You can copy from .env.example file as well)
- Install the dependencies and devDependencies and start the server.

For development environments...

```sh
npm i
npm run dev
```

For production environments...

```sh
npm i
NODE_ENV=production node server.js
```

##### Frontend:

- Clone or download compressed file from https://github.com/zahidhasanemran/front-test.git
- Upzip folder if you download the compressed file
- configure .env file. (You can copy from .env.example file as well)
- Install the dependencies and devDependencies and start the server.

For development environments...

```sh
npm i
npm start
```

run `npm run build` to build the project.

**You are Good to Go**
