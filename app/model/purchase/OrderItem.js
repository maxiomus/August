Ext.define('August.model.purchase.OrderItem', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence',
        'Ext.data.identifier.Negative'
    ],

    fields: [
        //{ name: 'pono', type: 'int' },
        { name: 'id', type: 'int' },
        { name: 'style', type: 'string' },
        { name: 'color', type: 'string' },
        { name: 'bundle', type: 'string' },
        { name: 'pcsPerBundle', type: 'int' },
        { name: 'bundlePerBox', type: 'int' },
        { name: 'pcsPerBox', type: 'int' },
        { name: 'numBox', type: 'int' },
        { name: 'memo', type: 'string' },
        { name: 'unit1', type: 'int' },
        { name: 'unit2', type: 'int' },
        { name: 'unit3', type: 'int' },
        { name: 'unit4', type: 'int' },
        { name: 'unit5', type: 'int' },
        { name: 'unit6', type: 'int' },
        { name: 'unit7', type: 'int' },
        { name: 'unit8', type: 'int' },
        { name: 'unit9', type: 'int' },
        { name: 'unit10', type: 'int' },
        { name: 'unit11', type: 'int' },
        { name: 'unit12', type: 'int' },
        { name: 'unit13', type: 'int' },
        { name: 'unit14', type: 'int' },
        { name: 'unit15', type: 'int' },
        { name: 'unitSum', type: 'int' },
        { name: 'price', type: 'number' },
        { 
            name: 'extPrice', type: 'number',
            persist: false,
            mapping: function(data){
                return data.price * data.unitSum
            }
        },
        { name: 'status', type: 'string' },
        { name: 'SONo', type: 'int' },
        { name: 'pack', type: 'string' },
        { name: 'ratioID', type: 'int' },
        { name: 'line', type: 'int' },
        { name: 'cancelReason', type: 'string' },
        { name: 'CancelReasonDate', type: 'date', dateFormat: 'c' },
        { name: 'vendorPart', type: 'string' },
        { name: 'vendorColor', type: 'string' },
        { name: 'warehouse', type: 'string' },
        { name: 'etadate', type: 'date', dateFormat: 'c' },
        { name: 'systemUpdated', type: 'string' },
        { name: 'uom', type: 'string' },
        { name: 'season', type: 'string' },
        { name: 'sodid', type: 'int' },
        { name: 'child_pono', type: 'int' },
        { name: 'child_podid', type: 'int' },
        { name: 'Prof_Group', type: 'string' },
        { name: 'Prof_Code', type: 'string' },
        { name: 'sto_sodid', type: 'int' },
        { name: 'sto_invdid', type: 'int' },
        { name: 'ReturnQty', type: 'int' },
        { name: 'numOfBundle', type: 'int' },
        { name: 'rowguid', type: 'string' },
        { name: 'descript', type: 'string' },
        { name: 'ohs', type: 'int' },
        { name: 'size1', type: 'string' },
        { name: 'size2', type: 'string' },
        { name: 'size3', type: 'string' },
        { name: 'size4', type: 'string' },
        { name: 'size5', type: 'string' },
        { name: 'size6', type: 'string' },
        { name: 'size7', type: 'string' },
        { name: 'size8', type: 'string' },
        { name: 'size9', type: 'string' },
        { name: 'size10', type: 'string' },
        { name: 'size11', type: 'string' },
        { name: 'size12', type: 'string' },
        { name: 'size13', type: 'string' },
        { name: 'size14', type: 'string' },
        { name: 'size15', type: 'string' },
        { name: 'totalUnit', type: 'int' },
        {
            //
            //     When associate models,
            //     model name with Id prefixed.
            //     ex. pihId
            //    or using field...
            //
            name: 'pono',
            //mapping: 'poNo', persist: false,      
            type: 'int',      
            reference: { 
                //type: 'purchase.Order',               
                parent: 'purchase.Order',
                //role: 'pono',
                field: 'pono',
                inverse: 'purchaseorderitems'
            }
        }            
    ],

    idProperty: 'id',
    identifier: 'negative',

    proxy: {
        type: 'rest',
        url: '/WebApp/api/PurchaseOrderItems',

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