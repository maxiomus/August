Ext.define('August.model.pick.Header', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [
        { name: 'pickno', type: 'int' },
        { name: 'pickDate', type: 'date', dateFormat: 'C' },        
        { name: 'sono', type: 'int' },
        { name: 'memo', type: 'string' },
        { name: 'houseMemo', type: 'string' },
        { name: 'status', type: 'string' },
        { name: 'createUser', type: 'string' },
        { name: 'createdate', type: 'date', dateFormat: 'C' },
        { name: 'updateUser', type: 'string' },
        { name: 'updatedate', type: 'date', dateFormat: 'C' },
        { name: 'canceldate', type: 'date', dateFormat: 'C' },
        { name: 'warehouse', type: 'string' },
        { name: 'user1', type: 'string' },
        { name: 'user2', type: 'string' },
        { name: 'user3', type: 'string' },
        { name: 'user4', type: 'string' },
        { name: 'userf_date', type: 'date', dateFormat: 'C' },
        { name: 'bolno', type: 'string' },
        { name: 'printcount', type: 'int' },
        { name: 'lastPrintDate', type: 'date', dateFormat: 'C' },
        { name: 'batchNo', type: 'int' },
        { name: 'batchdate', type: 'date', dateFormat: 'C' },
        { name: 'batch_desc', type: 'string' },
        { name: 'freight', type: 'number' },
        { name: 'lastprintuser', type: 'string' },        
        { name: 'webPreAuthStatus', type: 'string' },        
        { name: 'orderdecision', type: 'string', persist: false },
        { name: 'customer', type: 'string', persist: false },
        { name: 'shiptostore', type: 'string', persist: false },
        { name: 'shipTo', type: 'string', persist: false },
        { name: 'dc', type: 'string', persist: false },
        { name: 'dcrate', type: 'number', persist: false },
        { name: 'sosno', type: 'int', persist: false },
        { name: 'customerpo', type: 'string', persist: false },
        { name: 'division', type: 'string', persist: false },
        { name: 'dept', type: 'string', persist: false },
        { name: 'sotype', type: 'string', persist: false },
        { name: 'terms', type: 'string', persist: false },
        { name: 'paymentcode', type: 'string', persist: false },
        { name: 'soshipdate', type: 'date', dateFormat: 'C', persist: false },
        { name: 'socxldate', type: 'date', dateFormat: 'C', persist: false },
        { name: 'shipvia', type: 'string', persist: false },
        { name: 'factor', type: 'string', persist: false },
        { name: 'bulkorder', type: 'string', persist: false },
        { name: 'pricelevel', type: 'string', persist: false },
        { name: 'so_credit_appr', type: 'string', persist: false },
        { name: 'cit_app_code', type: 'string', persist: false },
        { name: 'cit_ref_no', type: 'string', persist: false },
        { name: 'printcount', type: 'int', persist: false },
        { name: 'printdate', type: 'date', dateFormat: 'C', persist: false },     
        { name: 'salesrep1', type: 'string', persist: false },
        { name: 'salesrep2', type: 'string', persist: false },
        { name: 'comrate1', type: 'number', persist: false },
        { name: 'comrate2', type: 'number', persist: false },
        { name: 'routingGuide', type: 'string', persist: false }        
    ],

    idProperty:  'pickno',
    identifier: 'negative',
    
    validators: {
        pickno: 'presence'          
    },    
    
    proxy: {
        type: 'rest',
        url: '/WebApp/api/PickHs',

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