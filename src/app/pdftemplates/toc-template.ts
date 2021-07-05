export class TocTemplate {
    render(): any  {
        return {
            stack: [
                {
                    toc: {
                        title: {text: 'Inhoudsopgave ', style: 'h2'}
                    }
                }
            ], tag: 'TOC'
        };
    }
}
