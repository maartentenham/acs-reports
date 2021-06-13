export class TocTemplate {
    render(): any  {
        return {
            toc: {
                title: {stack: [{text: 'Inhoudsopgave ', style: 'h2'}], tag: 'H2'}
            }
        };
    }
}
