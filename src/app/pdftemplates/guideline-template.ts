import {SuccescriteriumTemplate} from "./succescriterium-template";

export class GuidelineTemplate {
    private model: any;
    constructor(model: any) {
        this.model =  model;
    }

    render(): any {
        const guideline = [{
            text: 'Richtlijn ' + this.model.guideline.num + ': ' + this.model.guideline.handle,
            style: 'h4',
            tocItem: true,
            tocMargin: [20, 0,  0,  0]},
            this.model.guideline.text
        ];

        this.model.guideline.successcriteria
            .filter(c => c.result.result.outcome !==  'earl:untested')
            .forEach(c => guideline.push(new SuccescriteriumTemplate({criterium: c}).render()));
        return guideline;
    }
}
