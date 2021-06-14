import {GuidelineTemplate} from "./guideline-template";

export class PrincipleTemplate {
    private model: any;
    constructor(model: any) {
        this.model =  model;
    }

    render(): any {
        const principle = [
            {text: '', pageBreak: this.model.principle.num === '1' ? 'before' : ''},
            {stack: [{
            text: 'Principe ' + this.model.principle.num + ': ' + this.model.principle.handle + ' ',
            style: 'h2',
            tocItem: true,
            margin: this.model.principle.num === '1' ? [0, 0, 0, 0] : [0, 20, 0, 0]},
            this.model.principle.text], tag: 'H2'}
        ];

        this.model.principle.guidelines.forEach(g => principle.push(new GuidelineTemplate({guideline: g}).render()));
        return principle;
    }
}
