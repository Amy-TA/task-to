import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TaksDetailComponent } from './pages/taks-detail/taks-detail.component';
import { MTaskComponent } from './pages/task/m-task/m-task.component';
import { TaskComponent } from './pages/task/task.component';
import { MLabelsComponent } from './pages/m-labels/m-labels.component';

@NgModule({
  declarations: [
    AppComponent,
    TaskComponent,
    TaksDetailComponent,
    MTaskComponent,
    MLabelsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    NgbModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
