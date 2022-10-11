Ext.define('August.model.Billto', {
    extend: 'August.model.Base',

    fields: [
        { name: 'customer', type: 'string' },
        { name: 'code', type: 'string' },
        { name: 'name', type: 'string' },
        { name: 'addr1', type: 'string' },
        { name: 'addr2', type: 'string' },
        { name: 'city', type: 'string' },
        { name: 'state', type: 'string' },
        { name: 'zip', type: 'string' },
        { name: 'country', type: 'string' },
        { name: 'phone1', type: 'string' },
        { name: 'fax', type: 'string' },
        { name: 'edibillto', type: 'string' }
    ],

    idProperty: 'code',
    identifier: 'negative',

    proxy: {
        type: 'rest',
        url: '/WebApp/api/Billtos',

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
            //writeAllFields: false,
            allowSingle: false
        },

        listeners: {
            exception: function (proxy, response, operation) {
                console.log('Billto - Model', response, operation);
            }
        }
    }

});