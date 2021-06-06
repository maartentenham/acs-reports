import * as PDFKit from "pdfkit";

export class TitleTemplate {
    private model: any;

    constructor(model: any) {
        this.model = model;
    }

    renderDoc(doc: any, struct: any): void {
        struct.add(doc.struct('H', () => {
            doc
                .fontSize(24)
                .text('Toegankelijkheidsrapport ', 100, 100)
                .text('WCAG 2.1 ');
        }));

    }

    render(): any {
        return [{
            stack: [
                {text: 'Toegankelijkheidsrapport ', tag: 'H1'},
                'WCAG 2.1 '
            ],
            bold: true,
            fontSize: 24,
            alignment: 'center',
            margin: [0, 100, 0, 40]
        },
        {
            stack: [
                'Website: ' + this.model.website,
                'Onderzoeker(s): ' + this.model.evaluator,
                'Publicatiedatum: ' + this.model.publicationDate + ' '
            ],
            absolutePosition: {x: 40, y: 700},
            pageBreak: 'after',
            style: 'h4'
        }];

    }
}
