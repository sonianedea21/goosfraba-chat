Process and choices:

- read Graphql + Apollo documentation to get the main ideas and how to implement them in a project. Watched a graphql
  tutorial.
- created Github repo
- create app with CRA + Typescript
- install visx + graphql
- create graph with dummy data
- get data from fakerql and filter it. I chose to deal with fetching more data after loading at a later time, since I
  did not find a solution in immediately.
- processing data to match requirements of the BarGraph. At this moment I noticed the dummy API doesn't allow filtering.
  I would have needed to filter by "published" and "createdAt". In a real situation, I believe this should have been
  done by the team developing the API (or me) now or before starting to work on the task.
- very lengthy research on how to fetch more data through some sort of pagination. Used docs, stackoverflow, graphql
  discord chat, checked other fake apis for comparison. My final conclusion is that this should have been implemented in
  the schema of the API. Did not work on finding a frontend workaround, due to time constraints.
- did not work on design because it was not mentioned in the requirements (and due to time constraints)
- implemented error handling

Challenges

- working with a new technology (graphql)
- trying to apply some sort of pagination to a schema that doesn't seem to be built to accept it
- faker graphiql not working - https://fakerql.com/
- goosfraba faker not working (sometimes) - https://fakerql.goosfraba.ro/

All in all, I think this process would have been quite easy (and enjoyable) if I had had some experience with graphql
beforehand. And if
I were to work with a more robust dummy API.

# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `yarn test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more
information.

### `yarn build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `yarn eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will
remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right
into your project so you have full control over them. All of the commands except `eject` will still work, but they will
point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you
shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t
customize it when you are ready for it.

## Learn More

You can learn more in
the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).
