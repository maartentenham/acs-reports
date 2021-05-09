import { Component, OnInit } from '@angular/core';
import {ReportService} from '../services/report.service';
import {Router} from '@angular/router';
import {Report} from '../interfaces/report.interface';
import {Total} from '../interfaces/total.interface';

@Component({
  selector: 'app-show-report',
  templateUrl: './show-report.component.html',
  styleUrls: ['./show-report.component.css']
})
export class ShowReportComponent implements OnInit {

  report: Report;
  totals: Total[];

  constructor(private reportService: ReportService, private router: Router) { }

  ngOnInit(): void {
    this.report = this.reportService.getReport();
    this.totals = this.reportService.getTotals();
  }

}
