Ext.define('August.model.pim.ProductDetail', {    
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [        
        { name: 'id', type: 'int' },                        
        { name: 'style', type: 'string' },
        { name: 'color', type: 'string' },
        { name: 'styleId', type: 'int' }, 
        { name: 'description', type: 'string' },
        { name: 'description1', type: 'string' },        
        { name: 'categoryCode', type: 'string' },
        { name: 'sizeCode', type: 'string' },
        { name: 'colorCode', type: 'string' },   
        { name: 'title', type: 'string' },     
        { name: 'sku', type: 'string' },
        { name: 'upc', type: 'string' },
        { name: 'longDescription', type: 'string' },
        { name: 'longDescription1', type: 'string' },
        { name: 'feature1', type: 'string' },
        { name: 'feature2', type: 'string' },
        { name: 'feature3', type: 'string' },
        { name: 'feature4', type: 'string' },
        { name: 'feature5', type: 'string' },
        { name: 'dimensions', type: 'string' },
        { name: 'materialCode', type: 'string' },                                
        { name: 'care', type: 'string' },
        { name: 'legal', type: 'string' },
        { name: 'prop65', type: 'string' },
        { name: 'warranty', type: 'string' },
        { name: 'weight', type: 'float' },
        { name: 'origin', type: 'string' },
        { name: 'msrp', type: 'float' },
        { name: 'characteristics', type: 'string' },
        { name: 'subcategory', type: 'string' },
        { name: 'grp', type: 'string' },
        /*
        { name: 'imageUrl1', type: 'string' },
        { name: 'imageUrl2', type: 'string' },
        { name: 'imageUrl3', type: 'string' },
        { name: 'imageUrl4', type: 'string' },
        { name: 'imageUrl5', type: 'string' },
        { name: 'imageUrl6', type: 'string' },
        { name: 'imageUrl7', type: 'string' },
        { name: 'imageUrl8', type: 'string' },
        { name: 'swatchUrl', type: 'string' },
        */
        { name: 'keywords', type: 'string' },
        { name: 'taxCode', type: 'string' },
        { name: 'specialSize', type: 'string' },
        { name: 'ageGroup', type: 'string' },
        { name: 'waistFit', type: 'string' },
        { name: 'fitType', type: 'string' },
        { name: 'washType', type: 'string' },
        { name: 'productStyle', type: 'string' },
        { name: 'lengthType', type: 'string' },
        { name: 'sleeveLength', type: 'string' },
        { name: 'neckline', type: 'string' },
        { name: 'waistSize', type: 'string' },
        { name: 'chestSize', type: 'string' },
        { name: 'closureType', type: 'string' },
        { name: 'legStyle', type: 'string' },
        { name: 'pattern', type: 'string' },
        { name: 'occasion', type: 'string' },
        { name: 'bodyType', type: 'string' },
        { name: 'beltType', type: 'string' },
        { name: 'collarType', type: 'string' },
        //{ name: 'controlType', type: 'string' },
        { name: 'pocket', type: 'string' }, 
        { name: 'theme', type: 'string' },       
        { name: 'createUser', type: 'string' },
        { name: 'createTime', type: 'date', dateFormat: 'C', dateWriteFormat: 'Y-m-d' },
        { name: 'updateUser', type: 'string' },
        { name: 'updateTime', type: 'date', dateFormat: 'C', dateWriteFormat: 'Y-m-d'},
        { name: 'characteristics', type: 'string', persist: false },
        { name: 'division', type: 'string', persist: false }   
        /*
        { name: 'productId',
            mapping: 'id',
            persist: false
        } 
        */   
    ],

    idProperty: 'id',
    identifier: 'negative',
    
    proxy: {
        type: 'rest',
        url: '/WebApp/api/ProductDetails',

        batchActions: true,
        
        //pageParam: '',
        //startParam: '',
        //limitParam: '',

        headers: {
            'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
        },
        
        reader: {
            type: 'json',
            rootProperty: 'data'
        },

        writer: {
            type: 'json',

            allDataOptions: {
                persist: false,
                associated: true
            },
            partialDataOptions: {
                changes: true,
                critical: true,
                associated: true
            },

            //clientIdProperty: 'clientId',
            writeAllFields: false,
            
            allowSingle: false // set false to send a single record in array
        },

        listeners: {
            exception: function (proxy, response, operation) {
                console.log(response, operation);
            }
        }
    }

});