import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {Injectable} from '@angular/core';
import {Report} from '../model/report.interface';
import {PrefaceTemplate} from '../pdftemplates/preface-template';
import {SummaryTemplate} from '../pdftemplates/summary-template';
import {TitleTemplate} from '../pdftemplates/title-template';
import {TocTemplate} from '../pdftemplates/toc-template';
import {StylesTemplate} from '../pdftemplates/styles-template';
import {ResearchinfoTemplate} from '../pdftemplates/researchinfo-template';
import {AuditresultsTemplate} from '../pdftemplates/auditresults-template';
import {TestesPagesTemplate} from '../pdftemplates/testes-pages-template';
import {ReportService} from './report.service';
import {MetainfoTemplate} from '../pdftemplates/metainfo-template';
import * as PDFKit from '../../assets/pdfkit.standalone';

pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
    providedIn: 'root'
})
export class PdfdocumentService {
    private report: Report;
    private doc: PDFKit.PDFDocument;
    private struct: any;

    constructor(private reportService: ReportService) {
    }

    public openPdf(): void {
        const pdfDocGenerator = pdfMake.createPdf(this.getDocumentDefinition());
        pdfDocGenerator.getDataUrl((dataUrl) => {
            const targetElement = document.querySelector('#pdfIframe');
            if (targetElement.hasChildNodes()) {
                targetElement.removeChild(targetElement.firstChild);
            }
            const iframe = document.createElement('iframe');
            iframe.src = dataUrl;
            iframe.width = '100%';
            iframe.height = '900';
            targetElement.appendChild(iframe);
        });
    }

    public getDocumentDefinition(): any {
        this.report = this.reportService.getReport();
        return {
            version: '1.5',
            info: new MetainfoTemplate().render(),
            content: [
                this.titlePage(),
                this.tableOfContents(),
                this.prefacePage(),
                this.researchinfoPage(),
                this.summaryPage(),
                this.auditresultsPage(),
                this.testedUrlsPage()
            ],
            footer: this.footer(),
            styles: this.styles()
        };
    }

    private styles(): any {
        return new StylesTemplate().render();
    }

    private footer(): any {
        return (currentPage, pageCount) => {
            return currentPage > 1 ? {text: currentPage, alignment: 'center'} : '';
        };
    }
    private titlePage(): any {
        return new TitleTemplate({
            website : this.report.website,
            evaluator : this.report.evaluator,
            publicationDate : this.report.publicationDate
        }).render();
    }

    private tableOfContents(): any {
        return new TocTemplate().render();
    }

    private prefacePage(): any {
        return new PrefaceTemplate().render();
    }

    private  researchinfoPage(): any {
        return new ResearchinfoTemplate({
                totals: this.report.totals,
                samples: this.report.samples,
                reliedUponTechnology: this.report.reliedUponTechnology,
                specifics: this.report.specifics,
                initiator: this.report.initiator,
                researchPeriod: this.report.researchPeriod,
                scope: this.report.scope
            })
            .render();
    }

    private summaryPage(): any {
        return new SummaryTemplate({summary: this.report.summary}).render();
    }

    private auditresultsPage(): any {
        return new AuditresultsTemplate({principles: this.report.principles}).render();
    }

    private testedUrlsPage(): any {
        return new TestesPagesTemplate({samples: this.report.samples}).render();
    }
}
