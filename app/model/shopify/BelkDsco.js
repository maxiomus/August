Ext.define('August.model.shopify.BelkDsco', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [
        { name: 'sku', type: 'string' },
        { name: 'product_status', type: 'string' },
        { name: 'style_number', type: 'string' },
        { name: 'Style_Description', type: 'string' },
        { name: 'GTIN', type: 'string' },
        { name: 'Product_Name', type: 'string' },
        { name: 'nrfColorCode', type: 'string' },
        { name: 'vendorColorDescription', type: 'string' },
        { name: 'nrfSizeCode', type: 'string' },
        { name: 'vendorSizeDescription', type: 'string' },
        { name: 'OmniChannel_Brand', type: 'string' },
        { name: 'Preferred_Copy_Name', type: 'string' },
        { name: 'Product_Description', type: 'string' },        
        { name: 'isGroup', type: 'string' },
        { name: 'groupingID', type: 'string' },
        { name: 'groupingType', type: 'string' },
        { name: 'image_reference_1', type: 'string' },
        { name: 'image_reference_2', type: 'string' },
        { name: 'image_reference_3', type: 'string' },
        { name: 'image_reference_4', type: 'string' },
        { name: 'image_reference_5', type: 'string' },
        { name: 'Choking_Hazard', type: 'string' },
        { name: 'Prop_65', type: 'string' },
        { name: 'Holiday', type: 'string' },
        { name: 'Country_of_Origin', type: 'string' },
        { name: 'Material', type: 'string' },
        { name: 'Activewear', type: 'string' },
        { name: 'Gender', type: 'string' },
        { name: 'Special_Sizes', type: 'string' },
        { name: 'Care', type: 'string' },
        { name: 'iphCategory', type: 'string' },
        { name: 'Lined', type: 'string' },
        { name: 'Lining_Type', type: 'string' },
        { name: 'Top_Type', type: 'string' },
        { name: 'Neckline', type: 'string' },        
        { name: 'Closure_Type', type: 'string' },
        { name: 'Length', type: 'string' },
        { name: 'Jacket_Type', type: 'string' },                
        { name: 'Coat_Type', type: 'string' },
        { name: 'Sleeve_Style', type: 'string' },
        { name: 'Sleeve_Length', type: 'string' },
        { name: 'Inseam', type: 'string' },        
        { name: 'Dress_Type', type: 'string' },
        { name: 'Waist_Rise', type: 'string' },
        { name: 'Pants_Type', type: 'string' },
        { name: 'Size_Length', type: 'string' },
        { name: 'Vest_Type', type: 'string' },
        { name: 'Garment_Length', type: 'string' },        
        { name: 'Pants_Fit', type: 'string' },
        { name: 'Pockets', type: 'string' },
        { name: 'Pocket_Type', type: 'string' },                        
        { name: 'title', type: 'string' }        
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