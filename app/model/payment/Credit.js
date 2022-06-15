Ext.define('August.model.payment.Credit', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence',
        'Ext.data.identifier.Negative'
    ],

    fields: [              
        //{ name: 'id', type: 'int' },                                    
        //{ name: "subtotal", type: 'number' },        
        //{ name: "misc", type: 'number' },        
        //{ name: "discount", type: 'number' },    
        //{ name: "freight", type: 'number' },    
        { name: "invoiceno", type: 'int' },
        { name: "CMNO", type: 'int' },
        { name: "status", type: 'string' },
        { name: "orderNo", type: 'int' },
        { name: "customer", type: 'string' },
        { name: "division", type: 'string' },
        { name: "total", type: 'number' },        
        { name: "paidamt", type: 'number' },                                                 
        { name: "balance", type: 'number', persist: false,
            mapping: function(data) {
                return data.total - data.paidamt;
            }
        },
        { name: "memo", type: 'string' }
        
    ],

    idProperty:  'CMNO',
    identifier: 'negative',

    proxy: {
        type: 'rest',
        url: '/WebApp/api/Invoices/Credit',

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

        listeners: {
            exception: function (proxy, response, operation) {
                console.log('Payment Detail - Model', response, operation);
            }
        }
    }
});