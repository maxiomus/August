Ext.define('August.model.ship.Header', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [
        { name: 'sosno', type: 'int' },
        { name: 'sono', type: 'int' },
        { name: 'UpdateUser', type: 'string' },
        { name: 'Update', type: 'date', dateFormat: 'c' },
        { name: 'CreateUser', type: 'string' },
        { name: 'CreateTime', type: 'date', dateFormat: 'c' },
        { name: 'ShipmentDate', type: 'date', dateFormat: 'c' },
        { name: 'ActShipmentDate', type: 'date', dateFormat: 'c' },
        { name: 'Memo', type: 'string' },
        { name: 'MemoCode', type: 'string' },
        { name: 'status', type: 'string' },
        { name: 'PrintCount', type: 'int' },
        { name: 'invoiceno', type: 'int' },
        { name: 'shipTo', type: 'string' },
        { name: 'po_receive_no', type: 'int' },
        { name: 'shipToStore', type: 'string' },
        { name: 'dc', type: 'string' },
        { name: 'trackingNo', type: 'string' },
        { name: 'customerPo', type: 'string' },
        { name: 'cancelDate', type: 'date', dateFormat: 'c' },
        { name: 'dept', type: 'string' },
        { name: 'term', type: 'string' },
        { name: 'discountRate', type: 'number' },
        { name: 'salesRep1', type: 'string' },
        { name: 'comRate1', type: 'number' },
        { name: 'salesRep2', type: 'string' },
        { name: 'comRate2', type: 'number' },
        { name: 'warehouse', type: 'string' },
        { name: 'paymentCode', type: 'string' },
        { name: 'shipVia', type: 'string' },
        { name: 'houseMemo', type: 'string' },
        { name: 'startDate', type: 'date', dateFormat: 'c' },
        { name: 'user1', type: 'string' },
        { name: 'user2', type: 'string' },
        { name: 'user3', type: 'string' },
        { name: 'user4', type: 'string' },
        { name: 'userf_date', type: 'date', dateFormat: 'c' },
        { name: 'BOLNo', type: 'string' },
        { name: 'salesrep3', type: 'string' },
        { name: 'comrate3', type: 'number' },
        { name: 'salesrep4', type: 'string' },
        { name: 'comrate4', type: 'number' },
        { name: 'salesrep5', type: 'string' },
        { name: 'comrate5', type: 'number' },
        { name: 'taxable', type: 'string' },
        { name: 'tax', type: 'number' },
        { name: 'subtotal', type: 'number' },
        { name: 'misc', type: 'number' },
        { name: 'discount', type: 'number' },
        { name: 'freight', type: 'number' },
        { name: 'total', type: 'number' },
        { name: 'taxcode1', type: 'string' },
        { name: 'taxrate1', type: 'number' },
        { name: 'tax1', type: 'number' },
        { name: 'taxcode2', type: 'string' },
        { name: 'taxrate2', type: 'number' },
        { name: 'tax2', type: 'number' },
        { name: 'spno', type: 'int' },
        { name: 'mast_cartonno', type: 'int' },
        { name: 'main_in_mc', type: 'string' },
        { name: 'rti', type: 'string' },
        { name: 'crcd_yn', type: 'string' },
        { name: 'crcd_transno', type: 'string' },
        { name: 'boxCount', type: 'int' },
        { name: 'weight', type: 'number' },
        { name: 'trigger_update', type: 'int' }             
    ],

    idProperty:  'sosno',
    identifier: 'negative',
    
    validators: {
        pickno: 'presence'          
    },    
    
    proxy: {
        type: 'rest',
        url: '/WebApp/api/ShipHs',

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