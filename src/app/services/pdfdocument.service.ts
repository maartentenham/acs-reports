import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import {Injectable} from '@angular/core';
import {Report} from '../interfaces/report.interface';
pdfMake.vfs = pdfFonts.pdfMake.vfs;

@Injectable({
    providedIn: 'root'
})
export class PdfdocumentService {
    private report: Report;
    constructor() {
    }

    public openPdf(): void {
        pdfMake.createPdf(this.getDocumentDefinition()).open();
    }

    public getDocumentDefinition(): any {
        this.report = JSON.parse(sessionStorage.getItem('acsreport'));
        const documentDefinition = {
            content: [
                this.titlePage()
            ],
            styles: {}
        };
        return documentDefinition;
    }

    private titlePage(): any {
        return {
            text: [
                'Toegankelijkheidsrapport\n',
                'WCAG 2.1'
            ],
            bold: true,
            fontSize: 20,
            alignment: 'center',
            margin: [0, 0, 0, 20]
        };
    }
}
