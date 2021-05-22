export class TotalsTemplate {
    private model: any;
    private totals = [];
    private tableheader = ['', 'Niveau A', 'Niveau AA', 'Totaal'];

    constructor(model: any) {
        this.model = model;
        this.totals.push(this.tableheader);
        this.model.totals.forEach(total => this.totals.push([total.name, '', '', total.totalSuccess + '/' + total.totalCriteria]));
    }

    render(): any {
        return [{
            text: 'Onderzoekscores',
            style: 'h4',
            tocItem: true,
            tocMargin: [20, 0, 0, 0],
        }, {
            table: {
                headerRows: 1,
                widths: [ '*', 'auto', '*', '*' ],
                body: this.totals
            }
        }];
    }
}
