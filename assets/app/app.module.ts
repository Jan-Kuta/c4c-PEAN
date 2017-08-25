import { FreeChartComponent } from './home/chart.component.1';
import { ChartComponent } from './home/chart.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { AngularOpenlayersModule } from 'angular2-openlayers';
import { ChartModule } from 'angular2-highcharts';
import { ChartsModule} from 'ng2-charts';
import { ApolloClient } from 'apollo-client';
import { ApolloModule } from 'apollo-angular';

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

// Create the client
const client = new ApolloClient();

export function provideClient(): ApolloClient {
  return client;
}

@NgModule({
    declarations: [
        AppComponent,
        AlertComponent,
        HomeComponent,
        HomeComponentDeclarative,
        ChartComponent,
        FreeChartComponent,
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
        AppRoutingModule,
        ChartsModule,
        ChartModule.forRoot(require('highcharts')), // delete, it is payed
        ApolloModule.forRoot(provideClient)
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