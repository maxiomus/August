Ext.define('August.model.shopify.OptionValue', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [        
        { name: "id", type: 'int' },
        /*
        { 
            name: "option_id", 
            reference: {
                type: 'shopify.ProductOption',
                role: 'option',
                inverse: 'values'
            },
            type: 'int' 
        },
        */                
        { name: "value", type: 'string' }
    ],

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
            rootProperty: 'values'
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