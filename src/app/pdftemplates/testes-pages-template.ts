export class TestesPagesTemplate {
    private model: any;
    constructor(model: any) {
        this.model =  model;
    }

    render(): any  {
        const header = [
            {text: '', pageBreak: 'before'},
            {stack: [{text: 'Bijlage: gebruikte pagina\'s in de steekproef ', style: 'h2', tocItem: true}], tag: 'H2'}
        ];

        const testedpages = [];
        this.model.samples.forEach(w => testedpages.push({text: w.source, style: 'link', margin: [10, 0, 0, 0]}));
        const siteList = {ul: testedpages};
        return [header, siteList];
    }
}
