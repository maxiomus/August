Ext.define('August.model.shopify.BelkTemplate', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [
        { name: 'class', type: 'string' },
        { name: 'offer_type', type: 'string' },
        { name: 'avail_date', type: 'string' },
        { name: 'brand_name', type: 'string' },
        { name: 'style_number', type: 'string' },
        { name: 'upc', type: 'string' },
        { name: 'item_description', type: 'string' },
        { name: 'size_code', type: 'string' },
        { name: 'size_description', type: 'string' },
        { name: 'color_code', type: 'string' },
        { name: 'color_name', type: 'string' },
        { name: 'Preferred_Copy_Name', type: 'string' },
        { name: 'cost', type: 'string' },        
        { name: 'msrp', type: 'string' },
        { name: 'retail', type: 'string' },
        { name: 'ship_from', type: 'string' },        
        { name: 'weight', type: 'string' },
        { name: 'length', type: 'string' },                
        { name: 'width', type: 'string' },
        { name: 'height', type: 'string' }     
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