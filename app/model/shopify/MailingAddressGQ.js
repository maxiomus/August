Ext.define('August.model.shopify.MailingAddressGQ', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [        
        { name: "address1", type: 'string' },
        { name: "address2", type: 'string' },
        { name: "city", type: 'string' },
        { name: "company", type: 'string' },
        { name: "coordinatesValidated", type: 'bool' },
        { name: "country", type: 'string' },
        { name: "countryCodeV2", type: 'auto' },                
        { name: "firstName", type: 'string' },
        { name: "formatted", type: 'string' },
        { name: "formattedArea", type: 'string' },
        { name: "lastName", type: 'string' },
        { name: "latitude", type: 'number' },
        { name: "longitude", type: 'number' },
        { name: "name", type: 'string' },
        { name: "phone", type: 'string' },
        { name: "province", type: 'string' },
        { name: "provinceCode", type: 'string' },
        { name: "zip", type: 'string' }
    ],

    identifier: 'negative',

    validators: {
        //style: 'presence',
        //color: 'presence'        
    }
});