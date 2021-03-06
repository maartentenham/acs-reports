import {Injectable} from '@angular/core';
import principlesEn from '../data/wcag2-en.json';
import principlesNl from '../data/wcag2-nl.json';
import {Report} from '../model/report.interface';
import {AuditResult} from '../model/auditresult.interface';
import {Total} from '../model/total';
import moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private rep: any;
  private auditResults: AuditResult[];
  private reportNl: Report = principlesNl;
  private jsonQuery = require('json-query');

  constructor() {
  }

  public setResultReport(value: any): void {
    this.reportNl.totals = [];
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
    this.reportNl.publicationDate = moment().format('DD-MM-YYYY');
    this.reportNl.summary =  this.rep.graph[0].summary;
    this.reportNl.samples = this.rep.graph[0].structuredSample.webpage.concat(this.rep.graph[0].randomSample.webpage);
    this.reportNl.reliedUponTechnology = this.rep.graph[0].reliedUponTechnology;
    if (this.reportNl.specifics) { this.reportNl.specifics = this.rep.graph[0].specifics.split('\n'); }
    this.auditResults = this.rep.graph[0].auditResult;
    this.reportNl.principles.forEach( prn => {
      const total = new Total(prn.handle);
      prn.guidelines.forEach(gl => {
        gl.successcriteria.forEach(sc => {
          sc.result = this.auditResults.find(res => res.test === sc.id);
          this.updateTotals(sc, total);
        });
      });
      this.reportNl.totals.push(total);
    });
  }

  public getReport(): Report {
    if (this.reportNl.onlyIssues) {
      this.filterIssues();
    }
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

  private updateTotals(sc, total: Total): void {
    if (sc.result.result.outcome !== 'earl:untested') {
      total.totalCriteria++;
      if (sc.level === 'A') {
        total.levelATotal++;
      }
      if (sc.level === 'AA') {
        total.levelAATotal++;
      }
      if (sc.result.result.outcome === 'earl:passed') {
        if (sc.level === 'A') {
          total.levelASuccess++;
        }
        if (sc.level === 'AA') {
          total.levelAASuccess++;
        }
        total.totalSuccess++;
      }
    }
  }

  public filterIssues(): void {
    this.reportNl.principles.forEach(p => {
      p.guidelines.forEach(g => {
        g.successcriteria = g.successcriteria.filter(s => s.result.result.outcome === 'earl:failed');
      });
      p.guidelines = p.guidelines.filter(p => p.successcriteria.length > 0);
    });
    this.reportNl.principles = this.reportNl.principles.filter(p => p.guidelines.length > 0);
  }
}
