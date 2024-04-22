Ext.define('August.model.style.Publish', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [
        { name: 'id', type: 'int' },
        { name: 'siteid', type: 'int' },
        { name: 'style', type: 'string' },
        { name: 'color', type: 'string' },
        { name: 'toPublish', type: 'bool' },
        { name: 'active', type: 'bool' },        
        { name: 'published', type: 'bool' },        
        { name: 'publishedDate', type: 'date', dateFormat: 'C', dateWriteFormat: 'Y-m-d' },
        { name: 'imageUploaded', type: 'bool' },                
        { name: 'descript', type: 'string', persist: false },
        { name: 'status', type: 'string', persist: false },
        { name: 'location', type: 'string', persist: false },
        { name: 'cost', type: 'number', persist: false },
        { name: 'availableDate', type: 'date', dateFormat: 'C', dateWriteFormat: 'Y-m-d', persist: false },
        { name: 'price1', type: 'number', persist: false },        
        { name: 'price5', type: 'number', persist: false },     
        { name: 'user5', type: 'string', persist: false },        
        { name: 'user6', type: 'string', persist: false },           
        { name: 'user7', type: 'string', persist: false },           
        { name: 'season', type: 'string', persist: false },        
        { name: 'ohs', type: 'number', persist: false },        
        { name: 'orders', type: 'number', persist: false },        
        { name: 'its', type: 'number', persist: false },       
        { name: 'pos', type: 'number', persist: false },
        { name: 'division', type: 'string', persist: false },
        { name: 'grp', type: 'string', persist: false },        
        { name: 'leadTime', type: 'int', persist: false },                
        { 
            name: 'sizeVariantId', type: 'string', persist: false,
            reference: {
                type: 'style.SizeVariant',
                unique: true
            }
        },
        { 
            name: 'sizeCategoryId', type: 'string', persist: false,
            reference: {
                type: 'style.SizeCategory',
                unique: true
            }
        },        
        { name: 'upcs', type: 'auto', persist: false },        
        { name: 'category', type: 'string', persist: false },        
        { name: 'memo', type: 'string', persist: false },                
        { name: 'customer', type: 'string', persist: false },                
        { name: 'sgtRetailPrice', type: 'number', persist: false },                
        { name: 'webUpload', type: 'int', persist: false },
        { name: 'userdate', type: 'date', dateFormat: 'C', dateWriteFormat: 'Y-m-d', persist: false },
        { name: 'binlocation', type: 'string', persist: false },
        { name: 'receivedQty', type: 'number', persist: false },        
        { name: 'coo', type: 'string', persist: false },
        { name: 'cimemo', type: 'string', persist: false },        
        { name: 'warehouse', type: 'string', persist: false },        
        { name: 'subcategory', type: 'string', persist: false },
        { 
            name: 'styleId', type: 'int'
        }     
    ],

    //idProperty: 'styleId',
    identifier: 'negative',

    validators: {
        siteid: 'presence',
        style: 'presence',
        color: 'presence'        
        /*
         ordertype: { type: 'length', min: 2 },
         gender: { type: 'inclusion', list: ['Male', 'Female'] },
         username: [
         { type: 'exclusion', list: ['Admin', 'Operator'] },
         { type: 'format', matcher: /([a-z]+)[0-9]{2,3}/i }
         ]
         */
    },

    proxy: {
        type: 'rest',
        batchActions: true, // default false when rest proxy.
        url: '/WebApp/api/SitePublishes',

        timeout: 900000,
        
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