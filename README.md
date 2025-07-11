# teamFutbol

This template should help get you started developing with Vue 3 in Vite.

## Recommended IDE Setup

[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar) (and disable Vetur).

## Customize configuration

See [Vite Configuration Reference](https://vite.dev/config/).

## Project Setup

```sh
npm install
```

## Important
### To execute the project it is necessary to create a project in firebase [Firebase console](https://console.firebase.google.com/), this provides the data of the firebaseConfig file that is needed to be able to execute it since it manages the DB and the authentication.

### Before you start, create firebaseConfig.js in /src/components

```sh
import {initializeApp} from "firebase/app";
import {getAuth} from "firebase/auth";
import {getFirestore} from "firebase/firestore/lite"

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();

export {auth, db};
```

### Compile and Hot-Reload for Development

```sh
npm run dev
```

### Compile and Minify for Production

```sh
npm run build
```

### Deploy command in firebase once the account is configured

```sh
firebase deploy
```

### Migrate data to data base, create firebaseConfigEnd.js in /src/components/developer

```sh
import {initializeApp} from "firebase/app";
import {getFirestore} from "firebase/firestore"
import {getAuth} from "firebase/auth";

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
};

const app = initializeApp(firebaseConfig, "destine");
const auth = getAuth(app);
const db = getFirestore(app);

export {auth, db};
```


# Notes:

## Project Documentation

- [Changelog](CHANGELOG.md) his file contains a chronological history of the changes
- [To-do](TODO.md) his file lists to-dos, ideas for improvements.
- [Known Errors](KNOWN_ISSUES.md) This file documents errors or undesired behaviour.