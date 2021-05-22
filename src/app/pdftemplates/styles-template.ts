export class StylesTemplate {
    render(): any  {
        return {
            h2: {
                fontsize: 16,
                bold: true
            },
            h4: {
                fontsize: 14,
                bold: true,
                margin: [0, 10, 0, 0]
            },
            link: {
                decoration: 'underline',
                color: 'blue'
            }
        };
    }
}
