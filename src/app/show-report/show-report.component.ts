import { Component, OnInit } from '@angular/core';
import {ReportService} from '../services/report.service';
import {AuditResult} from '../interfaces/auditResult.interface';
import {Router} from '@angular/router';
import {Report} from '../interfaces/report.interface';

@Component({
  selector: 'app-show-report',
  templateUrl: './show-report.component.html',
  styleUrls: ['./show-report.component.css']
})
export class ShowReportComponent implements OnInit {

  report: Report;

  constructor(private reportService: ReportService, private router: Router) { }

  ngOnInit(): void {
    this.report = this.reportService.getReport();
  }

}
