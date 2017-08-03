import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularOpenlayersModule } from 'angular2-openlayers';

import { AlertComponent } from './alert/alert.component';
import { HomeComponent } from './home/home.component';
import { HomeComponentDeclarative } from './home/home.component.1';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HeaderComponent } from './header/header.component';
import { SignupComponent } from './auth/signup/signup.component';
import { SigninComponent } from './auth/signin/signin.component';
import { AuthService } from './auth/auth.service';
import { AlertService } from './alert/alert.service';
import { AreaService} from './home/area.service';
import { AuthGuard } from './auth/auth-guard.service';

@NgModule({
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        HomeComponentDeclarative,
        HeaderComponent,
        SignupComponent,
        SigninComponent
    ],
    imports: [
        BrowserModule,
        HttpModule,
        FormsModule,
        ReactiveFormsModule,
        AngularOpenlayersModule,
        AppRoutingModule
    ],
    providers: [
        AuthService,
        AlertService,
        AreaService, 
        AuthGuard
    ],
    bootstrap: [AppComponent]
})
export class AppModule {}