import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ReportService} from '../services/report.service';
import {Router} from '@angular/router';
import {PdfdocumentService} from "../services/pdfdocument.service";
import {Report} from "../interfaces/report.interface";

@Component({
  selector: 'app-upload-json',
  templateUrl: './upload-json.component.html',
  styleUrls: ['./upload-json.component.css']
})
export class UploadJsonComponent implements AfterViewInit {

  report: Report;
  fileContent = '';

  constructor(private reportService: ReportService, private pdfdocumentService: PdfdocumentService, private router: Router) { }

  ngAfterViewInit(): void {
    this.report =  this.reportService.getReport();
    if (this.report) {
      this.openPdf();
    }
  }

  public onChange(event: any): void {
    const file = event.target.files[0];
    const fileReader: FileReader = new FileReader();
    fileReader.onload = (e) => {
      this.fileContent = fileReader.result.toString();
      this.fileContent = this.fileContent.replace(/@/gi, '');
      this.reportService.setResultReport(JSON.parse(this.fileContent));
      this.openPdf();
      // this.router.navigate(['show']);
    };
    fileReader.readAsText(file);
  }

  openPdf(): void {
    this.pdfdocumentService.openPdf();
  }
}
