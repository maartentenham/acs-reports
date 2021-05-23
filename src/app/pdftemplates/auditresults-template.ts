import {PrincipleTemplate} from './principle-template';

export class AuditresultsTemplate {
    private model: any;
    constructor(model: any) {
        this.model =  model;
    }

    render(): any {
        const auditresults = [];
        this.model.principles.forEach(p => auditresults.push(new PrincipleTemplate({principle: p}).render()));
        return auditresults;
    }
}
