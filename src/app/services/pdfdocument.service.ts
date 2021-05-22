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
        // pdfMake.createPdf(this.getDocumentDefinition()).open();
        const pdfDocGenerator = pdfMake.createPdf(this.getDocumentDefinition());
        pdfDocGenerator.getDataUrl((dataUrl) => {
            const targetElement = document.querySelector('#pdfIframe');
            const iframe = document.createElement('iframe');
            iframe.src = dataUrl;
            iframe.width = '100%';
            iframe.height = '900';
            targetElement.appendChild(iframe);
        });
    }

    public getDocumentDefinition(): any {
        this.report = JSON.parse(sessionStorage.getItem('acsreport'));
        const documentDefinition = {
            content: [
                this.titlePage(),
                this.tableOfContents(),
                this.prefacePage(),
                this.summaryPage()
            ],
            styles: this.styles()
        };
        return documentDefinition;
    }

    private styles(): any {
        return {
            h2: {
                fontsize: 16,
                bold: true
            },
            h4: {
                fontsize: 14,
                bold: true
            },
            link: {
                decoration: 'underline',
                color: 'blue'
            }
        };
    }

    private titlePage(): any {
        return [{
            stack: [
                'Toegankelijkheidsrapport',
                'WCAG 2.1'
            ],
            bold: true,
            fontSize: 24,
            alignment: 'center',
            margin: [0, 100, 0, 40]
        },
            {
                stack: [
                    'Website: ' + this.report.website,
                    'Onderzoeker(s): ' + this.report.evaluator,
                    'Publicatiedatum: ' + this.report.publicationDate
                ],
                absolutePosition: {x: 40, y: 700},
                pageBreak: 'after',
                style: 'h4'
            }];
    }

    private tableOfContents(): any {
        return {
            toc: {
                title: {text: 'Inhoudsopgave', style: 'h4'}
            }
        };
    }

    private prefacePage(): any {
        return [{
            text: 'Inleiding',
            style: 'h2',
            tocItem: true,
            pageBreak: 'before'
        },
        {text: [
            'In dit rapport is te lezen in hoeverre de onderzochte website voldoet aan de WCAG 2.1, niveau AA. WCAG staat voor Web Content Accessibility Guidelines en is in de Europese wetgeving opgenomen als standaardvoor digitale toegankelijkheid (zie: “Methode en norm”). In Nederland is dit geïmplementeerd in het: ',
            {
                text: 'Tijdelijk besluit digitale toegankelijkheid overheid',
                link: 'https://wetten.overheid.nl/BWBR0040936/2018-07-01',
                style: 'link'
            },
            ', dat op termijn (op zijn vroegst 1 juli 2022) over zal gaan in de Wet digitale overheid.',
            '\n\n',
            ' Voor overheidsorganisaties geldt dat voldaan moet worden aan de WCAG 2.1, niveau AA.Dat betreft 50 zogenoemde succescriteria, die allen in dit rapport kort toegelicht worden. Een uitgebreide behandeling van de succescriteria is te vinden op de ',
            {
                text: 'website van het W3C',
                link: 'https://www.w3.org/Translations/WCAG21-nl/',
                style: 'link'
            },
            '. De WCAG berusten op vier principes, die stellen dat een website voor iedereen waarneembaar, bedienbaar, begrijpelijk en robuust moet zijn. Hiermee wordt geborgd dat iedereen de website kan gebruiken, ongeacht een eventuele beperking.',
            '\n\n',
            'Om de mate van toegankelijkheid te beoordelen wordt de website via een onderbouwde steekproef beoordeeld. Per succescriterium wordt gekeken of de onderzochte set pagina’s voldoet aan de vereisten. Dit betekent dat er mogelijk fouten niet geconstateerd zijn, omdat ze voorkomen op pagina’s die niet in de steekproef zitten. Bovendien betreft dit rapport een momentopname. Aanpassingen op de pagina’s kunnen ook weer nieuwe toegankelijkheidsproblemen met zich meebrengen.',
        ]}
      ];
    }

    private summaryPage(): any {
        return [{
            text: 'Samenvatting',
            style: 'h2',
            tocItem: true,
            pageBreak: 'before'
        },
        this.report.summary
      ];
    }
}
