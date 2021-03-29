import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import firebase from 'firebase/app';
import 'firebase/auth';
import { map } from 'rxjs/operators';

@Injectable()
export class LoginService {
  constructor(private authService: AngularFireAuth) {}

  anonSignIn() {
    // [START auth_anon_sign_in]
    firebase
      .auth()
      .signInAnonymously()
      .then(() => {
        // Signed in..
      })
      .catch(error => {
        var errorCode = error.code;
        var errorMessage = error.message;
        // ...
      });
    // [END auth_anon_sign_in]
  }

  loginWithEmail(email: string, password: string) {
    return firebase.auth.EmailAuthProvider.credential(email, password);
  }

  getAuth2() {
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        var uid = user.uid;
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }

  login(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.authService.signInWithEmailAndPassword(email, password).then(
        datos => resolve(datos),
        error => reject(error)
      );
    });
  }

  getAuth() {
    return this.authService.authState.pipe(map(auth => auth));
  }

  logout() {
    this.authService.signOut();
  }

  registrarse(email: string, password: string) {
    return new Promise((resolve, reject) => {
      this.authService.createUserWithEmailAndPassword(email, password).then(
        datos => resolve(datos),
        error => reject(error)
      );
    });
  }
}
