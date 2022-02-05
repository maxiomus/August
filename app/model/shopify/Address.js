Ext.define('August.model.shopify.Address', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [        
        { name: "address1", type: 'string' },
        { name: "address2", type: 'string' },
        { name: "city", type: 'string' },
        { name: "company", type: 'string' },
        { name: "country", type: 'string' },
        { name: "country_code", type: 'string' },
        { name: "country_name", type: 'string' },
        { name: "default", type: 'bool' },
        { name: "first_name", type: 'string' },
        { name: "last_name", type: 'string' },
        { name: "latitude", type: 'number' },
        { name: "longitude", type: 'number' },
        { name: "name", type: 'string' },
        { name: "phone", type: 'string' },
        { name: "province", type: 'string' },
        { name: "province_code", type: 'string' },
        { name: "zip", type: 'string' }
    ],

    identifier: 'negative',

    validators: {
        //style: 'presence',
        //color: 'presence'        
    }
});