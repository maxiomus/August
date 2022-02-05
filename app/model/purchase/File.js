Ext.define('August.model.purchase.File', {
    extend: 'August.model.Base',

    fields: ['fileId',
        //'name', 'size', 'created', 'lastmod',
        {
            name: 'file',
            type: 'auto',
            persist: false
        },
        {   name: 'name', mapping: 'file.name'},
        {   name: 'type', mapping: 'file.type'},
        {   name: 'size', mapping: 'file.size'},
        {   name: 'created', mapping: 'file.created'},
        {   name: 'lastmod', mapping: 'file.lastmod'},
        {
            name: 'orderId',
            reference: {
                parent: 'purchase.Order',

                //type: 'sales.Powd',
                //association: 'MaterialsByStyle',
                //role: 'powd',
                inverse: 'filesInPOs'
            }
        }
    ],

    idProperty: 'fileId',
    identifier: 'negative',

    proxy: {
        type: "rest",
        url: "/WebApp/api/Files/PurchaseOrder",

        isUpload: true,

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
