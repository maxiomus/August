/**
 * Created by tech on 9/2/2015.
 */
 Ext.define('August.model.New', {
    extend: 'August.model.Base',

    fields: [
        { name: 'orderId', type: 'int'},
        { name: 'powno', type: 'string'},
        { name: 'revision', type: 'string'},
        { name: 'ordertype', type: 'string'},
        { name: 'customer', type: 'string'},
        { name: 'division', type: 'string'},
        { name: 'comments', type: 'string'},
        { name: 'link', type: 'string'},
        { name: 'status', type: 'string'},
        { name: 'userId', type: 'string'},
        { name: 'createdon', type: 'date'},
        { name: 'updatedby', type: 'string'},
        { name: 'updatedon', type: 'date'},
        { name: 'confirmon', type: 'date'},
        { name: 'reviseon', type: 'date'},
        { name: 'cancelon', type: 'date'},
        { name: 'submits', type: 'string'},
        { name: 'progress', type: 'string'},
        { name: 'attachs', type: 'int'},
        { name: 'visited', type: 'string', persist: false}
    ],

    idProperty: 'orderId'
});