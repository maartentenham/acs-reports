import { Injectable } from '@angular/core';
import principlesEn from '../data/wcag2-en.json';
import principlesNl from '../data/wcag2-nl.json';
import { Report } from '../interfaces/report.interface';
import {AuditResult} from '../interfaces/auditresult.interface';
import {Total} from '../interfaces/total.interface';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private rep: any;
  private auditResults: AuditResult[];
  private reportNl: Report = principlesNl;
  private jsonQuery = require('json-query');
  private totals: Total[] = [];

  constructor() {
  }

  public setResultReport(value: any): void {
    this.reportNl.principles.forEach( prn => {
      prn.guidelines.forEach(gl => {
        gl.alt_id = [gl.id.split(':')[1]];
        gl.id  = this.findGuidelineId(gl.alt_id[0]);
        gl.successcriteria.forEach(sc => {
          sc.alt_id = [sc.id.split(':')[1]];
          sc.id = this.findCriteriumId(sc.alt_id[0]);
        });
      });
    });

    this.rep =  value;

    this.reportNl.evaluator = this.rep.graph[1].name;
    this.reportNl.website = this.rep.graph[0].evaluationScope.website.siteName;
    this.reportNl.publicationDate = new Date().toDateString();

    this.auditResults = this.rep.graph[0].auditResult;
    this.reportNl.principles.forEach( prn => {
      const total = {name: prn.handle,  totalSuccess: 0, totalCriteria: 0};
      prn.guidelines.forEach(gl => {
        gl.successcriteria.forEach(sc => {
          sc.result = this.auditResults.find(res => res.test === sc.id);
          total.totalCriteria++;
          if (sc.result.result.outcome === 'earl:passed') {
            total.totalSuccess++;
          }
        });
      });
      this.totals.push(total);
    });

  }

  public getTotals(): Total[] {
    return this.totals;
  }

  public getReport(): Report {
    return this.reportNl;
  }

  private findGuidelineId(altId: string): string {
    const query = 'principles.guidelines[alt_id=' + altId + '].id';
    return this.jsonQuery(query, {data: principlesEn}).value;
  }

  private findCriteriumId(altId: string): string {
    const query = 'principles.guidelines.successcriteria[alt_id=' + altId + '].id';
    return this.jsonQuery(query, {data: principlesEn}).value;
  }
}
