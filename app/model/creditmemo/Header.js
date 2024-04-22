Ext.define('August.model.creditmemo.Header', {
    extend: 'August.model.Base',

    fields: [
        { name: 'invoiceno', type: 'int' },
        { name: 'CMNO', type: 'int' },
        { name: 'status', type: 'string' },
        { name: 'invoiceDate', type: 'date', dateFormat: 'c' },
        { name: 'cancelDate', type: 'date', dateFormat: 'c' },
        { name: 'customer', type: 'string' },
        { name: 'billTo', type: 'string' },
        { name: 'shipTo', type: 'string' },
        { name: 'orderNO', type: 'int' },
        { name: 'subtotal', type: 'float' },
        { name: 'misc', type: 'float' },
        { name: 'discount', type: 'float' },
        { name: 'freight', type: 'float' },
        { name: 'total', type: 'float' },
        { name: 'paidamt', type: 'float' },
        { name: 'term', type: 'string' },
        { name: 'shipvia', type: 'string' },
        { name: 'factor', type: 'string' },
        { name: 'division', type: 'string' },
        { name: 'userName', type: 'string' },
        { name: 'userTime', type: 'date', dateFormat: 'c' },
        { name: 'bol', type: 'string' },
        { name: 'printCount', type: 'int' },
        { name: 'lastPrintDate', type: 'date', dateFormat: 'c' },
        { name: 'sosno', type: 'int' },
        { name: 'memo', type: 'string' },
        { name: 'housememo', type: 'string' },
        { name: 'CreateUser', type: 'string' },
        { name: 'CreateTime', type: 'date', dateFormat: 'c' },
        { name: 'paymentNo', type: 'int' },
        { name: 'Account', type: 'string' },
        { name: 'customerpono', type: 'string' },
        { name: 'memocode', type: 'string' },
        { name: 'Tmp_customerpono', type: 'string' },
        { name: 'paymentcode', type: 'string' },
        { name: 'shiptoStore', type: 'string' },
        { name: 'dc', type: 'string' },
        { name: 'void', type: 'string' },
        { name: 'voidDate', type: 'date', dateFormat: 'c' },
        { name: 'voidReason', type: 'string' },
        { name: 'salesrep1', type: 'string' },
        { name: 'comrate1', type: 'float' },
        { name: 'salesrep2', type: 'string' },
        { name: 'comrate2', type: 'float' },
        { name: 'dept', type: 'string' },
        { name: 'user1', type: 'string' },
        { name: 'user2', type: 'string' },
        { name: 'user3', type: 'string' },
        { name: 'user4', type: 'string' },
        { name: 'userf_date', type: 'date', dateFormat: 'c' },
        { name: 'EDISentDate', type: 'date', dateFormat: 'c' },
        { name: 'comm_paid', type: 'string' },
        { name: 'comm1paid', type: 'string' },
        { name: 'comm2paid', type: 'string' },
        { name: 'pay_discount', type: 'float' },
        { name: 'pay_writeoff', type: 'float' },
        { name: 'CIT_Sent', type: 'string' },
        { name: 'CIT_Sent_date', type: 'date', dateFormat: 'c' },
        { name: 'cit_ref', type: 'string' },
        { name: 'qb_batch_no', type: 'int' },
        { name: 'qb_batch_date', type: 'date', dateFormat: 'c' },
        { name: 'qb_cm_batch_no', type: 'int' },
        { name: 'qb_cm_batch_date', type: 'date', dateFormat: 'c' },
        { name: 'boxCount', type: 'int' },
        { name: 'factor_batchno', type: 'int' },
        { name: 'weight', type: 'float' },
        { name: 'cit_app_code', type: 'string' },
        { name: 'discountRate', type: 'float' },
        { name: 'taxcode1', type: 'string' },
        { name: 'taxrate1', type: 'float' },
        { name: 'tax1', type: 'float' },
        { name: 'taxcode2', type: 'string' },
        { name: 'taxrate2', type: 'float' },
        { name: 'tax2', type: 'float' },
        { name: 'salesrep3', type: 'string' },
        { name: 'comrate3', type: 'float' },
        { name: 'salesrep4', type: 'string' },
        { name: 'comrate4', type: 'float' },
        { name: 'salesrep5', type: 'string' },
        { name: 'comrate5', type: 'float' },
        { name: 'tax', type: 'float' },
        { name: 'currency_id', type: 'int' },
        { name: 'currency_amt', type: 'float' },
        { name: 'sold_invoiceno', type: 'int' },
        { name: 'CB_SentYN', type: 'string' },
        { name: 'CB_DateTransmitted', type: 'date', dateFormat: 'c' },
        { name: 'factor_file_createYN', type: 'string' },
        { name: 'factor_file_createDate', type: 'date', dateFormat: 'c' },
        { 
            name: 'bal', type: 'float', persist: false,
            calculate: function(d){
                var b;
                if(d.total != null){
                    b = d.total - d.pay_discount - d.paidamt - d.pay_writeoff;
                }

                return b;
            }
        }               
    ],

    idProperty: 'CMNO',
    identifier: 'negative',

    proxy: {
        type: 'rest',
        url: '/WebApp/api/CreditMemos',

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

        //extraParams: {},

        listeners: {
            exception: function (proxy, response, operation) {
                console.log('Credit MemoH - Model', response, operation);
            }
        }
    }
});

function tr(value, record){
    return Ext.String.trim(value);
};