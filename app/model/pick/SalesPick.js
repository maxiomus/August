Ext.define('August.model.pick.SalesPick', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [                
        { name: 'customer', type: 'string', persist: false },
        { name: 'pickno', type: 'int', persist: false },        
        { name: 'orderno', type: 'int', persist: false },
        { name: 'orderdate', type: 'date', dateFormat: 'C', persist: false, mapping: 'orderdate.date' },
        { name: 'shipdate', type: 'date', dateFormat: 'C', persist: false, mapping: 'shipdate.date' },
        { name: 'canceldate', type: 'date', dateFormat: 'C', persist: false, mapping: 'canceldate.date' },        
        { name: 'division', type: 'string', persist: false },      
        { name: 'warehouse', type: 'string', persist: false },                  
        { name: 'style', type: 'string', persist: false },
        { name: 'color', type: 'string', persist: false },
        { name: 'size', type: 'string', persist: false },
        { name: 'descript', type: 'string', persist: false },
        { name: 'pk_unit', type: 'int' },
        { name: 'so_unit', type: 'int', persist: false },
        { name: 'oh', type: 'int', persist: false },
        { name: 'ats', type: 'int', persist: false },
        { name: 'price', type: 'float', persist: false },
        { name: 'customerpono', type: 'string', persist: false },
        { name: 'shipvia', type: 'string', persist: false },
        { name: 'shiptoname', type: 'string', persist: false },
        { name: 'shiptocity', type: 'string', persist: false },
        { name: 'pickdid', type: 'int'},
        { name: 'sodid', type: 'int', persist: false },
        { name: 'sizeno', type: 'int' },
        { name: 'pickd_status', type: 'string'},
        { name: 'sod_status', type: 'string', persist: false }                         
    ],

    idProperty:  'pickdid',
    identifier: 'negative',
    
    validators: {
        pickno: 'presence',
        style: 'presence',
        color: 'presence'
    },    
    
    proxy: {
        type: 'rest',
        url: '/shopify-php/api/OpenPickd_BySize',
        /*
        api: {
            create: undefined,
            read: '/shopify-php/api/OpenPickd_BySize',
            update: '/shopify-php/api/OpenPickd_BySize',
            destroy: undefined
        },
        */
        batchActions: true,                        

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
            // save nested (associated) data...
            allDataOptions: {
                persist: false,
                associated: true
            },
            partialDataOptions: {
                changes: false,
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