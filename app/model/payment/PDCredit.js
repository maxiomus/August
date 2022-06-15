Ext.define('August.model.payment.PDCredit', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence',
        'Ext.data.identifier.Negative'
    ],

    fields: [              
        { name: 'id', type: 'int' },                                    
        { name: "applied_Amt", type: 'number' },        
        { name: "credit_keyno", type: 'int' },
        { name: "credit_type", type: 'string' },   
        { name: "invoiceNo", type: 'int' },
        { name: "cmno", type: 'int' },
        { name: "charge_type", type: 'string' },
        { name: "adjust_id", type: 'int' },  
        { name: 'paymentNo', type: 'int' }                
        
    ],

    idProperty:  'did',
    identifier: 'negative',

    proxy: {
        type: 'rest',
        url: '/WebApp/api/PDCredit',

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