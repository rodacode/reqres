I decided to use create-react-app with a chakra ui for fast and easy scaffolding of basic needed react packages and easy development of the UI.

Also tryed to not install too many libraries, I could use axios for the api calls.

As the API doesn't keep data persistent. I kind of fake the edit functionality to update the user on the frontend as well, but that doesn't persist after a refresh. I could use local storage but not the proper solution this kind of data persistance should happend on the backend side.

That also apply for the delete action. 

I used Chakra UI for the UI elements as I am used to it I can prototype and develope faster and the framework gives the app some more functionalities like to have a light and dark theme out of the box, transitions and styled components.

I could add a detail view of the users, but the API returns not too many info of each user so didn't find it necesary to spend time on that just display the list and make the functionality to edit the user and delete it from the list.

What would you do if you had more time?

Many things can be improve:

 - Improve error handling
 - Improve inputs forms validation
 - Add redux and state management if the app grows.
 - Improve responsive UX.
 - filter and sorting for the list of users.
 - improve design and styling.
 - detail view of user

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.<br />
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br />
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.<br />
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `yarn build`

Builds the app for production to the `build` folder.<br />
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br />
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

