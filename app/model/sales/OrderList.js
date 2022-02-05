/**
 * Created by tech on 1/31/2017.
 */
Ext.define('August.model.sales.OrderList', {
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
        { name: 'memoCode', type: 'string' },
        { name: 'shipToStore', type: 'string' },
        { name: 'dc', type: 'string' },        
        { name: 'division', type: 'string' },
        { name: 'shipVia', type: 'string' },
        { name: 'warehouse', type: 'string' },
        { name: 'memo', type: 'string' },
        { name: 'houseMemo', type: 'string' },
        { name: 'userName', type: 'string' },
        { name: 'userTime', type: 'date', dateFormat: 'c' },
        { name: 'UpdateUser', type: 'string' },
        { name: 'UpdateTime', type: 'date', dateFormat: 'c' }
    ],

    idProperty: 'orderno',
    identifier: 'negative'
});
