import { Component, OnInit } from '@angular/core';
import {ReportService} from '../services/report.service';
import {AuditResult} from '../interfaces/auditResult.interface';
import {Router} from '@angular/router';

@Component({
  selector: 'app-show-report',
  templateUrl: './show-report.component.html',
  styleUrls: ['./show-report.component.css']
})
export class ShowReportComponent implements OnInit {

  report: any;
  auditResults: AuditResult[];

  constructor(private reportService: ReportService, private router: Router) { }

  ngOnInit(): void {
    if (!this.reportService.report) {
      this.router.navigate(['']);
    } else {
      this.report = this.reportService.report;
      this.auditResults = this.report.graph[0].auditResult;
      console.log(this.auditResults);
    }
  }

}
