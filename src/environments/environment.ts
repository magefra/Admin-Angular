// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  urlFirebase : 'https://admin-mp-ab7bb-default-rtdb.firebaseio.com/',
  urlLogin : 'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBNydZHVThHy2nMs1k4PiaRw5mkN19P9Bs',
  urlGetUser: 'https://identitytoolkit.googleapis.com/v1/accounts:lookup?key=AIzaSyBNydZHVThHy2nMs1k4PiaRw5mkN19P9Bs',
  urlFiles: 'http://localhost/sistemas-angular/marketplace/src/assets/img/',
  adminFiles: 'http://localhost/sistemas-angular/marketplace/src/assets/img/index.php?key=AIzaSyBNydZHVThHy2nMs1k4PiaRw5mkN19P9Bs'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.
