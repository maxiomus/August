/**
 * Created by tech on 1/31/2017.
 */
Ext.define('August.model.inventory.Physical', {
    extend: 'August.model.Base',

    fields: [
        { name: 'pino', type: 'int' },
        { name: 'pidate', type: 'date', format: 'c' },
        { name: 'style', type: 'string', persist: false },
        { name: 'totalunit', type: 'string', persist: false },
        { name: 'memo', type: 'string' },
        { name: 'createUser', type: 'string' },
        { name: 'createTime', type: 'date', format: 'c' },
        { name: 'updateUser', type: 'string' },
        { name: 'updateTime', type: 'date', format: 'c' },
        { name: 'warehouse', type: 'string' },
        { name: 'alter_pack', type: 'string' },
        { name: 'tagNumber', type: 'string' },
        { name: 'pireason', type: 'string' },
        { name: 'status', type: 'string' },
        { name: 'user1', type: 'string' },
        { name: 'user2', type: 'string' },
        { name: 'user3', type: 'string' },
        { name: 'user4', type: 'string' },
        { name: 'userId', type: 'string', mapping: 'createUser', persist: false}
    ],

    idProperty: 'pino',
    identifier: 'negative',

    proxy: {
        type: 'rest',
        url: '/WebApp/api/PIs/',
        
        pageParam: '',
        startParam: '',
        limitParam: '',

        headers: {
            'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
        },

        reader: {
            type: 'json',
            rootProperty: 'data'
            //totalProperty: 'total',
            //successProperty: 'success'
        },

        listeners: {
            exception: function (proxy, response, operation) {
                console.log(response, operation);
            }
        }
    }
});
