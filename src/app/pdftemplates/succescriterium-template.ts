import {ResultTemplate} from './result-template';

export class SuccescriteriumTemplate {
    private model: any;
    constructor(model: any) {
        this.model =  model;
    }

    render(): any {
        return [{stack: [{
            text: 'Successcriterium ' + this.model.criterium.num + ': ' + this.model.criterium.handle +
                  ' (niveau ' + this.model.criterium.level + ') ',
            style: 'h6'}], tag: 'P'},
            {stack: [{text: this.model.criterium.text}], tag: 'P'},
            new ResultTemplate({result: this.model.criterium.result}).render()
        ];
    }
}
