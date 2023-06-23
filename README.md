# Main-Frontend
This branch contains the Frontend implementations of this project. It is entirely
created with React.js and uses the react-bootstrap module to achieve responsiveness.

## Manual

To execute this application, you may run the following commands in the project directory 

### `npm install`

Downloads all dependencies required to run the application. All dependencies are defined in the
**package.json** file.

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.
By default, the page will reload if you make edits.

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

## Demonstration

When you successfully create and run the application, you should be able to see the following
main page.

The main page allows users to upload an image of a car using the associated input field at the top
of the right section (white-background).

![](../../Desktop/Individual Project/front Screenshots/main-page.png)

When the users upload an image, it is immediately shown to them right below the input field. In addition,
when an image is uploaded, users are given the option to engage with the model by clicking on the "test image" button.

After the model has successfully classified the image, users are displayed the classification results right below their image.

The same pages are also available through a mobile phone. However, __note__ that users who access the app through a touch-screen device are
also given the option to upload an image of a car using their devices camera.
