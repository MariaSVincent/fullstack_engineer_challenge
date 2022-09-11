# Fullstack Engineer Challengev, Maria Vincent

## Description

The project uses two microservices: the backend REST microservice and UI. The bakend is implemented with `express.js` and located in `server.js` file. The frontend is implemented with `React.js` and located in `src` derectory.\

The project uses `REST` microservice to fetch and render a list of `supervisors` along with inputs for additional information required to be provided by the user.\

User enters requested information, selects supervisor and submits request to the backend `REST` microservice. Required fields are: `First Name`, `Last Name`, and `Supervisor`. The required fields are marked as `requied` attribute, and must be filled to submit the request.

Backend validates the input fields of the request. If fields are valid, `SUCCESS!` message is prited to the console of the back end and sent and presented to the user. As a seccessful result, form fields and compotent state are reseted. If invalid fields are encountered, array of errors is created, printed to the console of the backend service, and sent to the user.

## Run the project

In the project directory, run the following commands in order:

### `npm install`

Command to download and install project dependencies.

### `npm run build`

Command to create `build` directory, build files, and place built files under `build` directory.

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
