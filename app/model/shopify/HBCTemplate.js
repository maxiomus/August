Ext.define('August.model.shopify.HBCTemplate', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [
        { name: 'Style_No', type: 'string' },
        { name: 'SKU_Product_ID', type: 'string' },
        { name: 'Color', type: 'string' },
        { name: 'UPC', type: 'string' },
        { name: 'SKN', type: 'string' },
        { name: 'Buying_Office_Comments', type: 'string' },
        { name: 'Vendor_Product_Style_Name', type: 'string' },
        { name: 'Detailed_Description', type: 'string' },
        { name: 'Mandatory_Copy', type: 'string' },
        { name: 'Collection', type: 'string' },
        { name: 'Size_Range', type: 'string' },
        { name: 'Product_Dimensions', type: 'string' },
        { name: 'Length_Shoulder_Hem', type: 'string' },
        { name: 'Length_Inseam', type: 'string' },
        { name: 'Length_Rise', type: 'string' },
        { name: 'Leg_Opening_Circumference', type: 'string' },
        { name: 'Waist_Bust_Shoulders_Arms_Hips', type: 'string' },
        { name: 'Fit_Type', type: 'string' },
        { name: 'Model_Measurements ', type: 'string' },
        { name: 'Coverage_Type', type: 'string' },
        { name: 'Fiber_Content', type: 'string' },
        { name: 'Material_fabric', type: 'string' },
        { name: 'Lining_Content', type: 'string' },
        { name: 'Trim_Material', type: 'string' },
        { name: 'Closure_Type_Location', type: 'string' },
        { name: 'Fabric_Origin', type: 'string' },
        { name: 'Country_origin', type: 'string' },
        { name: 'Care', type: 'string' },
        { name: 'Fly_Type', type: 'string' },
        { name: 'Pockets', type: 'string' },
        { name: 'Collar_Type', type: 'string' },
        { name: 'Collar_Stays', type: 'string' },
        { name: 'Leg_Type', type: 'string' },
        { name: 'Sleeve_Type', type: 'string' },
        { name: 'Waist_Detail', type: 'string' },
        { name: 'Bra_type', type: 'string' },
        { name: 'Bra_Strap_Type', type: 'string' },
        { name: 'Bra_Padding_Type', type: 'string' },
        { name: 'Bra_Support_Level', type: 'string' },
        { name: 'Shapewear_Control_Type', type: 'string' },
        { name: 'Gusset_Material', type: 'string' },
        { name: 'Fur_Hair_Type', type: 'string' },
        { name: 'Fur_Natural_Dyed', type: 'string' },
        { name: 'Fur_Origin', type: 'string' },
        { name: 'Exclusivity', type: 'string' },
        { name: 'Puffer_Fill_Power', type: 'string' },
        { name: 'Romance_Copy', type: 'string' }
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