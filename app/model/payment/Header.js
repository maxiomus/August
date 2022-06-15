Ext.define('August.model.payment.Header', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [
        { name: 'paymentNo', type: 'int' },
        { name: 'invoiceno', type: 'int' },
        { name: 'paymentCode', type: 'string' },
        { name: 'amt', type: 'number' },
        { name: 'cmAmt', type: 'number' },
        { name: 'totalPaid', type: 'number' },
        { name: 'bal', type: 'number' },
        { name: 'paymentDate', type: 'date', dateFormat: 'c' },
        { name: 'reference', type: 'string' },
        { name: 'memo', type: 'string' },
        { name: 'userName', type: 'string' },
        { name: 'userTime', type: 'date', dateFormat: 'c' },        
        { name: 'customer', type: 'string' },
        { name: 'createuser', type: 'string' },
        { name: 'createusertime', type: 'date', dateFormat: 'c' },
        { name: 'account', type: 'string' },
        { name: 'balfwrd', type: 'number' },
        { name: 'batchno', type: 'string' },
        { name: 'invref', type: 'string' },
        { name: 'transtype', type: 'string' },
        { name: 'qb_pmt_batch_no', type: 'int' },
        { name: 'qb_pmt_batch_date', type: 'date', dateFormat: 'c' },
        { name: 'credit_auth', type: 'string' },
        { name: 'credit_ref', type: 'string' },
        { name: 'credit_avs', type: 'string' },
        { name: 'credit_cvv2', type: 'string' },
        { name: 'credit_troutD', type: 'string' },
        { name: 'total_discount', type: 'number' },
        { name: 'total_writeoff', type: 'number' },
        { name: 'total_credit', type: 'number' },
        { name: 'division', type: 'string' },
        { name: 'void', type: 'string' },
        { name: 'voiddate', type: 'date', dateFormat: 'c' },
        { name: 'chkDeposit', type: 'string' },
        { name: 'cancelReason', type: 'string' },
        { name: 'cancelReasonDate', type: 'date', dateFormat: 'c' },
        { name: 'available_credit', type: 'number', persist: false }               
    ],

    idProperty:  'paymentNo',
    identifier: 'negative',
    
    validators: {
        paymentNo: 'presence',
        customer: 'presence',        
        division: 'presence'        
        
         //ordertype: { type: 'length', min: 2 },
         //gender: { type: 'inclusion', list: ['Male', 'Female'] },
         /*
         username: [
            { type: 'exclusion', list: ['Admin', 'Operator'] },
            { type: 'format', matcher: /([a-z]+)[0-9]{2,3}/i }
         ] 
         */   
    },    
    
    proxy: {
        type: 'rest',
        url: '/WebApp/api/Payments',

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