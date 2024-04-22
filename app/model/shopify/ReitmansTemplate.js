Ext.define('August.model.shopify.ReitmansTemplate', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],    

    fields: [       
        { name: 'category', type: 'string' },
        { name: 'shopSKU', type: 'string' },
        { name: 'name_default', type: 'string' },
        { name: 'variantGroupCode', type: 'string' },
        { name: 'imageURL', type: 'string' },
        { name: 'additionalImage1', type: 'string' },
        { name: 'additionalImage2', type: 'string' },
        { name: 'additionalImage3', type: 'string' },
        { name: 'additionalImage4', type: 'string' },
        { name: 'sizeChart', type: 'string' },
        { name: 'swatchImage', type: 'string' },
        { name: 'brand', type: 'string' },
        { name: 'manufacturerId', type: 'string' },
        { name: 'UPC', type: 'string' },
        { name: 'countryOfOrigin', type: 'string' },
        { name: 'color', type: 'string' },
        { name: 'longDescription_default', type: 'string' },
        { name: 'longDescription_fr', type: 'string' },        
        { name: 'name_fr', type: 'string' },        
        { name: 'washCare_default', type: 'string' },
        { name: 'washCare_fr', type: 'string' },                
        { name: 'material', type: 'string' },
        { name: 'size', type: 'string' },
        { name: 'pantskirtLength', type: 'string' },
        { name: 'sleeveType', type: 'string' },
        { name: 'neck', type: 'string' },
        { name: 'pantskirtLength_default', type: 'string' },
        { name: 'pantskirtLength_fr', type: 'string' },
        { name: 'sleeveType_default', type: 'string' },
        { name: 'sleeveType_fr', type: 'string' },
        { name: 'neck_default', type: 'string' },
        { name: 'neck_fr', type: 'string' },
        { name: 'shapeLegAndBody', type: 'string' },
        { name: 'rise', type: 'string' },
        { name: 'rise_default', type: 'string' },
        { name: 'rise_fr', type: 'string' },
        { name: 'sleeveLength', type: 'string' },
        { name: 'sleeveLength_default', type: 'string' },
        { name: 'sleeveLength_fr', type: 'string' },
        { name: 'closure', type: 'string' },
        { name: 'fitType', type: 'string' },
        { name: 'pocketType', type: 'string' }
    ],

    //identifier: 'negative',

    validators: {
        //style: 'presence',
        //color: 'presence'        
    },

    proxy: {
        type: 'rest',        
        url: '/WebApp/api/ProductTemplates',        
        timeout: 9000000,

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