import { Injectable } from '@angular/core';
import principlesEn from '../data/wcag2-en.json';
import principlesNl from '../data/wcag2-nl.json';
import { Principle } from '../interfaces/principle.interface';
import { Report } from '../interfaces/report.interface';

@Injectable({
  providedIn: 'root'
})
export class ReportService {

  private rep: any;
  private finalReport: Report;
  private reportNl: Report = principlesNl;
  private reportEn: Report = principlesEn;
  private jsonQuery = require('json-query');

  constructor() {
    this.reportNl.principles.forEach( prn => {
      prn.guidelines.forEach(gl => {
        gl.alt_id = [gl.id.split(':')[1]];
        gl.id  = this.findGuidelineId(gl.alt_id[0]);
        console.log(gl)
      })
    });

  }

  public set report(value: any) {
    this.rep =  value;
  }

  public get report(): any { return this.rep}

  private findGuidelineId(altId: string): string {
    const query = 'principles.guidelines[alt_id=' + altId + '].id';
    return this.jsonQuery(query, {data: principlesEn}).value;
  }
}
