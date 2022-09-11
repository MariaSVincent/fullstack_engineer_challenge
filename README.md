# Fullstack Engineer Challengev, Maria Vincent

## Description

The project consists of the backend REST microservice and UI. The bakend is implemented with `express.js` and is located in the `server.js` file. The frontend is implemented with `React.js` and located in the `src` derectory.

The project uses `REST` microservice to fetch a list of `supervisors`, preprocess it and send to the `UI`. `UI` renders `supervisors` along with the fields for additioanl inputs to be provided by the user.

User enters required information, selects supervisor and submits request to the backend `REST` microservice. Required fields are: `First Name`, `Last Name`, and `Supervisor`. The required fields are marked with `requied` attribute, and must be filled to submit the request.

Backend validates the input fields of the request. If all the fields are valid, `SUCCESS!` message is prited to the console of the backend and sent and presented to the user. Finally, form fields and compotent state are reseted. If invalid fields are encountered, array of errors is created, printed to the console of the backend service, and sent to the user.

## Run the project

In the project directory, run the following commands in order:

### `npm install`

Command to download and install project dependencies.

### `npm run build`

Command to create `build` directory, to build files, and to place built files under `build` directory.

### `node server.js`

Command will start `server.js` with `express` and will serve files from `build` directory. \
Open [http://localhost:8080](http://localhost:8080) to view it in your browser.

## Run the project with `Docker`

In the project directory, run the following commands in order:

### `docker-compose build`

Build the container image.

### `docker-compose up`

Start the container.\
Open [http://localhost:8080](http://localhost:8080) to view it in your browser.
