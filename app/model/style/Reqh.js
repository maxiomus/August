Ext.define('August.model.style.Reqh', {
    extend: 'August.model.Base',

    requires: [
        'Ext.data.validator.Presence'
    ],

    fields: [
        { name: 'reqhId'},
        { name: 'style', type: 'string' },
        { name: 'color', type: 'string' },
        { name: 'bomno', type: 'int' },
        { name: 'bodyref', type: 'string' },
        { name: 'customer', type: 'string' },
        { name: 'poqty1', type: 'number' },
        { name: 'poqty2', type: 'number'},
        { name: 'poqty3', type: 'number'},
        { name: 'userId', type: 'string'},
        { name: 'userTime', type: 'date'},
        { name: 'term', type: 'string' },
        { name: 'testing', type: 'boolean' },
        { name: 'inspection', type: 'boolean' },
        { name: 'memo', type: 'string' },
        {
            name: 'productId',
            reference: {
                parent: 'style.Product',
                //type: 'Product',
                //association: 'bomsByProduct',
                //role: 'product',
                field: 'id',
                inverse: 'reqhs'
            }
        }
    ],

    idProperty: 'reqhId',
    identifier: 'negative',

    validators: {
        style: 'presence'
        //color: 'presence'
    },

    proxy: {
        type: 'rest',
        url: '/WebApp/api/Reqh',

        timeout: 900000,

        pageParam: '',
        startParam: '',
        limitParam: '',

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

        extraParams: {},

        listeners: {
            exception: function (proxy, response, operation) {
                console.log('Reqh - Model', response, operation);
            }
        }
    }
});
