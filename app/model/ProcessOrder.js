Ext.define('August.model.ProcessOrder', {
    extend: 'August.model.Base',

    fields: [
        { name: 'id', type: 'int' },
        { name: 'ProcessType', type: 'string', critical: true },
        { name: 'orderNo', type: 'int', critical: true },
        { name: 'location', type: 'string' },
        { name: 'line', type: 'int', critical: true },
        { name: 'account', type: 'string' },
        { name: 'receiving_loc' },
        {
            name: 'ProcessType',
            type: 'string',
            reference: {
                parent: 'ProcessType',
                //
                //type: 'sales.Powh',
                //association: 'stylesByHeader',
                //role: 'type',
                field: 'code',
                inverse: 'orders'
            }
        }
    ],

    idProperty: 'id',
    identifier: 'negative',

    /*
    validators: {
        //processType: 'presence',
        line: [
            { type: 'presence' },
            { type: 'range', min: 1 }
        ],
        orderNo: [
            { type: 'presence' },
            { type: 'range', min: 1 }
        ]
    },
    */
    proxy: {
        type: "rest",
        url: "/WebApp/api/ProcessOrders/",

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