# CoMo thermometer

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and uses [Netlify Functions](https://www.netlify.com/products/functions/) to call the Trello API.

https://como-thermometer.netlify.app/

## Development

Create a Trello API key and token using an account with access to the CoMo transformation board. Set this in `example.env` and rename the file to `.env`. This will not be commited to the repository.

### `npm run dev`

Runs the React app and Netlify functions in the development mode.\
Open [http://localhost:8888](http://localhost:8888) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors and Netlify function calls in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

## Deployment

This repository deploys to Netlify on push to master. Build varaibles are set for environment varaibles using the Netlify interface.\
You could create your own Netlify site and hook it up to a fork of this repository.

