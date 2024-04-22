Ext.define('August.model.shopify.SaksTemplate', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],    

    fields: [       
        { name: 'category', type: 'string' },
        { name: 'shopSKU', type: 'string' },
        { name: 'Product Short Description', type: 'string' },
        { name: 'repush_text', type: 'string' },
        { name: 'eCom Brand Name', type: 'string' },
        { name: 'Short Description', type: 'string' },
        { name: 'variantGroupCode', type: 'string' },
        { name: 'upc', type: 'string' },
        { name: 'SKN', type: 'string' },
        { name: 'vendor_style', type: 'string' },
        { name: 'productcopy', type: 'string' },
        { name: 'main_image', type: 'string' },
        { name: 'Color', type: 'string' },
        { name: 'color_code', type: 'string' },
        { name: 'SkuHexValue', type: 'string' },
        { name: 'Fur Natural or Dyed', type: 'string' },
        { name: 'Fur Origin', type: 'string' },
        { name: 'Fur/Hair Type', type: 'string' },
        { name: 'purchaselimit', type: 'string' },
        { name: 'Size', type: 'string' },
        { name: 'size_desc', type: 'string' },
        { name: 'size_code', type: 'string' },
        { name: 'Backorderable', type: 'string' },
        { name: 'Primary_Parent_Color', type: 'string' },
        { name: 'refCategory1', type: 'string' },
        { name: 'refCategory2', type: 'string' },
        { name: 'refCategory3', type: 'string' },
        { name: 'refinementProductType1', type: 'string' },
        { name: 'refinementProductType2', type: 'string' },
        { name: 'refinementProductType3', type: 'string' },
        { name: 'refLifestyle1', type: 'string' },
        { name: 'refLifestyle2', type: 'string' },
        { name: 'refLifestyle3', type: 'string' },
        { name: 'Secondary_Parent_Color', type: 'string' },
        { name: 'Shoprunner Eligible', type: 'string' },
        { name: 'SignatureRequired_Type', type: 'string' },
        { name: 'US_STDSize', type: 'string' },
        { name: 'US_STDSize2', type: 'string' },
        { name: 'US_STDSize3', type: 'string' },
        { name: 'waitlist', type: 'string' },
        { name: 'main_color_image', type: 'string' },
        { name: 'additional_image_1', type: 'string' },
        { name: 'additional_image_2', type: 'string' },
        { name: 'additional_image_3', type: 'string' },
        { name: 'additional_image_4', type: 'string' },
        { name: 'additional_image_5', type: 'string' },
        { name: 'additional_image_6', type: 'string' },
        { name: 'additional_image_7', type: 'string' },
        { name: 'additional_image_8', type: 'string' },
        { name: 'Care', type: 'string' },
        { name: 'refLensType', type: 'string' },
        { name: 'PD_RestrictedCountry_Text', type: 'string' },
        { name: 'PD_RestrictedState_Text', type: 'string' },
        { name: 'country_of_origin', type: 'string' },
        { name: 'on_model_image', type: 'string' },
        { name: 'country_of_fulfillment', type: 'string' },
        { name: 'video', type: 'string' },
        { name: 'migrated_product', type: 'string' },
        { name: 'stl_product_1', type: 'string' },
        { name: 'stl_product_2', type: 'string' },
        { name: 'stl_product_3', type: 'string' },
        { name: 'stl_product_4', type: 'string' },
        { name: 'stl_product_5', type: 'string' },
        { name: 'refinementStyle1', type: 'string' },
        { name: 'refinementStyle2', type: 'string' },
        { name: 'refinementStyle3', type: 'string' },
        { name: 'refLength', type: 'string' },
        { name: 'refMaterial1', type: 'string' },
        { name: 'refMaterial2', type: 'string' },
        { name: 'refMaterial3', type: 'string' },
        { name: 'refNeckline', type: 'string' },
        { name: 'refPatternPrint', type: 'string' },
        { name: 'refRise', type: 'string' },
        { name: 'refSleeveLength', type: 'string' },
        { name: 'refWash', type: 'string' },
        { name: 'refGender', type: 'string' }        
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