// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  hmr: false,
  firebase: {
    apiKey: "AIzaSyD7uhvcBW7tgp0-iBMM98otuCdUj3Oot00",
    authDomain: "angularfire-db7be.firebaseapp.com",
    databaseURL: "https://angularfire-db7be.firebaseio.com",
    projectId: "angularfire-db7be",
    storageBucket: "angularfire-db7be.appspot.com",
    messagingSenderId: "327571334583"
  }
};
