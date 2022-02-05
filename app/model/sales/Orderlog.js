/**
 * Model representing a PowLog object
 */
Ext.define('August.model.sales.OrderLog', {
    extend: 'August.model.Base',

    fields: [
        // id field
        {
            name: 'orderlogId',
            type: 'int'
        },
        {
            name: 'powdId',
            type: 'int'
        },
        {
            name: 'powno',
            type: 'string'
        },
        {
            name: 'revision',
            type: 'int'
        },
        // simple values
        {
            name: 'content',
            type: 'string'
        },
        {
            name: 'active',
            type: 'boolean'
        },
        {
            name: 'status',
            type: 'string'
        },
        {
            name: 'userId',
            type: 'string'
        },
        {
            name: 'logdate',
            type: 'date',
            dateFormat: 'c'
        },
        {
            name: 'orderId',
            reference: {
                parent: 'sales.Order',
                //
                //type: 'sales.Powh',
                //association: 'stylesByHeader',
                //role: 'powh',
                inverse: 'orderlogs'
            }
        }
    ],

    idProperty: 'orderlogId',
    identifier: 'negative',

    proxy: {
        //$configStrict: false,
        type: 'rest',
        url: '/WebApp/api/Orderlog/',

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

        listeners: {            
            exception: function (proxy, response, operation) {
                console.log(response, operation);
            }
        }
    }
});