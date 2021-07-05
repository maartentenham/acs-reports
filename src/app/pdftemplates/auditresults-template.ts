import {PrincipleTemplate} from './principle-template';

export class AuditresultsTemplate {
    private model: any;
    constructor(model: any) {
        this.model =  model;
    }

    render(): any {
        const auditresults = [];
        this.model.principles = this.model.principles.filter(p => p.num === '1' || p.num === '2' || p.num === '3' || p.num === '4');
        this.model.principles.forEach(p => auditresults.push(new PrincipleTemplate({principle: p}).render()));
        return auditresults;
    }
}
