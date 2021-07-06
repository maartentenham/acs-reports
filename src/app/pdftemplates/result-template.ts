export class ResultTemplate {
    private model: any;
    constructor(model: any) {
        this.model =  model;
    }

    render(): any {
        const result = [];
        if (this.model.result.result.outcome === 'earl:passed') {
            const resultText =  {text: 'De onderzochte set webpagina’s voldoet aan dit succescriterium.', style: 'success'};
            result.push(resultText);
        } else {
            const resultText =  [
                {stack: [{text: 'De onderzochte set webpagina’s voldoet NIET aan dit succescriterium.', style: 'fail'}], tag: 'P'},
                {stack: [{text: this.model.result.result.description, style: 'result'}], tag: 'P'}
            ];
            result.push(resultText);
        }
        return result;
    }
}
