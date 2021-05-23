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
                {text: 'De onderzochte set webpagina’s voldoet NIET aan dit succescriterium.', style: 'fail'},
                {
                    table: {
                        headerRows: 0,
                        body: [
                            [{
                                fillColor:  '#dcdcdc',
                                border: [false, false, false, false],
                                columns: [this.model.result.result.description]
                            }]
                        ]
                    },
                    margin: [10, 0, 10, 0],
                }
            ];
            result.push(resultText);
        }
        return result;
    }
}
