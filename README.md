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
