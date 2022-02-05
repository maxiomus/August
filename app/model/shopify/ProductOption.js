Ext.define('August.model.shopify.ProductOption', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [
        { name: 'id', type: 'int' },        
        { 
            name: "product_id",
            reference: {
                type: 'shopify.Product',
                role: 'product',
                inverse: 'options'
            },
            type: 'int' 
        },
        { name: "name", type: 'string' },
        { name: "position", type: 'int' },
        { name: "values", type: 'auto' }
    ],

    idProperty: 'id',
    identifier: 'negative',

    validators: {
        //style: 'presence',
        //color: 'presence'        
    },

    proxy: {
        type: 'memory',        

        pageParam: '',
        startParam: '',
        limitParam: '',

        reader: {
            type: 'json',
            rootProperty: 'options'
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