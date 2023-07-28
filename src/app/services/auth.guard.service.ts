import { Injectable, inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from './auth.service';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root'
})

export class AuthGuardService {
  constructor(private authService: AuthService, private router: Router, private toastr: ToastrService) { }
  canActivate(): boolean {
    if (this.authService.isLoggedInGuard) {
      return true;
    } else {
      this.router.navigate(['/login'])
      this.toastr.warning("You have no permission to access this page");
      return false;
    }
  }

}

export const authGuard: CanActivateFn = (route, state) => {
  return inject(AuthGuardService).canActivate();


};
