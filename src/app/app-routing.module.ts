import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {UploadJsonComponent} from './upload-json/upload-json.component';
import {ShowReportComponent} from './show-report/show-report.component';

const routes: Routes = [
  {path : '', component : UploadJsonComponent},
  {path : 'upload', component : UploadJsonComponent},
  {path : 'show', component : ShowReportComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
