Ext.define('August.model.shopify.MacyTemplate', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],    

    fields: [       
        { name: 'categoryCode', type: 'string' },
        { name: 'shopSku', type: 'string' },
        { name: 'productName', type: 'string' },
        { name: 'pid', type: 'string' },
        { name: 'UPC', type: 'string' },
        { name: 'brand', type: 'string' },
        { name: 'productLongDescription', type: 'string' },
        { name: 'fnb1', type: 'string' },
        { name: 'fnb2', type: 'string' },
        { name: 'fnb3', type: 'string' },
        { name: 'fnb4', type: 'string' },
        { name: 'fnb5', type: 'string' },
        { name: 'warranty', type: 'string' },
        { name: 'legalWarnings', type: 'string' },
        { name: 'prop65Warning', type: 'string' },
        { name: 'origin', type: 'string' },
        { name: 'fabricCare', type: 'string' },
        { name: 'fabricContent', type: 'string' },
        { name: 'nrfSizeCode', type: 'string' },
        { name: 'nrfColorCode', type: 'string' },
        { name: 'siteColorDesc', type: 'string' },
        { name: 'productDimensions1', type: 'string' },
        { name: 'productDimensions2', type: 'string' },
        { name: 'productWeight', type: 'string' },
        { name: 'Shipping_Dimensions_Length', type: 'string' },
        { name: 'Shipping_Dimensions_Width', type: 'string' },
        { name: 'Shipping_Dimensions_Height', type: 'string' },
        { name: 'Shipping_Dimensions_Units', type: 'string' },
        { name: 'Shipping_Weight', type: 'string' },
        { name: 'Shipping_Weight_Units', type: 'string' },
        { name: 'msrp', type: 'string' },
        { name: 'mainImage', type: 'string' },
        { name: 'secondImage', type: 'string' },
        { name: 'thirdImage', type: 'string' },
        { name: 'swatchImage', type: 'string' },
        { name: 'harmonizeTitle', type: 'string' },
        { name: 'SpecialHandling_ShippingDimensions', type: 'string' },
        { name: 'taxCode_women', type: 'string' },
        { name: 'fnb20_276', type: 'string' },
        { name: 'Special_Size_Womens_Clothing', type: 'string' },
        { name: 'Fabric_Womens_Clothing', type: 'string' },
        { name: 'Fabric_Pattern_Womens_Clothing', type: 'string' },       
        { name: 'sizeChartImage', type: 'string' },
        { name: 'Age_Group_Womens', type: 'string' },
        { name: 'Dress_Style_RTW', type: 'string' },
        { name: 'Neckline_All_Women_Dresses', type: 'string' },
        { name: 'Sweater_Style_All_Women_Dresses', type: 'string' },
        { name: 'fnb20_Sleeve_Length_All_Women_Dresses_Tops', type: 'string' },
        { name: 'fnb20_Suit_Style_All_Women_Pants_Skirts_Dresses_Blazers_Tops', type: 'string' },
        { name: 'Blazer_Style_All_Women_Blazers', type: 'string' },
        { name: 'Jacket_Closure_All_Women_Blazers_Suits', type: 'string' },
        { name: 'Coat_Style_RTW_Coats_Jackets_Blazers', type: 'string' },
        { name: 'fnb20_Coat_Length_All_Women_Coats_Jackets_Blazers', type: 'string' },
        { name: 'Neckline_All_Women_Jumpsuits_Rompers', type: 'string' },
        { name: 'Occasion_Womens_Dresses', type: 'string' },
        //{ name: 'Dress_Length', type: 'string' },
        { name: 'Denim_Waist_Fit', type: 'string' },
        { name: 'Denim_Wash', type: 'string' },
        { name: 'Bottom_Feature_All_Women_Jeans', type: 'string' },
        { name: 'fnb20_Denim_Fit_RTW_Jeans', type: 'string' },
        { name: 'Pant_Style_RTW_Pants_Jumpsuits_Outfits', type: 'string' },
        //{ name: 'Bottom_Feature_All_Women_Pants_Jumpsuits', type: 'string' },
        //{ name: 'Leg_Style', type: 'string' },
        { name: 'Short_Style_RTW_Shorts_Outfits', type: 'string' },
        { name: 'Skirt_Style_RTW_Skirts_Outfits', type: 'string' },
        { name: 'Top_Style_RTW_Tops_Tees_Outfits', type: 'string' },
        { name: 'Neckline_All_Women_Tops_Outfits', type: 'string' },
        { name: 'Short_Style_All_Women_Rompers', type: 'string' },
        
        { name: 'fnb20_Suit_Style_All_Women_Suits', type: 'string' },
        { name: 'Sweater_Style_All_Women_Sweaters_Sweatshirts', type: 'string' },
        { name: 'Neckline_All_Women_Sweaters_Sweatshirts', type: 'string' }                     
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