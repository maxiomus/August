Ext.define('August.model.sales.SalesOrderItem', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence',
        'Ext.data.identifier.Negative'
    ],

    fields: [        
        //{ name: 'orderNo', type: 'int' },        
        { name: 'line', type: 'int' },
        { name: 'style', type: 'string' },
        { name: 'color', type: 'string' },
        { name: 'warehouse', type: 'string' },
        { name: 'cancelDate', type: 'date', dateFormat: 'C' },
        { name: 'status', type: 'string' },
        { name: 'bundle', type: 'string' },
        { name: 'pcsPerBundle', type: 'int' },
        { name: 'bundlePerBox', type: 'int' },
        { name: 'pcsPerBox', type: 'int' },
        { name: 'numBox', type: 'int' },
        { name: 'unit1', type: 'number' },
        { name: 'unit2', type: 'number' },
        { name: 'unit3', type: 'number' },
        { name: 'unit4', type: 'number' },
        { name: 'unit5', type: 'number' },
        { name: 'unit6', type: 'number' },
        { name: 'unit7', type: 'number' },
        { name: 'unit8', type: 'number' },
        { name: 'unit9', type: 'number' },
        { name: 'unit10', type: 'number' },
        { name: 'unit11', type: 'number' },
        { name: 'unit12', type: 'number' },
        { name: 'unit13', type: 'number' },
        { name: 'unit14', type: 'number' },
        { name: 'unit15', type: 'number' },
        { name: 'unit16', type: 'number' },
        { name: 'unit17', type: 'number' },
        { name: 'unit18', type: 'number' },
        { name: 'unit19', type: 'number' },
        { name: 'unit20', type: 'number' },
        { name: 'unit21', type: 'number' },
        { name: 'unit22', type: 'number' },
        { name: 'unit23', type: 'number' },
        { name: 'unit24', type: 'number' },
        { name: 'unit25', type: 'number' },
        { name: 'unit26', type: 'number' },
        { name: 'unit27', type: 'number' },
        { name: 'unit28', type: 'number' },
        { name: 'unit29', type: 'number' },
        { name: 'unit30', type: 'number' },
        { name: 'totalUnit', type: 'number' },
        { name: 'price', type: 'number' },
        { name: 'extPrice', type: 'number' },
        { name: 'memo', type: 'string' },
        { name: 'userName', type: 'string' },
        { name: 'userTime', type: 'date', dateFormat: 'C' },
        { name: 'cancelReason', type: 'string' },
        { name: 'season', type: 'string' },
        { name: 'promotion', type: 'string' },
        { name: 'invoiceNO', type: 'int' },
        { name: 'ID', type: 'int' },
        { name: 'bun1', type: 'int' },
        { name: 'bun2', type: 'int' },
        { name: 'bun3', type: 'int' },
        { name: 'bun4', type: 'int' },
        { name: 'bun5', type: 'int' },
        { name: 'bun6', type: 'int' },
        { name: 'bun7', type: 'int' },
        { name: 'bun8', type: 'int' },
        { name: 'bun9', type: 'int' },
        { name: 'bun10', type: 'int' },
        { name: 'bun11', type: 'int' },
        { name: 'bun12', type: 'int' },
        { name: 'bun13', type: 'int' },
        { name: 'bun14', type: 'int' },
        { name: 'bun15', type: 'int' },
        { name: 'CancelReasonDate', type: 'date', dateFormat: 'C' },
        { name: 'subDivision', type: 'string' },
        { name: 'systemUpdated', type: 'string' },
        { name: 'salesrep1', type: 'string' },
        { name: 'salesrep2', type: 'string' },
        { name: 'comrate1', type: 'number' },
        { name: 'comrate2', type: 'number' },
        { name: 'poNo', type: 'int' },
        { name: 'allocQty', type: 'number' },
        { name: 'pickQty', type: 'number' },
        { name: 'sosQty', type: 'number' },
        { name: 'invQty', type: 'number' },
        { name: 'totalBun', type: 'int' },
        { name: 'numOfBundle', type: 'int' },
        { name: 'bulk_sodid', type: 'int' },
        { name: 'soft_wip_alloc', type: 'string' },
        { name: 'reference1', type: 'int' },
        { name: 'reference2', type: 'string' },
        { name: 'inv_unit1', type: 'number' },
        { name: 'inv_unit2', type: 'number' },
        { name: 'inv_unit3', type: 'number' },
        { name: 'inv_unit4', type: 'number' },
        { name: 'inv_unit5', type: 'number' },
        { name: 'inv_unit6', type: 'number' },
        { name: 'inv_unit7', type: 'number' },
        { name: 'inv_unit8', type: 'number' },
        { name: 'inv_unit9', type: 'number' },
        { name: 'inv_unit10', type: 'number' },
        { name: 'inv_unit11', type: 'number' },
        { name: 'inv_unit12', type: 'number' },
        { name: 'inv_unit13', type: 'number' },
        { name: 'inv_unit14', type: 'number' },
        { name: 'inv_unit15', type: 'number' },
        { name: 'newsono', type: 'int' },
        { name: 'customer_s', type: 'string' },
        { name: 'customer_c', type: 'string' },
        { name: 'location', type: 'string' },
        { name: 'closed_date', type: 'date', dateFormat: 'C' },
        { name: 'closed_user', type: 'string' },
        { name: 'pp_approval', type: 'string' },
        { name: 'top_approval', type: 'string' },
        { name: 'rowguid', type: 'string' },
        /*   
        {
            //
            //     When associate models,
            //     model name with Id prefixed.
            //     ex. pihId
            //    or using field...
            //
            name: 'orderno',
            reference: {
                parent: 'sales.Order',
                //
                //type: 'sales.Order',
                //association: 'itemsBySalesOrder',
                //role: 'product',
                field: 'orderno',
                inverse: 'salesorderitems'
            }
        }      
        */     
    ],

    idProperty: 'ID',
    identifier: 'negative',

    proxy: {
        type: 'rest',
        url: '/WebApp/api/SalesOrderItems',

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

        extraParams: {},

        listeners: {            
            exception: function (proxy, response, operation) {
                console.log('OrderItem - Model', response, operation);
            }
        }
    }
});

function tr(value, record){
    return Ext.String.trim(value);
}
