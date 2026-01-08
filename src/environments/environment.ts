// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  firebaseConfig: {
    apiKey: "AIzaSyC2NmDRYC5WCfc-lLWdfN3pZ85-UYqqs1E",  // de api_key[0].current_key
    authDomain: "ett-venezuela-fire.firebaseapp.com",    // normalmente project_id + ".firebaseapp.com"
    projectId: "ett-venezuela-fire",                     // de project_info.project_id
    storageBucket: "ett-venezuela-fire.firebasestorage.app", // de project_info.storage_bucket
    messagingSenderId: "916293358230",                  // de project_info.project_number
    appId: "1:916293358230:web:xxxxxxx",               // necesitas generar un appId web desde Firebase console
    measurementId: "G-XXXXXXXXXX"                       // opcional, solo si quieres analytics
  }
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.
