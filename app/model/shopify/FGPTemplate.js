Ext.define('August.model.shopify.FGPTemplate', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [                
        { name: 'StyleNumber', type: 'string' },
        { name: 'ItemName', type: 'string' },
        { name: 'MyCategory', type: 'string' },
        { name: 'FGMainCategory', type: 'string' },
        { name: 'FGSubCategory1', type: 'string' },
        { name: 'FGSubCategory2', type: 'string' },        
        { name: 'Description', type: 'string' },        
        { name: 'Price', type: 'string' },
        { name: 'OriginalPrice', type: 'string' },        
        { name: 'Size', type: 'string' },
        { name: 'Pack', type: 'string' },
        { name: 'PackMinQty', type: 'string' },
        { name: 'PackEvenColor', type: 'string' },
        { name: 'FabricContent', type: 'string' },
        { name: 'HowToUse', type: 'string' },
        { name: 'Dimension', type: 'string' },
        { name: 'Weight', type: 'string' },
        { name: 'WeightUnit', type: 'string' },
        { name: 'Labeled', type: 'string' },
        { name: 'BodySize', type: 'string' },
        { name: 'Pattern', type: 'string' },
        { name: 'Length', type: 'string' },
        { name: 'Style', type: 'string' },
        { name: 'Fabric', type: 'string' },
        { name: 'OnlyAtFG', type: 'string' },
        { name: 'EcoFriendly', type: 'string' },
        { name: 'Handmade', type: 'string' },
        { name: 'Organic', type: 'string' },
        { name: 'SmallBatch', type: 'string' },
        { name: 'SupplierName', type: 'string' },
        { name: 'VendorStyleNumber', type: 'string' },        
        { name: 'MadeInCountry', type: 'string' }     
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