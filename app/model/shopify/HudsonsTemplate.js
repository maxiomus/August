Ext.define('August.model.shopify.HudsonsTemplate', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],    

    fields: [               
        { name: 'category', type: 'string' },
        { name: 'shopSKU', type: 'string' },
        { name: 'UPC', type: 'string' },
        { name: 'variantGroupCode', type: 'string' },
        { name: 'brand', type: 'string' },
        { name: 'name_en', type: 'string' },
        { name: 'name [fr_CA]', type: 'string' },
        { name: 'longDescription_en', type: 'string' },
        { name: 'longDescription_fr', type: 'string' },
        { name: 'countryOfOrigin', type: 'string' },
        { name: 'hbcProductType', type: 'string' },
        { name: 'reviewable', type: 'string' },
        { name: 'wishlist', type: 'string' },
        { name: 'giftWrapEligible', type: 'string' },
        { name: 'rewardEligible', type: 'string' },
        { name: 'displayQuickLook', type: 'string' },
        { name: 'sizeChartSubType', type: 'string' },
        { name: 'image_1', type: 'string' },
        { name: 'image_2', type: 'string' },
        { name: 'image_3', type: 'string' },
        { name: 'image_4', type: 'string' },
        { name: 'image_5', type: 'string' },
        { name: 'image_6', type: 'string' },
        { name: 'image_7', type: 'string' },
        { name: 'color', type: 'string' },
        { name: 'colorRefinement_en', type: 'string' },
        { name: 'hexValueForSwatch', type: 'string' },
        { name: 'size_en', type: 'string' },
        { name: 'sizeRefinement_en', type: 'string' },
        { name: 'miraklWomensClothingType', type: 'string' },
        //{ name: 'miraklWomensIntimatesPjsType', type: 'string' },
        //{ name: 'miraklWomensIntimatesPjsSwimType', type: 'string' },
        { name: 'miraklDressesStyle1', type: 'string' },
        { name: 'miraklTopsSweatersStyle1', type: 'string' },
        { name: 'miraklWomensBottomsStyle1', type: 'string' },
        //{ name: 'miraklWomensIntimatesPjsSwimStyle1', type: 'string' },
        { name: 'miraklWomensJacketsStyle1', type: 'string' },
        { name: 'refNeckline', type: 'string' },
        { name: 'refSleeveLength', type: 'string' },
        { name: 'refLength', type: 'string' },
        { name: 'refRise', type: 'string' },
        { name: 'refWash', type: 'string' },
        { name: 'refPatternPrint', type: 'string' },
        //{ name: 'miraklWomensConcern', type: 'string' },
        { name: 'miraklWomensMaterial', type: 'string' },
        { name: 'refinementProductType', type: 'string' },
        { name: 'refinementStyle', type: 'string' },
        { name: 'refMaterial', type: 'string' },
        { name: 'refConcern', type: 'string' },
        { name: 'miraklProductStatus', type: 'string' },
        { name: 'refResponsible', type: 'string' },
        { name: 'dangerousGoods', type: 'string' },
        { name: 'refCategory', type: 'string' },
        { name: 'refSizeRange', type: 'string' }   
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