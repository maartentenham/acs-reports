export class PrincipleTemplate {
    private model: any;
    constructor(model: any) {
        this.model =  model;
    }

    render(): any {
        return [{
            text: 'Principe ' + this.model.principle.num + ': ' + this.model.principle.handle,
            style: 'h2',
            tocItem: true,
            pageBreak: this.model.principle.num === '1' ? 'before' : '',
            margin: this.model.principle.num === '1' ? [0, 0, 0, 0] : [0, 20, 0, 0]},
            this.model.principle.text
        ];
    }
}
