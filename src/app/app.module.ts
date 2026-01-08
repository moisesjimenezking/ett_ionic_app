// app.module.ts
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouteReuseStrategy } from '@angular/router';
import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { SharedModule } from './shared/shared.module';
import { pageTransition } from './lib/animations/page-transition';
import { ApiService } from './service/api.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { NetworkInterceptor } from './interceptors/network.interceptor';
import { AppComponent } from './app.component'; // Standalone

@NgModule({
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    IonicModule.forRoot({ navAnimation: pageTransition, animated: true }),
    AppRoutingModule,
    SharedModule,
    HttpClientModule,
    AppComponent // IMPORTAR, no declarar
  ],
  providers: [
    { 
      provide: RouteReuseStrategy, 
      useClass: IonicRouteStrategy
    },
    ApiService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: NetworkInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule {}
