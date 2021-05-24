import {Total} from '../model/total';

export class TotalsTemplate {
    private model: any;
    private totals = [];
    private tableheader = ['', this.getCell('Niveau A'), this.getCell('Niveau AA'), this.getCell( 'Totaal')];

    constructor(model: any) {
        this.model = model;
        this.totals.push(this.tableheader);
        const grandTotal = new Total('Totaal');
        this.model.totals.forEach((total: Total) => {
            const row  = [
                total.name,
                this.getCell(total.levelASuccess + '/' + total.levelATotal),
                this.getCell(total.levelAASuccess + '/' + total.levelAATotal),
                this.getCell(total.totalSuccess + '/' + total.totalCriteria)];
            this.totals.push(row);
            grandTotal.levelASuccess = grandTotal.levelASuccess + total.levelASuccess;
            grandTotal.levelAASuccess = grandTotal.levelAASuccess + total.levelAASuccess;
            grandTotal.levelATotal = grandTotal.levelATotal + total.levelATotal;
            grandTotal.levelAATotal = grandTotal.levelAATotal + total.levelAATotal;
            grandTotal.totalSuccess = grandTotal.totalSuccess + total.totalSuccess;
            grandTotal.totalCriteria = grandTotal.totalCriteria + total.totalCriteria;
        });
        const grandTotalRow  = [
            grandTotal.name,
            this.getCell(grandTotal.levelASuccess + '/' + grandTotal.levelATotal),
            this.getCell(grandTotal.levelAASuccess + '/' + grandTotal.levelAATotal),
            this.getCell(grandTotal.totalSuccess + '/' + grandTotal.totalCriteria)];
        this.totals.push(grandTotalRow);
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
                widths: [ '*', '*', '*', '*' ],
                alignment: 'center',
                body: this.totals
            }
        }];
    }

    private getCell(celltext: string): any {
        return {text: celltext, alignment: 'center'};
    }
}
