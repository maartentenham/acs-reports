export class SummaryTemplate {
    private model: any;

    constructor(model: any) {
        this.model = model;
    }
    render(): any {
        return [
            {text: '', pageBreak: 'before'},
            {stack: [{text: 'Samenvatting ', style: 'h2', tocItem: true}], tag: 'H2'},
            {text: this.model.summary}
        ];
    }
}
