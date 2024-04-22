/**
 * Created by tech on 5/09/2018.
 */
 Ext.define('August.model.OrderType', {
    extend: 'August.model.Base',

    fields: [
        { name: 'code', type: 'string' },
        { name: 'descript', type: 'string' },
        
        { name: 'def', type: 'string' },	
        { name: 'memocode', type: 'string' },
        { name: 'inactive', type: 'string' },
        { name: 'nonrevenue', type: 'string' },
        { name: 'userField1', type: 'string' },
        { name: 'userField2', type:	'string' }
    ],

    idProperty: 'code',

    validators: {
        code: 'presence'
    },

    proxy: {
        type: "rest",
        url: "/WebApp/api/OrderTypes/",

        pageParam: '',
        startParam: '',
        limitParam: '',

        headers: {
            'Authorization' : 'Bearer ' + localStorage.getItem('access_token')
        },

        reader: {
            type: "json",
            rootProperty: "data"
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