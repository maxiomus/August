Ext.define('August.model.shopify.ProductVariantGQ', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [
        { name: 'cursor', type: 'string' },
        { name: 'id', mapping: 'node.id' },        
        { 
            name: 'product_id', 
            reference: {
                type: 'shopify.ProductGQ',
                role: 'product',                
                inverse: 'variants'
            }
        },
        { name: "title", mapping: 'node.title' },
        { name: "displayName", mapping: 'node.displayName' },
        { name: "price", mapping: 'node.price' },
        { name: "sku", mapping: 'node.sku' },
        { name: "position", mapping: 'node.position' },        
        { name: "compareAtPrice", mapping: 'node.compareAtPrice' },        
        { name: "selectedOptions", mapping: 'node.selectedOptions' },        
        { name: "option1", 
            mapping: function(data){
                //return data.node.customAttributes[0].key;
                var options = data.node.selectedOptions;
                if(options.length > 0){
                    return options[0].value;
                }
                //console.log(images);                
                return;
            }  
        },
        { name: "option2", 
            mapping: function(data){
                //return data.node.customAttributes[0].key;
                var options = data.node.selectedOptions;
                if(options.length > 0){
                    return options[1].value;
                }
                //console.log(images);                
                return;
            }  
        },
        { name: "createdAt", mapping: 'node.createdAt' },
        { name: "updatedAt", mapping: 'node.updatedAt' },
        { name: "taxable", mapping: 'node.taxable' },
        { name: "barcode", mapping: 'node.barcode' },        
        { name: "image", mapping: 'node.image' },
        { name: "weight", mapping: 'node.weight' },
        { name: "weightUnit", mapping: 'node.weightUnit' },
        { name: "inventoryItem", mapping: 'node.inventoryItem' },
        { name: "inventoryQuantity", mapping: 'node.inventoryQuantity' }        
    ],

    proxy: {
        type: 'rest',        
        url: '/shopify-php/api/shopify_variants.php',

        pageParam: '',
        startParam: '',
        //limitParam: '',

        reader: {
            type: 'json',
            rootProperty: 'edges'
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