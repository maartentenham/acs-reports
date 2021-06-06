export class StylesTemplate {
    render(): any  {
        return {
            h2: {
                fontSize: 16,
                bold: true
            },
            h4: {
                fontSize: 14,
                bold: true,
                margin: [0, 10, 0, 0]
            },
            h6: {
              fontSize: 13,
              italics: true,
              margin: [0, 10, 0, 0]
            },
            success: {
                fontSize: 13,
                bold: true,
                margin: [0, 10, 0, 10]
            },
            fail: {
                fontSize: 13,
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
