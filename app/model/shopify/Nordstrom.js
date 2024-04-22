Ext.define('August.model.shopify.Nordstrom', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [
        { name: 'ProductID', type: 'string' },
        { name: 'ProductIDDescEnglish', type: 'string' },
        { name: 'GTIN', type: 'string' },
        { name: 'GTINType', type: 'string' },
        { name: 'ChangeDate', type: 'string' },
        { name: 'NRFColorCode', type: 'string' },
        { name: 'ShortColorDescEnglish', type: 'string' },
        { name: 'NRFSizeCode', type: 'string' },
        { name: 'ShortSizeDescEnglish', type: 'string' },
        { name: 'Category', type: 'string' },
        { name: 'MSRP', type: 'number' }
    ],

    //identifier: 'negative',

    validators: {
        //style: 'presence',
        //color: 'presence'        
    },

    proxy: {
        type: 'rest',
        
        url: '/WebApp/api/ProductTemplates/',

        actionMethods: {
            read: 'POST'
        },
        
        pageParam: '',
        startParam: '',
        limitParam: '',

        headers: {
            'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
        },

        reader: {
            type: 'json',
            rootProperty: 'data'
        },

        writer: {
            type: 'json',
            //clientIdProperty: 'clientId',
            //writeAllFields: true,
            allowSingle: false // set false to send a single record in array
        },

        //extraParams: {},

        listeners: {
            exception: function (proxy, response, operation) {
                console.log(response, operation);
            }
        }
    }
});