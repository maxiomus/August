Ext.define('August.model.style.Attribute', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [
        {
            name: 'siteid',
            type: 'int'
            /*
            calculate: function(data){
                return data.style.trim() + '-' + data.color.trim() + '-' + data.bomno + '-' + data.line + '-' + data.orderNo;
            }
            */
        },
        { name: 'style', type: 'string', allowNull: true },
        { name: 'color', type: 'string', allowNull: true },
        { name: 'Attribute', type: 'string' },
        { name: 'AttributeValue', type: 'string' },
        { name: 'rowguid', type: 'string'}
    ],

    idProperty: 'rowguid',
    identifier: 'negative',

    validators: {
        style: 'presence',
        siteid: 'presence'        
    },

    proxy: {
        type: 'rest',
        batchActions: true, // default false when rest proxy.
        url: '/WebApp/api/StyleAttributes/',

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
            writeAllFields: true,
            allowSingle: false // set false to send a single record in array
        },

        //extraParams: {},

        listeners: {           
            exception: function (proxy, response, operation) {
                console.log(response, operation);
            }
        }
    }
});