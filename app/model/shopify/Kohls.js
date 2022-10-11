Ext.define('August.model.shopify.Kohls', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [       
        { name: 'product_category', type: 'string' },
        { name: 'upc_number', type: 'string' },
        { name: 'title', type: 'string' },
        { name: 'brand', type: 'string' },
        { name: 'meta_description', type: 'string' },        
        { name: 'style_number', type: 'string' },
        { name: 'style_description', type: 'string' },
        { name: 'nrf_size', type: 'string' },
        { name: 'display_color', type: 'string' },
        { name: 'color_family', type: 'string' },
        { name: 'main_image', type: 'string' },
        { name: 'alt_image_1', type: 'string' },
        { name: 'alt_image_2', type: 'string' },
        { name: 'alt_image_3', type: 'string' },
        { name: 'care', type: 'string' },
        { name: 'feature_1', type: 'string' },
        { name: 'feature_2', type: 'string' },
        { name: 'feature_3', type: 'string' },
        { name: 'feature_4', type: 'string' },
        { name: 'fabric_material', type: 'string' },
        { name: 'origin', type: 'string' },
        { name: 'choking_hazard', type: 'string' },
        { name: 'seller_url', type: 'string' },
        { name: 'perishable_indicator', type: 'string' }
        //{ name: 'tags', type: 'string' }
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