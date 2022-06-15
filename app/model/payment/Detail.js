Ext.define('August.model.payment.Detail', {
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
        //{ name: 'paymentNo', type: 'int' }          
        {
            //
            //     When associate models,
            //     model name with Id prefixed.
            //     ex. pihId
            //    or using field...
            //
            name: 'paymentNo', 
            type: 'int',           
            reference: {
                parent: 'payment.Header',

                field: 'paymentNo',
                inverse: 'details'
            }
        }            
        
    ],

    idProperty:  'id',
    identifier: 'negative'    
});