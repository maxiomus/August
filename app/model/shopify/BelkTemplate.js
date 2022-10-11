Ext.define('August.model.shopify.BelkTemplate', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [
        { name: 'category', type: 'string' },
        { name: 'newStyle', type: 'string' },
        { name: 'date', type: 'string' },
        { name: 'brandName', type: 'string' },
        { name: 'vendorStyleNo', type: 'string' },        
        { name: 'upc', type: 'string' },
        { name: 'itemDescription', type: 'string' },
        { name: 'sizeCode', type: 'string' },
        { name: 'sizeDescription', type: 'string' },
        { name: 'colorCode', type: 'number' },
        { name: 'colorName', type: 'string' },        
        { name: 'cost', type: 'number' },
        { name: 'msrp', type: 'number' },
        { name: 'saleRetail', type: 'number' },    
        { name: 'packageShipFrom', type: 'string' },
        { name: 'weight', type: 'string' },
        { name: 'height', type: 'string' },
        { name: 'width', type: 'string' },
        { name: 'length', type: 'string' }
    ],

    //identifier: 'negative',

    validators: {
        //style: 'presence',
        //color: 'presence'        
    },

    proxy: {
        type: 'rest',
        
        url: '/WebApp/api/ProductTemplates',

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