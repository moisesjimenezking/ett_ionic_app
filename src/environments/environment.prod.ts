export const environment = {
  production: true,
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
