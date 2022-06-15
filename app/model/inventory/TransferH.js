Ext.define('August.model.inventory.TransferH', {
    extend: 'August.model.Base',

    fields: [
        { name: 'transferno', type: 'int' },
        { name: 'transferdate', type: 'date', dateFormat: 'c' },
        { name: 'memo', type: 'string' },
        { name: 'createUser', type: 'string', convert: tr },
        { name: 'createTime', type: 'date', dateFormat: 'c' },
        { name: 'updateUser', type: 'string' },
        { name: 'updateTime', type: 'date', dateFormat: 'c' },
        { name: 'fr_warehouse', type: 'string', convert: tr },
        { name: 'to_warehouse', type: 'string', convert: tr },        
        { name: 'status', type: 'string', convert: tr },
        { name: 'pireason', type: 'string' },
        { name: 'confirmdate', type: 'date', dateFormat: 'c' },
        { name: 'receivedate', type: 'date', dateFormat: 'c' },
        { name: 'wh_transfer', type: 'string', convert: tr },
        { name: 'type', type: 'string', convert: tr },
        { name: 'user1', type: 'string' },
        { name: 'user2', type: 'string' },
        { name: 'user3', type: 'string' },
        { name: 'user4', type: 'string' },
        { name: 'confirmuser', type: 'string' },
        { name: 'unconfirmuser', type: 'string' },
        { name: 'receiveuser', type: 'string' }
    ],

    idProperty: 'transferno',
    identifier: 'negative',

    proxy: {
        type: 'rest',
        url: '/WebApp/api/TRANSFERHs',

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
                changes: false,
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
                console.log('TransferH - Model', response, operation);
            }
        }
    }
});

function tr(value, record){
    return Ext.String.trim(value);
};