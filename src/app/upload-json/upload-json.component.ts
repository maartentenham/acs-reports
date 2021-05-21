import { Component, OnInit } from '@angular/core';
import {ReportService} from '../services/report.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-upload-json',
  templateUrl: './upload-json.component.html',
  styleUrls: ['./upload-json.component.css']
})
export class UploadJsonComponent implements OnInit {

  fileContent = '';

  constructor(private reportService: ReportService, private router: Router) { }

  ngOnInit(): void {
  }

  public onChange(event: any): void {
    const file = event.target.files[0];
    const fileReader: FileReader = new FileReader();
    fileReader.onload = (e) => {
      this.fileContent = fileReader.result.toString();
      this.fileContent = this.fileContent.replace(/@/gi, '');
      this.reportService.setResultReport(JSON.parse(this.fileContent));
      this.router.navigate(['show']);
    };
    fileReader.readAsText(file);
  }
}
