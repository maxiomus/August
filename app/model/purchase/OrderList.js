Ext.define('August.model.purchase.OrderList', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.identifier.Negative'
    ],
    
    fields: [
        { name: 'pono', type: 'int'},
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
        { name: 'process_count', type: 'string'},
        { name: 'user1', type: 'string'},
        { name: 'user2', type: 'string'},
        { name: 'user3', type: 'string'},
        { name: 'user4', type: 'string'},
        { name: 'userf_date', type: 'date', dateFormat: 'c'},
        { name: 'userdate', type: 'date', dateFormat: 'c'},
        { name: 'userdate1', type: 'date', dateFormat: 'c'},
        { name: 'userdate2', type: 'date', dateFormat: 'c'},
        { name: 'userdate3', type: 'date', dateFormat: 'c'},
        { name: 'style', type: 'string'},
        { name: 'color', type: 'string'},
        { name: 'styleprice1', type: 'number'},
        { name: 'componentType', type: 'string'},
        { name: 'style_user1', type: 'string'},
        { name: 'style2', type: 'string'},
        { name: 'color2', type: 'string'},
        { name: 'shipdate', type: 'date', dateFormat: 'c'},
        { name: 'TotalQty', type: 'int'},
        { name: 'ReceiveQty', type: 'int'},
        { name: 'orderType', type: 'string'},
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
        { name: 'ass_comp_po_count', type: 'int'},
        { name: 'rcvd_ass_comp_po_count', type: 'int'},
        { name: 'rcvd_ass_comp_po_qty', type: 'int'},
        { name: 'user15', type: 'string'},
        { name: 'user16', type: 'string'},
        { name: 'user17', type: 'string'},
        { name: 'cust_po', type: 'string'},
        { name: 'SoNo', type: 'int'},
        { name: 'so_customer', type: 'string'},
        { name: 'Current_Location', type: 'string'},
        { name: 'Current_Vendor', type: 'string'},
        { name: 'first_po_price', type: 'number'},
        { name: 'current_task', type: 'string'},
        { name: 'process_exist', type: 'string'},
        { name: 'logistic_date', type: 'date', dateFormat: 'c'},
        { name: 'so_cancelDate', type: 'date', dateFormat: 'c'},
        { name: 'so_store', type: 'string'},
        { name: 'f_req_count', type: 'int'},
        { name: 'f_child_count', type: 'int'},
        { name: 'f_a_comppo_count', type: 'int'},
        { name: 't_req_count', type: 'int'},
        { name: 't_child_count', type: 'int'},
        { name: 't_a_comppo_count', type: 'int'},
        { name: 'so_user1', type: 'string'},
        { name: 'vendor_ship_date', type: 'date', dateFormat: 'c'},
        { name: 'last_receive_date', type: 'date', dateFormat: 'c'},
        { name: 'unit1', type: 'int'},
        { name: 'unit2', type: 'int'},
        { name: 'unit3', type: 'int'},
        { name: 'unit4', type: 'int'},
        { name: 'unit5', type: 'int'},
        { name: 'unit6', type: 'int'},
        { name: 'unit7', type: 'int'},
        { name: 'unit8', type: 'int'},
        { name: 'unit9', type: 'int'},
        { name: 'unit10', type: 'int'},
        { name: 'unit11', type: 'int'},
        { name: 'unit12', type: 'int'},
        { name: 'unit13', type: 'int'},
        { name: 'unit14', type: 'int'},
        { name: 'unit15', type: 'int'},
        { name: 'last_process', type: 'string'},
        { name: 'memo', type: 'string'},
        { name: 'user5', type: 'string'},
        { name: 'user6', type: 'string'},
        { name: 'user7', type: 'string'},
        { name: 'user8', type: 'string'},
        { name: 'user9', type: 'string'},
        { name: 'user10', type: 'string'},
        { name: 'marker_no', type: 'int'},
        { name: 'memo2', type: 'string'}

    ],

    idProperty: 'pono',
    identifier: 'negative'   
});

function tr(value, record){
    return Ext.String.trim(value);
};