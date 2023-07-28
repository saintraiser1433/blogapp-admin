import { Component, OnInit, effect } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  email: string;
  isLoggedIn: boolean;
  constructor(private authService: AuthService) {
    effect(() => {
      this.isLoggedIn = this.authService.isLoggedIn$();
    });
  }

  ngOnInit(): void {
    this.email = JSON.parse(localStorage.getItem('token')).email;

  }
  onLogout() {
    this.authService.logOut();
  }
}
