# ExpenseTracker

The Expense Tracker is a web application built with Angular that allows users to manage their budgets and track their expenses. Users can register, log in, add budgets, and track expenses effortlessly. This application utilizes Firebase for authentication and Firestore for data storage.

## Features

- User Registration and Authentication
- Budget Creation and Management
- Expense Tracking
- Email Verification
- Responsive Design

## Technologies Used

- Angular
- AngularFire (Firebase)
- Firestore
- TypeScript
- Bootstrap

## Setup Instructions

### Prerequisites

- Node.js and npm installed on your machine
- Firebase project set up

## Steps

- Clone the repository: git clone https://github.com/G-Gakii/expense-tracker.git
- cd expense-tracker
- Install dependencies:npm install
- Set up Firebase:

1. Go to the Firebase Console and create a new project.
2. Enable Email/Password authentication in the Authentication section.
3. Create Firestore database.
4. Obtain your Firebase configuration and update src/environments/environment.ts:

```
export const environment = {
production: false,
firebaseConfig: {
apiKey: "YOUR_API_KEY",
authDomain: "YOUR_AUTH_DOMAIN",
projectId: "YOUR_PROJECT_ID",
storageBucket: "YOUR_STORAGE_BUCKET",
messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
appId: "YOUR_APP_ID",
},
};
```

## Run application

ng serve --port 4209
