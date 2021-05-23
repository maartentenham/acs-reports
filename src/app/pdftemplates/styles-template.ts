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
            h6: {
              fontsize: 13,
              italics: true,
              margin: [0, 10, 0, 0]
            },
            success: {
                fontsize: 13,
                bold: true,
                margin: [0, 10, 0, 10]
            },
            fail: {
                fontsize: 13,
                bold: true,
                margin: [0, 10, 0, 10]
            },
            link: {
                decoration: 'underline',
                color: 'blue'
            }
        };
    }
}
