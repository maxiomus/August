Ext.define('August.model.shopify.BelkMp', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],    

    fields: [       
        { name: 'category', type: 'string' },
        { name: 'product_id', type: 'string' },
        { name: 'product_name', type: 'string' },
        { name: 'nrf_color_code', type: 'string' },
        { name: 'brand', type: 'string' },
        { name: 'product_description', type: 'string' },        
        { name: 'abbr_product_name', type: 'string' },
        { name: 'style_description', type: 'string' },
        { name: 'style_number', type: 'string' },
        { name: 'upc', type: 'string' },
        { name: 'length', type: 'string' },
        { name: 'main_image', type: 'string' },
        { name: 'image_b', type: 'string' },
        { name: 'image_c', type: 'string' },
        { name: 'main_swatch', type: 'string' },
        { name: 'vendor_color', type: 'string' },
        { name: 'nrf_size', type: 'string' },        
        { name: 'activewear', type: 'string' },
        { name: 'closure_type', type: 'string' },
        { name: 'coat_type', type: 'string' },
        { name: 'garment_length', type: 'string' },
        { name: 'gender', type: 'string' },
        { name: 'jacket_type', type: 'string' },
        { name: 'lined', type: 'string' },
        { name: 'material', type: 'string' },
        { name: 'sleeve_length', type: 'string' },
        { name: 'special_size', type: 'string' },
        { name: 'dress_type', type: 'string' },
        { name: 'inseam', type: 'string' },
        { name: 'leg_style', type: 'string' },
        { name: 'pants_fit', type: 'string' },
        { name: 'pants_type', type: 'string' },
        { name: 'pockets', type: 'string' },
        { name: 'size_length', type: 'string' },
        { name: 'waist_raise', type: 'string' },
        { name: 'top_type', type: 'string' }        
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