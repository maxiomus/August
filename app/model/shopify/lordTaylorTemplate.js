Ext.define('August.model.shopify.lordTaylorTemplate', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [
        { name: 'division', type: 'string' },
        { name: 'department', type: 'string' },
        { name: 'class', type: 'string' },
        { name: 'season', type: 'string' },
        { name: 'brand_name', type: 'string' },
        { name: 'VSN_parent_id)', type: 'string' },
        { name: 'product_id_SKU', type: 'string' },
        { name: 'listing_title', type: 'string' },
        { name: 'short_description', type: 'string' },
        { name: 'NRF_color_code', type: 'number' },
        { name: 'color_description', type: 'string' },
        { name: 'LT_color_name', type: 'string' },
        { name: 'cost', type: 'number' },
        { name: 'retail', type: 'number' },
        { name: 'msrp', type: 'number' },
        { name: 'ext_cost', type: 'number' },
        { name: 'ext_retail', type: 'number' },
        { name: 'IMU', type: 'string' },
        { name: 'qty', type: 'string' },
        { name: 'size', type: 'string' },
        { name: 'UPC', type: 'string' },
        { name: 'attribute1', type: 'string' },
        { name: 'attribute2', type: 'string' },
        { name: 'image1', type: 'string' },
        { name: 'image2', type: 'string' },
        { name: 'image3', type: 'string' },
        { name: 'image4', type: 'string' },
        { name: 'image5', type: 'string' },
        { name: 'product_copy', type: 'string' },
        { name: 'coo', type: 'string' },
        { name: 'fabric_material', type: 'string' },
        { name: 'care_instruction', type: 'string' }
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