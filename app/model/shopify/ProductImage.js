Ext.define('August.model.shopify.ProductImage', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [
        { name: 'id', type: 'int' },        
        { 
            name: "product_id",
            reference: {
                parent: 'shopify.Product',                
                field: 'id',
                inverse: 'images'
            }
        },   
        { name: "position", type: 'int' },
        { name: "created_at", type: 'date' },
        { name: "updated_at", type: 'date' },
        { name: "alt", type: 'string', allowNull: true },
        { name: "width", type: 'int' },
        { name: "height", type: 'int' },
        { name: "src", type: 'string' }
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
            rootProperty: 'images'
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