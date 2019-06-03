[
    {
        'repeat(100, 10)': {
            _id: '{{objectId()}}',
            index: '{{index()}}',
            guid: '{{guid()}}',
            isActive: '{{bool()}}',
            cost: '{{floating(1000, 100000, 2, "$0,0.00")}}',
            discipline: '{{random("architectural","geotechnical","civil","process","electrical","fire-protection","general","hazardous-material","interiors","justice-detention","food-service","landscape","mechanical","operations","plumbing","equipment","structural","telecommunication","railway","survey-mapping","civil-works","other-disciplines","security","contractors-shop-drawings")}}',
            state: '{{random("completed","pending","in-progress")}}',
            leadName: {
                first: '{{firstName()}}',
                last: '{{surname()}}',
            },
            subcontractor: '{{company().toUpperCase()}}',
            email(tags) {
                return `${this.leadName.first}.${this.leadName.last}@${this.subcontractor}${tags.domainZone()}`.toLowerCase();
            },
            phone: '+1 {{phone()}}',
            address: '{{integer(100, 999)}} {{street()}}, {{city()}}, {{state()}}, {{integer(100, 10000)}}',
            about: '{{lorem(1, "paragraphs")}}',
            registered: '{{moment(this.date(new Date(2014, 0, 1), new Date())).format("LLLL")}}',
            latitude: '{{floating(32.805546, 32.801461)}}',
            longitude: '{{floating(-96.802585, -96.795869)}}',
        }
    }
]

