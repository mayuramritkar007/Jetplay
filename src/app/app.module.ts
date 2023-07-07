import { NgModule } from '@angular/core';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';
import { BrowserModule } from '@angular/platform-browser';
import { MaterialModule } from 'src/app/material.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthGuard } from 'src/core/guards/auth.guard';
import { AuthService } from 'src/core/services/auth.service';
import { DatePipe } from '@angular/common';
import { httpInterceptorProviders } from 'src/core/interceptors';
import { TestService } from 'src/core/services/test.service';
import { CommonConfigModule } from 'src/common-config/common-config.module';
import { HttpClientModule } from '@angular/common/http';
import { CommonModule } from '@angular/common';
import { ThemeStorage } from 'src/core/services/ThemeStorage.service';


@NgModule({
  declarations: [		
    AppComponent,
    
   ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    CommonConfigModule,
    AppRoutingModule,
    HttpClientModule, 
  ],
  exports: [
    MaterialModule,
  ],
  providers: [
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {appearance: 'outline'}},
    AuthGuard, 
    AuthService,
    TestService, 
    DatePipe, 
    httpInterceptorProviders,
    ThemeStorage
  ],
  
  bootstrap: [AppComponent],
  
})
export class AppModule { }
