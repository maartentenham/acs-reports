import {TotalsTemplate} from "./totals-template";

export class ResearchinfoTemplate {
    private model: any;

    constructor(model: any) {
        this.model = model;
    }

    render(): any {
        return [{
            text: 'Onderzoeksgegevens',
            style: 'h2',
            tocItem: true,
            pageBreak: 'before'
        }, {
            text: 'Algemeen',
            style: 'h4',
            tocItem: true,
            tocMargin: [20, 0, 0, 0],
        },
        'Type rapport: WCAG 2.1 niveau AA',
        'Opdrachtgever: TODO',
        'Onderzoeksperiode: TODO',
        new TotalsTemplate(this.model).render()
        ];
    }
}
