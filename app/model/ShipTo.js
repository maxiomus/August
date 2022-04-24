Ext.define('August.model.ShipTo', {
    extend: 'August.model.Base',

    fields: [
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
        { name: 'contact1', type: 'string' },
        { name: 'email', type: 'string' },
        { name: 'memo', type: 'string' },
        { name: 'shipvia', type: 'string' },
        { name: 'term', type: 'string' },
        { name: 'title', type: 'string' },
        { name: 'contact2', type: 'string' },
        { name: 'title2', type: 'string' },
        { name: 'con1Phone', type: 'string' },
        { name: 'con2Phone', type: 'string' },
        { name: 'user1', type: 'string' },
        { name: 'user2', type: 'string' },
        { name: 'user3', type: 'string' },
        { name: 'user4', type: 'string' },
        { name: 'userf_date', type: 'date', dateFormat: 'c' },
        { name: 'qb_tranfer', type: 'string' },
        { name: 'taxcode1', type: 'string' },
        { name: 'taxid1', type: 'string' },
        { name: 'taxable1', type: 'string' },
        { name: 'taxcode2', type: 'string' },
        { name: 'taxid2', type: 'string' },
        { name: 'taxable2', type: 'string' },
        { name: 'federalid', type: 'string' },
        { name: 'LicExpDate', type: 'date', dateFormat: 'c' },
        { name: 'vendortype', type: 'string' },
        { name: 'account', type: 'string' },
        { name: 'paymentcode', type: 'string' },
        { name: 'insurance_expdate', type: 'date', dateFormat: 'c' },
        { name: 'weeklyQty', type: 'number' },
        { name: 'weeklyPrice', type: 'number' },
        { name: 'inactive', type: 'string' },
        { name: 'pricing', type: 'string' },
        { name: 'warehouse', type: 'string' }
    ],

    idProperty: 'code',
    identifier: 'negative',

    proxy: {
        type: 'rest',
        url: '/WebApp/api/Vendors/ShipTo',

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