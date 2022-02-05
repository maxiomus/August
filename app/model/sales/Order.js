Ext.define('August.model.sales.Order', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.identifier.Negative'
    ],
    
    fields: [
        { name: 'orderno', type: 'int' },
        { name: 'orderDate', type: 'date', dateFormat: 'c' },
        { name: 'startDate', type: 'date', dateFormat: 'c' },
        { name: 'cancelDate', type: 'date', dateFormat: 'c' },
        { name: 'type', type: 'string' },
        { name: 'status', type: 'string' },
        { name: 'customer', type: 'string' },
        { name: 'billTo', type: 'string' },
        { name: 'shipTo', type: 'string' },
        { name: 'dept', type: 'string' },
        { name: 'PO', type: 'string' },
        { name: 'releaseNo', type: 'string' },
        { name: 'division', type: 'string' },
        { name: 'shipVia', type: 'string' },
        { name: 'term', type: 'string' },
        { name: 'memo', type: 'string' },
        { name: 'houseMemo', type: 'string' },
        { name: 'userName', type: 'string' },
        { name: 'userTime', type: 'date', dateFormat: 'c' },
        { name: 'bulkOrder', type: 'string' },
        { name: 'box', type: 'string' },
        { name: 'currency', type: 'string' },
        { name: 'cancelReason', type: 'string' },
        { name: 'orderDecision', type: 'string' },
        { name: 'discountRate', type: 'number' },
        { name: 'memoCode', type: 'string' },
        { name: 'housePo', type: 'int' },
        { name: 'void', type: 'int' },
        { name: 'UpdateUser', type: 'string' },
        { name: 'UpdateTime', type: 'date', dateFormat: 'c' },
        { name: 'salesrep1', type: 'string' },
        { name: 'comrate1', type: 'number' },
        { name: 'salesrep2', type: 'string' },
        { name: 'comrate2', type: 'number' },
        { name: 'factor', type: 'string' },
        { name: 'Invoiceno', type: 'int' },
        { name: 'voiddate', type: 'date', dateFormat: 'c' },
        { name: 'cancelReasonDate', type: 'date', dateFormat: 'c' },
        { name: 'routingGuide', type: 'string' },
        { name: 'priceLevel', type: 'string' },
        { name: 'warehouse', type: 'string' },
        { name: 'systemUpdated', type: 'string' },
        { name: 'shipToStore', type: 'string' },
        { name: 'dc', type: 'string' },
        { name: 'paymentcode', type: 'string' },
        { name: 'print_count', type: 'int' },
        { name: 'bulkOrderNo', type: 'int' },
        { name: 'user1', type: 'string' },
        { name: 'user2', type: 'string' },
        { name: 'user3', type: 'string' },
        { name: 'user4', type: 'string' },
        { name: 'userf_date', type: 'date', dateFormat: 'c' },
        { name: 'so_credit_decline', type: 'string' },
        { name: 'so_credit_apprv', type: 'string' },
        { name: 'cit_app_code', type: 'string' },
        { name: 'cit_ref_no', type: 'string' },
        { name: 'cit_ref_date', type: 'date', dateFormat: 'c' },
        { name: 'ship_whole', type: 'string' },
        { name: 'ccard_num', type: 'string' },
        { name: 'ccard_expdt', type: 'string' },
        { name: 'ccard_ccv', type: 'string' },
        { name: 'freight', type: 'number' },
        { name: 'misc', type: 'number' },
        { name: 'last_four', type: 'string' },
        { name: 'transaction_id', type: 'string' },
        { name: 'card_exp', type: 'string' },
        { name: 'card_issuer', type: 'string' },
        { name: 'factor_batchno', type: 'int' },
        { name: 'factor_app_amt', type: 'number' },
        { name: 'salesrep3', type: 'string' },
        { name: 'comrate3', type: 'number' },
        { name: 'salesrep4', type: 'string' },
        { name: 'comrate4', type: 'number' },
        { name: 'salesrep5', type: 'string' },
        { name: 'comrate5', type: 'number' },
        { name: 'group_pono', type: 'string' },
        { name: 'edi_n1_st_name', type: 'string' },
        { name: 'factorAcctNum', type: 'string' },
        { name: 'cshold', type: 'string' },
        { name: 'cust_division', type: 'string' },
        { name: 'Agent', type: 'string' },
        { name: 'maximum_pickamt', type: 'number' },
        { name: 'taxable1', type: 'string' },
        { name: 'taxable2', type: 'string' },
        { name: 'exclude_freight', type: 'string' },
        { name: 'double_freight', type: 'string' },
        { name: 'iPod_pDupNum', type: 'int' },
        { name: 'tradeshow', type: 'string' },
        { name: 'user6', type: 'string' },
        { name: 'additionalRate', type: 'number' },
        { name: 'prepay', type: 'string' },
        { name: 'email_proforma', type: 'string' },
        { name: 'rowguid', type: 'string' }
    ],

    idProperty: 'orderno',
    identifier: 'negative',

    proxy: {
        type: 'rest',
        url: '/WebApp/api/SalesOrders',

        pageParam: '',
        startParam: '',
        limitParam: '',        

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
                console.log('SalesOrder - Model', response, operation);
            }
        }
    }
});

function tr(value, record){
    return Ext.String.trim(value);
};