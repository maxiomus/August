Ext.define('August.model.payment.PaymentD', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence',
        'Ext.data.identifier.Negative'
    ],

    fields: [
        { name: "invoiceDate", type: 'date', persist: false }, 
        { name: "trans_date", type: 'date', persist: false },
        { name: "dueDate", type: 'date', persist: false },
        { name: "terms", type: 'string', persist: false },
        { name: "paymentCode", type: 'string', persist: false }, 
        { name: "customer", type: 'string', persist: false },        
        { name: "division", type: 'string', persist: false },        
        { name: "key_no", type: 'string', persist: false },        
        { name: "customerpono", type: 'string', persist: false },
        { name: "originalAmt", type: 'number', persist: false },
        { name: "dueAmt", type: 'number', persist: false },
        { name: "totalPay", type: 'number', persist: false,
            
            calculate: function(data) {
                return data.paidAmount + data.pay_credit + data.pay_discount + data.pay_writeoff;
            }
            
        },
        { name: "balance", type: 'number', persist: false,
            
            calculate: function(data) {
                return data.dueAmt - data.paidAmount + data.pay_credit + data.pay_discount + data.pay_writeoff;
            }
            
        },        
        { name: 'checked', type: 'auto', persist: false },        
        { name: 'id', type: 'int' },                
        { name: "invoiceNo", type: 'int' },        
        { name: "cmno", type: 'int' },
        { name: "paymentDate", type: 'date', dateFormat: 'c' },        
        { name: "paidAmount", type: 'number' },
        { name: "pay_discount", type: 'number' },
        { name: "pay_writeoff", type: 'number' },
        { name: "pay_credit", type: 'number' },        
        { name: "charge_type", type: 'string' },
        { name: "adjust_id", type: 'int' },  
        { name: 'paymentNo', type: 'int' }                
        
    ],

    idProperty:  'did',
    identifier: 'negative',

    proxy: {
        type: 'rest',
        url: '/WebApp/api/PaymentDs',

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