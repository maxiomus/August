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
        { name: 'unit1', type: 'number', summary: 'sum' },
        { name: 'unit2', type: 'number', summary: 'sum' },
        { name: 'unit3', type: 'number', summary: 'sum' },
        { name: 'unit4', type: 'number', summary: 'sum' },
        { name: 'unit5', type: 'number', summary: 'sum' },
        { name: 'unit6', type: 'number', summary: 'sum' },
        { name: 'unit7', type: 'number', summary: 'sum' },
        { name: 'unit8', type: 'number', summary: 'sum' },
        { name: 'unit9', type: 'number', summary: 'sum' },
        { name: 'unit10', type: 'number', summary: 'sum' },
        { name: 'unit11', type: 'number', summary: 'sum' },
        { name: 'unit12', type: 'number', summary: 'sum' },
        { name: 'unit13', type: 'number', summary: 'sum' },
        { name: 'unit14', type: 'number', summary: 'sum' },
        { name: 'unit15', type: 'number', summary: 'sum' },
        { name: 'unitSum', type: 'number', summary: 'sum' },
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
        { name: 'CancelReasonDate', type: 'date', dateFormat: 'C' },
        { name: 'descript', type: 'string' },
        { name: 'vendorPart', type: 'string' },
        { name: 'vendorColor', type: 'string' },
        { name: 'warehouse', type: 'string' },
        { name: 'etadate', type: 'date', dateFormat: 'C' },
        { name: 'systemUpdated', type: 'string' },
        { name: 'uom', type: 'string' },
        { name: 'season', type: 'string' },
        { name: 'actual_cost', type: 'number' },
        { name: 'act_proc_cost', type: 'number' },
        { name: 'act_bom_cost', type: 'number' },
        { name: 'sodid', type: 'int' },
        { name: 'child_pono', type: 'int' },
        { name: 'child_podid', type: 'int' },
        { name: 'Prof_Group', type: 'string' },
        { name: 'Prof_Code', type: 'string' },
        { name: 'sto_sodid', type: 'int' },
        { name: 'sto_invdid', type: 'int' },
        { name: 'ReturnQty', type: 'number' },                     
        { name: 'act_assoc_cost', type: 'number' },
        { name: 'act_cost_conf', type: 'string' },        
        { name: 'numOfBundle', type: 'int' },   
        { name: 'ohs', type: 'int', persist: false },
        { name: 'size1', type: 'string', persist: false },
        { name: 'size2', type: 'string', persist: false },
        { name: 'size3', type: 'string', persist: false },
        { name: 'size4', type: 'string', persist: false },
        { name: 'size5', type: 'string', persist: false },
        { name: 'size6', type: 'string', persist: false },
        { name: 'size7', type: 'string', persist: false },
        { name: 'size8', type: 'string', persist: false },
        { name: 'size9', type: 'string', persist: false },
        { name: 'size10', type: 'string', persist: false },
        { name: 'size11', type: 'string', persist: false },
        { name: 'size12', type: 'string', persist: false },
        { name: 'size13', type: 'string', persist: false },
        { name: 'size14', type: 'string', persist: false },
        { name: 'size15', type: 'string', persist: false },
        //{ name: 'totalUnit', type: 'int' },
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
            writeAllFields: false,
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