import {Total} from '../model/total';

export class TotalsTemplate {
    private model: any;
    private totals = [];
    private grandTotal: Total;
    private tableheader = ['', this.getCell('Niveau A'), this.getCell('Niveau AA'), this.getCell( 'Totaal')];

    constructor(model: any) {
        this.model = model;
        this.totals.push(this.tableheader);
        this.grandTotal = new Total('Totaal');
        this.model.totals.forEach((total: Total) => {
            const row  = [
                total.name,
                this.getCell(total.levelASuccess + '/' + total.levelATotal),
                this.getCell(total.levelAASuccess + '/' + total.levelAATotal),
                this.getCell(total.totalSuccess + '/' + total.totalCriteria)];
            this.totals.push(row);
            this.grandTotal.levelASuccess = this.grandTotal.levelASuccess + total.levelASuccess;
            this.grandTotal.levelAASuccess = this.grandTotal.levelAASuccess + total.levelAASuccess;
            this.grandTotal.levelATotal = this.grandTotal.levelATotal + total.levelATotal;
            this.grandTotal.levelAATotal = this.grandTotal.levelAATotal + total.levelAATotal;
            this.grandTotal.totalSuccess = this.grandTotal.totalSuccess + total.totalSuccess;
            this.grandTotal.totalCriteria = this.grandTotal.totalCriteria + total.totalCriteria;
        });
        const grandTotalRow  = [
            this.grandTotal.name,
            this.getCell(this.grandTotal.levelASuccess + '/' + this.grandTotal.levelATotal),
            this.getCell(this.grandTotal.levelAASuccess + '/' + this.grandTotal.levelAATotal),
            this.getCell(this.grandTotal.totalSuccess + '/' + this.grandTotal.totalCriteria)];
        this.totals.push(grandTotalRow);
    }

    render(): any {
        return [{
            text: 'Onderzoekscores',
            style: 'h4',
            tocItem: true,
            tocMargin: [20, 0, 0, 0],
        }, {
            text: 'Score: ' + this.grandTotal.totalSuccess + '/' + this.grandTotal.totalCriteria
        }
        ];
    }

    private getCell(celltext: string): any {
        return {text: celltext, alignment: 'center'};
    }
}
