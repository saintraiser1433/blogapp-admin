import { Injectable, signal } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  isLoggedIn$ = signal(false);
  isLoggedInGuard: boolean = false;
  constructor(private afAuth: AngularFireAuth, private toastr: ToastrService, private router: Router) { }

  login(username, password) {
    this.afAuth.signInWithEmailAndPassword(username, password).then((logRef) => {
      this.toastr.success("Logged in Successfully");
      this.loadUser();
      this.router.navigate(['/']);
      this.isLoggedInGuard = true;
      this.isLoggedIn$.set(true)
    }).catch(e => {
      this.toastr.warning(e);
    })
  }

  loadUser() {
    this.afAuth.authState.subscribe(user => {
      localStorage.setItem('token', JSON.stringify(user));
    })
  }

  logOut() {
    this.afAuth.signOut().then(() => {
      this.toastr.success("Logout successfully");
      localStorage.removeItem('token');
      this.isLoggedIn$.set(false);
      this.isLoggedInGuard = false;
      this.router.navigate(['/login']);
    });
  }

}
