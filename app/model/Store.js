Ext.define('August.model.Store', {
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
        { name: 'fax1', type: 'string' },
        { name: 'dept', type: 'string' },
        { name: 'dc', type: 'string' },
        { name: 'ediStore', type: 'string' },
        { name: 'priority', type: 'string' },
        { name: 'createuser', type: 'string' },
        { name: 'createdate', type: 'date', dateFormat: 'c' },
        { name: 'username', type: 'string' },
        { name: 'usertime', type: 'date', dateFormat: 'c' },
        { name: 'inactive', type: 'string' },
        { name: 'customer_owning', type: 'string' },
        { name: 'shipvia', type: 'string' },
        { name: 'acct_no', type: 'string' },
        { name: 'latitude', type: 'number' },
        { name: 'longitude', type: 'number' },
        { name: 'dropship', type: 'string' },
        { name: 'contact', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'addr_resident', type: 'string' }
    ],

    idProperty: 'code',
    identifier: 'negative',

    proxy: {
        type: 'rest',
        url: '/WebApp/api/Stores',

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
                console.log('Vendor - Model', response, operation);
            }
        }
    }

});