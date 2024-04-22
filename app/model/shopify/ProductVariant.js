Ext.define('August.model.shopify.ProductVariant', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [
        { name: 'id', type: 'int' },        
        { 
            name: 'product_id', 
            reference: {
                type: 'shopify.Product',
                role: 'product',                
                inverse: 'variants'
            },
            type: 'int'     
        },
        { name: "title", type: 'string' },
        { name: "price", type: 'number' },
        { name: "sku", type: 'string' },
        { name: "position", type: 'int' },
        { name: "inventory_policy", type: 'string' },
        { name: "compare_at_price", type: 'number' },
        { name: "fulfillment_service", type: 'string' },
        { name: "inventory_management", type: 'string' },
        { name: "option1", type: 'string' },
        { name: "option2", type: 'string' },
        { name: "option3", type: 'string' },
        { name: "created_at", type: 'date' },
        { name: "updated_at", type: 'date' },
        { name: "taxable", type: 'bool' },
        { name: "barcode", type: 'string' },
        { name: "grams", type: 'int' },
        { name: "image_id", type: 'int' },
        { name: "weight", type: 'number' },
        { name: "weight_unit", type: 'string' },
        { name: "inventory_item_id", type: 'int' },
        { name: "inventory_quantity", type: 'int' },
        { name: "old_inventory_quantity", type: 'int' },
        { name: "requires_shipping", type: 'bool' },
        { name: "admin_graphql_api_id", type: 'string' }
    ],

    idProperty: 'id',
    identifier: 'negative',

    validators: {
        //style: 'presence',
        //color: 'presence'        
    },

    proxy: {
        type: 'rest',        

        pageParam: '',
        startParam: '',
        limitParam: '',

        reader: {
            type: 'json',
            rootProperty: 'variants'
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