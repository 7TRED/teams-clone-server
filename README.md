# Teamspace application-server

This is the application server of the Teamspace application. It sends access token for every user , each time they join a meeting.

## Setting up local development environment

This server uses [firebase cloud functions](https://firebase.google.com/docs/functions) for hosting and setting up an express server.

* For setting up a local development environment you can either use firebase cloud functions like this:
First install the firebase cli by running the below command:
```bash
    npm install -g firebase-tools
```
Then login with your firebase account by running this command:
```bash
    firebase login
```
After login initialize the firebase hosting in your project
```bash
    firebase init hosting <your_application_name>
```
After setting up firebase hosting set up firebase cloud Functions
```bash
    firebase init functions
```
* Now to run the server locally run the following command:
```bash
    firebase serve --only hosting,functions
```
this will run your server locally on localhost

* To deploy the server run :
```bash
    firebase deploy
```