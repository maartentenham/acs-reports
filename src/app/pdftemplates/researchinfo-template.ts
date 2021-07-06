import {TotalsTemplate} from './totals-template';

export class ResearchinfoTemplate {
    private model: any;

    constructor(model: any) {
        this.model = model;
    }

    render(): any {
        const technologies = [];
        this.model.reliedUponTechnology.forEach(t => technologies.push(t.title));
        return [
            { text: '', pageBreak: 'before'},
            { stack: [{ text: 'Onderzoeksgegevens ', style: 'h2', tocItem: true}], tag: 'H2'},
            { stack: [
                { text: 'Algemeen', style: 'h4', tocItem:  true, tocMargin: [20, 0, 0, 0]},
                'Type rapport: WCAG 2.1 niveau AA',
                'Opdrachtgever: ' + this.model.initiator,
                'Onderzoeksperiode: ' + this.model.researchPeriod
            ], tag: 'P'},
            new TotalsTemplate(this.model).render(),
            { stack: [
                { text: 'Scope van het onderzoek', style: 'h4', tocItem:  true, tocMargin: [20, 0, 0, 0]},
                this.model.scope
            ], tag: 'P'},
            {stack: [
                { text: 'Methode en norm', style: 'h4', tocItem:  true, tocMargin: [20, 0, 0, 0]},
                { text: 'Dit onderzoek is uitgevoerd op basis van de evaluatiemethode (WCAG-EM).'},
                { text:  [
                        '\nDe toegepaste norm is EN 301 549. Deze bevat integraal de ',
                        {text: 'WCAG 2.1. '},
                        'Hiervoor gelden de uitzonderingen zoals beschreven in artikel 1, lid 4 van de ',
                        {text: 'Europese richtlijn voor de toegankelijkheid van overheidswebsites en -apps'},
                        '. Deze uitzonderingen zijn ook terug te vinden op ',
                        {text: 'Digitoegankelijk'},
                        '.'
                    ]
                }
            ], tag: 'P'},
            {stack: [
                { text: 'Basisniveau van toegankelijkheidsondersteuning', style: 'h4', tocItem:  true, tocMargin: [20, 0, 0, 0]},
                'Gangbare webbrowsers en hulpapparatuur.'
            ], tag: 'P'},
            {stack: [
                { text: 'Technologieën waarop wordt gesteund', style: 'h4', tocItem:  true, tocMargin: [20, 0, 0, 0]},
                technologies.length >  0 ? { ul: technologies, margin: [10, 0, 0, 0] } : ''
            ], tag: 'P'},
            {stack: [
                { text: 'User agents (webbrowsers)', style: 'h4', tocItem:  true, tocMargin: [20, 0, 0, 0]},
                'Bij dit onderzoek is gebruik gemaakt van de volgende webbrowsers:',
                this.model.specifics ? { ul: this.model.specifics, margin: [10, 0, 0, 0] } : '',
            ], tag: 'P'},
            {stack: [
                { text: 'Aantal pagina\'s van de steekproef', style: 'h4', tocItem:  true, tocMargin: [20, 0, 0, 0]},
                this.model.samples.length + ' (zie bijlage voor de volledige steekproef)'
            ], tag: 'P'},
            '\n\n',
            {stack: [
                    {text: 'Links ',  style: 'h4'}
                ], tag: 'H4'},
            {stack: [
                    {
                        text: 'evaluatiemethode (WCAG-EM)',
                        link: 'https://www.w3.org/TR/WCAG-EM/',
                        style: 'link'
                    }
                ], tag: 'Link'},
            {stack: [
                    {
                        text: 'WCAG 2.1',
                        link: 'https://www.w3.org/Translations/WCAG21-nl/',
                        style: 'link'
                    }
                ], tag: 'Link'},
            {stack: [
                    {
                        text: 'Europese richtlijn voor de toegankelijkheid van overheidswebsites en -apps',
                        link: 'https://eur-lex.europa.eu/legal-content/NL/TXT/HTML/?uri=CELEX:32016L2102&qid=1481290140258&from=en#d1e592-1-1',
                        style: 'link'
                    }
                ], tag: 'Link'},
            {stack: [
                    {
                        text: 'Digitoegankelijk',
                        link: 'https://www.digitoegankelijk.nl/wetgeving/specifieke-situaties',
                        style: 'link'
                    }
                ], tag: 'Link'}
        ];
    }
}
