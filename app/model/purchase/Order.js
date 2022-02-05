/**
 * Created by tech on 1/31/2017.
 */
Ext.define('August.model.purchase.Order', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.identifier.Negative'
    ],
    
    fields: [
        { name: 'pono', type: 'number'},
        { name: 'orderDate', type: 'date', dateFormat: 'c'},
        { name: 'startDate', type: 'date', dateFormat: 'c'},
        { name: 'cancelDate', type: 'date', dateFormat: 'c'},
        { name: 'vendor', type: 'string'},
        { name: 'status', type: 'string'},
        { name: 'void', type: 'string'},
        { name: 'type', type: 'string'},
        { name: 'customer', type: 'string'},
        { name: 'onBoardDate', type: 'date', dateFormat: 'c'},
        { name: 'terms', type: 'string'},
        { name: 'shipvia', type: 'string'},
        { name: 'shipMark', type: 'string'},
        { name: 'LCNo', type: 'int'},
        { name: 'LCdate', type: 'date', dateFormat: 'c'},
        { name: 'BLNo', type: 'int'},
        { name: 'BLDate', type: 'date', dateFormat: 'c'},
        { name: 'quota', type: 'string'},
        { name: 'duty', type: 'string'},
        { name: 'freight', type: 'string'},
        { name: 'createUser', type: 'string'},
        { name: 'createDate', type: 'date', dateFormat: 'c'},
        { name: 'updateUser', type: 'string'},
        { name: 'updateDate', type: 'date', dateFormat: 'c'},
        { name: 'memocode', type: 'string'},
        { name: 'processType', type: 'string'},
        { name: 'cancelreason', type: 'string'},
        { name: 'cancelReasonDate', type: 'date', dateFormat: 'c'},
        { name: 'etaDate', type: 'date', dateFormat: 'c'},
        { name: 'shipto', type: 'string'},
        { name: 'warehouse', type: 'string'},
        { name: 'cut_po', type: 'string'},
        { name: 'poclh_exist', type: 'string'},
        { name: 'process_count', type: 'int'},
        { name: 'last_process', type: 'string'},
        { name: 'user1', type: 'string'},
        { name: 'user2', type: 'string'},
        { name: 'user3', type: 'string'},
        { name: 'user4', type: 'string'},
        { name: 'userf_date', type: 'date', dateFormat: 'c'},
        { name: 'style', type: 'string'},
        { name: 'color', type: 'string'},
        { name: 'styleprice1', type: 'number'},
        { name: 'componentType', type: 'string'},
        { name: 'shipdate', type: 'date', dateFormat: 'c'},
        { name: 'TotalQty', type: 'int'},
        { name: 'ReceiveQty', type: 'int'},
        { name: 'division', type: 'string'},
        { name: 'cutReleaseDate', type: 'date', dateFormat: 'c'},
        { name: 'cutFinishDate', type: 'date', dateFormat: 'c'},
        { name: 'location_1', type: 'string'},
        { name: 'vendor_1', type: 'string'},
        { name: 'price_1', type: 'number'},
        { name: 'sewingPickupDate', type: 'date', dateFormat: 'c'},
        { name: 'sewingDueDate', type: 'date', dateFormat: 'c'},
        { name: 'location_2', type: 'string'},
        { name: 'vendor_2', type: 'string'},
        { name: 'price_2', type: 'number'},
        { name: 'extPrice', type: 'number'},
        { name: 'rcvextPrice', type: 'number'},
        { name: 'bom_req_qty', type: 'int'},
        { name: 'bom_used_qty', type: 'int'},
        { name: 'child_count', type: 'int'},
        { name: 'rcvd_child_po_count', type: 'int'},
        { name: 'rcvd_child_po_qty', type: 'int'},
        { name: 'user15', type: 'string'},
        { name: 'SoNo', type: 'number'},
        { name: 'Current_Location', type: 'string'},
        { name: 'Current_Vendor', type: 'string'},
        { name: 'first_po_price', type: 'number'},
        { name: 'current_task', type: 'string'},
        { name: 'process_exist', type: 'string'},
        { name: 'logistic_date', type: 'date', dateFormat: 'c'},
        { name: 'f_req_count', type: 'int'},
        { name: 'f_child_count', type: 'int'},
        { name: 'f_a_comppo_count', type: 'int'}
    ],

    idProperty: 'pono',
    identifier: 'negative',

    proxy: {
        type: 'rest',
        url: '/WebApp/api/PurchaseOrders',

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

        //extraParams: {},

        listeners: {            
            exception: function (proxy, response, operation) {
                console.log('Purchase.Order - Model', response, operation);
            }
        }
    }
});
