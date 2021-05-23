import {ResultTemplate} from './result-template';

export class SuccescriteriumTemplate {
    private model: any;
    constructor(model: any) {
        this.model =  model;
    }

    render(): any {
        return [{
            text: 'Successcriterium ' + this.model.criterium.num + ': ' + this.model.criterium.handle,
            style: 'h6'},
            this.model.criterium.text,
            new ResultTemplate({result: this.model.criterium.result}).render()
        ];
    }
}
