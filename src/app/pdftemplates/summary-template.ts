export class SummaryTemplate {
    private model: any;

    constructor(model: any) {
        this.model = model;
    }
    render(): any {
        return [{
            text: 'Samenvatting ',
            style: 'h2',
            tocItem: true,
            pageBreak: 'before'
            },
            {text: this.model.summary}
        ];
    }
}
