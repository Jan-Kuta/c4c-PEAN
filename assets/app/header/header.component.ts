import { Subscription } from 'rxjs/Rx';
import { Router } from '@angular/router';
import { Component, ChangeDetectorRef, OnDestroy } from '@angular/core';
import { Response } from '@angular/http';

import { AuthService } from '../auth/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})
export class HeaderComponent implements OnDestroy{
  private _subscription: Subscription;
  
  constructor(private router: Router, private authService: AuthService, private changeDetectorRef: ChangeDetectorRef) {
    this._subscription = authService.tokenChange.subscribe((value: string) => {
      changeDetectorRef.detectChanges();
    });
  }

  onLogout() {
    this.authService.logout();
    this.router.navigate(['/signin']);
  }

  ngOnDestroy(){
    this._subscription.unsubscribe();
  }
}
