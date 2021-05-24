import {AfterViewInit, Component, OnInit} from '@angular/core';
import {ReportService} from '../services/report.service';
import {Router} from '@angular/router';
import {PdfdocumentService} from '../services/pdfdocument.service';
import {Report} from '../model/report.interface';

@Component({
  selector: 'app-upload-json',
  templateUrl: './upload-json.component.html',
  styleUrls: ['./upload-json.component.css']
})
export class UploadJsonComponent {

  report: Report;
  fileContent = '';

  constructor(private reportService: ReportService, private pdfdocumentService: PdfdocumentService, private router: Router) { }

  public onFileChange(event: any): void {
    const file = event.target.files[0];
    const fileReader: FileReader = new FileReader();
    fileReader.onload = (e) => {
      this.fileContent = fileReader.result.toString();
      this.fileContent = this.fileContent.replace(/@/gi, '');
      this.reportService.setResultReport(JSON.parse(this.fileContent));
      this.openPdf();
    };
    fileReader.readAsText(file);
  }

  public onInitiatorChange(event: any): void {
    this.reportService.getReport().initiator = event.target.value;
    this.openPdf();
  }

  public onResearchPeriodChange(event: any): void {
    this.reportService.getReport().researchPeriod = event.target.value;
    this.openPdf();
  }

  public onScopeChange(event: any): void {
    this.reportService.getReport().scope = event.target.value;
    this.openPdf();
  }

  openPdf(): void {
    this.pdfdocumentService.openPdf();
  }
}
