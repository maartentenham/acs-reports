import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UploadJsonComponent } from './upload-json/upload-json.component';
import { ShowReportComponent } from './show-report/show-report.component';

@NgModule({
  declarations: [
    AppComponent,
    UploadJsonComponent,
    ShowReportComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
