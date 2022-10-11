Ext.define('August.model.shopify.SPO', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [       
        { name: 'category', type: 'string' },
        { name: 'sku', type: 'string' },
        { name: 'title', type: 'string' },        
        { name: 'description', type: 'string' },        
        { name: 'variantid', type: 'string' },
        { name: 'designer', type: 'string' },
        { name: 'image_link_1', type: 'string' },
        { name: 'msrp', type: 'string' },
        { name: 'weight', type: 'string' },
        { name: 'upc', type: 'string' },
        { name: 'handling_time', type: 'string' },
        { name: 'model_number', type: 'string' },
        { name: 'color', type: 'string' },
        { name: 'image_link_2', type: 'string' },
        { name: 'image_link_3', type: 'string' },
        { name: 'image_link_4', type: 'string' },
        { name: 'size', type: 'string' },
        { name: 'final_sale', type: 'string' },
        { name: 'product_condition', type: 'string' },
        { name: 'normalized_color', type: 'string' },
        { name: 'womens_clothing_tops_size', type: 'string' },
        { name: 'womens_clothing_bottoms_size', type: 'string' }        
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