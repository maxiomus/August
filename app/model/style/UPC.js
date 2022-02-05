Ext.define('August.model.style.UPC', {
    extend: 'August.model.Base',

    fields: [        
        {   name: 'id', type: 'int' },
        {   name: 'style', type: 'string' },
        {   name: 'color', type: 'string' },
        {   name: 'upcno', type: 'string' },
        {   name: 'prepack', type: 'string' },
        {   name: 'upc_size', type: 'string' },
        {
            name: 'sku_no', type: 'string', allowNull: true
        },
        {
            name: 'ptype', type: 'string', allowNull: true
        },
        {
            name: 'updateuser', type: 'string', allowNull: true
        }
    ],

    idProperty: 'id',
    identifier: 'negative',

    proxy: {
        type: "rest",
        url: "/WebApp/api/UPCs",        

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