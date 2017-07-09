import { Router } from '@angular/router';
import { Component } from '@angular/core';
import { Response } from '@angular/http';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent {
  constructor(private router: Router, private authService: AuthService) {
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }
}
